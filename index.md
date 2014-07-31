---
layout: base
---


Nu is small (~1k gzipped) Javascript library for creating and operating on lazy,
infinite streams. 

# You went to school to learn

## This is the empty stream

```
nu.NIL
```

## This is a stream with 3 elements

```
nu.cons(1, nu.cons(2, nu.cons(3, nu.NIL)))
```

## Streams can contain any type of element

```
nu.cons({x: 3},
    nu.cons(null,
        nu.cons(function(x) {},
            nu.cons(nu.cons(1, nu.NIL), nu.NIL))))
```

## You can only read the head of a stream

And split the stream into the head and the rest of the stream

```
var easy = nu.cons(1, nu.cons(2, nu.cons(3, nu.NIL)))

nu.first(easy; // 1
nu.first(nu.rest(easy)) // 2
nu.first(nu.rest(nu.rest(easy))) // 3

nu.isEmpty(easy) // false
nu.isEmpty(nu.rest(nu.rest(nu.rest(easy)))) // true
```

## Nu streams are persistent

Stream operations do not alter the original

```
var easy = nu.cons(1, nu.cons(2, nu.cons(3, nu.NIL)))
var zeroIndexed = nu.cons(0, easy);

nu.first(easy) // 1
nu.first(zeroIndexed) // 0
```


# Things you never, never knew before 

## A stream can be created from any array-like object

```
var abc = nu.from(['a', 'b', 'c']);
// or this
var abc = nu.from('abc');

nu.first(abc) // a
nu.first(nu.rest(abc)) // b
```

## And converted back to an array

```
var abc = nu.from(['a', 'b', 'c']);


nu.toArray(abc) // ['a', 'b', 'c']
```

## You can join streams together

```
var chorus = nu.append(
    nu.from(['a', 'b', 'c']),
    nu.from(['do', 're', 'mi']),
    nu.from([1, 2, 3]));

nu.first(chorus) // a
nu.first(nu.rest(nu.rest(nu.rest(chorus)))) // 'do'
```

## Or define a lazy, potentially infinite, raw stream

Nu streams consist of a first element and a function that returns the rest of the stream.

```
var allOnes = nu.stream(1, function() { return allOnes; });

nu.first(allOnes) // 1
nu.first(nu.rest(allOnes)) // 1
nu.first(nu.rest(nu.rest(nu.rest(allOnes)))) // 1

var ht = allOnes;
for (var i = 0; i < 100000; ++i)
    ht = nu.rest(ht)
nu.first(ht) // 1
```


```
// Use closure to capture state.
var count = function(x) {
    return nu.stream(x, function() { return count(x + 1); });
};

var counter = count(0)

nu.first(counter) // 0
nu.first(nu.rest(counter)) // 1
nu.first(nu.rest(nu.rest(counter))) // 2
nu.first(nu.rest(nu.rest(nu.rest(counter)))) // 3
nu.first(nu.rest(nu.rest(nu.rest(nu.rest(counter))))) // 4
```

```
// Use closure to capture state.
var fib = function(n1, n2) {
    return function() { // returns the rest of the stream
        return nu.stream(n1, fib(n2, n1 + n2));
    };
};

var fibStream = nu.stream(0, fib(1, 1));

nu.first(fibStream) // 0
nu.first(nu.rest(fibStream)) // 1
nu.first(nu.rest(nu.rest(fibStream))) // 1
nu.first(nu.rest(nu.rest(nu.rest(fibStream)))) // 3
nu.first(nu.rest(nu.rest(nu.rest(nu.rest(fibStream))))) // 5
```

### But you can't convert an infinite stream to an array

```
nu.toArray(fibStream) // STALL
```


## Let me show you what itÕs all about

### `map` rewrites each element of a stream with a function

```
var squares = nu.map(
    function(x) { return x * x},
    nu.from([1, 2, 3]))

nu.toArray(squares) // [1, 4, 9]
```

### Operations are lazy and work on infinite streams

```
var fibSquares = nu.map(
    function(x) { return x * x},
    fibStream);

nu.first(fibSquares) // 0
nu.first(nu.rest(fibSquares)) // 1
nu.first(nu.rest(nu.rest(nu.rest(nu.rest(fibSquares))))) // 25
```

### Nu operation argument orders allow encourage binding

```
var sqr = nu.map.bind(null, function(x) { return x * x});

var squares = sqr(nu.from([1, 2, 3])))
nu.toArray(squares) // [1, 4, 9]
```

### `filter` selects elements from a stream

```
var odds = nu.filter(
    function(x) { return x % 2 },
    nu.from([1, 2, 3, 4, 5, 6]));

nu.toArray(odds) // [1, 3, 5]
```

### `zip` combines two streams into a stream of pairs

