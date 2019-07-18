import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import moment from 'moment';
import { FormControl } from 'react-bootstrap';
import DateTimeRangeContainer from '../../DateTimeRangeContainer';
import { DateTimeRangePicker } from '../../DateTimeRangePicker';
import RangeButton from '../../ranges/RangeButton';
import Ranges from '../../ranges/Ranges';

configure({ adapter: new Adapter() });
let now = new Date();
let start = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0));
let end = moment(start)
  .add(1, 'days')
  .subtract(1, 'seconds');
let ranges = {
  'Today Only': [moment(start), moment(end)],
  'Yesterday Only': [moment(start).subtract(1, 'days'), moment(end).subtract(1, 'days')],
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
let applyCallback = (startDate, endDate) => {
  console.log(startDate);
  console.log(endDate);
};

let indexCallbackRecieved = '';
let valueCallbackRecieved = '';
let rangeCallback = (index, value) => {
  indexCallbackRecieved = index;
  valueCallbackRecieved = value;
};

const dateTimeRangeContainerRangeCallback = mount(
  <DateTimeRangeContainer
    ranges={ranges}
    start={start}
    end={end}
    local={local}
    applyCallback={applyCallback}
    rangeCallback={rangeCallback}
  >
    <FormControl id="formControlsTextB" type="text" label="Text" placeholder="Enter text" />
  </DateTimeRangeContainer>,
);

const dateTimeRangeContainerNoRangeCallback = mount(
  <DateTimeRangeContainer ranges={ranges} start={start} end={end} local={local} applyCallback={applyCallback}>
    <FormControl id="formControlsTextB" type="text" label="Text" placeholder="Enter text" />
  </DateTimeRangeContainer>,
);

describe('Ranges Callback Tests', () => {
  beforeEach(() => {
    indexCallbackRecieved = '';
    valueCallbackRecieved = '';
    rangesMounted = mount(
      <Ranges
        ranges={ranges}
        screenWidthToTheRight={250}
        selectedRange={0}
        rangeSelectedCallback={rangeSelectedCallback}
      />,
    );
  });

  it('On Click, First Range, Callback occurs, Callback prop set', () => {
    let rangeButtons = dateTimeRangeContainerRangeCallback.find(RangeButton);
    let firstButton = rangeButtons.first();
    firstButton
      .children()
      .props()
      .onMouseDown();
    expect(indexCallbackRecieved).toEqual(0);
    expect(ranges[valueCallbackRecieved]).toEqual(ranges['Today Only']);
  });

  it('On Click, Last Range, Callback occurs, Callback prop set', () => {
    let rangeButtons = dateTimeRangeContainerRangeCallback.find(RangeButton);
    let lastButton = rangeButtons.last();
    lastButton
      .children()
      .props()
      .onMouseDown();
    expect(indexCallbackRecieved).toEqual(Object.keys(ranges).length);
    expect(valueCallbackRecieved).toEqual('Custom Range');
  });

  it('"On Click Callback doesnt occur, Callback prop not set', () => {
    let rangeButtons = dateTimeRangeContainerNoRangeCallback.find(RangeButton);
    let firstButton = rangeButtons.first();
    firstButton
      .children()
      .props()
      .onMouseDown();
    expect(indexCallbackRecieved).toEqual('');
    expect(valueCallbackRecieved).toEqual('');
  });
});

let rangeSelectedCallback = (index, label) => {
  console.log(index, label);
};

let rangesMounted = mount(
  <Ranges
    ranges={ranges}
    screenWidthToTheRight={250}
    selectedRange={0}
    rangeSelectedCallback={rangeSelectedCallback}
  />,
);

describe('Ranges Clicked', () => {
  it('Does date range picker add custom date', () => {
    let picker = dateTimeRangeContainerNoRangeCallback.find(DateTimeRangePicker);
    expect(picker.state().ranges['Custom Range']).toEqual('Custom Range');
  });

  it('When initially selected 0 range set to focus if selectedRange is 0', () => {
    expect(rangesMounted.state().viewingIndex).toEqual(0);
    expect(
      rangesMounted
        .find(RangeButton)
        .at(0)
        .state(),
    ).toEqual({
      style: {
        backgroundColor: '#08c',
        border: '1px solid #f5f5f5',
        borderRadius: '4px',
        color: '#f5f5f5',
        cursor: 'pointer',
        fontSize: '13px',
        marginBottom: '8px',
        marginLeft: '4px',
        marginRight: '4px',
        marginTop: '4px',
      },
    });
  });

  it('When initially selected 2 range set to focus if selectedRange is 2', () => {
    let rangesMounted = mount(
      <Ranges
        ranges={ranges}
        screenWidthToTheRight={250}
        selectedRange={2}
        rangeSelectedCallback={rangeSelectedCallback}
      />,
    );
    expect(rangesMounted.state().viewingIndex).toEqual(2);
    expect(
      rangesMounted
        .find(RangeButton)
        .at(2)
        .state(),
    ).toEqual({
      style: {
        backgroundColor: '#08c',
        border: '1px solid #f5f5f5',
        borderRadius: '4px',
        color: '#f5f5f5',
        cursor: 'pointer',
        fontSize: '13px',
        marginBottom: '8px',
        marginLeft: '4px',
        marginRight: '4px',
        marginTop: '4px',
      },
    });
  });

  it('On Click Yesterday (1) Ranges focused state (1) set to true, false everything else', () => {
    let rangesMounted = mount(
      <Ranges
        ranges={ranges}
        screenWidthToTheRight={250}
        selectedRange={2}
        rangeSelectedCallback={rangeSelectedCallback}
      />,
    );
    let yesterdayButton = rangesMounted.find(RangeButton).at(1);
    yesterdayButton
      .find('div')
      .first()
      .props()
      .onMouseDown();
    rangesMounted.update();
    let focused = rangesMounted.state().focused;
    let error = false;
    for (let i = 0; i < ranges.length; i++) {
      if (i === 1 && focused[i] === false) {
        error = true;
      } else if (focused[i] === true) {
        error = true;
      }
    }
    expect(error).toEqual(false);
    console.log(rangesMounted.state());
  });

  it('On Click Yesterday (1) Style, tabIndex and viewingIndex on button updates to focused', () => {
    let selectedRange = 1;
    let rangeSelectedCallback = (index, value) => {
      selectedRange = index;
    };
    let rangesMounted = mount(
      <Ranges
        ranges={ranges}
        screenWidthToTheRight={250}
        selectedRange={selectedRange}
        rangeSelectedCallback={rangeSelectedCallback}
      />,
    );
    let yesterdayButton = rangesMounted.find(RangeButton).at(1);
    yesterdayButton
      .find('div')
      .first()
      .props()
      .onMouseDown();
    rangesMounted.update();
    yesterdayButton = rangesMounted.find(RangeButton).at(1);
    // Ensure the button at index 1 (Yesterday) is set to focused and correct tabIndex
    let style = yesterdayButton
      .find('div')
      .first()
      .props().style;
    expect(style).toEqual({
      backgroundColor: '#08c',
      border: '1px solid #f5f5f5',
      borderRadius: '4px',
      color: '#f5f5f5',
      cursor: 'pointer',
      fontSize: '13px',
      marginBottom: '8px',
      marginLeft: '4px',
      marginRight: '4px',
      marginTop: '4px',
      outline: 'cornflowerblue',
      outlineStyle: 'auto',
    });
    expect(rangesMounted.state().viewingIndex).toEqual(1);
    expect(
      yesterdayButton
        .find('div')
        .first()
        .props().tabIndex,
    ).toEqual(0);

    // Ensure all other buttons are not styled as focused or tab indexed in
    rangesMounted.find(RangeButton).forEach((button, index) => {
      if (index !== 1) {
        let style = button
          .find('div')
          .first()
          .props().style;
        expect(style).toEqual({
          backgroundColor: '#f5f5f5',
          border: '1px solid #f5f5f5',
          borderRadius: '4px',
          color: '#08c',
          cursor: 'pointer',
          fontSize: '13px',
          marginBottom: '8px',
          marginLeft: '4px',
          marginRight: '4px',
          marginTop: '4px',
          outlineStyle: '',
        });
        expect(
          button
            .find('div')
            .first()
            .props().tabIndex,
        ).toEqual(-1);
      }
    });
  });

  it('On Click Yesterday (1) Range Selected Callback returns correct values', () => {
    let selectedRange = 0;
    let valueCallback, indexCallback;
    let rangeSelectedCallback = (index, value) => {
      valueCallback = value;
      indexCallback = index;
    };
    let rangesMounted = mount(
      <Ranges
        ranges={ranges}
        screenWidthToTheRight={250}
        selectedRange={selectedRange}
        rangeSelectedCallback={rangeSelectedCallback}
      />,
    );
    let yesterdayButton = rangesMounted.find(RangeButton).at(1);
    yesterdayButton
      .find('div')
      .first()
      .props()
      .onMouseDown();
    rangesMounted.update();
    expect(valueCallback).toEqual('Yesterday Only');
    expect(indexCallback).toEqual(1);
  });
});
