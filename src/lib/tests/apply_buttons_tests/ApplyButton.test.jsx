import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import moment from 'moment';
import { FormControl } from 'react-bootstrap';
import DateTimeRangeContainer from '../../DateTimeRangeContainer';
import ApplyCancelButtons from '../../date_picker/ApplyCancelButtons';
import RangeButton from '../../ranges/RangeButton';
import Cell from '../../calendar/Cell';
import MonthYearSelector from '../../calendar/MonthYearSelector';
import TimeField from '../../date_picker/TimeField';
import DateField from '../../date_picker/DateField';
import { DateTimeRangePicker, momentFormat } from '../../DateTimeRangePicker';

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
let startDateCallback = '';
let endDateCallback = '';
let applyCallback = (startDate, endDate) => {
  startDateCallback = startDate;
  endDateCallback = endDate;
};
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
let dateTimeRangeContainerAutoApply = mount(
  <DateTimeRangeContainer
    ranges={ranges}
    start={start}
    end={end}
    local={local}
    applyCallback={applyCallback}
    autoApply
  >
    <FormControl
      id="formControlsTextB"
      type="text"
      label="Text"
      placeholder="Enter text"
    />
  </DateTimeRangeContainer>,
);

let dateTimeRangeContainerSmartModeAutoApply = mount(
  <DateTimeRangeContainer
    ranges={ranges}
    start={start}
    end={end}
    local={local}
    applyCallback={applyCallback}
    autoApply
    smartMode
    pastSearchFriendly
  >
    <FormControl
      id="formControlsTextB"
      type="text"
      label="Text"
      placeholder="Enter text"
    />
  </DateTimeRangeContainer>,
);

