import moment from 'moment';
import {
  invalidStyle,
  hoverCellStyle,
  inBetweenStyle,
  isValidTimeChange,
  getMonth,
} from '../../utils/TimeFunctionUtils';
moment.locale('en');

describe('Time Function Utils Tests', () => {
  it('Invalid Style Contains not-allowed cursor', () => {
    let style = invalidStyle();
    expect(style.cursor).toEqual('not-allowed');
  });

  it('Hover Style non between returns 4px border', () => {
    let style = hoverCellStyle(false);
    expect(style.borderRadius).toEqual('4px 4px 4px 4px');
  });

  it('Hover Style non between returns 0px border', () => {
    let style = hoverCellStyle(true);
    expect(style.borderRadius).toEqual('0 0 0 0');
  });

  it('In Between Style returns pointer cursor', () => {
    let style = inBetweenStyle();
    expect(style.cursor).toEqual('pointer');
  });

  it('Is Valid Time Change Mode Start, Start before End', () => {
    let startDate = moment();
    let endDate = moment();
    let outcome = isValidTimeChange('start', startDate, startDate, endDate);
    expect(outcome).toEqual(true);
  });

  it('Is invalid Time Change Mode Start, End before Start', () => {
    let startDate = moment();
    startDate.add(1, 'days');
    let endDate = moment();
    let outcome = isValidTimeChange('start', startDate, startDate, endDate);
    expect(outcome).toEqual(false);
  });

  it('Is Valid Time Change Mode End, End before Start', () => {
    let startDate = moment();
    let endDate = moment();
    endDate.subtract(1, 'days');
    let outcome = isValidTimeChange('end', endDate, startDate, endDate);
    expect(outcome).toEqual(false);
  });

  it('Is Valid Time Change Mode End, End after Start', () => {
    let startDate = moment();
    let endDate = moment();
    let outcome = isValidTimeChange('end', endDate, startDate, endDate);
    expect(outcome).toEqual(true);
  });

  it('Work Out Month, Both Months Different Months', () => {
    let startDate = moment(new Date(2018, 0, 1));
    startDate.subtract(1, 'month');
    let endDate = moment(new Date(2018, 0, 2));
    let outcome = getMonth(startDate, endDate, 'start');
    expect(outcome).toEqual(11);
  });

  it('Work Out Month, Both Months Same Months and Same Year, Start mode, PastFriendly so previous month expected', () => {
    let startDate = moment(new Date(2018, 0, 1));
    let endDate = moment(new Date(2018, 0, 2));
    let outcome = getMonth(startDate, endDate, 'start', true, true);
    expect(outcome).toEqual(11);
  });

  it('Work Out Month, Both Months Same Months and Same Year, End mode, PastFriendly so previous month expected', () => {
    let startDate = moment(new Date(2018, 0, 1));
    let endDate = moment(new Date(2018, 0, 2));
    let outcome = getMonth(startDate, endDate, 'end', true, true);
    expect(outcome).toEqual(0);
  });

  it('Work Out Month, Both Months Same Months and Same Year, Start mode, not PastFriendly so same month expected', () => {
    let startDate = moment(new Date(2018, 0, 1));
    let endDate = moment(new Date(2018, 0, 2));
    let outcome = getMonth(startDate, endDate, 'start', false, true);
    expect(outcome).toEqual(0);
  });

  it('Work Out Month, Both Months Same Months and Same Year, not PastFriendly so next month expected', () => {
    let startDate = moment(new Date(2018, 0, 1));
    let endDate = moment(new Date(2018, 0, 2));
    let outcome = getMonth(startDate, endDate, 'end', false, true);
    expect(outcome).toEqual(1);
  });

  it('Work Out Month, Both Months Same Months and Different Year', () => {
    let startDate = moment(new Date(2017, 0, 1));
    let endDate = moment(new Date(2018, 0, 2));
    let outcome = getMonth(startDate, endDate, 'start');
    expect(outcome).toEqual(0);
  });
});
