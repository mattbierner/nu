/*
 * THIS FILE IS AUTO GENERATED from 'lib/select.kep'
 * DO NOT EDIT
*/
define(["nu/stream"], function(stream) {
    "use strict";
    var bind = function(f) {
        return ((arguments.length === 1) ? f : f.bind.apply(f, arguments));
    };
    var takeWhile = function() {
        var takeWhileImpl = function(i, s, pred, t) {
            if (stream.isEmpty(s)){
                return s;
            }var first = stream.first(s);
            return (pred.call(t, first, i) ? stream.stream(first, bind(takeWhileImpl, (i + 1), stream.rest(s), pred, t)) : stream.end);
        };
        return function(s, pred, t) {
            return takeWhileImpl(0, s, pred, t);
        };
    }();
    var take = function(s, count) {
        return ((isNaN(count) || (count < 0)) ? s : takeWhile(s, function(v, i) {
            return (i < count);
        }));
    };
    var skipWhile = function(s, pred, t) {
        var i = 0;
        while(!stream.isEmpty(s)){
            if (!pred.call(t, stream.first(s), i)){
                return s;
            }++i;
            (s = stream.rest(s));
        }return stream.end;
    };
    var skip = function(source, count) {
        return ((isNaN(count) || (count <= 0)) ? source : skipWhile(source, function(v, i) {
            return (i < count);
        }));
    };
    return {
        "takeWhile": takeWhile,
        "take": take,
        "skipWhile": skipWhile,
        "skip": skip
    };
});