describe('Apply Button Tests Non Auto Apply', () => {
  beforeEach(() => {
    startDateCallback = '';
    endDateCallback = '';
    start = moment(
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0),
    );
    end = moment(start)
      .add(1, 'days')
      .subtract(1, 'seconds');
  });

  it('Render Apply and Cancel Buttons', () => {
    let applyCancelButtons = dateTimeRangeContainer.find(ApplyCancelButtons);
    let applyButton = applyCancelButtons.find('.applyButton');
    expect(applyButton.text()).toEqual('Apply');
    let cancelButton = applyCancelButtons.find('.cancelButton');
    expect(cancelButton.text()).toEqual('Cancel');
  });

  it('On Click of Apply Button Return Two Dates to Callback', () => {
    let applyCancelButtons = dateTimeRangeContainer.find(ApplyCancelButtons);
    let applyButton = applyCancelButtons.find('.applyButton');
    applyButton.props().onClick();
    expect(startDateCallback).toEqual(start);
    expect(endDateCallback).toEqual(end);
  });

  it('On Click of Apply Button Close Picker', () => {
    dateTimeRangeContainer.setState({ visible: true });
    let applyCancelButtons = dateTimeRangeContainer.find(ApplyCancelButtons);
    let applyButton = applyCancelButtons.find('.applyButton');
    applyButton.props().onClick();
    dateTimeRangeContainer.update();
    let visible = dateTimeRangeContainer.state().visible;
    expect(visible).toEqual(false);
    let picker = dateTimeRangeContainer.find('#daterangepicker');
    expect(picker.props().style.display).toEqual('none');
  });

  it('On Click of Cancel Button Close Picker', () => {
    dateTimeRangeContainer.setState({ visible: true });
    let applyCancelButtons = dateTimeRangeContainer.find(ApplyCancelButtons);
    let cancelButton = applyCancelButtons.find('.cancelButton');
    cancelButton.props().onClick();
    dateTimeRangeContainer.update();
    let visible = dateTimeRangeContainer.state().visible;
    expect(visible).toEqual(false);
    let picker = dateTimeRangeContainer.find('#daterangepicker');
    expect(picker.props().style.display).toEqual('none');
  });

  it('On Click of Range Button Doesnt Call Apply Callback', () => {
    let rangeButton = dateTimeRangeContainer
      .find(RangeButton)
      .first()
      .find('div')
      .first();
    rangeButton.props().onMouseDown();
    dateTimeRangeContainer.update();
    expect(startDateCallback).toEqual('');
    expect(endDateCallback).toEqual('');
  });

  it('On Click of Date Doesnt Call Apply Callback', () => {
    let firstCalenderCell = dateTimeRangeContainer
      .find(Cell)
      .first()
      .find('div')
      .first();
    firstCalenderCell.props().onClick();
    dateTimeRangeContainer.update();
    expect(startDateCallback).toEqual('');
    expect(endDateCallback).toEqual('');
  });

  // CANT GET THIS TEST TO WORK DOESNT SEEM TO WORK WITH EVENT LISTENERS
  // MANUAL TEST REQUIRED
  // it('On Keyboard Left Press of Date Doesnt Call Apply Callback', () => {
  //   let firstCalenderCellDiv = dateTimeRangeContainer
  //     .find(Cell)
  //     .first()
  //     .find('div')
  //     .first();
  //   firstCalenderCellDiv.props().onClick();
  //   dateTimeRangeContainer.update();
  //   let picker = dateTimeRangeContainer.find(DateTimeRangePicker);
  //   let startDate = picker.state().start;
  //   let firstCalenderCell = dateTimeRangeContainer
  //     .find(Cell)
  //     .first()
  //     .find('div')
  //     .first();
  //
  //   firstCalenderCell.simulate('focus');
  //   firstCalenderCell.simulate('keydown', {
  //     keyCode : 39
  //   });
  //   dateTimeRangeContainer.update();
  //   picker = dateTimeRangeContainer.find(DateTimeRangePicker);
  //   startDate = picker.state().start;
  //   expect(startDateCallback).toEqual('');
  //   expect(endDateCallback).toEqual('');
  // });

  it('On Change of Hour Doesnt Call Apply Callback', () => {
    let hourTimeSelector = dateTimeRangeContainer
      .find(TimeField)
      .first()
      .find('select')
      .first();
    hourTimeSelector.simulate('change', { target: { value: '10' } });
    dateTimeRangeContainer.update();
    hourTimeSelector = dateTimeRangeContainer
      .find(TimeField)
      .first()
      .find('select')
      .first();
    expect(hourTimeSelector.props().value).toEqual(10);
    expect(startDateCallback).toEqual('');
    expect(endDateCallback).toEqual('');
  });

  it('On Change of Minute Doesnt Call Apply Callback', () => {
    let minuteTimeSelector = dateTimeRangeContainer
      .find(TimeField)
      .first()
      .find('select')
      .last();
    minuteTimeSelector.simulate('change', { target: { value: '50' } });
    dateTimeRangeContainer.update();
    minuteTimeSelector = dateTimeRangeContainer
      .find(TimeField)
      .first()
      .find('select')
      .last();
    expect(minuteTimeSelector.props().value).toEqual(50);
    expect(startDateCallback).toEqual('');
    expect(endDateCallback).toEqual('');
  });

  it('On Change of From Date Doesnt Call Apply Callback', () => {
    let minuteTimeSelector = dateTimeRangeContainer
      .find(DateField)
      .first()
      .find(FormControl)
      .first();
    minuteTimeSelector.simulate('focus');
    minuteTimeSelector.simulate('change', {
      target: { value: '05-07-2016 23:58' },
    });
    minuteTimeSelector.simulate('blur');
    dateTimeRangeContainer.update();
    minuteTimeSelector = dateTimeRangeContainer
      .find(DateField)
      .first()
      .find(FormControl)
      .first();
    expect(minuteTimeSelector.props().value).toEqual('05-07-2016 23:58');
    let picker = dateTimeRangeContainer.find(DateTimeRangePicker);
    expect(picker.state().startLabel).toEqual('05-07-2016 23:58');
    let newDate = moment('05-07-2016 23:58', momentFormat);
    expect(picker.state().start).toEqual(moment(newDate));
    expect(startDateCallback).toEqual('');
    expect(endDateCallback).toEqual('');
  });
});

