# gen.js - Generator Javascript Library #

## About ##
gen.js is a library for working with continuation based generator functions in
regular Javascript. Generators allow lazy generation and evaluation of
potentially infinite data structures. Gen includes support for synchronous 
and asynchronous operations on generators, a simple set of core generator functions,
and a small set of additional batteries-included functions.

    // Simple generator for Fibonacci numbers.
    // The definition of fibonacci can be found later in the document.
    var f = gen(fibonacci())
        .sync();
    f() -> 0
    f() -> 1
    f() -> 1
    f() -> 2
    f() -> 3
    f() -> 5
    ...

Operations can also be applied to generators:

    // Square each Fibonacci number.
    var f = gen(fibonacci())
        .map(function(v){ return v * v;})
        .sync();
    f() -> 0
    f() -> 1
    f() -> 1
    f() -> 4
    f() -> 9
    f() -> 25
    ....
    
    // Return only even Fibonacci numbers
    var f = gen(fibonacci())
        .filter(function(v) { return ((v % 2) === 0); })
        .sync();
    f() -> 0
    f() -> 2
    f() -> 8
    f() -> 34
    f() -> 144
    ...

# Using gen.js #
gen.js can be used either as an AMD style module or in the global scope.

## With AMD ##
Include any AMD style module loader and load gen:

    <!DOCTYPE html>
    <html>
    <head></head>
    <body>
        <script type="application/javascript" src="require.js"></script>
        <script type="application/javascript">
            require(['gen'], function(gen) {
                var g = gen(...);
            });
        </script>
    </body>

## Global ##
Include gen.js file directly and use 'gen' global.

    <!DOCTYPE html>
    <html>
    <head></head>
    <body>
        <script type="application/javascript" src="gen.js"></script>
        <script type="application/javascript">
            var g = gen(...);
        </script>
    </body>

# High Level Overview #
In this context, a generator is a special function that yields values from a
sequence with each call. Generator functions often maintain internal state.

## Generators ##
Gen.js generators must conform to an API and standard set of conventions.
Because we cannot support a language level yield statement, generators in gen.js
are bit more difficult to write than generators in languages such as Python.

Here is an example of a generator that yields the fibonacci sequence:

    function fibonacci() {          // Factory for generator
        var c = 0, d = 1;           // Generator's implicit state
        return function(y, b, r) {  // Actual generator function.
            var next = c;           // fibonacci logic
            c = d;
            d = next + d;
            return y(next);         // Yield the value 'next'. return not required.
        };
    }

As seen here, stateful generators usually are created using a factory. The
factory's context defines implicit state for the generator, and arguments passed to
the factory can control the behavior of the produced generator.

Generator functions themselves take three arguments: 'y', 'b', and 'r'. Each of
these are factories for a continuations that performs an action: yield, break,
or recurse. The generator function must call one, and only one, of these when
invoked. Generator functions do not have to return anything, but return statements
can be used to make the intention clearer

'y' is the yield continuation factory. It produces a callback that yields a
value from the generator. 'b' is the break continuation factor. It is called
when the generator has no more values to yield. 'r' schedules another generator
for execution, using either 'sync' or 'async'.

## Gen Continuations ##
Gen generators expose two types of continuations, a factory that returns a
continuation and is used to control program flow and regular callbacks.

Continuation factories return continuations to execute. They also can alter 
control flow:

    var b;
    var g = gen(fibonacci())
        .sync(function(v){              // Define a yield continuation factory
            b = v;                      // Set closure variable 'b'
            if (v % 2 === 0)            // If returned value is even
                return function() { return v; };  // Return yield continuation
            else
                return gen.CONTINUE;    // Invoke the generator again.
        });
    
    g(); -> b = 0
    g(); -> b = 1

When a continuation factory returns 'gen.CONTINUE' or does not return a value,
the generator function will be invoked again automatically. Continuation 
factories should not perform yield or break actions directly, but return a
function that performs these actions. Generators created by gen will provide default yield and break
continuation factories, but the caller can  supply custom ones.

