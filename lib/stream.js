(function(define){

define(function() {
"use strict";

/* Helper functions
 ******************************************************************************/
var bind = function(f /*, ...*/) {
    return (arguments.length === 1 ?
        f :
        f.bind.apply(f, arguments));
};

var identity = function(v) { return v; };

var constant = bind(bind, identity);

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
 * @param val First element of the stream.
 * @param s Rest of the stream.
 * 
 * @return A new stream.
 */
var concat = function(s1, s2) {
    return (isEmpty(s1) ?
        s2 :
        cons(first(s1), concat(rest(s1), s2)));
};

/**
 * Create a new stream from an iterable object.
 * 
 * @param iterable An iterable object.
 * 
 * @return A new stream from the iterable.
 */
var from = (function(){
    var impl = function(iterable, i, len) {
        return (i >= len ?
            end : 
            cons(iterable[i], impl(iterable, i + 1, len)));
    };
    
    return function(iterable) {
        return impl(iterable, 0, iterable.length);
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
 * Test if a given stream is empty.
 * 
 * @param s Stream.
 *
 *@return Is 's' empty.
 */
var isEmpty = function(s) {
    return (s === end);
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
var forEach = bind(function impl(i, s, callback, t) {
    if (!isEmpty(s)) {
        callback.call(t, first(s), i);
        impl(i + 1, rest(s), callback, t);
    }
}, 0);

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
var reduce = bind(function impl(i, s, callback, initial) {
    return (isEmpty(s) ?
        initial :
        impl(i + 1, rest(s), callback, callback(initial, first(s), i)));
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
var reduceRight = bind(function impl(i, s, callback, initial) {
    return (isEmpty(s) ?
        initial :
        callback(first(s), impl(i + 1, rest(s), callback, initial), i));
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
    
    return function(s) {
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
 * @return {gen} Generator that yields transformed values when invoked.
 */
var map = bind(function impl(i, s, callback, t) {
    return (isEmpty(s) ?
        s :
        cons(callback.call(t, first(s), i), impl(i + 1, rest(s), callback, t)));
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
var filter = function(s, predicate, t) {
    if (isEmpty(s)) {
        return s;
    } else {
        var x = first(s),
            xs = filter(rest(s), predicate, t);
        return (predicate.call(s, x) ?
            cons(x, xs) :
            xs);
    }
};

/* Export
 ******************************************************************************/
return {
    'end': end,

    'stream': stream,
    'cons': cons,
    'concat': concat,
    'from': from,

    'first': first,
    'rest': rest,
    'isEmpty': isEmpty,

    'forEach': forEach,
    'reduce': reduce,
    'reduceRight': reduceRight,
    'toArray': toArray,
    
    'map': map,
    'filter': filter
};


});

}(
    typeof define !== 'undefined' ? define : function(factory) { stream = factory(); }
));