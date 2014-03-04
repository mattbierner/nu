/*
 * THIS FILE IS AUTO GENERATED from 'lib/select.kep'
 * DO NOT EDIT
*/"use strict";
var __o = require("./stream"),
    NIL = __o["NIL"],
    first = __o["first"],
    isEmpty = __o["isEmpty"],
    map = __o["map"],
    stream = __o["stream"],
    rest = __o["rest"],
    indexed = __o["indexed"],
    takeWhile, take, skipWhile, skip, value = (function(__o) {
        var i = __o[0],
            x = __o[1];
        return x;
    }),
    index = (function(__o) {
        var i = __o[0],
            x = __o[1];
        return i;
    });
(takeWhile = (function(pred, s) {
    var x;
    return (isEmpty(s) ? s : ((x = first(s)), (pred(x) ? stream(x, takeWhile.bind(null, pred, rest(s))) : NIL)));
}));
(take = (function(count, s) {
    var x;
    return ((isNaN(count) || (count < 0)) ? s : map(value, takeWhile((function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })(((x = count), (function(y) {
        return (x > y);
    })), index), indexed(s))));
}));
(skipWhile = (function(pred, s) {
    for (var head = s;
        (!isEmpty(head));
        (head = rest(head)))
        if ((!pred(first(head)))) return head;
    return NIL;
}));
(skip = (function(count, s) {
    var x;
    return ((isNaN(count) || (count <= 0)) ? s : map(value, skipWhile((function(f, g) {
        return (function(x) {
            return f(g(x));
        });
    })(((x = count), (function(y) {
        return (x > y);
    })), index), indexed(s))));
}));
(exports.takeWhile = takeWhile);
(exports.take = take);
(exports.skipWhile = skipWhile);
(exports.skip = skip);