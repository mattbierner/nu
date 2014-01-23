/*
 * THIS FILE IS AUTO GENERATED from 'lib/gen.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "./stream"], (function(require, exports, __o) {
    "use strict";
    var NIL = __o["NIL"],
        memoStream = __o["memoStream"],
        repeat, range;
    (repeat = (function(times, x) {
        return ((times <= 0) ? NIL : memoStream(x, repeat.bind(null, (times - 1), x)));
    }));
    var rangeImpl = (function(lower, upper, step) {
        return (((step > 0) ? (upper <= lower) : (upper >= lower)) ? NIL : memoStream(lower, rangeImpl.bind(
            null, (lower + step), upper, step)));
    });
    (range = (function(lower, upper, step) {
        var rangeLower = (isNaN(lower) ? Infinity : +lower),
            rangeStep = (isNaN(step) ? 1 : +step);
        return (isNaN(upper) ? rangeImpl(0, rangeLower, rangeStep) : rangeImpl(rangeLower, upper,
            rangeStep));
    }));
    (exports.repeat = repeat);
    (exports.range = range);
}));