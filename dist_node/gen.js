/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/gen.kep'
 * DO NOT EDIT
*/
"use strict";
var __o = require("./stream"),
    repeat, range, NIL = __o["NIL"],
    memoStream = __o["memoStream"];
(repeat = (function(times, x) {
    return ((times <= 0) ? NIL : memoStream(x, repeat.bind(null, (times - 1), x)));
}));
var rangeImpl = (function(lower, upper, step) {
    return (((step > 0) ? (upper <= lower) : (upper >= lower)) ? NIL : memoStream(lower, rangeImpl.bind(null, (
        lower + step), upper, step)));
});
(range = (function(lower, upper, step) {
    var rangeLower = (isNaN(lower) ? Infinity : (+lower)),
        rangeStep = (isNaN(step) ? 1 : (+step));
    return (isNaN(upper) ? (((rangeStep > 0) ? (rangeLower <= 0) : (rangeLower >= 0)) ? NIL : memoStream(0,
        rangeImpl.bind(null, (0 + rangeStep), rangeLower, rangeStep))) : (((rangeStep > 0) ? (upper <=
        rangeLower) : (upper >= rangeLower)) ? NIL : memoStream(rangeLower, rangeImpl.bind(null, (
        rangeLower + rangeStep), upper, rangeStep))));
}));
(exports["repeat"] = repeat);
(exports["range"] = range);