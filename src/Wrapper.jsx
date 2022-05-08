import React from 'react';
import { FormControl } from 'react-bootstrap';
import moment from 'moment-timezone';
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
      timezone: 'America/Los_Angeles',
      secondDisplay: false,
      now: moment(new Date()),
    };

    this.onClick = this.onClick.bind(this);
    this.applyCallback = this.applyCallback.bind(this);
  }

  refreshTime() {
    this.setState({ now: moment(new Date()) });
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
          maxDate={moment(new Date())}
          applyCallback={this.applyCallback}
          rangeCallback={this.rangeCallback}
          smartMode
        >
          <div onClick={() => this.refreshTime()}>
            <FormControl
              id="formControlsTextB"
              type="text"
              label="Text"
              placeholder="Enter text"
              style={{ cursor: 'pointer' }}
              disabled={disabled}
              value={value}
              onClick={e => alert('form click')}
            />
          </div>
        </DateTimeRangeContainer>
        <br />
      </div>
    );
  }

  render() {
    let start = moment(this.now).subtract(1, 'days');
    let end = this.now;
    let ranges = {
      'Today Only': [moment(start), moment(end)],
      'Yesterday Only': [moment(start).subtract(1, 'days'), moment(end).subtract(1, 'days')],
      '3 Days': [moment(start).subtract(3, 'days'), moment(end)],
      '5 Days': [moment(start).subtract(5, 'days'), moment(end)],
      '1 Week': [moment(start).subtract(7, 'days'), moment(end)],
      '2 Weeks': [moment(start).subtract(14, 'days'), moment(end)],
      '1 Month': [moment(start).subtract(1, 'months'), moment(end)],
      '1st August 18': [moment('2018-08-01 00:00:00'), moment('2018-08-02 23:59:59')],
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
        </div>
    );
  }
}
export default Wrapper;
