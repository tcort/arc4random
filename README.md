arc4random
==========

Native bindings for the `arc4random()` family of funcitons:

* `arc4random()`
* `arc4random_buf(buf, nbytes)`
* `arc4random_uniform(upper_bound)`

Requirements
------------

* [nodejs](http://nodejs.org/) v0.10.x.
* Operating system with a native `arc4random()` function or [libbsd](http://libbsd.freedesktop.org/):
  * [Mac OS X (darwin)](https://developer.apple.com/library/mac/documentation/Darwin/Reference/ManPages/man3/arc4random.3.html)
  * [FreeBSD](https://www.freebsd.org/cgi/man.cgi?query=arc4random&sektion=3)
  * [OpenBSD](http://www.openbsd.org/cgi-bin/man.cgi/OpenBSD-current/man3/arc4random.3?query=arc4random&sec=3)
  * [NetBSD](http://netbsd.gw.com/cgi-bin/man-cgi?arc4random++NetBSD-current)
  * [Linux via libbsd](http://libbsd.freedesktop.org)

Install
-------

The latest and greatest version of this software is available through [npm](http://npmjs.org/).

    npm install arc4random

Example
-------

    require('arc4random');

    // returns an integer in the range [0, 2^32)
    var randomNumber = arc4random();

    // stores nbytes integers in the given buffer.
    // each byte is an integer in the range [0, 256)
    var nbytes = 255;
    var buf = new Buffer(nbytes);
    arc4random_buf(buf, nbytes);

    // returns an integer in the range [0, upper_bound)
    var anotherRandomNumber = arc4random_uniform(16);

Contributing
------------

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
