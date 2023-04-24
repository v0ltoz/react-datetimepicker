import React from 'react';
import moment from 'moment-timezone';
import DateTimeRangeContainer from './lib/index';

class Wrapper extends React.Component {
  constructor(props) {
    super(props);
    let start = moment(new Date(2016, 8, 20, 0, 0, 0, 0));
    let end = moment(start).add(5, 'days').subtract(1, 'second');
    this.state = {
      start: start,
      end: end,
      timezone: 'America/Los_Angeles',
      secondDisplay: false,
    };

    this.onClick = this.onClick.bind(this);
    this.applyCallback = this.applyCallback.bind(this);
  }

  applyCallback(startDate, endDate) {
    console.log('Apply Callback');
    console.log(startDate.format('DD-MM-YYYY HH:mm'));
    console.log(endDate.format('DD-MM-YYYY HH:mm'));
    this.setState({
      start: startDate,
      end: endDate,
    });
  }

  rangeCallback(index, value) {
    console.log(index, value);
  }

  onClick() {
    let newStart = moment(this.state.start).subtract(3, 'days');
    // console.log("On Click Callback");
    // console.log(newStart.format("DD-MM-YYYY HH:mm"));
    this.setState({ start: newStart });
  }

  renderVanillaPicker(ranges, local, maxDate) {
    let value = `${this.state.start.format(
      'DD-MM-YYYY HH:mm'
    )} - ${this.state.end.format('DD-MM-YYYY HH:mm')}`;

    return (
      <div className="mb-4 rounded-lg border p-4">
        <div onClick={this.onClick}>Click Me to test the smart mode picker</div>
        <div>
          Local settings chosen for this demo are = "DD-MM-YYYY HH:mm" with
          Monday the first day of the week{' '}
        </div>
        <br />
        <DateTimeRangeContainer
          ranges={ranges}
          start={this.state.start}
          end={this.state.end}
          local={local}
          maxDate={maxDate}
          applyCallback={this.applyCallback}
          rangeCallback={this.rangeCallback}
          smartMode
        >
          <input
            id="inputsTextB"
            className="w-80 rounded border bg-gray-50 p-2"
            type="text"
            label="Text"
            placeholder="Enter text"
            style={{ cursor: 'pointer' }}
            defaultValue={value}
          />
        </DateTimeRangeContainer>
        <br />
      </div>
    );
  }

  renderTimezonePicker(ranges, local, maxDate) {
    let value = `${this.state.start.format(
      'DD-MM-YYYY HH:mm'
    )} - ${this.state.end.format('DD-MM-YYYY HH:mm')}`;

    return (
      <div className="mb-4 rounded-lg border p-4">
        <div style={{ display: 'flex' }}>
          <button
            id={'Timezone-Click-Button'}
            onClick={() => {
              let timezone = 'Asia/Tokyo';
              this.setState((state, props) => ({
                timezone: timezone,
                start: moment(state.start).tz(timezone),
                end: moment(state.end).tz(timezone),
              }));
            }}
          >
            Click Me to change Timezone
          </button>
          <div>
            {' '}
            Allows you to change timezone, this example is Japan Tokyo{' '}
          </div>
        </div>
        <br />
        <div id="DateTimeRangeContainerTimezone">
          <DateTimeRangeContainer
            ranges={ranges}
            start={this.state.start}
            end={this.state.end}
            local={local}
            maxDate={maxDate}
            applyCallback={this.applyCallback}
            rangeCallback={this.rangeCallback}
            smartMode
          >
            <input
              id="inputsTextB"
              className="w-80 rounded border bg-gray-50 p-2"
              type="text"
              label="Text"
              placeholder="Enter text"
              style={{ cursor: 'pointer' }}
              defaultValue={value}
            />
          </DateTimeRangeContainer>
        </div>
        <br />
      </div>
    );
  }

  renderTwelveHourPicker(ranges, local, maxDate) {
    let value = `${this.state.start.format(
      'DD-MM-YYYY HH:mm'
    )} - ${this.state.end.format('DD-MM-YYYY HH:mm')}`;

    return (
      <div className="mb-4 rounded-lg border p-4">
        <div style={{ display: 'flex' }}>
          <div> 12 Hour Version of the Picker </div>
        </div>
        <br />
        <div id="DateTimeRangeContainerTimezone">
          <DateTimeRangeContainer
            ranges={ranges}
            start={this.state.start}
            end={this.state.end}
            local={local}
            maxDate={maxDate}
            applyCallback={this.applyCallback}
            rangeCallback={this.rangeCallback}
            twelveHoursClock={true}
            smartMode
          >
            <input
              id="inputsTextB"
              className="w-80 rounded border bg-gray-50 p-2"
              type="text"
              label="Text"
              placeholder="Enter text"
              style={{ cursor: 'pointer' }}
              defaultValue={value}
            />
          </DateTimeRangeContainer>
        </div>
        <br />
      </div>
    );
  }

