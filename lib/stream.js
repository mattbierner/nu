/*
 * THIS FILE IS AUTO GENERATED from 'lib/stream.kep'
 * DO NOT EDIT
*/
define(function() {
    "use strict";
    var arrayReduce = Array.prototype.reduce;
    var bind = function(f) {
        return ((arguments.length === 1) ? f : f.bind.apply(f, arguments));
    };
    var identity = function(v) {
        return v;
    };
    var constant = bind(bind, identity);
    var memo = function(f) {
        var value;
        return function() {
            return ((value === undefined) ? (value = f.apply(undefined, arguments)) : value);
        };
    };
    var end = null;
    var stream = function(val, f) {
        return {
            "first": val,
            "rest": f
        };
    };
    var memoStream = function(val, f) {
        return {
            "first": val,
            "rest": memo(f)
        };
    };
    var cons = function(val, s) {
        return stream(val, constant(s));
    };
    var concatz = function(s1, f) {
        return (isEmpty(s1) ? f() : stream(first(s1), bind(concatz, rest(s1), f)));
    };
    var concat = function(s1, s2) {
        return concatz(s1, constant(s2));
    };
    var concata = function() {
        return ((arguments.length === 0) ? end : arrayReduce.call(arguments, concat));
    };
    var from = function() {
        var fromImpl = function(enumerable, i, len) {
            return ((i >= len) ? end : memoStream(enumerable[i], bind(fromImpl, enumerable, (i + 1), len)));
        };
        return function STREAM_FROM(enumerable) {
            return ((enumerable === undefined) ? end : fromImpl(enumerable, 0, enumerable.length));
        };
    }();
    var first = function(s) {
        return s.first;
    };
    var rest = function(s) {
        return s.rest(first(s));
    };
    var isEmpty = function(s) {
        return (s === end);
    };
    var isStream = function(s) {
        return ((s && s.hasOwnProperty("first")) && s.hasOwnProperty("rest"));
    };
    var forEach = function(s, callback, t) {
        var i = 0;
        while(!isEmpty(s)){
            callback.call(t, first(s), i);
            ++i;
            (s = rest(s));
        }};
    var reduce = bind(function STREAM_REDUCE(offset, s, callback, initial) {
        if (isEmpty(s)){
            return initial;
        }if ((initial === undefined)){
            return STREAM_REDUCE(1, rest(s), callback, first(s));
        }else {
            forEach(s, function(v, i) {
                (initial = callback(initial, v, (i + offset)));
            });
            return initial;
        }}, 0);
    var reduceRight = bind(function STREAM_REDUCE_RIGHT(i, s, callback, initial) {
        if (isEmpty(s)){
            return initial;
        }var x = first(s),xs = rest(s);
        return ((isEmpty(xs) && (initial === undefined)) ? x : callback(STREAM_REDUCE_RIGHT((i + 1), xs, callback, initial), x, i));
    }, 0);
    var toArray = function() {
        var builder = function(p, c) {
            p.push(c);
            return p;
        };
        return function STREAM_TO_ARRAY(s) {
            return reduce(s, builder, []);
        };
    }();
    var map = bind(function STREAM_MAP(i, s, callback, t) {
        return (isEmpty(s) ? s : memoStream(callback.call(t, first(s), i), bind(STREAM_MAP, (i + 1), rest(s), callback, t)));
    }, 0);
    var filter = bind(function STREAM_FILTER(i, s, predicate, t) {
        while(!isEmpty(s)){
            var x = first(s);
            if (predicate.call(s, x, i)){
                return memoStream(x, bind(STREAM_FILTER, (i + 1), rest(s), predicate, t));
            }++i;
            (s = rest(s));
        }return s;
    }, 0);
    return {
        "end": end,
        "stream": stream,
        "memoStream": memoStream,
        "cons": cons,
        "concat": concat,
        "concatz": concatz,
        "concata": concata,
        "from": from,
        "first": first,
        "rest": rest,
        "isEmpty": isEmpty,
        "isStream": isStream,
        "forEach": forEach,
        "reduce": reduce,
        "reduceRight": reduceRight,
        "toArray": toArray,
        "map": map,
        "filter": filter
    };
});
