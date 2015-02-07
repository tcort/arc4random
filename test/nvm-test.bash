#!/bin/bash

# Copyright (c) 2014, 2015 Thomas Cort <linuxgeek@gmail.com>
#
# Permission to use, copy, modify, and distribute this software for any
# purpose with or without fee is hereby granted, provided that the above
# copyright notice and this permission notice appear in all copies.
#
# THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
# WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
# MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
# ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
# WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
# ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
# OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.


# This script installs and tests this module on all supported versions of nodejs/iojs.
#
# supported versions:
# - node v0.8.6 through v0.8.28 (except v0.8.13)
# - node v0.9.1 through v0.9.12 (except v0.9.3)
# - node v0.10.0 through v0.10.36
# - nove v0.11.13 through v0.11.16
# - node v0.12.0 through v0.12.0
# - iojs v1.0.1 through v1.0.4
# - iojs v1.1.0 through v1.1.0
# unsupported versions:
# - v0.8.13 -- install fails on this one.


# cd to main node-arc4random directory
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
cd ${DIR}/..

set -e

[[ -s $HOME/.nvm/nvm.sh ]] && . $HOME/.nvm/nvm.sh


# for each version to test: start with a clean environment, run the install and test targets.
for VERSION in \
	v0.8.6 v0.8.7 v0.8.8 v0.8.9 v0.8.10 v0.8.11 v0.8.12 v0.8.14 v0.8.15 v0.8.16 v0.8.17 v0.8.18 v0.8.19 v0.8.20 v0.8.21 v0.8.22 v0.8.23 v0.8.24 v0.8.25 v0.8.26 v0.8.27 v0.8.28 \
	v0.9.1 v0.9.2 v0.9.4 v0.9.5 v0.9.6 v0.9.7 v0.9.8 v0.9.9 v0.9.10 v0.9.11 v0.9.12 \
	v0.10.0 v0.9.1 v0.10.2 v0.10.3 v0.10.4 v0.10.5 v0.10.6 v0.10.7 v0.10.8 v0.10.9 v0.10.10 v0.10.11 v0.10.12 v0.10.13 v0.10.14 v0.10.15 v0.10.16 v0.10.17 v0.10.18 v0.10.19 v0.10.20 v0.10.21 v0.10.22 v0.10.23 v0.10.24 v0.10.25 v0.10.26 v0.10.27 v0.10.28 v0.10.29 v0.10.30 v0.10.31 v0.10.32 v0.10.33 v0.10.34 v0.10.35 v0.10.36 \
	v0.11.13 v0.11.14 v0.11.15 v0.11.16 \
	v0.12.0 \
	iojs-v1.0.1 iojs-v1.0.2 iojs-v1.0.3 iojs-v1.0.4 \
	iojs-v1.1.0
do
	echo ">> Testing on ${VERSION}"
	rm -rf node_modules build
	nvm install ${VERSION}
	npm install
	npm test
done
