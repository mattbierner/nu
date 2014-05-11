# ChangeLog #

## 3.2.3 - May 10, 2014
* Updated for Khepri V1.0.

## 3.2.2 - April 10, 2014
* Performance improvements though recompile with khepri V0.23.0
* More sane impl of `every`

## 3.2.1 - April 7, 2014
* Performance improvements though recompile with khepri V0.21.13

## 3.2.0 - March 4, 2014
* Added `zipWith` `zip` generalization.

## 3.1.2 - Feb 26, 2014
* Eliminated one function call per folding.

## 3.1.1 - Feb 21, 2014
* Reduce number of function calls.

## 3.1.0 - January 20, 2014
* Reworked node package to export submodules instead of grouping everything into
  top level scope..

## 3.0.2 - January 20, 2014
* node package.

## 3.0.1 - January 15, 2014
* Removed `.min.min.js` error file in dist.

## 3.0.0 - November 15, 2013
* Removed use of index in all operations.
** Pass in an indexed stream to replicate old behavior.
* Added `stream.indexed` to create an indexed stream.
* Added `NIL` as alias for `end`.
* Source files now live in `dist` instead of `lib`.

## 2.1.0 - November 13, 2013
* Added `stream.zip` to create stream of pairs from two streams.
* Added `stream.reverse` to reverse a finite stream.
* Added `stream.reduce` for left fold without initial value.
* Added `stream.reduceRight` for left fold without initial value.
* Improved `foldr` to work with longer, but still finite, streams.

## 2.0.5 - July 20, 2013
* Fixed silly error that prevented filter from working correctly.

## 2.0.4 - June 9, 2013
* Range uses a more general check, isNaN, for testing if a value is supplied.
  Before, a specific test for undefined was used. The new version supports
  the builtin number conversion logic.

## 2.0.3 - April 13, 2013
* Fixed 'isStream' to also return true for empty streams. This is the expected
  behavior.

## 2.0.2 - April 10, 2013
* 'forEach' also update to use correct argument order.

## 2.0.1 - April 4, 2013
* Changed back to old 'toArray' logic which is more ugly but much faster.

## 2.0.0 - April 4, 2013
* Changed all functions to support currying. Stream is now usually the last parameter.
* Removed support for using 'this' values for callbacks.
* 'reduce' and 'reduceRight' are now 'foldl' and 'foldr' because their behavior
  is more similar to the scheme versions of these functions that the javascript one.
** 'foldl' and 'foldr' require an initial value.
* Renamed 'concat' to 'append'
* Removed 'concata' and 'append' that replaced it now supports variable arguments instead.
* Added 'concat' function that creates a new stream from a list of streams.
* Added 'bind' function that creates a new stream by mapping a stream with a
  function and then joining results into a new stream.

## 1.1.1 - Feb 21, 2013
* Fixed callback not using 'this' object value.

## 1.1.0 - Feb 21, 2013
* Added 'isStream' predicate function to check if a given object is a valid stream.

## 1.0.0 - Feb 7, 2013
* Added 'quantifier', 'select', and 'gen' modules.
* AMD imports now require module type paths, such as 'stream/stream'.
* Removed support for non AMD import.

## 0.6.0 - Feb 6, 2013 ##
* Added 'concatz' for joining two streams where the second stream is created lazily.

## 0.5.1 - Jan 31, 2013 ##
* Fixed 'concata' called with zero arguments throwing exception.

## 0.5.0 - Jan 31, 2013 ##
* Added 'concata' for joining multiple strings.
* Added some function names for better debugging.

## 0.4.0 - Jan 27, 2013 ##
* Added 'memoStream' to automatically memoize result of rest.
* Made concat lazy.

## 0.3.0 - Jan 13, 2013 ##
* Fixed issues with reduce.

## 0.2.0 - Jan 13, 2013 ##
* Rewrote some recursive implementation to iterative to avoid stack overflow.
* Made filter, from, and map incremental, they get a single value and then wait
  to compute rest if needed.

## 0.1.0 - Jan 10, 2013 ##
* Initial Release
