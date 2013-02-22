/**
 * @fileOverview Core stream functionality.
 */
define(function() {
"use strict";

var arrayReduceRight = Array.prototype.reduceRight;

/* Helper functions
 ******************************************************************************/
var bind = function(f /*, ...*/) {
    return (arguments.length === 1 ?
        f :
        f.bind.apply(f, arguments));
};

var identity = function(v) { return v; };

var constant = bind(bind, identity);

var memo = function(f) {
    var value;
    return function(/*...*/) {
        return (value === undefined ?
            (value = f.apply(undefined, arguments)) :
            value);
    };
};

/* Constants
 ******************************************************************************/
/**
 * The empty stream.
 */
var end = null;

/* Stream Construction
 ******************************************************************************/
/**
 * Create a new stream.
 *
 * @param val First element of the stream.
 * @param f Function that returns the rest of the stream given the first element.
 * 
 * @return A new stream.
 */
var stream = function(val, f) {
    return {
        'first': val,
        'rest': f
    };
};

/**
 * Create a new stream that memoizes rest results.
 */
var memoStream = function(val, f) {
    return {
        'first': val,
        'rest': memo(f)
    };
};

/**
 * Create a new stream from a value and existing stream.
 * 
 * @param val First element of the stream.
 * @param s Rest of the stream.
 * 
 * @return A new stream.
 */
var cons = function(val, s) {
    return stream(val, constant(s));
};


/**
 * Joins two streams into a new stream.
 * 
 * @param s1 Stream
 * @param f Function returning second stream.
 * 
 * @return Stream of two joined streams.
 */
var concatz = function(s1, f) {
    return (isEmpty(s1) ?
        f() :
        stream(first(s1), bind(concatz, rest(s1), f)));
};

/**
 * Joins two streams into a new stream.
 * 
 * @return Stream of two joined streams.
 */
var concat = function(s1, s2) {
    return concatz(s1, constant(s2));
};

/**
 * Joins multiple streams into a new stream.
 * 
 * @return Stream of joined streams.
 */
var concata = (function(){
    var reducer = function(p, c) { return concat(c, p); };
    
    return function(/*...*/) {
        return (arguments.length === 0 ?
            end :
            arrayReduceRight.call(arguments, reducer));
    };
}());

/**
 * Create a new stream from an enumerable object.
 * 
 * @param enumerable Enumerable object.
 * 
 * @return Stream of enumerable values from enumerable object.
 */
var from = (function(){
    var fromImpl = function(enumerable, i, len) {
        return (i >= len ?
            end : 
            memoStream(enumerable[i], bind(fromImpl, enumerable, i + 1, len)));
    };
    
    return function STREAM_FROM(enumerable) {
        return (enumerable === undefined ?
            end :
            fromImpl(enumerable, 0, enumerable.length));
    };
}());

/* Primitive Operators
 ******************************************************************************/
/**
 * Get the first element of a given stream.
 * 
 * @param s Stream.
 * 
 * @return First element of 's'.
 */
var first = function(s) {
    return s.first;
};

/**
 * Get the rest of a given stream, excluding the first element.
 * 
 * @param s Stream.
 * 
 * @return Stream for rest of 's'.
 */
var rest = function(s) {
    return s.rest(first(s));
};

/**
 * Is a given stream empty.
 * 
 * @param s Stream.
 *
 *@return Is 's' empty.
 */
var isEmpty = function(s) {
    return (s === end);
};

/**
 * Is a given object a stream?
 * 
 * @param s Object to test.
 * 
 * @return Is 's' a valid stream.
 */
var isStream = function(s) {
    return (s && s.hasOwnProperty('first') && s.hasOwnProperty('rest'));
};
/* 
 ******************************************************************************/
/**
 * Iterate over a stream.
 *
 * @param s Stream being iterated over.
 * @param {function(value, index): *} callback Function called for each element of
 *     's'.
 * @param {Object} [t] 'this' object used when invoking 'callback'.
 */
var forEach = function(s, callback, t) {
    var i = 0;
    while (!isEmpty(s)) {
       callback.call(t, first(s), i);
       ++i;
       s = rest(s);
    }
};

/**
 * Reduces a source generator left to right.
 * 
 * Returned generator yields a once value.
 * 
 * @param s Stream being reduced.
 * @param {function(previous, current, index)} callback Function that reduces 
 *     's'.
 * @param [initial] Initial value used for reduce.
 * 
 * @return Result of reduction.
 */
var reduce = bind(function STREAM_REDUCE(offset, s, callback, initial) {
    if (isEmpty(s)) {
        return initial;
    }
    if (initial === undefined) {
        return STREAM_REDUCE(1, rest(s), callback, first(s));
    } else {
        forEach(s, function(v, i) {
            initial = callback(initial, v, i + offset);
        });
        return initial;
    }
}, 0);

/**
 * Reduces a stream right to left.
 *
 * @param s Stream being reduced.
 * @param {function(previous, current, index)} callback Function that reduces 
 *     's'.
 * @param [initial] Initial value used for reduce.
 * 
 * @return Result of reduction.
 */
var reduceRight = bind(function STREAM_REDUCE_RIGHT(i, s, callback, initial) {
    if (isEmpty(s)) {
        return initial;
    }
    var x = first(s), xs = rest(s);
    if (isEmpty(xs) && initial === undefined) {
        return x;
    } else {
        return callback(STREAM_REDUCE_RIGHT(i + 1, xs, callback, initial), x, i);
    }
}, 0);

/**
 * Reduces a stream right to left.
 *
 * @param s Stream being reduced.
 *
 * @return Array created from stream..
 */
var toArray = (function(){
    var builder = function(p, c) {
        p.push(c);
        return p;
    };
    
    return function STREAM_TO_ARRAY(s) {
        return reduce(s, builder, []);
    };
}());

/* 
 ******************************************************************************/
/**
 * Create a new stream of mapped values from an existing stream.
 * 
 * @param source Stream to map.
 * @param {function(value)} callback Function that transforms source values and
 *     returns the transformed value.
 * @param [t] 'this' object used for callback.
 * 
 * @return Stream of mapped values.
 */
var map = bind(function STREAM_MAP(i, s, callback, t) {
    return (isEmpty(s) ?
        s :
        memoStream(callback.call(t, first(s), i), bind(STREAM_MAP, i + 1, rest(s), callback, t)));
}, 0);

/**
 * Create a new stream of filtered values from an existing stream.
 * 
 * @param s Stream being filtered.
 * @param {function(value, index): boolean} predicate Predicate function used to filter
 *     source generator results. Takes the value to test as well as its index in
 *     the unfiltered source.
 * @param [t] 'this' object used for predicate.
 * 
 * @return New stream from filtered 's'.
 */
var filter = bind(function STREAM_FILTER(i, s, predicate, t) {
    while (!isEmpty(s)) {
        var x = first(s);
        if (predicate.call(s, x, i)) {
            return memoStream(x, bind(STREAM_FILTER, i + 1, rest(s), predicate, t));
        }
        ++i;
        s = rest(s);
    }
    return s;
}, 0);

/* Export
 ******************************************************************************/
return {
    'end': end,

    'stream': stream,
    'memoStream': memoStream,
    
    'cons': cons,
    'concat': concat,
    'concatz': concatz,
    'concata': concata,
    'from': from,

    'first': first,
    'rest': rest,
    'isEmpty': isEmpty,
    'isStream': isStream,
    
    'forEach': forEach,
    'reduce': reduce,
    'reduceRight': reduceRight,
    'toArray': toArray,
    
    'map': map,
    'filter': filter
};


});