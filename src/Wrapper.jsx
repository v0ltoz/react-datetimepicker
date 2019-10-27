import React from 'react';
import { FormControl, Grid, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import DateTimeRangeContainer from './lib/index';
import { isFirefoxBelow53 } from './lib/utils/BrowserVersion';

class Wrapper extends React.Component {
  constructor(props) {
    super(props);
    let start = moment(new Date(2016, 8, 20, 0, 0, 0, 0));
    let end = moment(start)
      .add(5, 'days')
      .subtract(1, 'second');
    this.state = {
      start: start,
      end: end,
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
    let value = `${this.state.start.format('DD-MM-YYYY HH:mm')} - ${this.state.end.format('DD-MM-YYYY HH:mm')}`;
    let firefoxBelow35 = isFirefoxBelow53();
    let disabled = true;
    if (firefoxBelow35) {
      disabled = false;
    }
    return (
      <div>
        <div onClick={this.onClick}>Click Me to test the smart mode picker</div>
        <div>Local settings chosen for this demo are = "DD-MM-YYYY HH:mm" with Monday the first day of the week </div>
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
          <FormControl
            id="formControlsTextB"
            type="text"
            label="Text"
            placeholder="Enter text"
            style={{ cursor: 'pointer' }}
            disabled={disabled}
            value={value}
          />
        </DateTimeRangeContainer>
        <br />
      </div>
    );
  }

  renderGridPicker(ranges, local, maxDate) {
    let firefoxBelow35 = isFirefoxBelow53();
    let disabled = true;
    if (firefoxBelow35) {
      disabled = false;
    }
    let value = `${this.state.start.format('DD-MM-YYYY HH:mm')} - ${this.state.end.format('DD-MM-YYYY HH:mm')}`;
    return (
      <Grid>
        <div onClick={this.onClick}> Click Me to test the Date Picker in its condensed form</div>
        <br />
        <Row className="show-grid" style={{ textAlign: 'center' }}>
          <Col xs={3} />
          <Col xs={6} md={4} id="DateTimeRangeContainerMobileMode">
            <DateTimeRangeContainer
              ranges={ranges}
              start={this.state.start}
              end={this.state.end}
              local={local}
              applyCallback={this.applyCallback}
              smartMode
            >
              <FormControl
                id="formControlsTextB"
                type="text"
                label="Text"
                placeholder="Enter text"
                style={{ cursor: 'pointer' }}
                disabled={disabled}
                value={value}
              />
            </DateTimeRangeContainer>
          </Col>
          <Col xs={3} md={4} />
        </Row>
        <br />
      </Grid>
    );
  }

  renderGridPickerNoMobileMode(ranges, local, maxDate) {
    let firefoxBelow35 = isFirefoxBelow53();
    let disabled = true;
    if (firefoxBelow35) {
      disabled = false;
    }
    let value = `${this.state.start.format('DD-MM-YYYY HH:mm')} - ${this.state.end.format('DD-MM-YYYY HH:mm')}`;
    return (
      <Grid>
        <div onClick={this.onClick}>
          {' '}
          Click Me to test the Date Picker in Mobile Mode disabled. Normally it would be in condensed form at this size.
        </div>
        <br />
        <Row className="show-grid" style={{ textAlign: 'center' }}>
          <Col xs={3} />
          <Col xs={6} md={4} id="DateTimeRangeContainerNoMobileMode">
            <DateTimeRangeContainer
              ranges={ranges}
              start={this.state.start}
              end={this.state.end}
              local={local}
              applyCallback={this.applyCallback}
              smartMode
              noMobileMode
            >
              <FormControl
                id="formControlsTextB"
                type="text"
                label="Text"
                placeholder="Enter text"
                style={{ cursor: 'pointer' }}
                disabled={disabled}
                value={value}
              />
            </DateTimeRangeContainer>
          </Col>
          <Col xs={3} md={4} />
        </Row>
        <br />
      </Grid>
    );
  }

  renderGridPickerForceMobileMode(ranges, local, maxDate) {
    let firefoxBelow35 = isFirefoxBelow53();
    let disabled = true;
    if (firefoxBelow35) {
      disabled = false;
    }
    let value = `${this.state.start.format('DD-MM-YYYY HH:mm')} - ${this.state.end.format('DD-MM-YYYY HH:mm')}`;
    return (
      <Grid>
        <div onClick={this.onClick}>
          {' '}
          Click Me to test the Date Picker in Mobile Mode forced. Normally it would be in full screen form at this size.
        </div>
        <br />
        <Row className="show-grid" style={{ textAlign: 'center' }}>
          <Col xs={3} />
          <Col xs={6} md={4} id="DateTimeRangeContainerForceMobileMode">
            <DateTimeRangeContainer
              ranges={ranges}
              start={this.state.start}
              end={this.state.end}
              local={local}
              applyCallback={this.applyCallback}
              smartMode
              forceMobileMode
            >
              <FormControl
                id="formControlsTextB"
                type="text"
                label="Text"
                placeholder="Enter text"
                style={{ cursor: 'pointer' }}
                disabled={disabled}
                value={value}
              />
            </DateTimeRangeContainer>
          </Col>
          <Col xs={3} md={4} />
        </Row>
        <br />
      </Grid>
    );
  }

  renderGridPickerLeftOpen(ranges, local, maxDate) {
    let firefoxBelow35 = isFirefoxBelow53();
    let disabled = true;
    if (firefoxBelow35) {
      disabled = false;
    }
    let value = `${this.state.start.format('DD-MM-YYYY HH:mm')} - ${this.state.end.format('DD-MM-YYYY HH:mm')}`;
    return (
      <Grid>
        <div onClick={this.onClick}> Click me to test the picker in open Left mode with mobile mode enabled</div>
        <br />
        <Row className="show-grid" style={{ textAlign: 'center' }}>
          <Col xs={3} />
          <Col xs={3} md={4} />
          <Col xs={6} md={4} id="DateTimeRangeContainerLeftOpenMode">
            <DateTimeRangeContainer
              ranges={ranges}
              start={this.state.start}
              end={this.state.end}
              local={local}
              applyCallback={this.applyCallback}
              smartMode
              leftMode
            >
              <FormControl
                id="formControlsTextB"
                type="text"
                label="Text"
                placeholder="Enter text"
                style={{ cursor: 'pointer' }}
                disabled={disabled}
                value={value}
              />
            </DateTimeRangeContainer>
          </Col>
        </Row>
        <br />
      </Grid>
    );
  }

  renderPickerAutoApplySmartModeDisabled(ranges, local, maxDate, descendingYears) {
    let value = `${this.state.start.format('DD-MM-YYYY HH:mm')} - ${this.state.end.format('DD-MM-YYYY HH:mm')}`;
    return (
      <div id="DateTimeRangeContainerSmartModeDisabled">
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
          <FormControl
            id="formControlsTextB"
            type="text"
            label="Text"
            placeholder="Enter text"
            style={{ cursor: 'pointer' }}
            disabled
            value={value}
          />
        </DateTimeRangeContainer>
        <div onClick={this.onClick}>
          Click Me to test the Date Picker with Auto Apply, Custom dates, Smart Mode disabled and descending years set
          to {descendingYears.toString()}
        </div>
        <br />
      </div>
    );
  }

  renderPickerAutoApplySmartModeDisabledSecondsIncluded(ranges, local, maxDate, descendingYears) {
    let value = `${this.state.start.format('DD-MM-YYYY HH:mm:ss')} - ${this.state.end.format('DD-MM-YYYY HH:mm:ss')}`;
    local = {
      format: 'DD-MM-YYYY HH:mm:ss',
      sundayFirst: false,
    };
    return (
      <div id="DateTimeRangeContainerSeconds">
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
          <FormControl
            id="formControlsTextB"
            type="text"
            label="Text"
            placeholder="Enter text"
            style={{ cursor: 'pointer' }}
            disabled
            value={value}
          />
        </DateTimeRangeContainer>
        <div onClick={this.onClick}>
          Click Me to test the Date Picker with Auto Apply and Seconds local format
        </div>
        <br />
      </div>
    );
  }

  renderPickerSmartModeDisabledCustomStyling(ranges, local, maxDate, descendingYears) {
    let firefoxBelow35 = isFirefoxBelow53();
    let disabled = true;
    if (firefoxBelow35) {
      disabled = false;
    }
    let value = `${this.state.start.format('DD-MM-YYYY HH:mm')} - ${this.state.end.format('DD-MM-YYYY HH:mm')}`;
    return (
      <div id="DateTimeRangeContainerCustomStyles">
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
            fromDate: { color: 'rgb(0, 255, 100)', backgroundColor: 'rgb(255, 100, 100)' },
            toDate: { backgroundColor: 'rgb(40, 90, 75)' },
            betweenDates: { color: 'rgb(200, 0, 34)', backgroundColor: 'rgb(200, 150, 100)' },
            hoverCell: { color: 'rgb(200, 0, 34)' },
            customRangeButtons: { backgroundColor: 'rgb(40, 90, 75)' },
            customRangeSelected: { backgroundColor: 'rgb(100, 90, 200)' },
          }}
          darkMode
        >
          <FormControl
            id="formControlsTextB"
            type="text"
            label="Text"
            placeholder="Enter text"
            style={{ cursor: 'pointer' }}
            disabled={disabled}
            value={value}
          />
        </DateTimeRangeContainer>
        <div onClick={this.onClick}>
          Click Me to test the Date Picker with Custom Styling and descending years set to {descendingYears.toString()}
        </div>
        <br />
      </div>
    );
  }

  renderPickerAutoApplyPastFriendly(ranges, local, maxDate, descendingYears) {
    let value = `${this.state.start.format('DD-MM-YYYY HH:mm')} - ${this.state.end.format('DD-MM-YYYY HH:mm')}`;
    return (
      <div>
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
          <FormControl
            id="formControlsTextB"
            type="text"
            label="Text"
            placeholder="Enter text"
            style={{ cursor: 'pointer' }}
            disabled
            value={value}
          />
        </DateTimeRangeContainer>
        <div onClick={this.onClick}>
          Click Me to test the Date Picker in Past Search Friendly mode with auto apply with custom dates and descending
          years set to {descendingYears.toString()}
        </div>
        <br />
      </div>
    );
  }

  renderStandalone(ranges, local, maxDate, descendingYears) {
    return (
      <div id="DateTimeRangeContainerStandalone">
        <br />
        <p> <b>Standalone</b> DateTime picker. Values are {this.state.start.format('DD-MM-YYYY HH:mm')} and {this.state.end.format('DD-MM-YYYY HH:mm')} </p>
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
            standaloneLayout:{display:'flex', maxWidth:'fit-content'}
          }}
        />
        <br />
      </div>
    );
  }

  render() {
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
      '1st August 18': [moment("2018-08-01 00:00:00"), moment("2018-08-02 23:59:59")],
      '1 Year': [moment(start).subtract(1, 'years'), moment(end)],
    };
    let local = {
      format: 'DD-MM-YYYY HH:mm',
      sundayFirst: false,
    };
    let maxDate = moment(end).add(24, 'hour');
    return (
      <div className="container">
        <h1>Welcome to the Advanced Date Time Picker Demo</h1>
        {this.renderVanillaPicker(ranges, local, maxDate)}
        {this.renderGridPicker(ranges, local, maxDate)}
        {this.renderGridPickerNoMobileMode(ranges, local, maxDate)}
        {this.renderGridPickerForceMobileMode(ranges, local, maxDate)}
        {this.renderGridPickerLeftOpen(ranges, local, maxDate)}
        {this.renderPickerAutoApplySmartModeDisabled(ranges, local, maxDate, true)}
        {this.renderPickerAutoApplySmartModeDisabledSecondsIncluded(ranges, local, maxDate, true)}
        {this.renderPickerSmartModeDisabledCustomStyling(ranges, local, maxDate, true)}
        {this.renderPickerAutoApplyPastFriendly(ranges, local, maxDate, false)}
        {this.renderStandalone(ranges, local, maxDate, false)}
      </div>
    );
  }
}
export { Wrapper };
