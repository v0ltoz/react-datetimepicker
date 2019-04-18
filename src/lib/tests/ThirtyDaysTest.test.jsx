import moment from 'moment';
import { getFourtyTwoDays } from '../utils/TimeFunctionUtils';
moment.locale('en');

describe('DateTimeRangeContainer', () => {
  it('EN Locale Thirty Days Method Returns Correct June 2018', () => {
    let days = getFourtyTwoDays(5, 2018);
    let firstDay = days[0];
    let lastDay = days[41];
    let expectedStart = moment('2018-05-28');
    let expectedEnd = moment('2018-07-08');
    let firstDaySame = firstDay.isSame(expectedStart, 'day');
    let isEndDaySame = lastDay.isSame(expectedEnd, 'day');

    expect(days.length).toEqual(42);
    expect(firstDaySame).toEqual(true);
    expect(isEndDaySame).toEqual(true);
  });

  it('EN Locale Thirty Days Method Returns Correct July 2018', () => {
    let days = getFourtyTwoDays(6, 2018);
    let firstDay = days[0];
    let lastDay = days[41];
    let expectedStart = moment('2018-06-25');
    let expectedEnd = moment('2018-08-05');
    let firstDaySame = firstDay.isSame(expectedStart, 'day');
    let isEndDaySame = lastDay.isSame(expectedEnd, 'day');

    expect(days.length).toEqual(42);
    expect(firstDaySame).toEqual(true);
    expect(isEndDaySame).toEqual(true);
  });

  it('EN Locale Thirty Days Method Returns Correct October 2018', () => {
    let days = getFourtyTwoDays(9, 2018);
    let firstDay = days[0];
    let lastDay = days[41];
    let expectedStart = moment('2018-09-24');
    let expectedEnd = moment('2018-11-04');
    let firstDaySame = firstDay.isSame(expectedStart, 'day');
    let isEndDaySame = lastDay.isSame(expectedEnd, 'day');

    expect(days.length).toEqual(42);
    expect(firstDaySame).toEqual(true);
    expect(isEndDaySame).toEqual(true);
  });

  it('EN Locale Thirty Days Method Returns Correct September 2018', () => {
    let days = getFourtyTwoDays(8, 2018);
    let firstDay = days[0];
    let lastDay = days[41];
    let expectedStart = moment('2018-08-27');
    let expectedEnd = moment('2018-10-07');
    let firstDaySame = firstDay.isSame(expectedStart, 'day');
    let isEndDaySame = lastDay.isSame(expectedEnd, 'day');

    expect(days.length).toEqual(42);
    expect(firstDaySame).toEqual(true);
    expect(isEndDaySame).toEqual(true);
  });

  it('EN Locale Thirty Days Method Returns Correct May 2018', () => {
    let days = getFourtyTwoDays(4, 2018);
    let firstDay = days[0];
    let lastDay = days[41];
    let expectedStart = moment('2018-04-30');
    let expectedEnd = moment('2018-06-10');
    let firstDaySame = firstDay.isSame(expectedStart, 'day');
    let isEndDaySame = lastDay.isSame(expectedEnd, 'day');

    expect(days.length).toEqual(42);
    expect(firstDaySame).toEqual(true);
    expect(isEndDaySame).toEqual(true);
  });

  it('EN Locale Thirty Days Method Returns Correct Jan 2018', () => {
    let days = getFourtyTwoDays(0, 2018);
    let firstDay = days[0];
    let lastDay = days[41];
    let expectedStart = moment('2017-12-25');
    let expectedEnd = moment('2018-02-04');
    let firstDaySame = firstDay.isSame(expectedStart, 'day');
    let isEndDaySame = lastDay.isSame(expectedEnd, 'day');

    expect(days.length).toEqual(42);
    expect(firstDaySame).toEqual(true);
    expect(isEndDaySame).toEqual(true);
  });

  it('EN Locale Thirty Days Method Returns Correct October 2017', () => {
    let days = getFourtyTwoDays(9, 2017);
    let firstDay = days[0];
    let lastDay = days[41];
    let expectedStart = moment('2017-09-25');
    let expectedEnd = moment('2017-11-05');
    let firstDaySame = firstDay.isSame(expectedStart, 'day');
    let isEndDaySame = lastDay.isSame(expectedEnd, 'day');

    expect(days.length).toEqual(42);
    expect(firstDaySame).toEqual(true);
    expect(isEndDaySame).toEqual(true);
  });

  it('EN Locale Thirty Days Method Returns Correct August 2017', () => {
    let days = getFourtyTwoDays(7, 2017);
    let firstDay = days[0];
    let lastDay = days[41];
    let expectedStart = moment('2017-07-31');
    let expectedEnd = moment('2017-09-10');
    let firstDaySame = firstDay.isSame(expectedStart, 'day');
    let isEndDaySame = lastDay.isSame(expectedEnd, 'day');

    expect(days.length).toEqual(42);
    expect(firstDaySame).toEqual(true);
    expect(isEndDaySame).toEqual(true);
  });

  it('EN Locale Thirty Days Method Returns Correct July 2017', () => {
    let days = getFourtyTwoDays(6, 2017);
    let firstDay = days[0];
    let lastDay = days[41];
    let expectedStart = moment('2017-06-26');
    let expectedEnd = moment('2017-08-06');
    let firstDaySame = firstDay.isSame(expectedStart, 'day');
    let isEndDaySame = lastDay.isSame(expectedEnd, 'day');

    expect(days.length).toEqual(42);
    expect(firstDaySame).toEqual(true);
    expect(isEndDaySame).toEqual(true);
  });

  it('EN Locale Thirty Days Method Returns Correct May 2017', () => {
    let days = getFourtyTwoDays(4, 2017);
    let firstDay = days[0];
    let lastDay = days[41];
    let expectedStart = moment('2017-04-24');
    let expectedEnd = moment('2017-06-04');
    let firstDaySame = firstDay.isSame(expectedStart, 'day');
    let isEndDaySame = lastDay.isSame(expectedEnd, 'day');

    expect(days.length).toEqual(42);
    expect(firstDaySame).toEqual(true);
    expect(isEndDaySame).toEqual(true);
  });

  it('EN Locale Thirty Days Method Returns Correct February 2017', () => {
    let days = getFourtyTwoDays(1, 2017);
    let firstDay = days[0];
    let lastDay = days[41];
    let expectedStart = moment('2017-01-30');
    let expectedEnd = moment('2017-03-12');
    let firstDaySame = firstDay.isSame(expectedStart, 'day');
    let isEndDaySame = lastDay.isSame(expectedEnd, 'day');

    expect(days.length).toEqual(42);
    expect(firstDaySame).toEqual(true);
    expect(isEndDaySame).toEqual(true);
  });

  it('EN Locale Thirty Days Method Returns Correct Leap Year', () => {
    let days = getFourtyTwoDays(1, 2016);
    let firstDay = days[0];
    let lastDay = days[41];
    let expectedStart = moment('2016-01-25');
    let expectedEnd = moment('2016-03-06');
    let firstDaySame = firstDay.isSame(expectedStart, 'day');
    let isEndDaySame = lastDay.isSame(expectedEnd, 'day');

    expect(days.length).toEqual(42);
    expect(firstDaySame).toEqual(true);
    expect(isEndDaySame).toEqual(true);
  });

  it('EN Locale Thirty Days Method Returns Correct January 2016', () => {
    let days = getFourtyTwoDays(0, 2016);
    let firstDay = days[0];
    let lastDay = days[41];
    let expectedStart = moment('2015-12-28');
    let expectedEnd = moment('2016-02-07');
    let firstDaySame = firstDay.isSame(expectedStart, 'day');
    let isEndDaySame = lastDay.isSame(expectedEnd, 'day');

    expect(days.length).toEqual(42);
    expect(firstDaySame).toEqual(true);
    expect(isEndDaySame).toEqual(true);
  });

  it('Sunday Start Date Thirty Days Method Returns Correct January 2016', () => {
    let days = getFourtyTwoDays(0, 2016, true);
    let firstDay = days[0];
    let lastDay = days[41];
    let expectedStart = moment('2015-12-27');
    let expectedEnd = moment('2016-02-06');
    let firstDaySame = firstDay.isSame(expectedStart, 'day');
    let isEndDaySame = lastDay.isSame(expectedEnd, 'day');

    expect(days.length).toEqual(42);
    expect(firstDaySame).toEqual(true);
    expect(isEndDaySame).toEqual(true);
  });

  it('Sunday Start Date Thirty Days Method Returns Correct March 2016', () => {
    let days = getFourtyTwoDays(2, 2016, true);
    let firstDay = days[0];
    let lastDay = days[41];
    let expectedStart = moment('2016-02-28');
    let expectedEnd = moment('2016-04-09');
    let firstDaySame = firstDay.isSame(expectedStart, 'day');
    let isEndDaySame = lastDay.isSame(expectedEnd, 'day');

    expect(days.length).toEqual(42);
    expect(firstDaySame).toEqual(true);
    expect(isEndDaySame).toEqual(true);
  });

  it('Sunday Start Date Thirty Days Method Returns Correct May 2016', () => {
    let days = getFourtyTwoDays(4, 2016, true);
    let firstDay = days[0];
    let lastDay = days[41];
    let expectedStart = moment('2016-04-24');
    let expectedEnd = moment('2016-06-04');
    let firstDaySame = firstDay.isSame(expectedStart, 'day');
    let isEndDaySame = lastDay.isSame(expectedEnd, 'day');

    expect(days.length).toEqual(42);
    expect(firstDaySame).toEqual(true);
    expect(isEndDaySame).toEqual(true);
  });

  it('Sunday Start Date Thirty Days Method Returns Correct June 2016', () => {
    let days = getFourtyTwoDays(5, 2016, true);
    let firstDay = days[0];
    let lastDay = days[41];
    let expectedStart = moment('2016-05-29');
    let expectedEnd = moment('2016-07-09');
    let firstDaySame = firstDay.isSame(expectedStart, 'day');
    let isEndDaySame = lastDay.isSame(expectedEnd, 'day');

    expect(days.length).toEqual(42);
    expect(firstDaySame).toEqual(true);
    expect(isEndDaySame).toEqual(true);
  });

  it('Sunday Start Date Thirty Days Method Returns Correct July 2016', () => {
    let days = getFourtyTwoDays(6, 2016, true);
    let firstDay = days[0];
    let lastDay = days[41];
    let expectedStart = moment('2016-06-26');
    let expectedEnd = moment('2016-08-06');
    let firstDaySame = firstDay.isSame(expectedStart, 'day');
    let isEndDaySame = lastDay.isSame(expectedEnd, 'day');

    expect(days.length).toEqual(42);
    expect(firstDaySame).toEqual(true);
    expect(isEndDaySame).toEqual(true);
  });

  it('Sunday Start Date Thirty Days Method Returns Correct August 2016', () => {
    let days = getFourtyTwoDays(7, 2016, true);
    let firstDay = days[0];
    let lastDay = days[41];
    let expectedStart = moment('2016-07-31');
    let expectedEnd = moment('2016-09-10');
    let firstDaySame = firstDay.isSame(expectedStart, 'day');
    let isEndDaySame = lastDay.isSame(expectedEnd, 'day');

    expect(days.length).toEqual(42);
    expect(firstDaySame).toEqual(true);
    expect(isEndDaySame).toEqual(true);
  });

  it('Sunday Start Date Thirty Days Method Returns Correct October 2016', () => {
    let days = getFourtyTwoDays(9, 2016, true);
    let firstDay = days[0];
    let lastDay = days[41];
    let expectedStart = moment('2016-09-25');
    let expectedEnd = moment('2016-11-05');
    let firstDaySame = firstDay.isSame(expectedStart, 'day');
    let isEndDaySame = lastDay.isSame(expectedEnd, 'day');

    expect(days.length).toEqual(42);
    expect(firstDaySame).toEqual(true);
    expect(isEndDaySame).toEqual(true);
  });

  it('Sunday Start Date Thirty Days Method Returns Correct December 2016', () => {
    let days = getFourtyTwoDays(11, 2016, true);
    let firstDay = days[0];
    let lastDay = days[41];
    let expectedStart = moment('2016-11-27');
    let expectedEnd = moment('2017-01-07');
    let firstDaySame = firstDay.isSame(expectedStart, 'day');
    let isEndDaySame = lastDay.isSame(expectedEnd, 'day');

    expect(days.length).toEqual(42);
    expect(firstDaySame).toEqual(true);
    expect(isEndDaySame).toEqual(true);
  });

  it('Sunday Start Date Thirty Days Method Returns Correct January 2017', () => {
    let days = getFourtyTwoDays(0, 2017, true);
    let firstDay = days[0];
    let lastDay = days[41];
    let expectedStart = moment('2016-12-25');
    let expectedEnd = moment('2017-02-04');
    let firstDaySame = firstDay.isSame(expectedStart, 'day');
    let isEndDaySame = lastDay.isSame(expectedEnd, 'day');

    expect(days.length).toEqual(42);
    expect(firstDaySame).toEqual(true);
    expect(isEndDaySame).toEqual(true);
  });

  it('Sunday Start Date Thirty Days Method Returns Correct March 2017', () => {
    let days = getFourtyTwoDays(2, 2017, true);
    let firstDay = days[0];
    let lastDay = days[41];
    let expectedStart = moment('2017-02-26');
    let expectedEnd = moment('2017-04-08');
    let firstDaySame = firstDay.isSame(expectedStart, 'day');
    let isEndDaySame = lastDay.isSame(expectedEnd, 'day');

    expect(days.length).toEqual(42);
    expect(firstDaySame).toEqual(true);
    expect(isEndDaySame).toEqual(true);
  });

  it('Sunday Start Date Thirty Days Method Returns Correct April 2017', () => {
    let days = getFourtyTwoDays(3, 2017, true);
    let firstDay = days[0];
    let lastDay = days[41];
    let expectedStart = moment('2017-03-26');
    let expectedEnd = moment('2017-05-06');
    let firstDaySame = firstDay.isSame(expectedStart, 'day');
    let isEndDaySame = lastDay.isSame(expectedEnd, 'day');

    expect(days.length).toEqual(42);
    expect(firstDaySame).toEqual(true);
    expect(isEndDaySame).toEqual(true);
  });
});