```
var z = nu.zip(
    nu.from('abc'),
    nu.from([1, 2, 3, 4, 5, 6]));

nu.toArray(z) // [['a', 1], ['b', 2], ['c', 3]];
```

### `zipWith` is like `zip` but it uses a custom combine function

```
var z = nu.zipWith(
    function(x, y) {
        return x + y
    },
    nu.from('abc'),
    nu.from([1, 2, 3, 4, 5, 6]));

nu.toArray(z) // ['a1', 'b2', 'c3'];
```


### IÕm gonna teach you how to sing it out

### `forEach` iterates over a stream

```
var s = nu.from([1, 2, 3]);
nu.forEach(
    function(x) {
        console.log(x);
    },
    s);
```

### But `forEach` stalls on infinite streams

```
nu.forEach(console.log, fibStream) // STALL
```

### `foldl` maps and accumulates over a stream

```
nu.foldl(
    function(accumulated, current) { return accumulated + current; },
    0, // initial value
    stream.from([1, 2, 3]))
// 6
```

```
nu.foldr(
    function(accumulated, current) { return [accumulated, current]; },
    0, // initial value
    stream.from([1, 2, 3]))
// [[[0, 1] 2], 3]
```

### `foldr` folds a stream from the right-to-left

```
nu.foldr(
    function(accumulated, current) { return [accumulated, current]; },
    0, // initial value
    stream.from([1, 2, 3]))
// [0, [1, [2, 3]]]
```


## The branches on the learning tree
Non-core functionality is included in small separate packages.


### `gen::repeat` repeats an element

```
nu.toArray(gen.repeat(4, 'a')); // ['a', 'a', 'a', 'a']
```

### `gen::range` generates a stream like Python's `range` method

```
var s1 = nu.toArray(gen.range());
nu.first(s1) // 0
nu.first(nu.rest(s1)) // 1

nu.toArray(gen.range(4)) // [0, 1, 2, 3]

nu.toArray(gen.range(2, 6)) // [2, 3, 4, 5]

nu.toArray(gen.range(2, -1)) // []

nu.toArray(gen.range(2, 9, 3)) // [2, 5, 8]

nu.toArray(gen.range(2, -4, -2)) // [2, 0, -2]
```


### Quantifiers test all stream elements
They fail early, but may stall on infinite streams

```
quantifier.every(
    function(x) { return x < 10; },
    nu.from([0, 1, 2, 3]));
// true

quantifier.every(
    function(x) { return x < 10; }, gen.range(Infinity));
// false
```

```
quantifier.any(
    function(x) { return x > 10; },
    gen.range(Infinity));
// true

quantifier.any(
    function(x) { return x < 0; }, gen.range(Infinity));
// false
```

### `select::take` trims a stream to include at most a set count number of elements

```
var s = select.take(
    6,
    nu.map(
        function(x) { return x * x; },
        gen.range(Infinity)));

nu.toArray(s) // [0, 1, 4, 9, 16, 25]
```

### Or with a predicate

```
var s = select.takeWhile(
    function(x) { return x < 20 },
    nu.map(
        function(x) { return x * x; },
        gen.range(Infinity)));

nu.toArray(s) // [0, 1, 4, 9, 16]
```


### `select::skip` trims a stream to exclude the first count number of elements

```
var s = select.skip(
    6,
    nu.map(
        function(x) { return x * x; },
        gen.range(Infinity)));

nu.first(s) // 6
```

### Or with a predicate

```
var s = select.skipWhile(
    function(x) { return x < 20 },
    nu.map(
        function(x) { return x * x; },
        gen.range(Infinity)));

nu.first(s) // 20
```


## Your education ainÕt complete




## Show me what you can do



## Node
Node files are in `dist_node/`.

    $ npm install nu-stream

    var stream = require('nu-stream').stream;
    var gen = require('nu-stream').gen;
    
    var s = gen.range(0, 5);
    var s1 = stream.toArray(
        stream.map(
            function(x) { return x * 2; },
            s));
            
    s1; // [0, 1, 4, 6, 8];

## AMD
AMD files are in `dist/`. Include any AMD style module loader and load 'nu/stream':

    <!DOCTYPE html>
    <html>
    <head></head>
    <body>
        <script type="application/javascript" src="require.js"></script>
        <script type="application/javascript">
            requirejs.config({
                paths: {
                    'nu-stream': './dist',
                }
            });
            require(['nu-stream/stream'], function(stream) {
                ...
            });
        </script>
    </body>


# Modules
Nu consists of four modules. Only 'nu/stream', the main module, is required.
Other modules can be loaded as needed.

### nu/stream
Core functionality. Stream creation and basic operations.

### nu/quantifier
Quantification operations on streams.

### nu/gen
Generating streams.

### nu/select
Selecting subsections of streams.

