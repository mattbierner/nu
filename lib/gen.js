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
 * Repeat 'x' 'times' times.
 * 
 * @param {Number} times Number of times to repeat 'x'.
 * @param x Item to repeat.
 * 
 * @return Lazy stream of 'x' repeated 'times' times.
 */
var repeat = function(times, x) {
    return (times <= 0 ?
        stream.end :
        stream.stream(x, bind(repeat, times - 1, x)));
};

/**
 * Generate a stream of numbers in a given range.
 * 
 * @param lower Lower bound of range.
 * @param [upper] Upper bound of range.
 * @param [step] Number to step by in range. May be negative.
 * 
 * @return Lazy stream for range.
 */
var range = (function(){
    var rangeImpl = function(lower, upper, step) {
        return ((step > 0 ? upper <= lower : upper >= lower) ?
            stream.end :
            stream.stream(lower, bind(range, lower + step, upper, step)));
    };
    
    return function(lower, upper, step) {
        lower = (lower === undefined ? Infinity : lower);
        if (upper === undefined) {
            upper = lower;
            lower = 0;
        }
        return rangeImpl(lower, upper, (step === undefined ? 1 : step));
    };
}());


/* Export
 ******************************************************************************/
return {
   'repeat': repeat,
   'range': range
};


});