  renderGridPicker(ranges, local, maxDate) {
    let value = `${this.state.start.format(
      'DD-MM-YYYY HH:mm'
    )} - ${this.state.end.format('DD-MM-YYYY HH:mm')}`;
    return (
      <div className="mb-4 rounded-lg border p-4">
        <div onClick={this.onClick}>
          {' '}
          Click Me to test the Date Picker in its condensed form
        </div>
        <br />
        <DateTimeRangeContainer
          ranges={ranges}
          start={this.state.start}
          end={this.state.end}
          local={local}
          applyCallback={this.applyCallback}
          smartMode
        >
          <input
            id="inputsTextB"
            className="w-80 rounded border bg-gray-50 p-2"
            type="text"
            label="Text"
            placeholder="Enter text"
            style={{ cursor: 'pointer' }}
            defaultValue={value}
          />
        </DateTimeRangeContainer>
      </div>
    );
  }

  renderGridPickerNoMobileMode(ranges, local, maxDate) {
    let value = `${this.state.start.format(
      'DD-MM-YYYY HH:mm'
    )} - ${this.state.end.format('DD-MM-YYYY HH:mm')}`;
    return (
      <div className="mb-4 rounded-lg border p-4">
        <div onClick={this.onClick}>
          {' '}
          Click Me to test the Date Picker in Mobile Mode disabled. Normally it
          would be in condensed form at this size.
        </div>
        <br />

        <DateTimeRangeContainer
          ranges={ranges}
          start={this.state.start}
          end={this.state.end}
          local={local}
          applyCallback={this.applyCallback}
          smartMode
          noMobileMode
        >
          <input
            id="inputsTextB"
            className="w-80 rounded border bg-gray-50 p-2"
            type="text"
            label="Text"
            placeholder="Enter text"
            style={{ cursor: 'pointer' }}
            defaultValue={value}
          />
        </DateTimeRangeContainer>
      </div>
    );
  }

  renderGridPickerForceMobileMode(ranges, local, maxDate) {
    let value = `${this.state.start.format(
      'DD-MM-YYYY HH:mm'
    )} - ${this.state.end.format('DD-MM-YYYY HH:mm')}`;
    return (
      <div className="mb-4 rounded-lg border p-4">
        <div onClick={this.onClick}>
          {' '}
          Click Me to test the Date Picker in Mobile Mode forced. Normally it
          would be in full screen form at this size.
        </div>
        <br />
        <DateTimeRangeContainer
          ranges={ranges}
          start={this.state.start}
          end={this.state.end}
          local={local}
          applyCallback={this.applyCallback}
          smartMode
          forceMobileMode
        >
          <input
            id="inputsTextB"
            className="w-80 rounded border bg-gray-50 p-2"
            type="text"
            label="Text"
            placeholder="Enter text"
            style={{ cursor: 'pointer' }}
            defaultValue={value}
          />
        </DateTimeRangeContainer>
      </div>
    );
  }

  renderGridPickerLeftOpen(ranges, local, maxDate) {
    let value = `${this.state.start.format(
      'DD-MM-YYYY HH:mm'
    )} - ${this.state.end.format('DD-MM-YYYY HH:mm')}`;
    return (
      <div className="mb-4 rounded-lg border p-4">
        <div onClick={this.onClick}>
          {' '}
          Click me to test the picker in open Left mode with mobile mode enabled
        </div>
        <br />

        <DateTimeRangeContainer
          ranges={ranges}
          start={this.state.start}
          end={this.state.end}
          local={local}
          applyCallback={this.applyCallback}
          smartMode
          leftMode
        >
          <input
            id="inputsTextB"
            className="w-80 rounded border bg-gray-50 p-2"
            type="text"
            label="Text"
            placeholder="Enter text"
            style={{ cursor: 'pointer' }}
            defaultValue={value}
          />
        </DateTimeRangeContainer>
      </div>
    );
  }

  renderPickerAutoApplySmartModeDisabled(
    ranges,
    local,
    maxDate,
    descendingYears
  ) {
    let value = `${this.state.start.format(
      'DD-MM-YYYY HH:mm'
    )} - ${this.state.end.format('DD-MM-YYYY HH:mm')}`;
    return (
      <div
        id="DateTimeRangeContainerSmartModeDisabled"
        className="mb-4 rounded-lg border p-4"
      >
        <DateTimeRangeContainer
          ranges={ranges}
          start={this.state.start}
          end={this.state.end}
          local={local}
          maxDate={maxDate}
          applyCallback={this.applyCallback}
          rangeCallback={this.rangeCallback}
          autoApply
          descendingYears={descendingYears}
          years={[2010, 2020]}
        >
          <input
            id="inputsTextB"
            className="w-80 rounded border bg-gray-50 p-2"
            type="text"
            label="Text"
            placeholder="Enter text"
            style={{ cursor: 'pointer' }}
            disabled
            defaultValue={value}
          />
        </DateTimeRangeContainer>
        <div onClick={this.onClick}>
          Click Me to test the Date Picker with Auto Apply, Custom dates, Smart
          Mode disabled and descending years set to {descendingYears.toString()}
        </div>
        <br />
      </div>
    );
  }

