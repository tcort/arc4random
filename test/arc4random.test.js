/*
 * Copyright (c) 2014, 2015 Thomas Cort <linuxgeek@gmail.com>
 *
 * Permission to use, copy, modify, and distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

"use strict";

var rng = require('../index');
var expect = require('expect.js');

var n = 4096;

describe('arc4random()', function () {
	this.timeout(10000);
	it('should return numbers within the range 0 to (2**32)-1', function () {
		for (var ii = 0; ii < n; ii++) {
			expect(rng.arc4random()).to.be.within(0, 4294967295);
		}
	});
	it('should not allow itself to be called incorrectly', function () {
		expect(function () { rng.arc4random(null); }).to.throwError();
		expect(function () { rng.arc4random(undefined); }).to.throwError();
		expect(function () { rng.arc4random(''); }).to.throwError();
		expect(function () { rng.arc4random(1); }).to.throwError();
		expect(function () { rng.arc4random(NaN); }).to.throwError();
		expect(function () { rng.arc4random(new Date()); }).to.throwError();
		expect(function () { rng.arc4random(new RegExp('/foobar/')); }).to.throwError();
		expect(function () { rng.arc4random({ foo: 'bar' }); }).to.throwError();
		expect(function () { rng.arc4random([]); }).to.throwError();
		expect(function () { rng.arc4random(function sum(a, b) { return a + b; }); }).to.throwError();

		expect(function () { rng.arc4random(1,2); }).to.throwError();
		expect(function () { rng.arc4random(1,2,3); }).to.throwError();
		expect(function () { rng.arc4random(1,2,3,4); }).to.throwError();
		expect(function () { rng.arc4random(1,2,3,4,5); }).to.throwError();
	});
});

describe('arc4random_buf()', function () {
	this.timeout(10000);
	it('should fill a buffer with random bytes', function () {
		var ii;
		var result = 0;
		var nbytes = 16;
		var buf = new Buffer(nbytes);

		for (ii = 0; ii < nbytes; ii++) {
			buf[ii] = 0;
		}

		result = 0;
		for (ii = 0; ii < nbytes; ii++) {
			result |= buf[ii];
		}
		expect(result).to.be(0);

		rng.arc4random_buf(buf, nbytes);

		result = 0;
		for (ii = 0; ii < nbytes; ii++) {
			result |= buf[ii];
		}
		expect(result).not.to.be(0);
	});
	it('should now allow itself to be called incorrectly', function () {

		var values = [ null, undefined, NaN, '', new Date(), new RegExp('/foobar/'), [], function sum(a, b) { return a + b; } ];

		for (var ii = 0; ii < values.length; ii++) {
			for (var jj = 0; jj < values.length; jj++) {
				expect(function () { rng.arc4random_buf(values[ii], values[jj]); }).to.throwError();
			}
		}

		expect(function () { rng.arc4random_buf(4, new Buffer(4)); }).to.throwError();
		expect(function () { rng.arc4random_buf(new Buffer(4)); }).to.throwError();
		expect(function () { rng.arc4random_buf(new Buffer(4), 4, 4); }).to.throwError();
	});
	it('should not write past the buffer', function () {
		expect(function () { rng.arc4random_buf(new Buffer(1), 987654321); }).to.throwError();
	});
	it('should not crash with a 0 length buffer', function () {
		rng.arc4random_buf(new Buffer(0), 0);
		expect(function () { rng.arc4random_buf(new Buffer(0), 16); }).to.throwError();
	});
	it('should not crash with a 0 length request', function () {
		rng.arc4random_buf(new Buffer(16), 0);
	});
});

describe('arc4random_uniform()', function () {
	this.timeout(10000);
	it('should return numbers within the range 0 to n', function () {
		for (var ii = 0; ii < n; ii++) {
			expect(rng.arc4random_uniform(n)).to.be.within(0, n);
		}
	});
	it('should now allow itself to be called incorrectly', function () {
		expect(function () { rng.arc4random_uniform(null); }).to.throwError();
		expect(function () { rng.arc4random_uniform(undefined); }).to.throwError();
		expect(function () { rng.arc4random_uniform(''); }).to.throwError();
		expect(function () { rng.arc4random_uniform(NaN); }).to.throwError();
		expect(function () { rng.arc4random_uniform(new Date()); }).to.throwError();
		expect(function () { rng.arc4random_uniform(new RegExp('/foobar/')); }).to.throwError();
		expect(function () { rng.arc4random_uniform({ foo: 'bar' }); }).to.throwError();
		expect(function () { rng.arc4random_uniform([]); }).to.throwError();
		expect(function () { rng.arc4random_uniform(function sum(a, b) { return a + b; }); }).to.throwError();

		expect(function () { rng.arc4random_uniform(-1); }).to.throwError();
		expect(function () { rng.arc4random_uniform(-1.0); }).to.throwError();
		expect(function () { rng.arc4random_uniform(4294967296); }).to.throwError();

		expect(function () { rng.arc4random_uniform(1,2); }).to.throwError();
		expect(function () { rng.arc4random_uniform(1,2,3); }).to.throwError();
		expect(function () { rng.arc4random_uniform(1,2,3,4); }).to.throwError();
		expect(function () { rng.arc4random_uniform(1,2,3,4,5); }).to.throwError();
	});
	it('should be uniform', function () {
		var counts = [ 0, 0, 0, 0, 0, 0, 0, 0 ];

		for (var ii = 0; ii < n; ii++) {
			counts[rng.arc4random_uniform(counts.length)]++;
		}

		// stddev
		var avg = 0;
		for (var jj = 0; jj < counts.length; jj++) {
			avg += counts[jj];
		}
		avg /= counts.length;

		var sqrdiff = [];
		for (var kk = 0; kk < counts.length; kk++) {
			sqrdiff.push((counts[kk] - avg) * (counts[kk] - avg));
		}

		var variance = 0;
		for (var ll = 0; ll < sqrdiff.length; ll++) {
			variance += sqrdiff[ll];
		}
		variance /= sqrdiff.length;

		var stddev = Math.sqrt(variance);

		for (var mm = 0; mm < counts.length; mm++) {
			expect(Math.abs(counts[mm] - avg)).to.be.lessThan(4*stddev);
		}
	});
});
