/*
 * THIS FILE IS AUTO GENERATED from 'lib/gen.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "nu/stream"], (function(require, exports) {
    "use strict";
    var repeat, range;
    var __o = require("nu/stream"),
        end = __o["end"],
        memoStream = __o["memoStream"]; {
            var curry = (function(f) {
                return f.bind.apply(f, arguments);
            });
            (repeat = (function(times, x) {
                return ((times <= 0) ? end : memoStream(x, curry(repeat, (times - 1), x)));
            }));
            (range = (function() {
                {
                    var rangeImpl = (function(lower, upper, step) {
                        return (((step > 0) ? (upper <= lower) : (upper >= lower)) ? end : memoStream(lower, curry(rangeImpl, (lower + step), upper, step)));
                    }); {
                        return (function(lower, upper, step) {
                            return (function() {
                                {
                                    var rangeLower = (isNaN(lower) ? Infinity : +lower),
                                        rangeStep = (isNaN(step) ? 1 : +step); {
                                            return (isNaN(upper) ? rangeImpl(0, rangeLower, rangeStep) : rangeImpl(rangeLower, upper, rangeStep));
                                    }
                                }
                            })();
                        });
                    }
                }
            })());
    }
    (exports.repeat = repeat);
    (exports.range = range);
}))