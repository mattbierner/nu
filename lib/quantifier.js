/*
 * THIS FILE IS AUTO GENERATED from 'lib/quantifier.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "nu/stream"], (function(require, exports) {
    "use strict";
    var any, every;
    var __o = require("nu/stream"),
        isEmpty = __o["isEmpty"],
        first = __o["first"],
        rest = __o["rest"]; {
            (any = (function(pred, s) {
                var i = 0,
                    current = s;
                while (!isEmpty(current)) {
                    if (pred(first(current), i)) return true;

                    (i = (i + 1));
                    (current = rest(current));
                }

                return false;
            }));
            (every = (function(pred, s) {
                var i = 0,
                    current = s;
                while (!isEmpty(current)) {
                    if (!pred(first(current), i)) return false;

                    (i = (i + 1));
                    (current = rest(current));
                }

                return true;
            }));
    }
    (exports.any = any);
    (exports.every = every);
}))