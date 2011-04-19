var sl          = require('sweepline')
  , EventQueue  = sl.EventQueue
  , Polygon     = sl.Polygon
  , Point       = sl.Point  
  , assert      = require('assert')
  , _           = require('underscore');

exports['test can create an EventQueue'] = function(){
  var geojson = [[100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0]];
  var points  = _.map(geojson, function(pnt){ return new Point(pnt[0],pnt[1]); });
  var polygon = new Polygon(points);
  var event_queue = new EventQueue(polygon)
  
  assert.eql(event_queue.events.length, 8);
  assert.eql(event_queue.events.length, event_queue.number_of_events);
};
