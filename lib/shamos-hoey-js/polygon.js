var sh         = require('shamos-hoey-js')
  , EventQueue = require('./event_queue')
  , SweepLine  = require('./sweep_line');


var Polygon = function(point_array){
  this.vertices = point_array  
};

// Tests polygon simplicity. 
// returns true if simple, false if not.
Polygon.prototype.simple_polygon = function(){

  var event_queue  = new EventQueue(this);
  var sweep_line   = new SweepLine(this);

  // This loop processes all events in the sorted queue
  // Events are only left or right vertices
  while (e = event_queue.events.shift()) { 
    if (e.type == 'left') {                      
      var s = sweep_line.add(e);           
      
      if (sweep_line.intersect(s, s.above)) {
        return false;         
      }              
      if (sweep_line.intersect(s, s.below)){       
        return false;    
      }
                             
    } else {         
      // console.log(sweep_line.tree.toString());
      // console.log("\nlooking for:")
      // console.log(e);                         
      var s = sweep_line.find(e);
      // console.log("\nfound:")      
      // console.log(s);
      
      if (sweep_line.intersect(s.above, s.below)) {
        console.log("third");
        return false;                       
      }
      
      sweep_line.remove(s);                   
    }
  }
  return true;
};

module.exports = Polygon;