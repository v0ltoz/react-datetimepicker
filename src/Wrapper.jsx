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
    // console.log("Apply Callback");
    // console.log(startDate.format("DD-MM-YYYY HH:mm"));
    // console.log(endDate.format("DD-MM-YYYY HH:mm"));
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

  renderContainerNoGrid(ranges, local, maxDate) {
    return (
      <div>
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
          />
        </DateTimeRangeContainer>
        <div onClick={this.onClick}>
          Click Me to test change state here and updating picker
        </div>
      </div>
    );
  }

  renderGrid(ranges, local, maxDate) {
    return (
      <Grid>
        <Row className="show-grid" style={{ textAlign: 'center' }}>
          <Col xs={3}>1</Col>
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
              />
            </DateTimeRangeContainer>
          </Col>
          <Col xs={3} md={4}>
            3
          </Col>
        </Row>
      </Grid>
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
      <div>
        {this.renderContainerNoGrid(ranges, local, maxDate)}
        {this.renderGrid(ranges, local, maxDate)}
        {this.renderContainerNoGrid(ranges, local, maxDate)}
      </div>
    );
  }
}
export { Wrapper };
