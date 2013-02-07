/**
 * @fileOverview Stream generation utilities.
 */
define(['stream/stream'],
function(stream) {
"use strict";

/* Helper functions
 ******************************************************************************/
var bind = function(f /*, ...*/) {
    return (arguments.length === 1 ?
        f :
        f.bind.apply(f, arguments));
};

/* Gen
 ******************************************************************************/
/**
 * Create a stream of elements yielded from 's' while a predicate is
 * satisfied. Stops yielding elements once the predicate is not satisfied.
 * 
 * @param s Stream to take elements from.
 * @param {function(value): boolean} pred Predicate function that determines when
 *     to take elements.
 * @param [t] 'this' object used for predicate function.
 * 
 * @returns Lazy stream of elements taken from 's'.
 */
var takeWhile = (function(){
    var takeWhileImpl = function(i, s, pred, t) {
        if (stream.isEmpty(s)) {
            return s;
        }
        var first = stream.first(s);
        return (pred.call(undefined, first, i) ?
            stream.stream(first, bind(takeWhileImpl, i + 1, stream.rest(s), pred, t)) :
            stream.end);
    };
    
    return function(s, pred, t) {
        return takeWhileImpl(0, s, pred, t);
    };
}());

/**
 * Create a stream of at most 'count' elements from 's'.
 * 
 * May yield fewer than 'count' elements if 's' ends.
 * 
 * @param s Stream to take elements from.
 * @param {Number} count Number of elements to take. Must be greater than or 
 *     equal to zero. Defaults to 'Infinity'.
 * 
 * @returns Lazy stream of at most 'count' elements from 's'.
 */
var take = function(s, count) {
    return (isNaN(count) || count < 0 ?
        s : 
        takeWhile(s, function(v, i) { return (i < count); }));
};

/**
 * Create a stream that skips elements from 's' while a predicate is satisfied.
 * 
 * May result in an empty stream if 's' ends before the predicate is satisfied.
 * 
 * @param s Stream to yield elements from.
 * @param {function(value, index): boolean} pred Predicate that determines 
 *     elements to skip. 
 * @param [t] 'this' object used for the predicate function.
 * 
 * @returns Stream of elements from 's' after predicate was not satisfied.
 */
var skipWhile = function(s, pred, t) {
    var i = 0;
    while (!stream.isEmpty(s)) {
        if (!pred.call(undefined, stream.first(s), i)) {
            return s;
        }
        ++i;
        s = stream.rest(s);
    }
    return stream.end;
};

/**
 * Create a stream that skips 'count' elements from 's'.
 * 
 * @param s Stream to yield elements from.
 * @param {Number} count Number of elements to skip.
 * 
 * @returns Stream of elements from 's' after 'count' elements.
 */
var skip = function(source, count) {
    return (isNaN(count) || count <= 0 ? source :
        skipWhile(source, function(v, i) { return (i < count); }));
};


/* Export
 ******************************************************************************/
return {
    'takeWhile': takeWhile,
    'take': take,
    
    'skipWhile': skipWhile,
    'skip': skip
};


});