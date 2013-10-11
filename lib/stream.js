/*
 * THIS FILE IS AUTO GENERATED from 'lib/stream.kep'
 * DO NOT EDIT
*/
define((function(require, exports, module) {
    "use strict";
    var end, stream, memoStream, cons, append, appendz, concat, from, first, rest, isEmpty, isStream, forEach, foldl, foldr, toArray, map, filter, bind;
    var arrayReduce = Function.prototype.call.bind(Array.prototype.reduce);
    var curry = (function(f) {
        return f.bind.apply(f, arguments);
    });
    var constant = (function(x) {
        return (function() {
            return x;
        });
    });
    var memo = (function(f) {
        var value;
        return (function() {
            if ((value === undefined))(value = f.apply(this, arguments));

            return value;
        });
    });
    (end = null);
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
        return s.rest(first(s));
    }));
    (isEmpty = (function(s) {
        return (s === end);
    }));
    (isStream = (function(s) {
        return (((s && s.hasOwnProperty("first")) && s.hasOwnProperty("rest")) || (s === end));
    }));
    (cons = (function(val, s) {
        return stream(val, constant(s));
    }));
    (appendz = (function(s1, f) {
        return (isEmpty(s1) ? f() : memoStream(first(s1), curry(appendz, rest(s1), f)));
    }));
    (append = (function(reducer) {
        return (function() {
            return arrayReduce(arguments, reducer, end);
        });
    })((function reducer(s1, s2) {
        return appendz(s1, constant(s2));
    })));
    (concat = (function(s) {
        return (isEmpty(s) ? s : appendz(first(s), curry(concat, rest(s))));
    }));
    (from = (function(fromImpl) {
        return (function(arr) {
            var len = arr["length"];
            return fromImpl(arr, 0, len);
        });
    })((function fromImpl(arr, i, len) {
        return ((i >= len) ? end : memoStream(arr[i], curry(fromImpl, arr, (i + 1), len)));
    })));
    (forEach = (function(f, s) {
        for (var head = s, i = 0; !isEmpty(head);
            (head = rest(head))) {
            f(first(head), i);
            (i = (i + 1));
        }

    }));
    (foldl = (function(f, z, s) {
        var r = z;
        forEach((function(x, i) {
            (r = f(r, x, i));
            return r;
        }), s);
        return r;
    }));
    (foldr = curry((function STREAM_FOLDR(i, f, z, s) {
        return (isEmpty(s) ? z : f(STREAM_FOLDR((i + 1), f, z, rest(s)), first(s), i));
    }), 0));
    (toArray = (function(builder) {
        return (function(s) {
            return foldl(builder, [], s);
        });
    })((function builder(p, c) {
        p.push(c);
        return p;
    })));
    (map = curry((function STREAM_MAP(i, f, s) {
        return (isEmpty(s) ? s : memoStream(f(first(s), i), curry(STREAM_MAP, (i + 1), f, rest(s))));
    }), 0));
    (filter = curry((function STREAM_FILTER(i, pred, s) {
        var head = s;
        for (var index = i; !isEmpty(head);
            (head = rest(head))) {
            var x = first(head);
            if (pred(x, index)) return memoStream(x, curry(STREAM_FILTER, (index + 1), pred, rest(head)));

            (index = (index + 1));
        }

        return head;
    }), 0));
    (bind = (function(f, s) {
        return concat(map(f, s));
    }));
    (exports.end = end);
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
    (exports.foldl = foldl);
    (exports.foldr = foldr);
    (exports.toArray = toArray);
    (exports.map = map);
    (exports.filter = filter);
    (exports.bind = bind);
}))