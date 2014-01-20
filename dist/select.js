/*
 * THIS FILE IS AUTO GENERATED from 'lib/select.kep'
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
        indexed = __o["indexed"];
    var takeWhile, take, skipWhile, skip;
    var value = (function(__o0) {
        var i = __o0[0],
            x = __o0[1];
        return x;
    });
    var index = (function(__o0) {
        var i = __o0[0],
            x = __o0[1];
        return i;
    });
    (takeWhile = (function(pred, s) {
        return (isEmpty(s) ? s : (function() {
                var x = first(s);
                return (pred(x) ? stream(x, takeWhile.bind(null, pred, rest(s))) : NIL);
            })
            .call(this));
    }));
    (take = (function(count, s) {
        return ((isNaN(count) || (count < 0)) ? s : map(value, takeWhile((function(f, g) {
            return (function(x) {
                return f(g(x));
            });
        })((function(x, y) {
                return (x > y);
            })
            .bind(null, count), index), indexed(s))));
    }));
    (skipWhile = (function(pred, s) {
        for (var head = s; !isEmpty(head);
            (head = rest(head)))
            if (!pred(first(head))) return head;
        return NIL;
    }));
    (skip = (function(count, s) {
        return ((isNaN(count) || (count <= 0)) ? s : map(value, skipWhile((function(f, g) {
            return (function(x) {
                return f(g(x));
            });
        })((function(x, y) {
                return (x > y);
            })
            .bind(null, count), index), indexed(s))));
    }));
    (exports.takeWhile = takeWhile);
    (exports.take = take);
    (exports.skipWhile = skipWhile);
    (exports.skip = skip);
}));