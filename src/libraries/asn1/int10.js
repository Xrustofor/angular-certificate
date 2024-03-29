// Big integer base-10 printing library
// Copyright (c) 2008-2019 Lapo Luchini <lapo@lapo.it>

// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted, provided that the above
// copyright notice and this permission notice appear in all copies.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

(function () {
"use strict";

var max = 10000000000000; // biggest 10^n integer that can still fit 2^53 when multiplied by 256

function Int10(value) {
    this.buf = [+value || 0];
}

Int10.prototype.mulAdd = function (m, c) {
    // assert(m <= 256)
    var b = this.buf,
        l = b.length,
        i, t;
    for (i = 0; i < l; ++i) {
        t = b[i] * m + c;
        if (t < max)
            c = 0;
        else {
            c = 0|(t / max);
            t -= c * max;
        }
        b[i] = t;
    }
    if (c > 0)
        b[i] = c;
};

Int10.prototype.sub = function (c) {
    // assert(m <= 256)
    var b = this.buf,
        l = b.length,
        i, t;
    for (i = 0; i < l; ++i) {
        t = b[i] - c;
        if (t < 0) {
            t += max;
            c = 1;
        } else
            c = 0;
        b[i] = t;
    }
    while (b[b.length - 1] === 0)
        b.pop();
};

Int10.prototype.toString = function (base) {
    if ((base || 10) != 10)
        throw 'only base 10 is supported';
    var b = this.buf,
        s = b[b.length - 1].toString();
    for (var i = b.length - 2; i >= 0; --i)
        s += (max + b[i]).toString().substring(1);
    return s;
};

Int10.prototype.valueOf = function () {
    var b = this.buf,
        v = 0;
    for (var i = b.length - 1; i >= 0; --i)
        v = v * max + b[i];
    return v;
};

Int10.prototype.simplify = function () {
    var b = this.buf;
    return (b.length == 1) ? b[0] : this;
};

// export globals
if (typeof module !== 'undefined') { module.exports = Int10; } else { window.Int10 = Int10; }
})();
