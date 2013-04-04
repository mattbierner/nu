/**
 * @fileOverview Stream quantifier utilities.
 */
define(['nu/stream'],
function(stream) {
"use strict";

/**
 * Tests a stream against a predicate and returns if the predicate is satisfied
 * for any element.
 * 
 * Succeeds fast. May stall on an infinite stream if predicate is never satisfied.
 * 
 * @param {function(value, index): boolean} pred Predicate function that tests
 *     values from the stream.
 * * @param s Stream to test.
 * 
 * @return Was the predicate satisfied for any element?
 */
var any = function(pred, s) {
    var i = 0;
    while (!stream.isEmpty(s)) {
        if (pred(stream.first(s), i)) {
            return true;
        }
        ++i;
        s = stream.rest(s);
    }
    return false;
};

/**
 * Tests a stream against a predicate and returns if the predicate is satisfied
 * for all element.
 * 
 * Fails fast. May stall on an infinite stream if predicate is always satisfied.
 * 
 * @param {function(value, index): boolean} pred Predicate function that tests
 *     values from the stream.
 * * @param s Stream to test.
 * 
 * @return Was the predicate satisfied for all elements?
 */
var every = function(pred, s) {
    var i = 0;
    while (!stream.isEmpty(s)) {
        if (!pred(stream.first(s), i)) {
            return false;
        }
        ++i;
        s = stream.rest(s);
    }
    return true;
};

/* Export
 ******************************************************************************/
return {
    'any': any,
    'every': every
};

});