var RedBlackNode = require('./red_black_node');

/*****
*
* RedBlackTree.js (actually an AVL)
*
* copyright 2004, Kevin Lindsey
* licensing info available at: http://www.kevlindev.com/license.txt
*
* uses duck typing for comparator to determine left and rightedness.
* added objects must implement a method called .order. eg. a.order(b);
*
* .order should return:
*
* -1 a <   b
*  0 a === b
*  1 a >   b
*
*****/


/*****
*
*   constructor
*
*****/
var RedBlackTree = function () {
    this._root      = null;
    this._cursor    = null;
    this._ancestors = [];
    this.VERSION = 1.0;
}


/*****  private methods *****/

/*****
*
*   _findNode
*
*****/
RedBlackTree.prototype._findNode = function(value, saveAncestors) {
    if ( saveAncestors == null ) saveAncestors = false;

    var result = this._root;

    if ( saveAncestors ) {
        this._ancestors = [];
    }
    
    while ( result != null ) {

        var relation = value.compare(result._value);

        if ( relation != 0 ) {
            if ( saveAncestors ) {
                this._ancestors.push(result);
            }
            if ( relation < 0 ) {
                result = result._left;
            } else {
                result = result._right;
            }
        } else {
            break;
        }
    }

    return result;
};


/*****
*
*   _maxNode
*
*****/
RedBlackTree.prototype._maxNode = function(node, saveAncestors) {
    if ( node == null ) node = this._root;
    if ( saveAncestors == null ) saveAncestors = false;

    if ( node != null ) {
        while ( node._right != null ) {
            if ( saveAncestors ) {
                this._ancestors.push(node);
            }
            node = node._right;
        }
    }

    return node;
};


/*****
*
*   _minNode
*
*****/
RedBlackTree.prototype._minNode = function(node, saveAncestors) {
    if ( node == null ) node = this._root;
    if ( saveAncestors == null ) saveAncestors = false;

    if ( node != null ) {
        while ( node._left != null ) {
            if ( saveAncestors ) {
                this._ancestors.push(node);
            }
            node = node._left;
        }
    }

    return node;
};


/*****
*
*   _nextNode
*
*****/
RedBlackTree.prototype._nextNode = function(node) {
    if ( node != null ) {
        if ( node._right != null ) {
            this._ancestors.push(node);
            node = this._minNode(node._right, true);
        } else {
            var ancestors = this._ancestors;
            parent = ancestors.pop();
            
            while ( parent != null && parent._right === node ) {
                node = parent;
                parent = ancestors.pop();
            }

            node = parent;
        }
    } else {
        this._ancestors = [];
        node = this._minNode(this._root, true);
    }

    return node;
};


/*****
*
*   _previousNode
*
*****/
RedBlackTree.prototype._previousNode = function(node) {
    if ( node != null ) {
        if ( node._left != null ) {
            this._ancestors.push(node);
            node = this._maxNode(node._left, true);
        } else {
            var ancestors = this._ancestors;
            parent = ancestors.pop();
            
            while ( parent != null && parent._left === node ) {
                node = parent;
                parent = ancestors.pop();
            }

            node = parent;
        }
    } else {
        this._ancestors = [];
        node = this._maxNode(this._root, true);
    }

    return node;
};


/*****  public methods  *****/

/*****
*
*   add
*
*****/
RedBlackTree.prototype.add = function(value) {
    var result;
    
    if ( this._root == null ) {
        result = this._root = new RedBlackNode(value);
    } else {
        var addResult = this._root.add(value);

        this._root = addResult[0];
        result = addResult[1];
    }

    return result;
};


/*****
*
*   find
*
*****/
RedBlackTree.prototype.find = function(value) {
    var node = this._findNode(value);
    
    return ( node != null ) ? node._value : null;
};


/*****
*
*   findNext
*
*****/
RedBlackTree.prototype.findNext = function(value) {
    var current = this._findNode(value, true);

    current = this._nextNode(current);

    return (current != null ) ? current._value : null;
};


/*****
*
*   findPrevious
*
*****/
RedBlackTree.prototype.findPrevious = function(value) {
    var current = this._findNode(value, true);

    current = this._previousNode(current);

    return (current != null ) ? current._value : null;
};


/*****
*
*   max
*
*****/
RedBlackTree.prototype.max = function() {
    var result = this._maxNode();

    return ( result != null ) ? result._value : null;
};


/*****
*
*   min
*
*****/
RedBlackTree.prototype.min = function() {
    var result = this._minNode();

    return ( result != null ) ? result._value : null;
};


/*****
*
*   next
*
*****/
RedBlackTree.prototype.next = function() {
    this._cursor = this._nextNode(this._cursor);

    return ( this._cursor ) ? this._cursor._value : null;
};


/*****
*
*   previous
*
*****/
RedBlackTree.prototype.previous = function() {
    this._cursor = this._previousNode(this._cursor);

    return ( this._cursor ) ? this._cursor._value : null;
};


/*****
*
*   remove
*
*****/
RedBlackTree.prototype.remove = function(value) {
    var result;

    if ( this._root != null ) {
        var remResult = this._root.remove(value);

        this._root = remResult[0];
        result = remResult[1];
    } else {
        result = null;
    }

    return result;
};


/*****
*
*   traverse
*
*****/
RedBlackTree.prototype.traverse = function(func) {
    if ( this._root != null ) {
        this._root.traverse(func);
    }
};


/*****
*
*   toString
*
*****/
RedBlackTree.prototype.toString = function() {
    var lines = [];

    if ( this._root != null ) {
        var indentText = "  ";
        var stack = [[this._root, 0, "^"]];

        while ( stack.length > 0 ) {
            var current = stack.pop();
            var node    = current[0];
            var indent  = current[1];
            var line    = "";

            for ( var i = 0; i < indent; i++ ) {
                line += indentText;
            }
            
            line += current[2] + "(" + node.toString() + ")";
            lines.push(line);

            if ( node._right != null ) stack.push([node._right, indent+1, "R"]);
            if ( node._left  != null ) stack.push([node._left,  indent+1, "L"]);
        }
    }
    
    return lines.join("\n");
};

module.exports = RedBlackTree;