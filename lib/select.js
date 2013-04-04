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
        var takeWhileImpl = function(i, pred, s) {
            if (stream.isEmpty(s)){
                return s;
            }var first = stream.first(s);
            return (pred(first, i) ? stream.stream(first, bind(takeWhileImpl, (i + 1), pred, stream.rest(s))) : stream.end);
        };
        return function(pred, s) {
            return takeWhileImpl(0, pred, s);
        };
    }();
    var take = function(count, s) {
        return ((isNaN(count) || (count < 0)) ? s : takeWhile(function(v, i) {
            return (i < count);
        }, s));
    };
    var skipWhile = function(pred, s) {
        var i = 0;
        while(!stream.isEmpty(s)){
            if (!pred(stream.first(s), i)){
                return s;
            }++i;
            (s = stream.rest(s));
        }return stream.end;
    };
    var skip = function(count, s) {
        return ((isNaN(count) || (count <= 0)) ? s : skipWhile(function(v, i) {
            return (i < count);
        }, s));
    };
    return {
        "takeWhile": takeWhile,
        "take": take,
        "skipWhile": skipWhile,
        "skip": skip
    };
});