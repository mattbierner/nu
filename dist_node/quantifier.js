/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/quantifier.kep'
 * DO NOT EDIT
*/
"use strict";
var __o = require("./stream"),
    isEmpty = __o["isEmpty"],
    first = __o["first"],
    rest = __o["rest"],
    any, every, not = (function(y) {
        return (function(x) {
            var x0 = y(x);
            return (!x0);
        });
    });
(any = (function(pred, s) {
    for (var current = s;
        (!isEmpty(current));
        (current = rest(current)))
        if (pred(first(current))) return true;
    return false;
}));
(every = (function(pred, s) {
    return (!any(not(pred), s));
}));
(exports["any"] = any);
(exports["every"] = every);