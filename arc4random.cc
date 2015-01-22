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
#include <nan.h>

#include <math.h>
#include <stdlib.h>
#include <stdint.h>

#ifdef USE_LIBBSD
#include <bsd/stdlib.h>
#endif

using namespace v8;
using namespace node;

NAN_METHOD(node_arc4random) {
	NanScope();

        if (args.Length() != 0) {
		NanThrowTypeError("Wrong number of arguments");
		NanReturnUndefined();
        }

	NanReturnValue(NanNew<Number>(arc4random()));
}

NAN_METHOD(node_arc4random_buf) {
	NanScope();

	if (args.Length() != 2) {
		NanThrowTypeError("Wrong number of arguments");
		NanReturnUndefined();
	}

	if (!Buffer::HasInstance(args[0]) || !args[1]->IsNumber() || isnan(args[1]->NumberValue()) || args[1]->IntegerValue() < 0 || args[1]->IntegerValue() > UINT32_MAX) {
		NanThrowTypeError("Wrong arguments");
		NanReturnUndefined();
	}

	Local<Object> bufferObj = args[0]->ToObject();
	char*  bufferData = Buffer::Data(bufferObj);
	size_t bufferLength = Buffer::Length(bufferObj);
	size_t nbytes = args[1]->IntegerValue();

        if (bufferLength < nbytes) {
		NanThrowRangeError("Trying to write outside buffer length");
		NanReturnUndefined();
        }

        arc4random_buf(bufferData, nbytes);
	NanReturnUndefined();
}

NAN_METHOD(node_arc4random_uniform) {
	NanScope();

        if (args.Length() != 1) {
		NanThrowTypeError("Wrong number of arguments");
		NanReturnUndefined();
        }

        if (!args[0]->IsNumber() || isnan(args[0]->NumberValue()) || args[0]->IntegerValue() < 0 || args[0]->IntegerValue() > UINT32_MAX) {
		NanThrowTypeError("Wrong arguments");
		NanReturnUndefined();
        }

	NanReturnValue(NanNew<Number>(arc4random_uniform(args[0]->Uint32Value())));
}

void init(Handle<Object> exports) {
	exports->Set(NanNew("arc4random"),         NanNew<FunctionTemplate>(node_arc4random        )->GetFunction());
	exports->Set(NanNew("arc4random_buf"),     NanNew<FunctionTemplate>(node_arc4random_buf    )->GetFunction());
	exports->Set(NanNew("arc4random_uniform"), NanNew<FunctionTemplate>(node_arc4random_uniform)->GetFunction());
}

NODE_MODULE(arc4random, init)
