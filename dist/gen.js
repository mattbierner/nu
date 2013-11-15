/*
 * THIS FILE IS AUTO GENERATED from 'lib/gen.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "nu/stream"], (function(require, exports, __o) {
    "use strict";
    var repeat, range;
    var __o = __o,
        end = __o["end"],
        memoStream = __o["memoStream"];
    (repeat = (function(times, x) {
        return ((times <= 0) ? end : memoStream(x, repeat.bind(null, (times - 1), x)));
    }));
    (range = (function() {
        {
            var rangeImpl = (function(lower, upper, step) {
                return (((step > 0) ? (upper <= lower) : (upper >= lower)) ? end : memoStream(lower, rangeImpl.bind(null, (lower + step), upper, step)));
            });
            return (function(lower, upper, step) {
                return (function() {
                    {
                        var rangeLower = (isNaN(lower) ? Infinity : +lower),
                            rangeStep = (isNaN(step) ? 1 : +step);
                        return (isNaN(upper) ? rangeImpl(0, rangeLower, rangeStep) : rangeImpl(rangeLower, upper, rangeStep));
                    }
                })();
            });
        }
    })());
    (exports.repeat = repeat);
    (exports.range = range);
}))