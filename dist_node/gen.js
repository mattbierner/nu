/*
 * THIS FILE IS AUTO GENERATED from 'lib/gen.kep'
 * DO NOT EDIT
*/
"use strict"; {
    var __o = require("./stream"),
        NIL = __o["NIL"],
        memoStream = __o["memoStream"];
    var repeat, range;
    (repeat = (function(times, x) {
        return ((times <= 0) ? NIL : memoStream(x, repeat.bind(null, (times - 1), x)));
    }));
    (range = (function() {
            var rangeImpl = (function(lower, upper, step) {
                return (((step > 0) ? (upper <= lower) : (upper >= lower)) ? NIL : memoStream(lower, rangeImpl.bind(
                    null, (lower + step), upper, step)));
            });
            return (function(lower, upper, step) {
                var rangeLower = (isNaN(lower) ? Infinity : +lower),
                    rangeStep = (isNaN(step) ? 1 : +step);
                return (isNaN(upper) ? rangeImpl(0, rangeLower, rangeStep) : rangeImpl(rangeLower, upper,
                    rangeStep));
            });
        })
        .call(this));
    (exports.repeat = repeat);
    (exports.range = range);
}