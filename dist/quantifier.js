define(["require", "exports", "./stream"], (function(require, exports, __o) {
    "use strict";
    var isEmpty = __o["isEmpty"],
        first = __o["first"],
        rest = __o["rest"],
        any, every;
    (any = (function(pred, s) {
        var current = s;
        while (!isEmpty(current)) {
            if (pred(first(current))) return true;
            (current = rest(current));
        }
        return false;
    }));
    (every = (function(pred, s) {
        var current = s;
        while (!isEmpty(current)) {
            if (!pred(first(current))) return false;
            (current = rest(current));
        }
        return true;
    }));
    (exports.any = any);
    (exports.every = every);
}));