workwork
========

Returns the working days between two dates, for a given [liberty](https://www.npmjs.org/package/liberty) jurisdiction after removing holidays and weekends.

Usage
=====

    var workwork = require('workwork');

    workwork('nz').between('2014-6-1', '2014-6-4'); // returns [ 2014-6-3, 2014-6-4 ], excluding the Sunday & Queens Birthday

Accepts anything `moment` will accept. Returns `Date` objects.

Something need doing?