describe('Apply Button Tests Auto Apply Parameter', () => {
  beforeEach(() => {
    startDateCallback = '';
    endDateCallback = '';
    start = moment(
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0),
    );
    end = moment(start)
      .add(1, 'days')
      .subtract(1, 'seconds');
    dateTimeRangeContainerAutoApply = mount(
      <DateTimeRangeContainer
        ranges={ranges}
        start={start}
        end={end}
        local={local}
        applyCallback={applyCallback}
        autoApply
      >
        <FormControl
          id="formControlsTextB"
          type="text"
          label="Text"
          placeholder="Enter text"
        />
      </DateTimeRangeContainer>,
    );

    dateTimeRangeContainerSmartModeAutoApply = mount(
      <DateTimeRangeContainer
        ranges={ranges}
        start={start}
        end={end}
        local={local}
        applyCallback={applyCallback}
        autoApply
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
  });

  it('Render Close Button', () => {
    let applyCancelButtons = dateTimeRangeContainerAutoApply.find(
      ApplyCancelButtons,
    );
    let applyButton = applyCancelButtons.find('.applyButton');
    expect(applyButton.length).toEqual(0);
    let cancelButton = applyCancelButtons.find('.cancelButton');
    expect(cancelButton.text()).toEqual('Close');
  });

  it('On Click of Close Button Close Picker', () => {
    dateTimeRangeContainerAutoApply.setState({ visible: true });
    let applyCancelButtons = dateTimeRangeContainerAutoApply.find(
      ApplyCancelButtons,
    );
    let cancelButton = applyCancelButtons.find('.cancelButton');
    cancelButton.props().onClick();
    dateTimeRangeContainerAutoApply.update();
    let visible = dateTimeRangeContainerAutoApply.state().visible;
    expect(visible).toEqual(false);
    let picker = dateTimeRangeContainerAutoApply.find('#daterangepicker');
    expect(picker.props().style.display).toEqual('none');
  });

  it('On Click of Range Button Does Call Apply Callback', () => {
    let rangeButton = dateTimeRangeContainerAutoApply
      .find(RangeButton)
      .first()
      .find('div')
      .first();
    rangeButton.props().onMouseDown();
    dateTimeRangeContainerAutoApply.update();
    expect(startDateCallback).toEqual(start);
    expect(endDateCallback).toEqual(end);
  });

  it('On Click of Range Button Custom Value Doesnt Call Apply Callback', () => {
    // Done as impossible to set date using custom value it is actually set through
    // the date picker not through ranges
    let rangeButton = dateTimeRangeContainerAutoApply
      .find(RangeButton)
      .last()
      .find('div')
      .first();
    rangeButton.props().onMouseDown();
    dateTimeRangeContainerAutoApply.update();
    expect(startDateCallback).toEqual('');
    expect(endDateCallback).toEqual('');
  });

  it('On Click of Date Does Call Apply Callback', () => {
    let firstCalenderCell = dateTimeRangeContainerAutoApply
      .find(Cell)
      .first()
      .find('div')
      .first();
    firstCalenderCell.props().onClick();
    let dateFirstCell = dateTimeRangeContainerAutoApply
      .find(Cell)
      .first()
      .props().cellDay;
    dateTimeRangeContainerAutoApply.update();
    let startDateCallbackSame = startDateCallback.isSame(
      dateFirstCell,
      'minute',
    );
    let endDateCallbackSame = endDateCallback.isSame(end, 'minute');
    expect(startDateCallbackSame).toEqual(true);
    expect(endDateCallbackSame).toEqual(true);
  });

  // CANT GET THIS TEST TO WORK DOESNT SEEM TO WORK WITH EVENT LISTENERS
  // MANUAL TEST REQUIRED
  // it('On Keyboard Left Press of Date Doesnt Call Apply Callback', () => {
  //   let firstCalenderCellDiv = dateTimeRangeContainer
  //     .find(Cell)
  //     .first()
  //     .find('div')
  //     .first();
  //   firstCalenderCellDiv.props().onClick();
  //   dateTimeRangeContainer.update();
  //   let picker = dateTimeRangeContainer.find(DateTimeRangePicker);
  //   let startDate = picker.state().start;
  //   let firstCalenderCell = dateTimeRangeContainer
  //     .find(Cell)
  //     .first()
  //     .find('div')
  //     .first();
  //
  //   firstCalenderCell.simulate('focus');
  //   firstCalenderCell.simulate('keydown', {
  //     keyCode : 39
  //   });
  //   dateTimeRangeContainer.update();
  //   picker = dateTimeRangeContainer.find(DateTimeRangePicker);
  //   startDate = picker.state().start;
  //   expect(startDateCallback).toEqual('');
  //   expect(endDateCallback).toEqual('');
  // });

  it('On Change of Hour Does Call Apply Callback', () => {
    let hourTimeSelector = dateTimeRangeContainerAutoApply
      .find(TimeField)
      .first()
      .find('select')
      .first();
    hourTimeSelector.simulate('change', { target: { value: '10' } });
    dateTimeRangeContainerAutoApply.update();
    // Get new selector after update
    hourTimeSelector = dateTimeRangeContainerAutoApply
      .find(TimeField)
      .first()
      .find('select')
      .first();

    let startExpected = moment(start).hour(10);
    let startDateCallbackSame = startExpected.isSame(
      startDateCallback,
      'minute',
    );
    let endDateCallbackSame = end.isSame(endDateCallback, 'minute');
    expect(hourTimeSelector.props().value).toEqual(10);
    expect(startDateCallbackSame).toEqual(true);
    expect(endDateCallbackSame).toEqual(true);
  });

  it('On Change of Minute Does Call Apply Callback', () => {
    let minuteTimeSelector = dateTimeRangeContainerAutoApply
      .find(TimeField)
      .first()
      .find('select')
      .last();
    minuteTimeSelector.simulate('change', { target: { value: '50' } });
    dateTimeRangeContainerAutoApply.update();
    minuteTimeSelector = dateTimeRangeContainerAutoApply
      .find(TimeField)
      .first()
      .find('select')
      .last();

    let startExpected = moment(start).minute(50);
    let startDateCallbackSame = startExpected.isSame(
      startDateCallback,
      'minute',
    );
    let endDateCallbackSame = end.isSame(endDateCallback, 'minute');
    expect(minuteTimeSelector.props().value).toEqual(50);
    expect(startDateCallbackSame).toEqual(true);
    expect(endDateCallbackSame).toEqual(true);
  });

  it('On Change of From Date Does Call Apply Callback', () => {
    let dateFieldForm = dateTimeRangeContainerAutoApply
      .find(DateField)
      .first()
      .find(FormControl)
      .first();
    dateFieldForm.simulate('focus');
    dateFieldForm.simulate('change', {
      target: { value: '05-07-2016 23:58' },
    });
    dateFieldForm.simulate('blur');
    dateTimeRangeContainerAutoApply.update();
    dateFieldForm = dateTimeRangeContainerAutoApply
      .find(DateField)
      .first()
      .find(FormControl)
      .first();
    expect(dateFieldForm.props().value).toEqual('05-07-2016 23:58');
    let picker = dateTimeRangeContainerAutoApply.find(DateTimeRangePicker);
    expect(picker.state().startLabel).toEqual('05-07-2016 23:58');
    let newDate = moment('05-07-2016 23:58', momentFormat);
    expect(picker.state().start).toEqual(moment(newDate));
    expect(startDateCallback).toEqual(newDate);
    expect(endDateCallback).toEqual(end);
  });

  it('On Change of From Date Does Call Apply Callback, When From Date is After Original To Date, Smart Mode', () => {
    let newStartDate = moment(end).add(1, 'day');
    let newStartDateString = newStartDate.format(momentFormat);

    let dateFieldForm = dateTimeRangeContainerSmartModeAutoApply
      .find(DateField)
      .first()
      .find(FormControl)
      .first();
    dateFieldForm.simulate('focus');
    dateFieldForm.simulate('change', {
      target: { value: newStartDateString },
    });
    dateFieldForm.simulate('blur');
    dateTimeRangeContainerSmartModeAutoApply.update();
    dateFieldForm = dateTimeRangeContainerSmartModeAutoApply
      .find(DateField)
      .first()
      .find(FormControl)
      .first();
    expect(dateFieldForm.props().value).toEqual(newStartDateString);
    let picker = dateTimeRangeContainerSmartModeAutoApply.find(DateTimeRangePicker);
    expect(picker.state().startLabel).toEqual(newStartDateString);
    let newDate = moment(newStartDateString, momentFormat);
    expect(picker.state().start).toEqual(moment(newDate));
    expect(startDateCallback).toEqual(newDate);
    // because the From date is now after the original To date a new To date
    // will have been calculated. This is +1 day after the new start date
    let newEndDate = moment(newStartDate).add(1, 'day');
    let endDateCallbackSame = newEndDate.isSame(endDateCallback, 'minute');
    expect(endDateCallbackSame).toEqual(true);
  });

  it('On Change of From Date Doesnt Call Apply Callback, When From Date is After Original To Date,  Non Smart Mode', () => {
    let newStartDate = moment(end).add(1, 'day');
    let newStartDateString = newStartDate.format(momentFormat);
    let startDateString = moment(start).format(momentFormat);

    let dateFieldForm = dateTimeRangeContainerAutoApply
      .find(DateField)
      .first()
      .find(FormControl)
      .first();
    dateFieldForm.simulate('focus');
    dateFieldForm.simulate('change', {
      target: { value: newStartDateString },
    });
    dateFieldForm.simulate('blur');
    dateTimeRangeContainerAutoApply.update();
    dateFieldForm = dateTimeRangeContainerAutoApply
      .find(DateField)
      .first()
      .find(FormControl)
      .first();
    expect(dateFieldForm.props().value).toEqual(startDateString);
    let picker = dateTimeRangeContainerAutoApply.find(DateTimeRangePicker);
    expect(picker.state().startLabel).toEqual(startDateString);
    expect(picker.state().start).toEqual(moment(start));
    expect(startDateCallback).toEqual('');
    expect(endDateCallback).toEqual('');
  });

  it('On Change of To Date Does Call Apply Callback. When To Date Change is Before Original From Date, Smart Mode', () => {
    let dateFieldForm = dateTimeRangeContainerSmartModeAutoApply
      .find(DateField)
      .last()
      .find(FormControl)
      .first();
    dateFieldForm.simulate('focus');
    dateFieldForm.simulate('change', {
      target: { value: '05-07-2016 23:58' },
    });
    dateFieldForm.simulate('blur');
    dateTimeRangeContainerSmartModeAutoApply.update();
    dateFieldForm = dateTimeRangeContainerSmartModeAutoApply
      .find(DateField)
      .last()
      .find(FormControl)
      .first();
    expect(dateFieldForm.props().value).toEqual('05-07-2016 23:58');
    let picker = dateTimeRangeContainerSmartModeAutoApply.find(DateTimeRangePicker);
    expect(picker.state().endLabel).toEqual('05-07-2016 23:58');
    let newDate = moment('05-07-2016 23:58', momentFormat);
    expect(picker.state().end).toEqual(moment(newDate));
    // The new End Date is before the original Start date so a new start date will be in the callback
    // This will be the day before the end date as per the rules
    let expectedNewStartDate = moment(newDate).subtract(1, 'days');
    expect(startDateCallback).toEqual(expectedNewStartDate);
    expect(endDateCallback).toEqual(newDate);
  });

  it('On Change of To Date Doesnt Call Apply Callback. When To Date Change is Before Original From Date, Non Smart Mode', () => {
    let endDateString = moment(end).format(momentFormat);

    let dateFieldForm = dateTimeRangeContainerAutoApply
      .find(DateField)
      .last()
      .find(FormControl)
      .first();
    dateFieldForm.simulate('focus');
    dateFieldForm.simulate('change', {
      target: { value: '05-07-2016 23:58' },
    });
    dateFieldForm.simulate('blur');
    dateTimeRangeContainerAutoApply.update();
    dateFieldForm = dateTimeRangeContainerAutoApply
      .find(DateField)
      .last()
      .find(FormControl)
      .first();
    expect(dateFieldForm.props().value).toEqual(endDateString);

    let picker = dateTimeRangeContainerAutoApply.find(DateTimeRangePicker);
    expect(picker.state().endLabel).toEqual(endDateString);
    let newDate = moment(endDateString, momentFormat);
    expect(picker.state().end).toEqual(moment(end));
    expect(startDateCallback).toEqual('');
    expect(endDateCallback).toEqual('');
  });
});