Gen also supports simple callback functions for yield and break. These are
called whenever the generator yields or breaks and cannot control flow:

    var b;
    function y(v) {             // Custom Yield continuation that sets b.
        b = v;                  // Custom on create behavior
    };
    
    g(y); -> b = 0
    g(y); -> b = 1

### Yield Continuation Factory ###
Takes a single argument for the value being yielded. The default behavior is 
to return a continuation that returns the yielded value.


### Break Continuation Factory ###
Takes no arguments. The default behavior is return a continuation that throws a
'GenBreak' exception. Overriding this can be useful when you do not want to deal
with exceptions.

### Recurse Continuation Factory ###
Schedules the execution of another generator. Takes the same argumens as
'sync' or 'async'.


# API #
High level overview and examples of the API. More detailed information can be
found in the sources.

Many generator functions have two versions, a static one defined on 'gen' that
takes a source as an argument and a method style one defined on the returned
generator function (this is noted as gen()).

## gen.prototype ##
An object that defines the prototype for any generator instances.

## gen().sync(y, b)  ##
Create a simple synchronous generator function from a gen instance. Synchronous
generator functions can return values directly but may block on infinite 
operations.

'y' and 'b' are the the default yield and break continuation factories used by
the generator function, custom ones can also be supplied to the generator
function directly.

## gen().async(y, b) ##
Create a simple asynchronous generator function from a gen instance. Asynchronous
generator functions cannot return values directly but can be used to process
potentially infinite operations directly.

    var g = gen(count(2))
        .async();
        
    var y = function(v) {
        alert(v);
        return function(){};
    };
    
    g(y); -> alerts '0'
    g(y); -> alerts '1'

'y' and 'b' are the the default yield and break continuation factories used by
the generator function, custom ones can also be supplied to the generator
function directly.


## gen.map(source, callback: function(value), thisObj): gen ##
#### gen().map(callback: function(value), thisObj): gen ####
Creates a mapped generator for a source generator. Mapped generator runs source
generator values through a callback function and returns the result.

    var g = gen(fibonacci())
        .map(function(v){ return v + 1;})
        .sync();
    g(); -> 1
    g(); -> 2

## gen.filter(source, predicate: function(value): boolean, thisObj) ##
#### gen().filter(predicate: function(value): boolean, thisObj) ####
Creates a filtered generator for a source generator. Filtered generator only
returns filtered generator results that satisfy a given predicate.

    var g = gen(fibonacci())
        .filter(function(v) { return ((v % 2) === 0); })
        .sync();
    g(); -> 0
    g(); -> 2

## gen.reduce(source, callback: function(previous, current), initial) ##
#### gen().reduce(callback: function(previous, current), initial) ####
Creates a reduce generator for a source generator. Reduce generator attempts
to reduce the source generator using the callback function and yield a single
result. Will attempt the entire reduction when called. Calling on an infinite
source will stall the program.

    var g = gen(count(4))
        .reduce(function add(p, c) { return p + c ; }, 0)
        .sync();
    g(); -> 6
    g(); -> Break

## gen.toArray(source) ##
####gen().toArray()####
Creates a toArray generator for a source generator. ToArray generator attempts
to reduce the source generator to an array of its elements and yield this array.
Calling on an infinite source will stall the program.

    var g = gen(count(4))
        .toArray()
        .sync();
    g(); -> [0, 1, 2, 3]
    g(); -> Break

## gen.forEach(source, callback: function(value), t) ##
####gen().forEach(callback: function(value), t)####
Creates a forEach generator for a source generator. forEach generator attempts to
iterate over entire source generator and call callback for each value. Yields
a single value, void. Calling on an infinite source will stall the program.

    var g = gen(count(4))
        .forEach(function(v){ alert(v); })
        .sync();
    g(); -> alerts '0', '1', '2', '3'
    g(); -> Break


