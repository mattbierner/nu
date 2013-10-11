/*
 * THIS FILE IS AUTO GENERATED from 'lib/quantifier.kep'
 * DO NOT EDIT
*/
define((function(require, exports, module) {
    "use strict";
    var any, every;
    var __a = require("nu/stream"),
        isEmpty = __a["isEmpty"],
        first = __a["first"],
        rest = __a["rest"];
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
    (exports.any = any);
    (exports.every = every);
}))