  renderPickerAutoApplySmartModeDisabledSecondsIncluded(
    ranges,
    local,
    maxDate,
    descendingYears
  ) {
    let value = `${this.state.start.format(
      'DD-MM-YYYY HH:mm:ss'
    )} - ${this.state.end.format('DD-MM-YYYY HH:mm:ss')}`;
    local = {
      format: 'DD-MM-YYYY HH:mm:ss',
      sundayFirst: false,
    };
    return (
      <div
        id="DateTimeRangeContainerSeconds"
        className="mb-4 rounded-lg border p-4"
      >
        <br />
        <DateTimeRangeContainer
          ranges={ranges}
          start={this.state.start}
          end={this.state.end}
          local={local}
          maxDate={maxDate}
          applyCallback={this.applyCallback}
          rangeCallback={this.rangeCallback}
          autoApply
          descendingYears={descendingYears}
          years={[2010, 2020]}
        >
          <input
            id="inputsTextB"
            className="w-80 rounded border bg-gray-50 p-2"
            type="text"
            label="Text"
            placeholder="Enter text"
            style={{ cursor: 'pointer' }}
            disabled
            defaultValue={value}
          />
        </DateTimeRangeContainer>
        <div onClick={this.onClick}>
          Click Me to test the Date Picker with Auto Apply and Seconds local
          format
        </div>
        <br />
      </div>
    );
  }

  renderPickerSmartModeDisabledCustomStyling(
    ranges,
    local,
    maxDate,
    descendingYears
  ) {
    let value = `${this.state.start.format(
      'DD-MM-YYYY HH:mm'
    )} - ${this.state.end.format('DD-MM-YYYY HH:mm')}`;
    return (
      <div
        id="DateTimeRangeContainerCustomStyles"
        className="mb-4 rounded-lg border p-4"
      >
        <br />
        <DateTimeRangeContainer
          ranges={ranges}
          start={this.state.start}
          end={this.state.end}
          local={local}
          maxDate={maxDate}
          applyCallback={this.applyCallback}
          rangeCallback={this.rangeCallback}
          descendingYears={descendingYears}
          years={[2010, 2020]}
          style={{
            fromDot: { backgroundColor: 'rgb(100, 0, 34)' },
            toDot: { backgroundColor: 'rgb(0, 135, 255)' },
            fromDate: {
              color: 'rgb(0, 255, 100)',
              backgroundColor: 'rgb(255, 100, 100)',
            },
            toDate: { backgroundColor: 'rgb(40, 90, 75)' },
            betweenDates: {
              color: 'rgb(200, 0, 34)',
              backgroundColor: 'rgb(200, 150, 100)',
            },
            hoverCell: { color: 'rgb(200, 0, 34)' },
            customRangeButtons: { backgroundColor: 'rgb(40, 90, 75)' },
            customRangeSelected: { backgroundColor: 'rgb(100, 90, 200)' },
          }}
          darkMode
        >
          <input
            id="inputsTextB"
            className="w-80 rounded border bg-gray-50 p-2"
            type="text"
            label="Text"
            placeholder="Enter text"
            style={{ cursor: 'pointer' }}
            defaultValue={value}
          />
        </DateTimeRangeContainer>
        <div onClick={this.onClick}>
          Click Me to test the Date Picker with Custom Styling and descending
          years set to {descendingYears.toString()}
        </div>
        <br />
      </div>
    );
  }

  renderPickerAutoApplyPastFriendly(ranges, local, maxDate, descendingYears) {
    let value = `${this.state.start.format(
      'DD-MM-YYYY HH:mm'
    )} - ${this.state.end.format('DD-MM-YYYY HH:mm')}`;
    return (
      <div className="mb-4 rounded-lg border p-4">
        <br />
        <DateTimeRangeContainer
          ranges={ranges}
          start={this.state.start}
          end={this.state.end}
          local={local}
          maxDate={maxDate}
          applyCallback={this.applyCallback}
          rangeCallback={this.rangeCallback}
          autoApply
          descendingYears={descendingYears}
          years={[2010, 2020]}
          pastSearchFriendly
          smartMode
        >
          <input
            id="inputsTextB"
            className="w-80 rounded border bg-gray-50 p-2"
            type="text"
            label="Text"
            placeholder="Enter text"
            style={{ cursor: 'pointer' }}
            disabled
            defaultValue={value}
          />
        </DateTimeRangeContainer>
        <div onClick={this.onClick}>
          Click Me to test the Date Picker in Past Search Friendly mode with
          auto apply with custom dates and descending years set to{' '}
          {descendingYears.toString()}
        </div>
        <br />
      </div>
    );
  }

