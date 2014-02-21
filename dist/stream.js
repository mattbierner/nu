/*
 * THIS FILE IS AUTO GENERATED from 'lib/stream.kep'
 * DO NOT EDIT
*/
define(["require", "exports"], (function(require, exports) {
    "use strict";
    var end, NIL, stream, memoStream, cons, append, appendz, concat, from, first, rest, isEmpty, isStream,
            forEach, reverse, foldl, foldr, reduce, reduceRight, toArray, zip, indexed, map, filter, bind,
            arrayReduce = Function.prototype.call.bind(Array.prototype.reduce),
        constant = (function(x) {
            return (function() {
                return x;
            });
        }),
        flip = (function(f) {
            return (function(x, y) {
                return f(y, x);
            });
        }),
        memo = (function(f) {
            var value;
            return (function(x) {
                if ((value === undefined))(value = f(x));
                return value;
            });
        });
    (end = null);
    (NIL = end);
    (stream = (function(val, f) {
        return ({
            "first": val,
            "rest": f
        });
    }));
    (memoStream = (function(val, f) {
        return stream(val, memo(f));
    }));
    (first = (function(s) {
        return s.first;
    }));
    (rest = (function(s) {
        return s.rest();
    }));
    (isEmpty = (function(s) {
        return (s === NIL);
    }));
    (isStream = (function(s) {
        return (((s && s.hasOwnProperty("first")) && s.hasOwnProperty("rest")) || (s === NIL));
    }));
    (cons = (function(val, s) {
        return stream(val, constant(s));
    }));
    (appendz = (function(s1, f) {
        return (isEmpty(s1) ? f() : memoStream(first(s1), appendz.bind(null, rest(s1), f)));
    }));
    var reducer = (function(s1, s2) {
        return appendz(s1, constant(s2));
    });
    (append = (function() {
        var streams = arguments;
        return arrayReduce(streams, reducer, end);
    }));
    (concat = (function(s) {
        return (isEmpty(s) ? s : appendz(first(s), concat.bind(null, rest(s))));
    }));
    var fromImpl = (function(arr, i, len) {
        return ((i >= len) ? end : memoStream(arr[i], fromImpl.bind(null, arr, (i + 1), len)));
    });
    (from = (function(arr) {
        var length = arr["length"];
        return fromImpl(arr, 0, length);
    }));
    (zip = (function(l1, l2) {
        return ((isEmpty(l1) || isEmpty(l2)) ? end : memoStream([first(l1), first(l2)], zip.bind(null,
            rest(l1), rest(l2))));
    }));
    var count = (function(n) {
        return stream(n, count.bind(null, (n + 1)));
    });
    (indexed = zip.bind(null, count(0)));
    (forEach = (function(f, s) {
        for (var head = s;
            (!isEmpty(head));
            (head = rest(head))) f(first(head));
    }));
    (foldl = (function(f, z, s) {
        var r = z;
        forEach((function(x) {
            (r = f(r, x));
        }), s);
        return r;
    }));
    (reverse = foldl.bind(null, flip(cons), end));
    (foldr = (function(f, z, s) {
        return foldl(f, z, reverse(s));
    }));
    (reduce = (function(f, s) {
        return foldl(f, first(s), rest(s));
    }));
    (reduceRight = (function(f, s) {
        return reduce(f, reverse(s));
    }));
    var builder = (function(p, c) {
        p.push(c);
        return p;
    });
    (toArray = (function(s) {
        return foldl(builder, [], s);
    }));
    (map = (function(f, s) {
        return (isEmpty(s) ? s : memoStream(f(first(s)), map.bind(null, f, rest(s))));
    }));
    (filter = (function(pred, s) {
        var head = s;
        for (;
            (!isEmpty(head));
            (head = rest(head))) {
            var x = first(head);
            if (pred(x)) return memoStream(x, filter.bind(null, pred, rest(head)));
        }
        return head;
    }));
    (bind = (function(f, g) {
        return (function() {
            return f(g.apply(null, arguments));
        });
    })(concat, map));
    (exports.end = end);
    (exports.NIL = NIL);
    (exports.stream = stream);
    (exports.memoStream = memoStream);
    (exports.cons = cons);
    (exports.append = append);
    (exports.appendz = appendz);
    (exports.concat = concat);
    (exports.from = from);
    (exports.first = first);
    (exports.rest = rest);
    (exports.isEmpty = isEmpty);
    (exports.isStream = isStream);
    (exports.forEach = forEach);
    (exports.reverse = reverse);
    (exports.foldl = foldl);
    (exports.foldr = foldr);
    (exports.reduce = reduce);
    (exports.reduceRight = reduceRight);
    (exports.toArray = toArray);
    (exports.zip = zip);
    (exports.indexed = indexed);
    (exports.map = map);
    (exports.filter = filter);
    (exports.bind = bind);
}));