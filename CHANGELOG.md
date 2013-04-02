# ChangeLog #

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
