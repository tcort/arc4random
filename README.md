arc4random
==========

Native bindings for the `arc4random()` family of funcitons:

* `arc4random()`
* `arc4random_buf(buf, nbytes)`
* `arc4random_uniform(upper_bound)`

Requirements
------------

* Any of these JavaScript engine versions:
  * [iojs](https://iojs.org/) v1.0.1 or later
  * [iojs](https://iojs.org/) v1.1.0 or later
  * [nodejs](http://nodejs.org/) v0.8.6 or later (except v0.8.13)
  * [nodejs](http://nodejs.org/) v0.9.1 or later (except v0.9.3)
  * [nodejs](http://nodejs.org/) v0.10.0 or later
  * [nodejs](http://nodejs.org/) v0.11.13 or later
  * [nodejs](http://nodejs.org/) v0.12.0 or later
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

ISC License:

    Copyright (c) 2014, 2015 Thomas Cort <linuxgeek@gmail.com>
    
    Permission to use, copy, modify, and distribute this software for any
    purpose with or without fee is hereby granted, provided that the above
    copyright notice and this permission notice appear in all copies.
    
    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
    WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
    MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
    ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
    WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
    ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
    OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
