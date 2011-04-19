var _ = require('underscore');

// Memoization of edges to process
var EventQueue = function(polygon){

  var individual_vertices = polygon.vertices.length - 1;  // last vertex in geojson is equal to first vertex  
  this.number_of_events = 2 * (individual_vertices);        // 2 per edge - last event looping back to 0 is handled by +1 below  
  this.events = [];
  
  // build up 2 'events' per edge. One for left vertex, one for right.
  for (var i = 0; i < individual_vertices; i++) {
    var a = 2*i;
    var b = 2*i+1;  
    this.events[a] = {edge:i};
    this.events[b] = {edge:i};
    this.events[a].vertex = polygon.vertices[i];
    this.events[b].vertex = polygon.vertices[i+1];
    if (this.events[a].vertex.compare(this.events[b].vertex) < 0) {
      this.events[a].type = 'left';
      this.events[b].type = 'right';
    } else {
      this.events[a].type = 'right';
      this.events[b].type = 'left';      
    }
  };
  
  // sort events lexicographically
  this.events.sort(function(a,b){ return a.vertex.compare(b.vertex); });
};

module.exports = EventQueue;