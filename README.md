# Nu - Small Lazy Stream Javascript Library #

Nu is small (~1k gzipped) Javascript library for creating and operating on lazy,
potentially infinite streams. Streams are a simple **ordered sequence abstraction**,
that are both **lazy** and **persistent**.

### Links

* [Documentation][docs]
* [Project site](http://mattbierner.github.io/nu/) - Introduction


### Modules
Nu consists of four modules. Only 'stream', the main module, is required.
Other modules can be loaded as needed.

#### nu-stream::stream
Core functionality. Stream creation and basic operations.

#### nu-stream::quantifier
Quantification operations on streams.

#### nu-stream::gen
Generating streams.

#### nu-stream::select
Selecting subsections of streams.


# Code
Nu is written in Khepri. [Khepri][khepri] is an ECMAScript language
that compiles to Javascript. The `dist` directory contains the generated js library
while the Khepri source is in `lib` directory.


[khepri]: https://github.com/mattbierner/khepri
[docs]: https://github.com/mattbierner/nu/wiki/API