# Batteries API #
## gen().takeWhile(predicate: function(value): boolean, thisObj) ##
Yields values from a source generator while a condition holds true, then breaks.
The 'predicate' function is called for each value and determines when to stop
yielding values. 'thisObj' is the 'this' object used for 'predicate'.

    var g = gen(count(100))
        .takeWhile(function(v){ return v < 2; })
        .sync();
    g(); -> 0
    g(); -> 1
    g(); -> Break

## gen().take(count) ##
Yields at most 'count' items from a source generator, then breaks. Can yield
fewer than 'count' items if the source generator breaks.

    var g = gen(count(100))
        .take(2)
        .sync();
    g(); -> 0
    g(); -> 1
    g(); -> Break

## gen().skipWhile(pred: function(value): boolean, thisObj) ##
Skips yielding items while a condition holds true before yielding any values.
'count' items from a source generator, then breaks. The 'predicate' function is
called for each value and determines when to stop skipping values and start yielding.
'thisObj' is the 'this' object used for 'predicate'. 

    var g = gen(count(100))
        .skipWhile(function(){ return v < 4; })
        .sync();
    g(); -> 4
    g(); -> 5
    ....

## gen().skip(count) ##
Skips 'count' items from a source generator before yielding any values.

    var g = gen(count(100))
        .skip(4)
        .sync();
    g(); -> 4
    g(); -> 5
    ....

## gen().reduceWhile(predicate: function(value): boolean, callback: function(previous, current, index), initial) ##
Reduces a source generator while a condition holds true. Yields a single value,
the result of the reduction, and then breaks. 'predicate' is called with current
reduce result at each step to determine when to break. 'callback' and 'initial'
are the same as 'reduce'.

    var g = gen(count(100))
        .reduceWhile(function(v){ return v < 4;}, function(p, c) { return p + c ; }, 0)
        .sync();
    g(); -> 6
    g(); -> Break

## gen().count() ##
Yields a single value, the number of items that a source generator yields, then
breaks.

    var g = gen(count(100))
        .take(4)
        .count()
        .sync();
    g(); -> 4
    g(); -> Break
    ....

## gen().any(predicate: function(value): boolean, thisObj) ##
Checks a source generator to see if any value holds true for a given 'predicate'
function. Yields a single, boolean value and then breaks. 'thisObj' is the
'this' object used for 'predicate'. On an infinite sources, will stop once a 
single true value is found. If no value is found, it will stall.

    var g = gen(count(100))
        .any(function(){ return v % 2 == 1; })
        .sync();
    g(); -> true
    g(); -> Break
    
    var f = gen(count(100))
        .any(function(){ return v == 1000; })
        .sync();
    f(); -> false
    f(); -> Break

## gen().every(predicate: function(value): boolean, thisObj) ##
Checks a source generator to see if every value holds true for a given 'predicate'
function. Yields a single, boolean value and then breaks. 'thisObj' is the
'this' object used for 'predicate'. On an infinite sources, will stop once a 
single false value is found. If no false value is found, it will stall.

    var g = gen(count(100))
        .every(function(){ return v % 2 == 1; })
        .sync();
    g(); -> false
    g(); -> Break
    
    var f = gen(count(100))
        .any(function(){ return v > -1; })
        .sync();
    f(); -> true
    f(); -> Break


# Known Limitation #

## Stalling ##
Operations on infinite generators may stall.

    var g = gen(count())
        .reduce(function add(p, c) { return p + c ; }, 0)
        .sync();
    g(); -> STALL

## Copying ##
Gen generators cannot be safely copied at this time. Only one instance of a 
given generator should be used at a time. There are a few ways things can go
wrong:

    // Multiple assignment
    // Usually, do not do this.
    var g = gen(count(100))
        .sync()
    var f = g;
    g(); -> 0
    f(); -> 1
    g(); -> 2

    // Multiple assignment
    // DO NOT DO THIS
    var g = gen(count(100));
    var f = g.sync();
    var j = g.sync()
    f(); -> 0
    j(); -> 1
    f(); -> 2

## Moving Backwards ##
Gen only supports yielding the next value of a generator. You cannot move backwards, 
attempt to retrieve previous values, or query for the last value of a generator 
by default (Custom generator functions  could be used to provide this behavior).
