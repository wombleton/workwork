var Liberty = require('liberty'),
  moment = require('moment'),
  RRule = require('rrule').RRule,
  _ = require('lodash');

module.exports = function(jurisdiction) {
  return {
    between: function(from, to) {
      var holidays,
        days;

      // use a RRule including Mon — Fri in the range
      days = new RRule({
        freq: RRule.DAILY,
        interval: 1,
        byweekday: [ RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR ],
        dtstart: moment(from).startOf('day').toDate(),
        until: moment(to).endOf('day').toDate()
      }).all();

      // use Liberty in the jurisdiction to get an array of holidays as millisecond since epoch
      holidays = _.map(new Liberty(jurisdiction).between(from, to), function(day) {
        return day.date.valueOf();
      });

      // return any days without a matching ms-since-epoch holiday
      return _.reject(days, function(day) {
        return ~holidays.indexOf(day.valueOf());
      });
    }
  };
};
