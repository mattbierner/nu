/*
 * THIS FILE IS AUTO GENERATED from 'lib/select.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "nu/stream"], (function(require, exports, __o) {
    "use strict";
    var takeWhile, take, skipWhile, skip;
    var __o = __o,
        end = __o["end"],
        first = __o["first"],
        isEmpty = __o["isEmpty"],
        map = __o["map"],
        stream = __o["stream"],
        rest = __o["rest"],
        indexed = __o["indexed"];
    var value = (function(__a) {
        var i = __a[0],
            x = __a[1];
        return x;
    });
    var index = (function(__a) {
        var i = __a[0],
            x = __a[1];
        return i;
    });
    (takeWhile = (function(pred, s) {
        return (isEmpty(s) ? s : (function() {
            {
                var x = first(s);
                return (pred(x) ? stream(x, takeWhile.bind(null, pred, rest(s))) : end);
            }
        })());
    }));
    (take = (function(count, s) {
        return ((isNaN(count) || (count < 0)) ? s : map(value, takeWhile((function(f, g) {
            return (function(x) {
                return f(g(x));
            });
        })((function(x, y) {
            return (x > y);
        }).bind(null, count), index), indexed(s))));
    }));
    (skipWhile = (function(pred, s) {
        for (var head = s; !isEmpty(head);
            (head = rest(head)))
            if (!pred(first(head))) return head;


        return end;
    }));
    (skip = (function(count, s) {
        return ((isNaN(count) || (count <= 0)) ? s : map(value, skipWhile((function(f, g) {
            return (function(x) {
                return f(g(x));
            });
        })((function(x, y) {
            return (x > y);
        }).bind(null, count), index), indexed(s))));
    }));
    (exports.takeWhile = takeWhile);
    (exports.take = take);
    (exports.skipWhile = skipWhile);
    (exports.skip = skip);
}))