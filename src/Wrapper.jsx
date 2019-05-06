import React from 'react';
import { FormControl, Grid, Row, Col } from 'react-bootstrap';
import moment from 'moment';
import DateTimeRangeContainer from './lib/index';

class Wrapper extends React.Component {
  constructor(props) {
    super(props);
    let now = new Date();
    let start = moment(
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0),
    );
    let end = moment(start)
      .add(1, 'days')
      .subtract(1, 'seconds');
    start = moment(start)
      .subtract(34, 'months')
      .subtract(1, 'seconds');
    end = moment(start)
      .add(5, 'days')
      .add();
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
    let value = `${this.state.start.format(
      'DD-MM-YYYY HH:mm',
    )} - ${this.state.end.format('DD-MM-YYYY HH:mm')}`;
    return (
      <div>
        <div onClick={this.onClick}>Click Me to test the vanilla picker</div>
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
        <br />
      </div>
    );
  }

  renderGridPicker(ranges, local, maxDate) {
    let value = `${this.state.start.format(
      'DD-MM-YYYY HH:mm',
    )} - ${this.state.end.format('DD-MM-YYYY HH:mm')}`;
    return (
      <Grid>
        <div onClick={this.onClick}>
          {' '}
          Click Me to test the Date Picker in its condensed form
        </div>
        <br />
        <Row className="show-grid" style={{ textAlign: 'center' }}>
          <Col xs={3} />
          <Col xs={6} md={4}>
            <DateTimeRangeContainer
              ranges={ranges}
              start={this.state.start}
              end={this.state.end}
              local={local}
              applyCallback={this.applyCallback}
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
          </Col>
          <Col xs={3} md={4} />
        </Row>
        <br />
      </Grid>
    );
  }

  renderPickerAutoApply(ranges, local, maxDate) {
    let value = `${this.state.start.format(
      'DD-MM-YYYY HH:mm',
    )} - ${this.state.end.format('DD-MM-YYYY HH:mm')}`;
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
          Click Me to test the Date Picker with Auto Apply
        </div>
        <br />
      </div>
    );
  }

  render() {
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
    let maxDate = moment(start).add(24, 'hour');
    return (
      <div className="container">
        <h1>Welcome to the Advanced Date Time Picker Demo</h1>
        {this.renderVanillaPicker(ranges, local, maxDate)}
        {this.renderGridPicker(ranges, local, maxDate)}
        {this.renderPickerAutoApply(ranges, local, maxDate)}
      </div>
    );
  }
}
export { Wrapper };
