var moment = require('moment'),
  workwork = require('../index');

exports['returns Tu/Wed, excluding Queens Birthday'] = function(test) {
  var days = workwork('nz').between('2014-06-01', '2014-06-04');

  test.equals(days.length, 2);
  test.equals(days[0].valueOf(), moment('2014-06-03').valueOf());
  test.equals(days[1].valueOf(), moment('2014-06-04').valueOf());
  test.done();
};

exports['returns Wed, excluding Queens Birthday and the exclusion'] = function(test) {
  var days = workwork('nz').between('2014-06-01', '2014-06-04', { except: [ 'FREQ=YEARLY;BYMONTH=6;BYMONTHDAY=3' ]});

  test.equals(days.length, 1);
  test.equals(days[0].valueOf(), moment('2014-06-04').valueOf());
  test.done();
};
