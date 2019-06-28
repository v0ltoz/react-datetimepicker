import moment from 'moment';
import { datePicked, pastMaxDate } from '../../utils/DateSelectedUtils';
moment.locale('en');

describe('Time Function Utils Tests', () => {
  it('Date Picked, Start Mode, Start Before End Check', () => {
    let start = moment(new Date(2018, 0, 0));
    let newDate = moment(new Date(2018, 0, 10));
    let end = moment(new Date(2018, 1, 1));
    let dates = datePicked(start, end, newDate, true);

    let expectedStartDate = moment(new Date(2018, 0, 10));
    let expectedEndDate = moment(new Date(2018, 1, 1));

    expect(expectedStartDate.isSame(dates.startDate, 'day')).toEqual(true);
    expect(expectedEndDate.isSame(dates.endDate, 'day')).toEqual(true);
  });

  it('Date Picked, Start Mode, Start Same As End Check', () => {
    let start = moment(new Date(2018, 0, 0));
    let newDate = moment(new Date(2018, 0, 0));
    let end = moment(new Date(2018, 0, 0));
    let dates = datePicked(start, end, newDate, true);

    let expectedStartDate = moment(new Date(2018, 0, 0));
    let expectedEndDate = moment(new Date(2018, 0, 0));

    expect(expectedStartDate.isSame(dates.startDate, 'day')).toEqual(true);
    expect(expectedEndDate.isSame(dates.endDate, 'day')).toEqual(true);
  });

  it('Date Picked, Start Mode, Start After End Check, Smart Mode Enabled', () => {
    let start = moment(new Date(2018, 0, 0));
    let newDate = moment(new Date(2018, 0, 10));
    let end = moment(new Date(2018, 0, 0));
    let dates = datePicked(start, end, newDate, true, true);

    let expectedStartDate = moment(new Date(2018, 0, 10));
    let expectedEndDate = moment(new Date(2018, 0, 11));

    expect(expectedStartDate.isSame(dates.startDate, 'day')).toEqual(true);
    expect(expectedEndDate.isSame(dates.endDate, 'day')).toEqual(true);
  });

  it('Date Picked, Start Mode, Start After End Check, Smart Mode Disabled', () => {
    let start = moment(new Date(2018, 0, 0, 0, 0));
    let newDate = moment(new Date(2018, 0, 10, 0, 0));
    let end = moment(new Date(2018, 0, 1, 0, 0));
    let dates = datePicked(start, end, newDate, true, false);

    let expectedStartDate = moment(new Date(2018, 0, 0));
    let expectedEndDate = moment(new Date(2018, 0, 1));

    expect(expectedStartDate.isSame(dates.startDate, 'day')).toEqual(true);
    expect(expectedEndDate.isSame(dates.endDate, 'day')).toEqual(true);
  });

  it('Date Picked, Start Mode, Start After End Check (By 1 Minute), Smart Mode Disabled', () => {
    let start = moment(new Date(2018, 0, 0, 1, 0));
    let newDate = moment(new Date(2018, 0, 1, 1, 0));
    let end = moment(new Date(2018, 0, 1, 0, 0));
    let dates = datePicked(start, end, newDate, true, false);

    let expectedStartDate = moment(new Date(2018, 0, 0));
    let expectedEndDate = moment(new Date(2018, 0, 1));

    expect(expectedStartDate.isSame(dates.startDate, 'day')).toEqual(true);
    expect(expectedEndDate.isSame(dates.endDate, 'day')).toEqual(true);
  });

  it('Date Picked, Start Mode, Start Exactly End Check, Smart Mode Disabled', () => {
    let start = moment(new Date(2018, 0, 0, 1, 0));
    let newDate = moment(new Date(2018, 0, 1, 1, 0));
    let end = moment(new Date(2018, 0, 1, 1, 0));
    let dates = datePicked(start, end, newDate, true, false);

    let expectedStartDate = moment(new Date(2018, 0, 1));
    let expectedEndDate = moment(new Date(2018, 0, 1));

    expect(expectedStartDate.isSame(dates.startDate, 'day')).toEqual(true);
    expect(expectedEndDate.isSame(dates.endDate, 'day')).toEqual(true);
  });

  it('Date Picked, Start Mode, Start Before End Check, Smart Mode Disabled', () => {
    let start = moment(new Date(2018, 0, 0, 0, 0));
    let newDate = moment(new Date(2018, 0, 0, 0, 0));
    let end = moment(new Date(2018, 0, 1, 1, 0));
    let dates = datePicked(start, end, newDate, true, false);

    let expectedStartDate = moment(new Date(2018, 0, 0));
    let expectedEndDate = moment(new Date(2018, 0, 1));

    expect(expectedStartDate.isSame(dates.startDate, 'day')).toEqual(true);
    expect(expectedEndDate.isSame(dates.endDate, 'day')).toEqual(true);
  });

  it('Date Picked, End Mode, End After Start Check', () => {
    let start = moment(new Date(2018, 0, 0));
    let newDate = moment(new Date(2018, 0, 10));
    let end = moment(new Date(2018, 1, 1));
    let dates = datePicked(start, end, newDate, false);

    let expectedStartDate = moment(new Date(2018, 0, 0));
    let expectedEndDate = moment(new Date(2018, 0, 10));

    expect(expectedStartDate.isSame(dates.startDate, 'day')).toEqual(true);
    expect(expectedEndDate.isSame(dates.endDate, 'day')).toEqual(true);
  });

  it('Date Picked, End Mode, End After Start Check, Smart Mode Disabled', () => {
    let start = moment(new Date(2018, 0, 0));
    let newDate = moment(new Date(2018, 0, 10));
    let end = moment(new Date(2018, 1, 1));
    let dates = datePicked(start, end, newDate, false);

    let expectedStartDate = moment(new Date(2018, 0, 0));
    let expectedEndDate = moment(new Date(2018, 0, 10));

    expect(expectedStartDate.isSame(dates.startDate, 'day')).toEqual(true);
    expect(expectedEndDate.isSame(dates.endDate, 'day')).toEqual(true);
  });

  it('Date Picked, End Mode, End Same As Start Check', () => {
    let start = moment(new Date(2018, 0, 0));
    let newDate = moment(new Date(2018, 0, 0));
    let end = moment(new Date(2018, 0, 0));
    let dates = datePicked(start, end, newDate, false);

    let expectedStartDate = moment(new Date(2018, 0, 0));
    let expectedEndDate = moment(new Date(2018, 0, 0));

    expect(expectedStartDate.isSame(dates.startDate, 'day')).toEqual(true);
    expect(expectedEndDate.isSame(dates.endDate, 'day')).toEqual(true);
  });

  it('Date Picked, End Mode, End Before Start Check', () => {
    let start = moment(new Date(2018, 0, 0));
    let newDate = moment(new Date(2017, 11, 30));
    let end = moment(new Date(2018, 0, 0));
    let dates = datePicked(start, end, newDate, false, true);

    let expectedStartDate = moment(new Date(2017, 11, 29));
    let expectedEndDate = moment(new Date(2017, 11, 30));

    expect(expectedStartDate.isSame(dates.startDate, 'day')).toEqual(true);
    expect(expectedEndDate.isSame(dates.endDate, 'day')).toEqual(true);
  });

  it('Past Max Date Test, No Max Date', () => {
    let currentDate = moment(new Date(2018, 0, 0));
    let maxDate = moment(new Date(2018, 0, 10));
    let outcome = pastMaxDate(currentDate);
    expect(outcome).toEqual(false);
  });

  it('Past Max Date Test, Minute Mode, Date Past Max', () => {
    let currentDate = moment(new Date(2018, 0, 0, 10));
    let maxDate = moment(new Date(2018, 0, 0));
    let outcome = pastMaxDate(currentDate, maxDate, true);
    expect(outcome).toEqual(true);
  });

  it('Past Max Date Test, Minute Mode, Date Not Past Max', () => {
    let currentDate = moment(new Date(2018, 0, 0));
    let maxDate = moment(new Date(2018, 0, 10));
    let outcome = pastMaxDate(currentDate, maxDate, true);
    expect(outcome).toEqual(false);
  });

  it('Past Max Date Test, Not Minute Mode, Date Not Past Max', () => {
    let currentDate = moment(new Date(2018, 0, 0));
    let maxDate = moment(new Date(2018, 0, 25));
    let outcome = pastMaxDate(currentDate, maxDate, false);
    expect(outcome).toEqual(false);
  });

  it('Past Max Date Test, Not Minute Mode, Date Past Max', () => {
    let currentDate = moment(new Date(2018, 0, 10));
    let maxDate = moment(new Date(2018, 0, 0));
    let outcome = pastMaxDate(currentDate, maxDate, false);
    expect(outcome).toEqual(true);
  });

  it('Past Max Date Test, Not Minute Mode, Date Not Past Max, Hour Is Though', () => {
    let currentDate = moment(new Date(2018, 0, 0, 1));
    let maxDate = moment(new Date(2018, 0, 0));
    let outcome = pastMaxDate(currentDate, maxDate, false);
    expect(outcome).toEqual(false);
  });
});
