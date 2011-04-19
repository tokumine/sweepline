// ported tests from YUI to expresso

var sl = require('sweepline')
  , Point = sl.Point
  , assert = require('assert')
  , _ = require('underscore');

exports['test less than comparator'] = function(){
  var p0 = new Point(1,1);
  var p1 = new Point(3,3);
  assert.eql(p0.compare(p1), -1);
};

exports['test more than comparator'] = function(){
  var p0 = new Point(1,1);
  var p1 = new Point(3,3);
  assert.eql(p1.compare(p0), 1);
};

exports['test equality'] = function(){
  var p0 = new Point(1,1);
  assert.eql(p0.compare(p0), 0);
};

exports['test left of line'] = function(){
  var p0 = new Point(1.0,1.0);
  var p1 = new Point(3.0,3.0);
  var p2 = new Point(1.0,3.0);
  
  assert.ok(p2.is_left(p0,p1) > 0);
};

exports['test right of line'] = function(){
  var p0 = new Point(1.0,1.0);
  var p1 = new Point(3.0,3.0);
  var p2 = new Point(3.0,1.0);
  
  assert.ok(p2.is_left(p0,p1) < 0);
};

exports['test on line'] = function(){
  var p0 = new Point(1.0,1.0);
  var p1 = new Point(3.0,3.0);
  var p2 = new Point(2.0,2.0);
  
  assert.ok(p2.is_left(p0,p1) == 0);
};
