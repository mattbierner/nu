/*
 * THIS FILE IS AUTO GENERATED from 'lib/stream.kep'
 * DO NOT EDIT
*/
define(function() {
    "use strict";
    var arrayReduce = Array.prototype.reduce;
    var curry = function(f) {
        return f.bind.apply(f, arguments);
    }
    ;
    var identity = function(x) {
        return x;
    }
    ;
    var constant = curry(curry, identity);
    var memo = function(f) {
        var value;
        return function() {
            return ((value === undefined) ? (value = f.apply(undefined, arguments)) : value);
        }
        ;
    }
    ;
    var end = null;
    var stream = function(val, f) {
        return ({
            "first": val,
            "rest": f
        });
    }
    ;
    var memoStream = function(val, f) {
        return stream(val, memo(f));
    }
    ;
    var cons = function(val, s) {
        return stream(val, constant(s));
    }
    ;
    var appendz = function(s1, f) {
        return (isEmpty(s1) ? f() : memoStream(first(s1), curry(appendz, rest(s1), f)));
    }
    ;
    var append = function() {
        var reducer = function(s1, s2) {
            return appendz(s1, constant(s2));
        }
        ;
        return function() {
            return arrayReduce.call(arguments, reducer, end);
        }
        ;
    }
    ();
    var concat = function(s) {
        return (isEmpty(s) ? s : appendz(first(s), curry(concat, rest(s))));
    }
    ;
    var from = function() {
        var fromImpl = function(arr, i, len) {
            return ((i >= len) ? end : memoStream(arr[i], curry(fromImpl, arr, (i + 1), len)));
        }
        ;
        return function(arr) {
            return ((arr === undefined) ? end : fromImpl(arr, 0, arr.length));
        }
        ;
    }
    ();
    var first = function(s) {
        return s.first;
    }
    ;
    var rest = function(s) {
        return s.rest(first(s));
    }
    ;
    var isEmpty = function(s) {
        return (s === end);
    }
    ;
    var isStream = function(s) {
        return (((s && s.hasOwnProperty("first")) && s.hasOwnProperty("rest")) || (s === end));
    }
    ;
    var forEach = function(f, s) {
        var i = 0;
        while(! isEmpty(s)){
            f(first(s), i);
            (i = (i + 1));
            (s = rest(s));
        }
        
    }
    ;
    var foldl = function(f, z, s) {
        forEach(function(x, i) {
            return (z = f(z, x, i));
        }
        , s);
        return z;
    }
    ;
    var foldr = curry(function STREAM_FOLDR(i, f, z, s) {
        return (isEmpty(s) ? z : f(STREAM_FOLDR((i + 1), f, z, rest(s)), first(s), i));
    }
    , 0);
    var toArray = function() {
        var builder = function(p, c) {
            p.push(c);
            return p;
        }
        ;
        return function(s) {
            return foldl(builder, [], s);
        }
        ;
    }
    ();
    var map = curry(function STREAM_MAP(i, f, s) {
        return (isEmpty(s) ? s : memoStream(f(first(s), i), curry(STREAM_MAP, (i + 1), f, rest(s))));
    }
    , 0);
    var filter = curry(function STREAM_FILTER(i, pred, s) {
        while(! isEmpty(s)){
            var x = first(s);
            if (pred(x, i)){
                return memoStream(x, curry(STREAM_FILTER, (i + 1), pred, rest(s)));
            }
            
            (i = (i + 1));
            (s = rest(s));
        }
        
        return s;
    }
    , 0);
    var bind = function(f, s) {
        return concat(map(f, s));
    }
    ;
    return ({
        "end": end,
        "stream": stream,
        "memoStream": memoStream,
        "cons": cons,
        "append": append,
        "appendz": appendz,
        "concat": concat,
        "from": from,
        "first": first,
        "rest": rest,
        "isEmpty": isEmpty,
        "isStream": isStream,
        "forEach": forEach,
        "foldl": foldl,
        "foldr": foldr,
        "toArray": toArray,
        "map": map,
        "filter": filter,
        "bind": bind
    });
}
);
