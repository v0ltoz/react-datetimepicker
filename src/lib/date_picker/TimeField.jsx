import React from 'react';
import '../style/DateTimeRange.css';
import { Glyphicon } from 'react-bootstrap';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import { generateHours, generateMinutes } from '../utils/TimeFunctionUtils';
import {addFocusStyle, darkTheme, lightTheme} from '../utils/StyleUtils';

class TimeField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hourFocus: false,
      minuteFocus: false,
    };
    this.handleHourChange = this.handleHourChange.bind(this);
    this.handleMinuteChange = this.handleMinuteChange.bind(this);
    this.hourFocus = this.hourFocus.bind(this);
    this.minuteFocus = this.minuteFocus.bind(this);
    this.hourBlur = this.hourBlur.bind(this);
    this.minuteBlur = this.minuteBlur.bind(this);
  }

  generateHourSelectValues() {
    let hours = generateHours();
    let selectValues = [];
    for (let i = 0; i < hours.length; i++) {
      selectValues.push(
        <option key={i} value={i}>
          {i}
        </option>,
      );
    }
    return selectValues;
  }

  generateMinuteSelectValues() {
    let minutes = generateMinutes();
    let selectValues = [];
    for (let i = 0; i < minutes.length; i++) {
      selectValues.push(
        <option key={i} value={i}>
          {minutes[i]}
        </option>,
      );
    }
    return selectValues;
  }

  handleHourChange(event) {
    this.props.timeChangeCallback(
      parseInt(event.target.value),
      this.props.date.minute(),
      this.props.mode,
    );
  }

  handleMinuteChange(event) {
    this.props.timeChangeCallback(
      this.props.date.hour(),
      parseInt(event.target.value),
      this.props.mode,
    );
  }

  hourFocus() {
    this.setState({ hourFocus: true });
  }

  hourBlur() {
    this.setState({ hourFocus: false });
  }

  minuteFocus() {
    this.setState({ minuteFocus: true });
  }

  minuteBlur() {
    this.setState({ minuteFocus: false });
  }

  renderSelectField(valueInput, onChangeInput, optionsInput, id) {
    let theme = this.props.darkMode ? darkTheme : lightTheme;
    return (
      <select id={id + '_' + this.props.mode} style={theme} value={valueInput} onChange={onChangeInput}>
        {optionsInput}
      </select>
    );
  }

  render() {
    let glyphColor = this.props.darkMode ? '#FFFFFF' : '#555';
    let hours = this.generateHourSelectValues();
    let minutes = this.generateMinuteSelectValues();
    let hour = this.props.date.hour();
    let minute = this.props.date.minute();
    let hourFocusStyle = {};
    hourFocusStyle = addFocusStyle(this.state.hourFocus, hourFocusStyle);
    let minuteFocusStyle = {};
    minuteFocusStyle = addFocusStyle(this.state.minuteFocus, minuteFocusStyle);

    return (
      <div className="timeContainer">
        <div className="timeSelectContainer">
          <div
            className="multipleContentOnLine"
            onFocus={this.hourFocus}
            onBlur={this.hourBlur}
            style={hourFocusStyle}
          >
            {this.renderSelectField(hour, this.handleHourChange, hours, 'Hour')}
          </div>
          <div className="multipleContentOnLine">:</div>
          <div
            className="multipleContentOnLine"
            onFocus={this.minuteFocus}
            onBlur={this.minuteBlur}
            style={minuteFocusStyle}
          >
            {this.renderSelectField(minute, this.handleMinuteChange, minutes, 'Minutes')}
          </div>
        </div>
        <Glyphicon style={{color: glyphColor}} className="timeIconStyle" glyph="time" />
      </div>
    );
  }
}

TimeField.propTypes = {
  timeChangeCallback: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  date: momentPropTypes.momentObj,
  darkMode: PropTypes.bool,
};
export default TimeField;
