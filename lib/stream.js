/*
 * THIS FILE IS AUTO GENERATED from 'lib/stream.kep'
 * DO NOT EDIT
*/
;
define(function() {
    "use strict";
    var arrayReduce = Function.prototype.call.bind(Array.prototype.reduce);
    var curry = function(f) {
        return f.bind.apply(f, arguments);
    }
    ;
    var constant = function(x) {
        return function() {
            return x;
        }
        ;
    }
    ;
    var memo = function(f) {
        var value;
        return function() {
            if ((value === undefined))(value = f.apply(this, arguments));
            
            return value;
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
    var cons = function(val, s) {
        return stream(val, constant(s));
    }
    ;
    var appendz = function(s1, f) {
        return (isEmpty(s1) ? f() : memoStream(first(s1), curry(appendz, rest(s1), f)));
    }
    ;
    var append = function(reducer) {
        return function() {
            return arrayReduce(arguments, reducer, end);
        }
        ;
    }
    (function reducer(s1, s2) {
        return appendz(s1, constant(s2));
    }
    );
    var concat = function(s) {
        return (isEmpty(s) ? s : appendz(first(s), curry(concat, rest(s))));
    }
    ;
    var from = function(fromImpl) {
        return function(arr) {
            return fromImpl(arr, 0, arr.length);
        }
        ;
    }
    (function fromImpl(arr, i, len) {
        return ((i >= len) ? end : memoStream(arr[i], curry(fromImpl, arr, (i + 1), len)));
    }
    );
    var forEach = function(f, s) {
        for(var head = s,i = 0;
         ! isEmpty(head);(head = rest(head))){
            f(first(head), i);
            (i = (i + 1));
        }
        
    }
    ;
    var foldl = function(f, z, s) {
        var r = z;
        forEach(function(x, i) {
            (r = f(r, x, i));
            return r;
        }
        , s);
        return r;
    }
    ;
    var foldr = curry(function STREAM_FOLDR(i, f, z, s) {
        return (isEmpty(s) ? z : f(STREAM_FOLDR((i + 1), f, z, rest(s)), first(s), i));
    }
    , 0);
    var toArray = function(builder) {
        return function(s) {
            return foldl(builder, [], s);
        }
        ;
    }
    (function builder(p, c) {
        p.push(c);
        return p;
    }
    );
    var map = curry(function STREAM_MAP(i, f, s) {
        return (isEmpty(s) ? s : memoStream(f(first(s), i), curry(STREAM_MAP, (i + 1), f, rest(s))));
    }
    , 0);
    var filter = curry(function STREAM_FILTER(i, pred, s) {
        var head = s;
        for(var index = i;
         ! isEmpty(head);(head = rest(head))){
            var x = first(head);
            if (pred(x, index))return memoStream(x, curry(STREAM_FILTER, (index + 1), pred, rest(head)));
            
            (index = (index + 1));
        }
        
        return head;
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
