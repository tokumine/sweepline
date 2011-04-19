// S. Tokumine 18/04/2011
// 
// Javascript port of http://softsurfer.com/Archive/algorithm_0108/algorithm_0108.htm
//
// The Intersections for a Set of 2D Segments, and Testing Simple Polygons
//
// Shamos-Hoey Algorithm implementation in Javascript
//

var RedBlackTree = require('./red_black_tree');


// A container class for segments (or edges) of the polygon to test
// Allows storage and retrieval from the Balanced Binary Tree 
var SweepLineSeg = function(ev){
  this.edge = ev.edge;  
  this.left_point;
  this.right_point;
  this.above;
  this.below;
}

// required comparator for binary tree storage. Sort by y axis of the 
// points where the segment crosses L (eg, the left point)
SweepLineSeg.prototype.compare = function(sls){
  if (this.left_point.y > sls.left_point.y) return 1;
  if (this.left_point.y < sls.left_point.y) return -1;
  return 0;      
}

SweepLineSeg.prototype.toString = function(){
  return "edge:" + this.edge;
}


// Main SweepLine class. 
// For full details on the algorithm used, consult the C code here:
// http://softsurfer.com/Archive/algorithm_0108/algorithm_0108.htm
//
// This is a direct port of the above C to Javascript
var SweepLine = function(polygon){
  this.tree    = new RedBlackTree();
  this.polygon = polygon;
};

// Add Algorithm 'event' (more like unit of analysis) to queue
// Units are segments or distinct edges of the polygon.
SweepLine.prototype.add = function(ev){
  
  // build up segment data
  var seg = new SweepLineSeg(ev);
  var p1 = this.polygon.vertices[seg.edge];
  var p2 = this.polygon.vertices[seg.edge + 1];
      
  // if it is being added, then it must be a LEFT edge event 
  // but need to determine which endpoint is the left one first
  if (p1.compare(p2) < 0){
    seg.left_point  = p1;
    seg.right_point = p2;
  } else {
    seg.left_point  = p2;
    seg.right_point = p1;    
  }
  
  // Add node to tree and setup linkages to "above" and "below" 
  // edges as per algorithm  
  var nd = this.tree.add(seg);

  var nx = this.tree.findNext(nd._value);
  var np = this.tree.findPrevious(nd._value);

  if (nx) {
     seg.above = nx;
     seg.above.below = seg;
  }
  if (np) {
     seg.below = np;
     seg.below.above = seg;
  }

  return seg;  
}


SweepLine.prototype.find = function(ev){

 // need a segment to find it in the tree
 // TODO: TIDY THIS UP!!!
 var seg = new SweepLineSeg(ev); 
 var p1 = this.polygon.vertices[seg.edge];
 var p2 = this.polygon.vertices[seg.edge + 1];
     
 // if it is being added, then it must be a LEFT edge event 
 // but need to determine which endpoint is the left one first
 if (p1.compare(p2) < 0){
   seg.left_point  = p1;
   seg.right_point = p2;
 } else {
   seg.left_point  = p2;
   seg.right_point = p1;    
 }
 
 var nd = this.tree.find(seg);
 
 if (nd){
   return nd;
 } else {
   return false;  // BUG: unsure what to return here. Probably not false.
 } 
}

// When removing a node from the tree, ensure the above and below links are 
// passed on to adjacent nodes before node is deleted
SweepLine.prototype.remove = function(seg){
  
  // Pretty sure there is a bug here as the tree isn't getting pruned correctly.
  // In fact, I thin the remove method is removing the wrong elements from the list.
  //
  try{
    var nd = this.tree.find(seg);  
  } catch (err) {
    return;
  }
  
  

  var nx = this.tree.findNext(nd);
  if (nx){
    nx.below = seg.below;
  }
  
  var np = this.tree.findPrevious(nd);
  if (np){
    np.above = seg.above;
  }
  
  this.tree.remove(seg);  
}

// test intersect of 2 segments and return: false=none, true=intersect
SweepLine.prototype.intersect = function(s1, s2){
  if (!s1 || !s2) return false; // no intersect if either segment doesn't exist
  
  // check for consecutive edges in polygon
  e1 = s1.edge;
  e2 = s2.edge;
  
  if (((e1+1)%this.polygon.vertices.length === e2) || (e1 === (e2+1)%this.polygon.vertices.length))
    return false;      // no non-simple intersect since consecutive
  
  // test for existence of an intersect point
  lsign = s2.left_point.is_left(s1.left_point, s1.right_point);     // s2 left point sign
  rsign = s2.right_point.is_left(s1.left_point, s1.right_point);    // s2 right point sign
  if (lsign * rsign > 0) // s2 endpoints have same sign relative to s1
      return false;      // => on same side => no intersect is possible
  
  lsign = s1.left_point.is_left(s2.left_point, s2.right_point);     // s1 left point sign
  rsign = s1.right_point.is_left(s2.left_point, s2.right_point);    // s1 right point sign
  if (lsign * rsign > 0) // s1 endpoints have same sign relative to s2
      return false;      // => on same side => no intersect is possible

  return true;           // segments s1 and s2 straddle. Intersect exists.
}

module.exports = SweepLine;