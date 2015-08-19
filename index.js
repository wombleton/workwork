var Liberty = require('liberty'),
  moment = require('moment'),
  RRule = require('rrule').RRule,
  _ = require('lodash');

module.exports = function(jurisdiction) {
  var jurisdictions;
  if (arguments.length === 1 && _.isArray(arguments[0])) {
    jurisdictions = _.toArray(arguments[0]);
  } else {
    jurisdictions = _.toArray(arguments);
  }
  return {
    between: function(from, to, options) {
      var holidays,
        excepts,
        days;

      from = moment(from).toDate();
      to = moment(to).toDate();

      options = options || {};
      excepts = options.except || [];

      // use a RRule including Mon — Fri in the range
      days = new RRule({
        freq: RRule.DAILY,
        interval: 1,
        byweekday: [ RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR ],
        dtstart: moment(from).startOf('day').toDate(),
        until: moment(to).endOf('day').toDate()
      }).all();

      // use Liberty in the jurisdiction to get an array of holidays as millisecond since epoch
      holidays = _.map(new Liberty(jurisdictions).between(from, to), function(day) {
        return day.date.valueOf();
      });

      _.each(excepts, function(rule) {
        var options = RRule.parseString(rule),
          dates;

        options.dtstart = from;
        options.until = to;

        dates = new RRule(options).all();

        _.each(dates, function(day) {
          holidays.push(day.valueOf());
        });
      });

      // return any days without a matching ms-since-epoch holiday
      return _.reject(days, function(day) {
        return ~holidays.indexOf(day.valueOf());
      });
    }
  };
};
