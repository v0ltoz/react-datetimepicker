import { configure, mount } from 'enzyme/build';
import { FormControl } from 'react-bootstrap';
import React from 'react';
import moment from 'moment';
import Adapter from 'enzyme-adapter-react-15';
import DateTimeRangeContainer from '../../DateTimeRangeContainer';
import ActiveNotifier from '../../date_picker/ActiveNotifier';
import Cell from '../../calendar/Cell';

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
let applyCallback = (startDate, endDate) => {};
const dateTimeRangeContainerSmartMode = mount(
  <DateTimeRangeContainer
    ranges={ranges}
    start={start}
    end={end}
    local={local}
    applyCallback={applyCallback}
    smartMode
  >
    <FormControl
      id="formControlsTextB"
      type="text"
      label="Text"
      placeholder="Enter text"
    />
  </DateTimeRangeContainer>,
);

const dateTimeRangeContainer = mount(
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

describe('Selecting Mode Changes Tests', () => {
  it('Smart mode starts with Selecting From Only', () => {
    let notifier = dateTimeRangeContainerSmartMode.find(ActiveNotifier);
    expect(
      notifier
        .at(0)
        .children()
        .text(),
    ).toEqual('Selecting From  ');
    expect(
      notifier
        .at(1)
        .children()
        .text(),
    ).toEqual('');
  });

  it('Smart mode on select changed to only Selecting To', () => {
    dateTimeRangeContainerSmartMode
      .find(Cell)
      .at(0)
      .children()
      .props()
      .onClick();
    dateTimeRangeContainerSmartMode.update();
    let notifier = dateTimeRangeContainerSmartMode.find(ActiveNotifier);
    expect(
      notifier
        .at(0)
        .children()
        .text(),
    ).toEqual('');
    expect(
      notifier
        .at(1)
        .children()
        .text(),
    ).toEqual('Selecting To  ');
  });

  it('Smart mode on select changed to Selecting From, previously Selecting To ', () => {
    let cellLength = dateTimeRangeContainerSmartMode.find(Cell).length;
    dateTimeRangeContainerSmartMode
      .find(Cell)
      .at(cellLength - 1)
      .children()
      .props()
      .onClick();
    dateTimeRangeContainerSmartMode.update();
    let notifier = dateTimeRangeContainerSmartMode.find(ActiveNotifier);
    expect(
      notifier
        .at(0)
        .children()
        .text(),
    ).toEqual('Selecting From  ');
    expect(
      notifier
        .at(1)
        .children()
        .text(),
    ).toEqual('');
  });

  it('No Smart Mode, both From and To Show', () => {
    // dateTimeRangeContainer
    //   .find(Cell)
    //   .at(0)
    //   .children()
    //   .props()
    //   .onClick();
    // dateTimeRangeContainerSmartMode.update();
    // let notifier = dateTimeRangeContainerSmartMode.find(ActiveNotifier);
    // expect(
    //   notifier
    //     .at(0)
    //     .children()
    //     .text(),
    // ).toEqual('');
    // expect(
    //   notifier
    //     .at(1)
    //     .children()
    //     .text(),
    // ).toEqual('Selecting To  ');
  });
});
