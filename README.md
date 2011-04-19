Detecting polygon self-intersection in Javascript
============================================
An implementation of the O(n) Bentley–Ottmann/Shamos–Hoey sweep line algorithm for detecting crossings in a set of line segments. The aim was to make something to speedily detect self-intersecting polygons for client side validation before serialisation and storage, but there's not much to stop it being used serverside (except it being more a statement of intent than actual production ready code).  

Despite intending it for the browser, it probably still needs some fettling to make sure the CommonJS-esque code I've written works in your target browser.

Development
===========
* node.js 0.45 
* expresso 
* underscore

Tests
======
To run the tests, ensure you have node.js and the expresso npm installed:

$ Make test

Note that this implementation currently doesn't validate polygons that share the same start and end vertex. Look at the tests for workarounds to this issue.


Licence
========
free