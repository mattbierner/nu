---
layout: index
---
# About #
Nu is small Javascript library for working with lazy, infinite streams. It is
influenced by Scheme and Haskell.

## Modules ##
Nu consists of four modules. Only 'nu/stream', the main module, is required.
Other modules can be loaded as needed.

### nu/stream ###
Core functionality. Stream creation and basic operations.

### nu/quantifier ###
Quantification operations on streams.

### nu/gen ###
Generating streams.

### nu/select ###
Selecting subsections of streams.

# Using Nu #
Include any AMD style module loader and load 'nu/stream':

    <!DOCTYPE html>
    <html>
    <head></head>
    <body>
        <script type="application/javascript" src="require.js"></script>
        <script type="application/javascript">
            requirejs.config({
                paths: {
                    'nu': './lib',
                }
            });
            require(['nu/stream'], function(stream) {
                ...
            });
        </script>
    </body>

# Concepts #

## Streams ##
Streams consist of a head element and function that returns the rest of the stream.
This allows working with lazy, potentially infinite streams. Streams can store
any type of value including: objects, other streams, functions, and null.

When the stream's rest function is called, it returns the rest of the stream.
The rest function is passed the head element of the stream. Rest functions must
always return the same value and should not have side effect.

### Custom Stream Objects ###
Using the Nu API to create streams is strongly encouraged, however custom stream
objects can also be defined. A stream object must have a property 'first' for
the head of the stream, and property 'rest' for the rest function for the stream.
Custom stream end objects are not supported, always use 'stream.end'.

If the 'first' property is defined using a getter, the getter must always return
the same value. Stream objects should generally not be mutated after creation.


# API #
API functions are the only safe way to interact with streams. Directly accessing
or changing stream properties is not suggested or supported. For example, for
a stream 's', ALWAYS use 'stream.first(s)' and NEVER 's.first' to get the first element.

Unless otherwise noted, all functions generate streams lazily and work correctly
with infinite streams.


## nu/stream ##

### stream(val, f) ###
Create a stream with first element 'val' and  function 'f' that returns
the rest of the stream. 'f' must always return the same value and 
should not have side effect.


### memoStream(val, f) ###
Create a stream that automatically memoizes result of 'f'.


### end ###
Value representing the end of a stream. Can also be considered the empty stream.


If explicitly testing stream values to see if they are empty, always use strict
equality tests against 'end'. Usually 'isEmpty' is better.

### first(s) ###
Get the first element of stream 's'.

### rest(s) ###
Get the rest of stream 's'. 's' must not be empty.

### isEmpty(s) ###
Is 's' empty?

### isStream(s) ###
Is 's' a valid stream.

### from(arr) ###
Create a stream from an array like object.

    var s1 = stream.from([0, 1, 2, 3]);
    stream.first(s1); // 0
    stream.first(stream.rest(s1)); // 1
    stream.first(stream.rest(stream.rest(s1))); // 2

### toArray(s) ###
Convert stream 's' to a Javascript array.

's' must be finite. This is an eager operation.

    var s1 = stream.from([0, 1, 2, 3]);
    stream.toArray(s1); // [0, 1, 2, 3]


### cons(x, s) ###
Create stream with element 'x' joined onto the head of stream 's'.

    var s1 = stream.cons(1, stream.cons(2, end));
    stream.toArray(s1); // [1, 2]


### append(...streams) ###
Create stream with elements of arguments 'streams' joined left to right.

    var s1 = stream.append(
        stream.from([0, 1]),
        stream.from([2, 3]),
        stream.from([4, 5]));
    stream.toArray(s1); // [0, 1, 2, 3, 4, 5]
    
    var s2 = stream.append(
        stream.from([0, 1]),
        end,
        stream.from([4, 5]));
    stream.toArray(s2); /// [0, 1, 4, 5]


### appendz(s, f) ###
Create stream with stream 's' joined onto the stream returned by function 'f'. 

    var s1 = stream.appendz(
        stream.from([0, 1]),
        () ->
            stream.from([2, 3]));
    stream.toArray(s1); // [0, 1, 2, 3]


### concat(s) ###
Create stream from joining stream of streams 's'.

    var streamOfStreams = stream.from([
        stream.from([0, 1]),
        stream.from([2, 3]),
        stream.from([4, 5])]);
    
    var s1 = stream.concat(streamOfStreams);
    stream.toArray(s1); // [0, 1, 2, 3, 4, 5]


### forEach(f, s) ###
Iterate over each element of stream 's' in order, calling function 'f' on each
element.

'f' is passed three arguments: an element, its index, and the stream 'forEach'
was called on.

'forEach' does not return a value.

    var length = 0;
    stream.forEach(x -> ++length, stream.from([0, 1, 2, 3]));
    length; // 4


### foldl(f, z, s) ###
Perform a left fold on stream 's' with function 'f' and initial value 'z'.
Return the result.

This is an eager operation and will hang on infinite streams.

'f' is passed four arguments: the previous value, the current value, the index
of the current value, and the stream 'foldl' was called on. It returns the
previous element for the next iteration.

    var add = (x, y) -> x + y;
    stream.foldl(add, 0, stream.from([1, 2, 3])); // 6
    
    var nest = (p, c) -> [p, c];
    stream.foldl(add, 0, stream.from([1, 2, 3])); // [[[0, 1], 2], 3]


### foldr(f, z, s) ###
Perform a right fold. Otherwise, same as 'foldl'.