  renderStandalone(ranges, local, maxDate, descendingYears) {
    return (
      <div
        id="DateTimeRangeContainerStandalone"
        className="mb-4 rounded-lg border p-4"
      >
        <br />
        <p>
          {' '}
          <b>Standalone</b> DateTime picker. Values are{' '}
          {this.state.start.format('DD-MM-YYYY HH:mm')} and{' '}
          {this.state.end.format('DD-MM-YYYY HH:mm')}{' '}
        </p>
        <DateTimeRangeContainer
          ranges={ranges}
          start={this.state.start}
          end={this.state.end}
          local={local}
          maxDate={maxDate}
          applyCallback={this.applyCallback}
          rangeCallback={this.rangeCallback}
          autoApply
          descendingYears={descendingYears}
          years={[2010, 2020]}
          standalone
          style={{
            standaloneLayout: {},
          }}
        />
        <br />
      </div>
    );
  }

  render() {
    let now = new Date();
    let start = moment(
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
    );
    let end = moment(start).add(1, 'days').subtract(1, 'seconds');
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
      '1st August 18': [
        moment('2018-08-01 00:00:00'),
        moment('2018-08-02 23:59:59'),
      ],
      '1 Year': [moment(start).subtract(1, 'years'), moment(end)],
    };
    let local = {
      format: 'DD-MM-YYYY HH:mm',
      sundayFirst: false,
    };
    let maxDate = moment(end).add(24, 'hour');
    let pickersRender = (
      <div>
        <br />
        {this.renderVanillaPicker(ranges, local, maxDate)}
        {this.renderGridPicker(ranges, local, maxDate)}
        {this.renderGridPickerNoMobileMode(ranges, local, maxDate)}
        {this.renderGridPickerForceMobileMode(ranges, local, maxDate)}
        {this.renderGridPickerLeftOpen(ranges, local, maxDate)}
        {this.renderPickerAutoApplySmartModeDisabled(
          ranges,
          local,
          maxDate,
          true
        )}
        {this.renderPickerSmartModeDisabledCustomStyling(
          ranges,
          local,
          maxDate,
          true
        )}
        {this.renderPickerAutoApplyPastFriendly(ranges, local, maxDate, false)}
        {this.renderStandalone(ranges, local, maxDate, false)}
      </div>
    );
    let pickers;
    if (this.state.secondDisplay) {
      pickers = this.renderPickerAutoApplySmartModeDisabledSecondsIncluded(
        ranges,
        local,
        maxDate,
        true
      );
    } else if (this.state.timezoneDisplay) {
      pickers = this.renderTimezonePicker(ranges, local, maxDate);
    } else if (this.state.twelveHour) {
      pickers = this.renderTwelveHourPicker(ranges, local, maxDate, true);
    } else {
      pickers = pickersRender;
    }
    return (
      <div className="container">
        {/* <!-- Debug --> */}
        <div className="fixed right-2 top-2">
          <span className="hidden max-sm:block">xs</span>
          <span className="hidden sm:max-md:block">sm</span>
          <span className="hidden md:max-lg:block">md</span>
          <span className="hidden lg:max-xl:block">lg</span>
          <span className="hidden xl:max-2xl:block">xl</span>
        </div>
        <h1>Welcome to the Advanced Date Time Picker Demo</h1>
        <button
          id={'Reset-Toggle'}
          onClick={() =>
            this.setState({
              secondDisplay: false,
              timezoneDisplay: false,
              twelveHour: false,
            })
          }
        >
          Reset
        </button>
        <button
          id={'Second-Toggle'}
          onClick={() =>
            this.setState({
              secondDisplay: !this.state.secondDisplay,
              timezoneDisplay: false,
              twelveHour: false,
            })
          }
        >
          Second Picker Toggle
        </button>
        <button
          id={'Timezone-Toggle'}
          onClick={() =>
            this.setState({
              secondDisplay: false,
              timezoneDisplay: !this.state.timezoneDisplay,
              twelveHour: false,
            })
          }
        >
          Timezone Picker Toggle
        </button>
        <button
          id={'12-Hour-Toggle'}
          onClick={() =>
            this.setState({
              twelveHour: !this.state.twelveHour,
              timezoneDisplay: false,
              secondDisplay: false,
            })
          }
        >
          12 Hour Toggle
        </button>
        {pickers}
      </div>
    );
  }
}
export { Wrapper };
