/*
 * THIS FILE IS AUTO GENERATED from 'lib/gen.kep'
 * DO NOT EDIT
*/
;
define(["nu/stream"], function(stream) {
    "use strict";
    var curry = function(f) {
        return f.bind.apply(f, arguments);
    }
    ;
    var repeat = function(times, x) {
        return ((times <= 0) ? stream.end : stream.memoStream(x, curry(repeat, (times - 1), x)));
    }
    ;
    var range = function() {
        var rangeImpl = function(lower, upper, step) {
            return (((step > 0) ? (upper <= lower) : (upper >= lower)) ? stream.end : stream.memoStream(lower, curry(rangeImpl, (lower + step), upper, step)));
        }
        ;
        return function(lower, upper, step) {
            var rangeLower = (isNaN(lower) ? Infinity : + lower),rangeStep = (isNaN(step) ? 1 : + step);
            return (isNaN(upper) ? rangeImpl(0, rangeLower, rangeStep) : rangeImpl(rangeLower, upper, rangeStep));
        }
        ;
    }
    ();
    return ({
        "repeat": repeat,
        "range": range
    });
}
);
