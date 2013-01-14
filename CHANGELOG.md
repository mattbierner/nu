# ChangeLog #

## 0.2.0 - Jan 13, 2012 ##
* Rewrote some recursive implementation to iterative to avoid stack overflow.
* Made filter, from, and map incremental, they get a single value and then wait
  to compute rest if needed.

## 0.1.0 - Jan 10, 2012 ##
* Initial Release
