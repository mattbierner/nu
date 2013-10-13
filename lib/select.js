/*
 * THIS FILE IS AUTO GENERATED from 'lib/select.kep'
 * DO NOT EDIT
*/
define(["require", "exports", "nu/stream"], (function(require, exports) {
    "use strict";
    var takeWhile, take, skipWhile, skip;
    var __o = require("nu/stream"),
        end = __o["end"],
        first = __o["first"],
        isEmpty = __o["isEmpty"],
        stream = __o["stream"],
        rest = __o["rest"]; {
            var curry = (function(f) {
                return f.bind.apply(f, arguments);
            });
            (takeWhile = curry((function() {
                {
                    var takeWhile = (function(i, pred, s) {
                        if (isEmpty(s)) return s;

                        var x = first(s);
                        return (pred(x, i) ? stream(x, curry(takeWhile, (i + 1), pred, rest(s))) : end);
                    }); {
                        return takeWhile;
                    }
                }
            })(), 0));
            (take = (function(count, s) {
                return ((isNaN(count) || (count < 0)) ? s : takeWhile((function(v, i) {
                    return (i < count);
                }), s));
            }));
            (skipWhile = (function(pred, s) {
                for (var head = s, i = 0; !isEmpty(head);
                    (head = rest(head))) {
                    if (!pred(first(head), i)) return head;

                    (i = (i + 1));
                }

                return end;
            }));
            (skip = (function(count, s) {
                return ((isNaN(count) || (count <= 0)) ? s : skipWhile((function(v, i) {
                    return (i < count);
                }), s));
            }));
    }
    (exports.takeWhile = takeWhile);
    (exports.take = take);
    (exports.skipWhile = skipWhile);
    (exports.skip = skip);
}))