// Based on: 
// https://github.com/isaacs/computer-science-in-javascript/blob/master/data-structures/binary-search-tree
//
// uses duck typing for comparator to determine left and rightedness.
// added objects must implement a method called .order. eg. a.order(b);
//
// .order should return:
//
// -1 a <   b
//  0 a === b
//  1 a >   b
//


var BinarySearchTree = function (n) {
	this.value = n;
	this.left = undefined;
	this.right = undefined;
	
	// Since parent should only be used internally, don't put
	// it in the parameters list. This keeps the function.arity set to 1.
	this.parent = arguments[1];
};
BinarySearchTree.prototype = {
	constructor : BinarySearchTree,
	add : function (n) {
		if (this.value === undefined) this.value = n;
		var side = (n.order(this.value) === 1) ? 'right' : 'left';
		return (
			(n.order(this.value) === 0) ? this
			: this[side] === undefined ? (this[side] = new BinarySearchTree(n, this))
			: this[side].add(n)
		);
	},
	remove : function (n) {
		if (n = this.find(n)) n.prune();
	},
	prune : function () {
		// get the list of children, omitting the current value
		var kids = this.toArray(true);
		if (kids.length) {
			// if there are children, just replace this node with the
			// set of values contained by both children.
			this.addArray(kids, true);
		} else if (this.parent) {
			// no children, but a parent, so prune the link
			this.parent[(this.value.order(this.parent.value) === 1) ? 'right' : 'left'] = undefined;	
		} else {
			// no parent, no children. just delete out the values to be sure.
			this.erase();
		}
	},
	erase : function () {
		this.left = this.right = this.value = undefined;
	},
	// add a sorted array of values, attempting to ensure shallow broad distribution
	addArray : function (arr, eraseCurrentValue) {
		if (eraseCurrentValue) {
			this.erase();
		}
		// if nothing to add, then leave
		if (arr.length === 0) return;
		
		// chop and add the center, then do the same with each half
		var pivot = Math.floor(arr.length/2);
		this.add(arr[pivot]);
		this.addArray( arr.slice(0, pivot) );
		this.addArray( arr.slice(pivot + 1) );
	},
	// If the tree depth ever gets too deep, call flatten, and it'll re-shuffle
	// everthing into a heuristically shallow/broad distribution.
	flatten : function () {
		this.addArray(this.toArray(), true);
	},
	size : function () {
		var i = 0;
		this.traverse(function (n) { i ++ });
		return i;
	},
	find : function (n) {
		var side = (n.order(this.value) === 1) ? 'right' : 'left';
		return (
			(n.order(this.value) === 0) ? this
			: this[side] === undefined ? undefined
			: this[side].find(n)
		);
	},
	contains : function (n) {
		return this.find(n) !== undefined;
	},
	depth : function () {
		var d = 0;
		this.traverse(function (_, depth) { if (depth > d) d = depth; });
		return d;
	},
	// Call the supplied function on each node in ascending order.
	traverse : function (fn) {
		var depth = arguments[1] || 0;
		if (this.left !== undefined) this.left.traverse(fn, depth + 1);
		if (this.value !== undefined) fn.call(this, this.value, depth);
		if (this.right !== undefined) this.right.traverse(fn, depth + 1);
	},
	toArray : function (omitSelf) {
		var arr = [];
		var thisp = this;
		// fork early, rather than testing unnecessarily every time.
		this.traverse(
			omitSelf ? function (n) { if (thisp !== this) arr.push(n); }
			: function (n) { arr.push(n); }
		);
		return arr;
	},
	toString : function () {
		return (Object.prototype.toString.call(this)) + ' ' + this.toArray().toString();
	}
};

module.exports = BinarySearchTree;