/*
 * THIS FILE IS AUTO GENERATED FROM 'lib/stream.kep'
 * DO NOT EDIT
*/
"use strict";
var end, NIL, stream, memoStream, cons, append, appendz, concat, from, first, rest, isEmpty, isStream, forEach, reverse,
        foldl, foldr, reduce, reduceRight, toArray, zip, zipWith, indexed, map, filter, bind, arrayReduce = Function.prototype
        .call.bind(Array.prototype.reduce),
    memo = (function(f) {
        var value;
        return (function(x) {
            if ((value === undefined)) {
                (value = f(x));
            }
            return value;
        });
    });
(end = null);
(NIL = null);
(stream = (function(val, f) {
    return ({
        first: val,
        rest: f
    });
}));
(memoStream = (function(val, f) {
    var f0 = memo(f);
    return ({
        first: val,
        rest: f0
    });
}));
(first = (function(x) {
    return x.first;
}));
(rest = (function(s) {
    return s.rest();
}));
(isEmpty = (function(y) {
    return (null === y);
}));
(isStream = (function(s) {
    return (((s && s.hasOwnProperty("first")) && s.hasOwnProperty("rest")) || (null === s));
}));
(cons = (function(val, s) {
    var f = (function() {
        return s;
    });
    return ({
        first: val,
        rest: f
    });
}));
(appendz = (function(s1, f) {
    var val, f0, f1;
    return ((null === s1) ? f() : ((val = s1.first), (f0 = appendz.bind(null, s1.rest(), f)), (f1 = memo(f0)), ({
        first: val,
        rest: f1
    })));
}));
var reducer = (function(s1, s2) {
    return appendz(s1, (function() {
        return s2;
    }));
});
(append = (function() {
    var streams = arguments;
    return arrayReduce(streams, reducer, null);
}));
(concat = (function(s) {
    return ((null === s) ? s : appendz(s.first, concat.bind(null, s.rest())));
}));
var fromImpl = (function(arr, i, len) {
    var val, f, f0;
    return ((i >= len) ? null : ((val = arr[i]), (f = fromImpl.bind(null, arr, (i + 1), len)), (f0 = memo(f)), ({
        first: val,
        rest: f0
    })));
});
(from = (function(arr) {
    var val, f, f0, length = arr["length"];
    return ((0 >= length) ? null : ((val = arr[0]), (f = fromImpl.bind(null, arr, 1, length)), (f0 = memo(f)), ({
        first: val,
        rest: f0
    })));
}));
(zipWith = (function(f, l1, l2) {
    var val, f0, f1;
    return (((null === l1) || (null === l2)) ? null : ((val = f(l1.first, l2.first)), (f0 = zipWith.bind(null,
        f, l1.rest(), l2.rest())), (f1 = memo(f0)), ({
        first: val,
        rest: f1
    })));
}));
(zip = zipWith.bind(null, (function(x, y) {
    return [x, y];
})));
var f, count = (function(n) {
        var f = count.bind(null, (n + 1));
        return ({
            first: n,
            rest: f
        });
    });
(indexed = zip.bind(null, ((f = count.bind(null, 1)), ({
    first: 0,
    rest: f
}))));
(forEach = (function(f0, s) {
    var y, s0, x;
    for (var head = s;
        (!((y = head), (null === y)));
        (head = ((s0 = head), s0.rest()))) f0(((x = head), x.first));
}));
(foldl = (function(f0, z, s) {
    var y, s0, r = z;
    for (var head = s;
        (!((y = head), (null === y)));
        (head = ((s0 = head), s0.rest()))) {
        var x;
        (r = f0(r, ((x = head), x.first)));
    }
    return r;
}));
(reverse = foldl.bind(null, (function(x, y) {
    var f0 = (function() {
        return x;
    });
    return ({
        first: y,
        rest: f0
    });
}), null));
(foldr = (function(f0, z, s) {
    return foldl(f0, z, reverse(s));
}));
(reduce = (function(f0, s) {
    return foldl(f0, s.first, s.rest());
}));
(reduceRight = (function(f0, s) {
    return reduce(f0, reverse(s));
}));
var builder = (function(p, c) {
    p.push(c);
    return p;
});
(toArray = (function(s) {
    return foldl(builder, [], s);
}));
(map = (function(f0, s) {
    var val, f1, f2;
    return ((null === s) ? s : ((val = f0(s.first)), (f1 = map.bind(null, f0, s.rest())), (f2 = memo(f1)), ({
        first: val,
        rest: f2
    })));
}));
(filter = (function(pred, s) {
    var y, s0;
    for (var head = s;
        (!((y = head), (null === y)));
        (head = ((s0 = head), s0.rest()))) {
        var x = head,
            x0 = x.first;
        if (pred(x0)) {
            var s1, f0 = filter.bind(null, pred, ((s1 = head), s1.rest())),
                f1 = memo(f0);
            return ({
                first: x0,
                rest: f1
            });
        }
    }
    return null;
}));
var y = concat;
(bind = (function() {
    return y(map.apply(null, arguments));
}));
(exports["end"] = end);
(exports["NIL"] = NIL);
(exports["stream"] = stream);
(exports["memoStream"] = memoStream);
(exports["cons"] = cons);
(exports["append"] = append);
(exports["appendz"] = appendz);
(exports["concat"] = concat);
(exports["from"] = from);
(exports["first"] = first);
(exports["rest"] = rest);
(exports["isEmpty"] = isEmpty);
(exports["isStream"] = isStream);
(exports["forEach"] = forEach);
(exports["reverse"] = reverse);
(exports["foldl"] = foldl);
(exports["foldr"] = foldr);
(exports["reduce"] = reduce);
(exports["reduceRight"] = reduceRight);
(exports["toArray"] = toArray);
(exports["zip"] = zip);
(exports["zipWith"] = zipWith);
(exports["indexed"] = indexed);
(exports["map"] = map);
(exports["filter"] = filter);
(exports["bind"] = bind);