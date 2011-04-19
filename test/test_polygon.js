var sh = require('shamos-hoey-js')
  , Polygon = sh.Polygon
  , Point = sh.Point
  , assert = require('assert')
  , _ = require('underscore');

exports['test can build a polygon from an array of points'] = function(){
  geom = [[100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0]];
  points  = _.map(geom, function(pnt){ return new Point(pnt[0],pnt[1]); });
  polygon = new Polygon(points);
  
  assert.eql(polygon.vertices.length, geom.length);
  assert.eql(polygon.vertices[0].x, geom[0][0]);
};

exports['test is polygon simple'] = function(){
  
  // note hack on last co-ordinate.
  var geom = [[100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.000001, 0.000001]];
  var points  = _.map(geom, function(pnt){ return new Point(pnt[0],pnt[1]); });
  var polygon = new Polygon(points);
  
  assert.ok(polygon.simple_polygon(), "polygon is simple")
};

exports['test is polygon simple 2'] = function(){
  var geom = [[2.0, 2.0], [1.0, 2.0], [1.0, 1.0], [2.0, 1.0], [3.0, 1.0], [3.0, 2.0], [2.000001, 2.000001]];
  var points  = _.map(geom, function(pnt){ return new Point(pnt[0],pnt[1]); });
  var polygon = new Polygon(points);
  
  assert.ok(polygon.simple_polygon(), "polygon is simple")
};

exports['test is polygon simple 3'] = function(){
  var geom = [[0, 0], [0, 1], [1, 1], [0, 1], [0.0001, 0.00001]];
  var points  = _.map(geom, function(pnt){ return new Point(pnt[0],pnt[1]); });
  var polygon = new Polygon(points);
  
  assert.ok(polygon.simple_polygon(), "polygon is simple")
};

exports['test is polygon simple 4'] = function(){
  var geom = [[2.0, 2.0], [2.0, 3.0], [3.0, 3.0], [4.0, 3.0], [4.0, 2.0], [2.000001, 2.00001]];
  var points  = _.map(geom, function(pnt){ return new Point(pnt[0],pnt[1]); });
  var polygon = new Polygon(points);
  
  assert.ok(polygon.simple_polygon(), "polygon is complex")
};


exports['test is polygon complex'] = function(){
  var geom = [[2.0, 2.0], [2.0, 3.0], [3.0, 1.0], [4.0, 3.0], [4.0, 2.0], [2.00001, 2.00001]];
  var points  = _.map(geom, function(pnt){ return new Point(pnt[0],pnt[1]); });
  var polygon = new Polygon(points);
  
  assert.ok(!polygon.simple_polygon(), "polygon is complex")
};


exports['test is polygon complex 3'] = function(){
  var geom = [[2.0, 2.0], [3.0, 2.0], [3.0, 3.0], [2.0, 3.0], [4.0, 2.0], [2.0000001, 2.000001]];
  var points  = _.map(geom, function(pnt){ return new Point(pnt[0],pnt[1]); });
  var polygon = new Polygon(points);
  
  assert.ok(!polygon.simple_polygon(), "polygon is complex")
};


