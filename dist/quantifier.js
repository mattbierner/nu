/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/quantifier.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "./stream"], (function(require, exports, __o) {
    "use strict";
    var isEmpty = __o["isEmpty"],
        first = __o["first"],
        rest = __o["rest"],
        any, every;
    (any = (function(pred, s) {
        for (var current = s;
            (!isEmpty(current));
            (current = rest(current)))
            if (pred(first(current))) return true;
        return false;
    }));
    (every = (function(pred, s) {
        for (var current = s;
            (!isEmpty(current));
            (current = rest(current)))
            if ((!pred(first(current)))) return false;
        return true;
    }));
    (exports["any"] = any);
    (exports["every"] = every);
}));