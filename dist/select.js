/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/select.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "./stream"], (function(require, exports, __o) {
    "use strict";
    var NIL = __o["NIL"],
        first = __o["first"],
        isEmpty = __o["isEmpty"],
        map = __o["map"],
        stream = __o["stream"],
        rest = __o["rest"],
        indexed = __o["indexed"],
        takeWhile, take, skipWhile, skip, value = (function(__o0) {
            var x = __o0[1];
            return x;
        });
    (takeWhile = (function(pred, s) {
        var x;
        return (isEmpty(s) ? s : ((x = first(s)), (pred(x) ? stream(x, takeWhile.bind(null, pred, rest(
            s))) : NIL)));
    }));
    (take = (function(count, s) {
        return ((isNaN(count) || (count < 0)) ? s : map(value, takeWhile((function(x) {
            var i = x[0];
            return (count > i);
        }), indexed(s))));
    }));
    (skipWhile = (function(pred, s) {
        for (var head = s;
            (!isEmpty(head));
            (head = rest(head)))
            if ((!pred(first(head)))) return head;
        return NIL;
    }));
    (skip = (function(count, s) {
        return ((isNaN(count) || (count <= 0)) ? s : map(value, skipWhile((function(x) {
            var i = x[0];
            return (count > i);
        }), indexed(s))));
    }));
    (exports["takeWhile"] = takeWhile);
    (exports["take"] = take);
    (exports["skipWhile"] = skipWhile);
    (exports["skip"] = skip);
}));