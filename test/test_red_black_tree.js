var sh = require('shamos-hoey-js')
  , RedBlackTree = sh.RedBlackTree
  , assert = require('assert')
  , _ = require('underscore');

// Number wrapper so that we can add compare
var TestNumber = function(number){
  this.value = number  
};

TestNumber.prototype.compare = function(test_number){
  if (this.value > test_number.value) return 1;
  if (this.value < test_number.value) return -1;
  return 0;    
}  

exports['test add single'] = function(){
  var rbt = new RedBlackTree();
  rbt.add(new TestNumber(5)); 
  
  assert.eql(5, rbt.min().value, "First item should have value of 5.");
};

exports['test TestNumber'] = function(){
  var one = new TestNumber(1);
  var two = new TestNumber(2);
  
  assert.eql(one.compare(two), -1);
  assert.eql(two.compare(one), 1);
  assert.eql(one.compare(one), 0);
}

exports['test add multiple'] = function(){
  var rbt = new RedBlackTree();
  rbt.add(new TestNumber(5));
  rbt.add(new TestNumber(10));

  assert.eql(5, rbt.min().value, "First item should have value of 5.");
  assert.eql(10, rbt.max().value, "First item should have value of 5.");
};
 

exports['test find test'] = function(){
  var rbt = new RedBlackTree();
  rbt.add(new TestNumber(5));
  assert.ok(rbt.find(new TestNumber(5)), "Tree should have item 5.");
  assert.ok(!rbt.find(new TestNumber(10)), "Tree should not have item 10.");
};


exports['test should be able to remove first node'] = function(){
  var rbt = new RedBlackTree();
  rbt.add(new TestNumber(5));
  rbt.add(new TestNumber(10));
  rbt.add(new TestNumber(6));    
  rbt.remove(new TestNumber(5))
  
  assert.eql(6, rbt.min().value, "root should now be 6");
  assert.ok(!rbt.find(new TestNumber(5)));
};

exports['test should be able to remove two nodes'] = function(){
  var rbt = new RedBlackTree();
  rbt.add(new TestNumber(5));
  rbt.add(new TestNumber(10));
  rbt.add(new TestNumber(6));    
  rbt.remove(new TestNumber(10));
  rbt.remove(new TestNumber(5));
    
  assert.eql(6, rbt.min().value, "root should now be 6");
  assert.ok(!rbt.find(new TestNumber(5)));
  assert.ok(!rbt.find(new TestNumber(10)));
};

exports['test should be able to remove middle node'] = function(){
  var rbt = new RedBlackTree();
  rbt.add(new TestNumber(5));
  rbt.add(new TestNumber(10));
  rbt.add(new TestNumber(6));    
  rbt.remove(new TestNumber(10));
  
  assert.eql(5, rbt.min().value, "root should now be 10");
  assert.ok(!rbt.find(new TestNumber(10)));
};

exports['test should be able to remove last node'] = function(){
  var rbt = new RedBlackTree();
  rbt.add(new TestNumber(5));
  rbt.add(new TestNumber(10));
  rbt.add(new TestNumber(6));    
  rbt.remove(new TestNumber(6));
  
  assert.eql(5, rbt.min().value, "root should now be 10");
  assert.ok(!rbt.find(new TestNumber(6)));
};

exports['test should be able to remove all starting with last'] = function(){
  var rbt = new RedBlackTree();
  rbt.add(new TestNumber(5));
  rbt.add(new TestNumber(10));
  rbt.add(new TestNumber(6));    
  rbt.remove(new TestNumber(6));
  rbt.remove(new TestNumber(10));
  rbt.remove(new TestNumber(5));
        
  assert.ok(!rbt.find(new TestNumber(5)));
  assert.ok(!rbt.find(new TestNumber(6)));
  assert.ok(!rbt.find(new TestNumber(10)));  
};

exports['test should be able to traverse graph'] = function(){
  var rbt = new RedBlackTree();
  rbt.add(new TestNumber(5));
  rbt.add(new TestNumber(10));
  rbt.add(new TestNumber(6));    
  min = rbt.min();
  assert.eql(new TestNumber(6), rbt.findNext(min), "Tree should be traversable.");
};

exports['test should be able find something'] = function(){
  var rbt = new RedBlackTree();
  rbt.add(new TestNumber(5));
  rbt.add(new TestNumber(10));
  rbt.add(new TestNumber(6));
  
  assert.eql(rbt.find(new TestNumber(10)).value, 10, "Tree should be searchable.");
};


