import moment from 'moment';
import { propValidation } from '../../utils/PropValidation';

describe('Prop Validation Tests', () => {
  it('Prop years error when not an array', () => {
    let props = { years: 2012 };
    let validation = propValidation(props);
    expect(validation).toEqual(
      'Year props should be an array e.g. [2019, 2020]',
    );
  });

  it('Prop error when years not array of 2', () => {
    let start = moment(new Date(2018, 1, 1, 0, 0, 0, 0));
    let end = moment(new Date(2012, 1, 1, 0, 0, 0, 0));
    let props = { years: [2012], start, end };
    let validation = propValidation(props);
    expect(validation).toEqual(
      'Year props should be an array of 2, with the first number being the start date and the second being the end',
    );
  });

  it('Prop error when start date not in years defined', () => {
    let start = moment(new Date(2018, 1, 1, 0, 0, 0, 0));
    let end = moment(new Date(2012, 1, 1, 0, 0, 0, 0));
    let props = { years: [2012, 2013], start, end };
    let validation = propValidation(props);
    expect(validation).toEqual(
      'Start year should be in the custom years defined',
    );
  });

  it('Prop error when end date not in years defined', () => {
    let start = moment(new Date(2012, 1, 1, 0, 0, 0, 0));
    let end = moment(new Date(2018, 1, 1, 0, 0, 0, 0));
    let props = { years: [2012, 2013], start, end };
    let validation = propValidation(props);
    expect(validation).toEqual(
      'End year should be in the custom years defined',
    );
  });

  it('No prop error when end date in years defined', () => {
    let start = moment(new Date(2012, 1, 1, 0, 0, 0, 0));
    let end = moment(new Date(2012, 1, 1, 0, 0, 0, 0));
    let props = { years: [2012, 2013], start, end };
    let validation = propValidation(props);
    expect(validation).toEqual(true);
  });

  it('No prop error when start date in years defined', () => {
    let start = moment(new Date(2012, 1, 1, 0, 0, 0, 0));
    let end = moment(new Date(2012, 1, 1, 0, 0, 0, 0));
    let props = { years: [2012, 2013], start, end };
    let validation = propValidation(props);
    expect(validation).toEqual(true);
  });

  it('Prop error when years start date after end', () => {
    let start = moment(new Date(2014, 1, 1, 0, 0, 0, 0));
    let end = moment(new Date(2014, 1, 1, 0, 0, 0, 0));
    let props = { years: [2014, 2013], start, end };
    let validation = propValidation(props);
    expect(validation).toEqual('Start year must be before the end');
  });

  it('No prop error when years start date equals end', () => {
    let start = moment(new Date(2013, 1, 1, 0, 0, 0, 0));
    let end = moment(new Date(2013, 1, 1, 0, 0, 0, 0));
    let props = { years: [2013, 2013], start, end };
    let validation = propValidation(props);
    expect(validation).toEqual(true);
  });

  it('No prop error when years start date before end', () => {
    let start = moment(new Date(2013, 1, 1, 0, 0, 0, 0));
    let end = moment(new Date(2013, 1, 1, 0, 0, 0, 0));
    let props = { years: [2010, 2013], start, end };
    let validation = propValidation(props);
    expect(validation).toEqual(true);
  });
});
