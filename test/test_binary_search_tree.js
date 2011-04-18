// ported tests from YUI to expresso

var bo = require('bentley-ottmann-js')
  , BinarySearchTree = bo.BinarySearchTree
  , assert = require('assert')
  , _ = require('underscore');

exports['test add single'] = function(){
  var bst = new BinarySearchTree();
  bst.add(5);
  assert.eql(1, bst.size(), "Tree should have one item.");
  assert.eql(5, bst.value, "First item should have value of 5.");
};


exports['test add multiple'] = function(){
  var bst = new BinarySearchTree();
  bst.add(5);
  bst.add(10);

  assert.eql(2, bst.size(), "Tree should have two items.");
  assert.eql(5, bst.value, "First item should have value of 5.");
};

exports['test add duplicates'] = function(){
  var bst = new BinarySearchTree();
  bst.add(5);
  bst.add(5);
  assert.eql(1, bst.size(), "Tree should have one item.");
};

exports['test contains test'] = function(){
  var bst = new BinarySearchTree();
  bst.add(5);
  assert.ok(bst.contains(5), "Tree should have item 5.");
  assert.ok(!bst.contains(10), "Tree should not have item 10.");
};


exports['test should be able to remove first node'] = function(){
  var bst = new BinarySearchTree();
  bst.add(5);
  bst.add(10);
  bst.add(6);    
  bst.remove(5)
  
  assert.eql(2, bst.size(), "Tree should have 2 items.");
  assert.eql(10, bst.value, "root should now be 10");
  assert.ok(!bst.contains(5));
};


exports['test should be able to remove two nodes'] = function(){
  var bst = new BinarySearchTree();
  bst.add(5);
  bst.add(10);
  bst.add(6);    
  bst.remove(10);
  bst.remove(5);
    
  assert.eql(1, bst.size(), "Tree should have 1 item.");
  assert.eql(6, bst.value, "root should now be 6");
  assert.ok(!bst.contains(5));
  assert.ok(!bst.contains(10));
};


exports['test should be able to remove middle node'] = function(){
  var bst = new BinarySearchTree();
  bst.add(5);
  bst.add(10);
  bst.add(6);    
  bst.remove(10);
  
  assert.eql(2, bst.size(), "Tree should have 2 items.");
  assert.eql(5, bst.value, "root should now be 10");
  assert.ok(!bst.contains(10));
};

exports['test should be able to remove last node'] = function(){
  var bst = new BinarySearchTree();
  bst.add(5);
  bst.add(10);
  bst.add(6);    
  bst.remove(6);
  
  assert.eql(2, bst.size(), "Tree should have 2 items.");
  assert.eql(5, bst.value, "root should now be 10");
  assert.ok(!bst.contains(6));
};


exports['test should be able to remove all starting with last'] = function(){
  var bst = new BinarySearchTree();
  bst.add(5);
  bst.add(10);
  bst.add(6);    
  bst.remove(6);
  bst.remove(10);
  bst.remove(5);
    
  assert.eql(0, bst.size(), "Tree should have 0 items.");
  assert.ok(!bst.contains(5));
  assert.ok(!bst.contains(6));
  assert.ok(!bst.contains(10));  
};

exports['test should be able to traverse graph'] = function(){
  var bst = new BinarySearchTree();
  bst.add(5);
  bst.add(10);
  bst.add(6);    
  console.log(bst.right.value);
    
  // assert.eql(0, bst.size(), "Tree should have 0 items.");
  // assert.ok(!bst.contains(5));
  // assert.ok(!bst.contains(6));
  // assert.ok(!bst.contains(10));  
};


