import React from 'react';
import '../style/DateTimeRange.css';
// import Glyphicon from '@strongdm/glyphicon';
import { Input, Icon } from 'semantic-ui-react';
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
    this.handleMeridiemChange = this.handleMeridiemChange.bind(this);
    this.hourFocus = this.hourFocus.bind(this);
    this.minuteFocus = this.minuteFocus.bind(this);
    this.hourBlur = this.hourBlur.bind(this);
    this.minuteBlur = this.minuteBlur.bind(this);
  }

  generateHourSelectValues() {
    let selectValues = [];
    for (let i = this.props.twelveHoursClock ? 1 : 0; i <= (this.props.twelveHoursClock ? 12 : 23); i++) {
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

  generateMeridiemSelectValues() {
    let selectValues = [
      <option key={'am'} value={'am'}>
        AM
      </option>,
      <option key={'pm'} value={'pm'}>
        PM
      </option>,
    ];

    return selectValues;
  }

  convertHourUsingMeridiem(hour, meridiem) {
    if (meridiem === 'pm' && hour !== 12) {
      return hour + 12;
    } else if (meridiem === 'am' && hour === 12) return 0;
    else return hour;
  }

  handleHourChange(event) {
    this.props.timeChangeCallback(
      this.props.twelveHoursClock
        ? this.convertHourUsingMeridiem(parseInt(event.target.value), this.props.date.format('a'))
        : parseInt(event.target.value),
      this.props.date.minute(),
      this.props.mode,
    );
  }

  handleMinuteChange(event) {
    this.props.timeChangeCallback(this.props.date.hour(), parseInt(event.target.value), this.props.mode);
  }

  handleMeridiemChange(event) {
    this.props.timeChangeCallback(
      this.convertHourUsingMeridiem(parseInt(this.props.date.format('h')), event.target.value),
      this.props.date.minute(),
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

  renderNumberField(valueInput, onChangeInput, optionsInput, id, min, max){
    let theme = this.props.darkMode ? darkTheme : lightTheme;
    return (
      <Input
        id={id + '_' + this.props.mode}
        style={theme}
        type="number"
        value={valueInput}
        onChange={onChangeInput}
        min={min}
        max={max}
    />
    );
  }

  render() {
    let glyphColor = this.props.darkMode ? '#FFFFFF' : '#555';
    let hours = this.generateHourSelectValues();
    let minutes = this.generateMinuteSelectValues();
    let meridiems = this.generateMeridiemSelectValues();
    let hour = this.props.twelveHoursClock ? parseInt(this.props.date.format('h')) : this.props.date.hour();
    let minute = this.props.date.minute();
    let meridiem = this.props.date.format('a');

    let hourFocusStyle = {};
    hourFocusStyle = addFocusStyle(this.state.hourFocus, hourFocusStyle);
    let minuteFocusStyle = {};
    minuteFocusStyle = addFocusStyle(this.state.minuteFocus, minuteFocusStyle);

    return (
      <div className="timeContainer">
        <div className="timeSelectContainer">
            <span><Icon name="clock outline"/></span>
          <div className="multipleContentOnLine" onFocus={this.hourFocus} onBlur={this.hourBlur} style={hourFocusStyle}>
            {this.renderNumberField(hour, this.handleHourChange, hours, 'Hour', 0, 24)}
          </div>
          <div className="multipleContentOnLine">:</div>
          <div
            className="multipleContentOnLine"
            onFocus={this.minuteFocus}
            onBlur={this.minuteBlur}
            style={minuteFocusStyle}
          >
            {this.renderNumberField(minute, this.handleMinuteChange, minutes, 'Minutes', 0, 59)}
          </div>
          {this.props.twelveHoursClock && (
            <div className="multipleContentOnLine">
              {this.renderNumberField(meridiem, this.handleMeridiemChange, meridiems, 'Meridiem')}
            </div>
          )}
        </div>
      </div>
    );
  }
}

TimeField.propTypes = {
  timeChangeCallback: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  date: momentPropTypes.momentObj,
  darkMode: PropTypes.bool,
  twelveHoursClock: PropTypes.bool,
};
export default TimeField;
