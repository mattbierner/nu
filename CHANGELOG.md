# ChangeLog #

## 0.5.0 - Jan 31, 2012 ##
* Fixed 'concata' called with zero arguments throwing exception.

## 0.5.0 - Jan 31, 2012 ##
* Added 'concata' for joining multiple strings.
* Added some function names for better debugging.

## 0.4.0 - Jan 27, 2012 ##
* Added 'memoStream' to automatically memoize result of rest.
* Made concat lazy.

## 0.3.0 - Jan 13, 2012 ##
* Fixed issues with reduce.

## 0.2.0 - Jan 13, 2012 ##
* Rewrote some recursive implementation to iterative to avoid stack overflow.
* Made filter, from, and map incremental, they get a single value and then wait
  to compute rest if needed.

## 0.1.0 - Jan 10, 2012 ##
* Initial Release