However, unlike 'foldl', this cannot be used for large streams as it is
implemented recursively.

    var add = (x, y) -> x + y;
    stream.foldr(add, 0, stream.from([1, 2, 3])); // 6
    
    var nest = (p, c) -> [p, c];
    stream.foldl(add, 0, stream.from([1, 2, 3])); // [0, [1, [2, 3]]]


### map(f, s) ###
Create a stream from stream 's' with mapping function 'f'.

'f' is passed three arguments: an element, its index in 's', and 's'. 'f' 
returns the new element.

    var inc = x -> x + 1;
    var s1 = stream.map(inc, stream.from([0, 1, 2, 3]));
    stream.toArray(s1); // [1, 2, 3, 4]


### filter(pred, s) ###
Create a stream consisting only of elements from 's' that satisfy 
predicate 'pred'.

'pred' is passed three arguments: an element, its index in 's', and 's'. 'pred' 
returns whether the element should be included in the new stream.

May hang in certain cases, such as when all elements in an infinite stream are
rejected. 

    var isOdd = x -> x % 2;
    var s1 = stream.filter(isOdd, stream.from([0, 1, 2, 3]));
    stream.toArray(s1); // [1, 3]


### bind(f, s) ###
Create a stream from mapping function 'f' to stream 's' and concating results.

'f' is passed same arguments as in 'map', however it must return a stream.

    var s1 = stream.bind(
        x -> stream.from([x, x + 10]),
        stream.from([0, 1]));
    stream.toArray(s1); // [0, 10, 1, 11]


## nu/quantifier ##

### every(pred, s) ###
Tests stream 's' against predicate 'pred'. Returns whether 'pred' is satisfied
for every element in 's'.

This is an eager operation. It may hang in certain cases, such as an infinite stream
where every element is accepted.
 
'pred' is passed three arguments: an element, its index in 's', and 's'. 

    quantifier.every(x -> x < 10, stream.from([0, 1, 2, 3])); // true
    
    quantifier.every(x -> x < 2, stream.from([0, 1, 2, 3])); // false

### any(pred, s) ###
Tests stream 's' against predicate 'pred'. Returns whether 'pred' is satisfied
for any element in 's'.

This is an eager operation. It may hang in certain cases, such as an infinite stream
where every element is not accepted.
 
'pred' is passed three arguments: an element, its index in 's', and 's'. 

    quantifier.any(x -> x < 10, stream.from([0, 1, 2, 3])); // true
    
    quantifier.any(x -> x > 10, stream.from([0, 1, 2, 3])); // false


## nu/gen ##

### repeat(n, x) ###
Create a stream of element 'x' repeated 'n' times.

    stream.toArray(gen.repeat(4, 'a')); // ['a', 'a', 'a', 'a']


### range(lower, [upper], [step]) ###
Create a stream of a range from 'lower' to 'upper', stepping by 'step'. Similar
to python's range operation.

When called with zero arguments, generates range from 0 to infinity.

When called with single argument, create range from 0 to 'lower'. Step defaults 
to one and may be negative.

    var s1 = stream.toArray(gen.range());
    stream.first(s1); // 0
    stream.first(stream.rest(s1)); // 1
    
    stream.toArray(gen.range(4)); // [0, 1, 2, 3]
    
    stream.toArray(gen.range(2, 6)); // [2, 3, 4, 5]
    
    stream.toArray(gen.range(2, -1)); // []
    
    stream.toArray(gen.range(2, 9, 3)); // [2, 5, 8]
    
    stream.toArray(gen.range(2, -4, -2)); // [2, 0, -2]


## nu/select ##

### takeWhile(pred, s) ###
Create a sub stream of 's', taking elements while 'pred' is satisfied.

'pred' is passed three arguments: an element, its index in 's', and 's'. 'pred' 
returns whether to take this element. Once 'pred' returns false once, no more 
elements are taken.

    var s1 = select.takeWhile(v -> x < 4, gen.range());
    stream.toArray(s1); // [0, 1, 2, 3]


### take(count, s) ###
Create a sub stream of 's' consisting of at most 'count' elements from 's'.

    stream.toArray(select.take(4, gen.range())); // [0, 1, 2, 3]
    
    stream.toArray(select.take(4, gen.range(2))); // [0, 1]


### skipWhile(pred, s) ###
Create a sub stream of 's', skipping elements while 'pred' is satisfied and then
returning the rest of the stream.

May hang if 'pred' on a infinte stream and never returns false.

'pred' is passed three arguments: an element, its index in 's', and 's'. 'pred' 
returns whether to take this element. Once 'pred' returns false, skipping stops
and the rest of stream is returned.

    var s1 = select.skipWhile(v -> x < 4, gen.range());
    stream.first(s1); // 4
    stream.first(stream.rest(s1)); // 5
    
    var s2 = select.skipWhile(v -> x < 4, gen.range(2));
    stream.toArray(s2); // []


### take(count, s) ###
Create a sub stream of 's', skipping 'count' elements from 's' and returning the
rest of 's'.

    var s1 = select.skip(4, gen.range());
    stream.first(s1); // 4
    stream.first(stream.rest(s1)); // 5
    
    stream.toArray(select.skip(4, gen.range(2))); // []


# Code #
Nu is written in Javascript / Khepri. [Khepri][khepri] is a ECMAScript subset
that, among other things, adds a shorted lambda function syntax. It is also
implemented using Nu. Besides lambda functions, Khepri files (*.kep) are
pretty much plain old Javascript.

For now, both the .js and .kep versions of source code will be kept in 'lib/',
but only Khepri sources will be developed and Javascript files will be
generated from it.


[khepri]: https://github.com/mattbierner/khepri

