var Point = function(x,y){
  this.x = x
  this.y = y
};

// Determines the xy lexicographical order of two points
Point.prototype.compare = function(other_point){

  // x-coord first
  if (this.x > other_point.x) return  1; 
  if (this.x < other_point.x) return -1;

  // y-coord second
  if (this.y > other_point.y) return  1; 
  if (this.y < other_point.y) return -1;

  // they are the same point
  return 0;  
}

// tests if point is Left|On|Right of the line P0 to P1.
//
// returns: 
//  >0 for left of the line 
//  0 for on the line
//  <0 for right of the line
Point.prototype.is_left = function(p0, p1){
 return (p1.x - p0.x) * (this.y - p0.y) - (this.x - p0.x) * (p1.y - p0.y);  
}

module.exports = Point;