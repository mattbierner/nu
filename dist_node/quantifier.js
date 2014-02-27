/*
 * THIS FILE IS AUTO GENERATED from 'lib/quantifier.kep'
 * DO NOT EDIT
*/
"use strict";
var __o = require("./stream"),
    isEmpty = __o["isEmpty"],
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
(exports.any = any);
(exports.every = every);