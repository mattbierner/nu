/*
 * THIS FILE IS AUTO GENERATED from 'lib/gen.kep'
 * DO NOT EDIT
*/
define(["nu/stream"], function(stream) {
    "use strict";
    var curry = function(f) {
        return f.bind.apply(f, arguments);
    }
    ;
    var repeat = function(times, x) {
        return ((times <= 0) ? stream.end : stream.stream(x, curry(repeat, (times - 1), x)));
    }
    ;
    var range = function() {
        var rangeImpl = function(lower, upper, step) {
            return (((step > 0) ? (upper <= lower) : (upper >= lower)) ? stream.end : stream.stream(lower, curry(rangeImpl, (lower + step), upper, step)));
        }
        ;
        return function(lower, upper, step) {
            (lower = ((lower === undefined) ? Infinity : lower));
            if ((upper === undefined)){
                (upper = lower);
                (lower = 0);
            }
            
            return rangeImpl(lower, upper, ((step === undefined) ? 1 : step));
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
