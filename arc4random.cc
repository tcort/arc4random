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

#define __STDC_LIMIT_MACROS

#include <node.h>
#include <node_buffer.h>
#include <v8.h>

#include <math.h>
#include <stdlib.h>
#include <stdint.h>

#ifdef USE_LIBBSD
#include <bsd/stdlib.h>
#endif

using namespace v8;
using namespace node;

#if NODE_MODULE_VERSION == 14		/* v0.11 */
#include "src/mod14.stub"
#elif NODE_MODULE_VERSION == 11		/* v0.10 */
#include "src/mod11.stub"
#else
#error "Unexpected NODE_MODULE_VERSION Please open an issue at https://github.com/tcort/node-arc4random/issues"
#endif

NODE_MODULE(arc4random, init)
