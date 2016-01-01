arc4random
==========

Native bindings for the `arc4random()` family of funcitons:

* `arc4random()`
* `arc4random_buf(buf, nbytes)`
* `arc4random_uniform(upper_bound)`

Requirements
------------

* [nodejs](http://nodejs.org/) or [iojs](https://iojs.org/)
* Operating system with a native `arc4random()` function or [libbsd](http://libbsd.freedesktop.org/):
  * [Mac OS X (darwin)](https://developer.apple.com/library/mac/documentation/Darwin/Reference/ManPages/man3/arc4random.3.html)
  * [FreeBSD](https://www.freebsd.org/cgi/man.cgi?query=arc4random&sektion=3)
  * [OpenBSD](http://www.openbsd.org/cgi-bin/man.cgi/OpenBSD-current/man3/arc4random.3?query=arc4random&sec=3)
  * [NetBSD](http://netbsd.gw.com/cgi-bin/man-cgi?arc4random++NetBSD-current)
  * [Linux via libbsd](http://libbsd.freedesktop.org)

Installation
------------

The latest and greatest version of this software is available through [npm](http://npmjs.org/).

    npm install arc4random

Usage
-----

    var rng = require('arc4random');

    // returns an integer in the range [0, 2^32)
    var randomNumber = rng.arc4random();

    // stores nbytes integers in the given buffer.
    // each byte is an integer in the range [0, 256)
    var nbytes = 255;
    var buf = new Buffer(nbytes);
    rng.arc4random_buf(buf, nbytes);

    // returns an integer in the range [0, upper_bound)
    var anotherRandomNumber = rng.arc4random_uniform(16);

License
-------

See [LICENSE.md](https://github.com/tcort/arc4random/blob/master/LICENSE.md)
