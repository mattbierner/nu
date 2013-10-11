/*
 * THIS FILE IS AUTO GENERATED from 'lib/gen.kep'
 * DO NOT EDIT
*/
define((function(require, exports, module) {
    "use strict";
    var repeat, range;
    var __a = require("nu/stream"),
        end = __a["end"],
        memoStream = __a["memoStream"];
    var curry = (function(f) {
        return f.bind.apply(f, arguments);
    });
    (repeat = (function(times, x) {
        return ((times <= 0) ? end : memoStream(x, curry(repeat, (times - 1), x)));
    }));
    (range = (function(rangeImpl) {
        return (function(lower, upper, step) {
            var rangeLower = (isNaN(lower) ? Infinity : +lower),
                rangeStep = (isNaN(step) ? 1 : +step);
            return (isNaN(upper) ? rangeImpl(0, rangeLower, rangeStep) : rangeImpl(rangeLower, upper, rangeStep));
        });
    })((function rangeImpl(lower, upper, step) {
        return (((step > 0) ? (upper <= lower) : (upper >= lower)) ? end : memoStream(lower, curry(rangeImpl, (lower + step), upper, step)));
    })));
    (exports.repeat = repeat);
    (exports.range = range);
}))