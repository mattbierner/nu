/*
 * THIS FILE IS AUTO GENERATED from 'lib/stream.kep'
 * DO NOT EDIT
*/
define(["require", "exports"], (function(require, exports) {
    "use strict";
    var end, stream, memoStream, cons, append, appendz, concat, from, first, rest, isEmpty, isStream, forEach, reverse, foldl, foldr, reduce, reduceRight, toArray, zip, map, filter, bind;
    var arrayReduce = Function.prototype.call.bind(Array.prototype.reduce);
    var constant = (function(x) {
        return (function() {
            return x;
        });
    });
    var flip = (function(f) {
        return (function(x, y) {
            return f(y, x);
        });
    });
    var memo = (function(f) {
        var value;
        return (function() {
            var args = arguments;
            if ((value === undefined))(value = f.apply(this, args));

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
        return (isEmpty(s1) ? f() : memoStream(first(s1), appendz.bind(null, rest(s1), f)));
    }));
    (append = (function() {
        {
            var reducer = (function(s1, s2) {
                return appendz(s1, constant(s2));
            });
            return (function() {
                var streams = arguments;
                return arrayReduce(streams, reducer, end);
            });
        }
    })());
    (concat = (function(s) {
        return (isEmpty(s) ? s : appendz(first(s), concat.bind(null, rest(s))));
    }));
    (from = (function() {
        {
            var fromImpl = (function(arr, i, len) {
                return ((i >= len) ? end : memoStream(arr[i], fromImpl.bind(null, arr, (i + 1), len)));
            });
            return (function(arr) {
                var arr = arr,
                    length = arr["length"];
                return fromImpl(arr, 0, length);
            });
        }
    })());
    var count = (function(n) {
        return stream(n, (function(f, g) {
            return (function(x) {
                return f(g(x));
            });
        })(count, (function(x, y) {
            return (x + y);
        }).bind(null, 1)));
    });
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
        }), s);
        return r;
    }));
    (reverse = foldl.bind(null, flip(cons), end));
    (foldr = (function(f, z, s) {
        return foldl((function(p, __a) {
            var c = __a[0],
                i = __a[1];
            return f(p, c, i);
        }), z, reverse(zip(s, count(0))));
    }));
    (reduce = (function(f, s) {
        return foldl(f, first(s), rest(s));
    }));
    (reduceRight = (function(f, s) {
        return (function() {
            {
                var inner = reverse(zip(s, count(0)));
                return foldl((function(p, __a) {
                    var c = __a[0],
                        i = __a[1];
                    return f(p, c, i);
                }), first(inner)[0], rest(inner));
            }
        })();
    }));
    (toArray = (function() {
        {
            var builder = (function(p, c) {
                p.push(c);
                return p;
            });
            return (function(s) {
                return foldl(builder, [], s);
            });
        }
    })());
    (zip = (function(l1, l2) {
        return ((isEmpty(l1) || isEmpty(l2)) ? end : memoStream([first(l1), first(l2)], zip.bind(null, rest(l1), rest(l2))));
    }));
    (map = (function() {
        {
            var map = (function(i, f, s) {
                return (isEmpty(s) ? s : memoStream(f(first(s), i), map.bind(null, (i + 1), f, rest(s))));
            });
            return map;
        }
    })().bind(null, 0));
    (filter = (function() {
        {
            var filter = (function(i, pred, s) {
                var head = s;
                for (var index = i; !isEmpty(head);
                    (head = rest(head))) {
                    var x = first(head);
                    if (pred(x, index)) return memoStream(x, filter.bind(null, (index + 1), pred, rest(head)));

                    (index = (index + 1));
                }

                return head;
            });
            return filter;
        }
    })().bind(null, 0));
    (bind = (function(f, g) {
        return (function() {
            return f(g.apply(null, arguments));
        });
    })(concat, map));
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
    (exports.reverse = reverse);
    (exports.foldl = foldl);
    (exports.foldr = foldr);
    (exports.reduce = reduce);
    (exports.reduceRight = reduceRight);
    (exports.toArray = toArray);
    (exports.zip = zip);
    (exports.map = map);
    (exports.filter = filter);
    (exports.bind = bind);
}))