import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import moment from 'moment';
import { FormControl } from 'react-bootstrap';
import DateTimeRangeContainer from '../../DateTimeRangeContainer';

configure({ adapter: new Adapter() });
let now = new Date();
let start = moment(
  new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0),
);
let end = moment(start)
  .add(1, 'days')
  .subtract(1, 'seconds');
let ranges = {
  'Today Only': [moment(start), moment(end)],
  'Yesterday Only': [
    moment(start).subtract(1, 'days'),
    moment(end).subtract(1, 'days'),
  ],
  '3 Days': [moment(start).subtract(3, 'days'), moment(end)],
  '5 Days': [moment(start).subtract(5, 'days'), moment(end)],
  '1 Week': [moment(start).subtract(7, 'days'), moment(end)],
  '2 Weeks': [moment(start).subtract(14, 'days'), moment(end)],
  '1 Month': [moment(start).subtract(1, 'months'), moment(end)],
  '90 Days': [moment(start).subtract(90, 'days'), moment(end)],
  '1 Year': [moment(start).subtract(1, 'years'), moment(end)],
};
let local = {
  format: 'DD-MM-YYYY HH:mm',
  sundayFirst: false,
};
// let maxDate = moment(start).add(24, "hour");
let applyCallback = (startDate, endDate) => {
  console.log(startDate);
  console.log(endDate);
};
const dateTimeRangeContainerExpectedUse = mount(
  <DateTimeRangeContainer
    ranges={ranges}
    start={start}
    end={end}
    local={local}
    applyCallback={applyCallback}
  >
    <FormControl
      id="formControlsTextB"
      type="text"
      label="Text"
      placeholder="Enter text"
    />
  </DateTimeRangeContainer>,
);

const dateTimeRangeContainerNoChildren = mount(
  <DateTimeRangeContainer
    ranges={ranges}
    start={start}
    end={end}
    local={local}
    applyCallback={applyCallback}
  />,
);

describe('DateTimeRangeContainer', () => {
  it("Always Renders Div's", () => {
    expect(dateTimeRangeContainerExpectedUse.length).toBeGreaterThan(0);
  });

  it('Always render children Div and Daterange div', () => {
    const wrappingDiv = dateTimeRangeContainerExpectedUse
      .first()
      .children()
      .children();
    // console.log(wrappingDiv.debug());
    expect(wrappingDiv.length).toBeGreaterThan(1);
  });

  it('No Child Present, Children Div Not rendered', () => {
    const wrappingDiv = dateTimeRangeContainerNoChildren
      .first()
      .children()
      .children();
    expect(wrappingDiv.length).toBe(1);
  });
});
