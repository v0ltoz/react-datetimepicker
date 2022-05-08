import React from 'react';
import '../style/DateTimeRange.css';
import InputGroup from 'react-bootstrap/InputGroup'
import Form from "react-bootstrap/Form";
import PropTypes from 'prop-types';
import {darkTheme, lightTheme} from "../utils/StyleUtils";

class DateField extends React.Component {
  constructor(props) {
    super(props);

    this.onChangeDateTextHandler = this.onChangeDateTextHandler.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onChangeDateTextHandler(event) {
    this.props.onChangeDateTextHandlerCallback(
      event.target.value,
      this.props.mode,
    );
  }

  onBlur() {
    this.props.dateTextFieldCallback(this.props.mode);
  }

  onClick() {
    if (this.props.mode === 'start') {
      this.props.changeSelectingModeCallback(true);
    } else {
      this.props.changeSelectingModeCallback(false);
    }
  }

  render() {
    let glyphColor = this.props.darkMode ? '#FFFFFF' : '#555';
    let theme = this.props.darkMode ? darkTheme : lightTheme;
    return (
      <InputGroup onClick={this.onClick} style={{ cursor: 'pointer' }}>
        <InputGroup.Text className="calendarAddon">
        <i style={{ color: glyphColor }} className="bi bi-calendar-event icon-bold"></i>
        </InputGroup.Text>
        <Form.Control
          className="inputDate"
          id={"DateTimeInput_" + this.props.mode}
          style={theme}
          type="text"
          value={this.props.dateLabel}
          onChange={this.onChangeDateTextHandler}
          onBlur={this.onBlur}
        />
      </InputGroup>
    );
  }
}

DateField.propTypes = {
  changeSelectingModeCallback: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  dateLabel: PropTypes.string.isRequired,
  dateTextFieldCallback: PropTypes.func.isRequired,
  onChangeDateTextHandlerCallback: PropTypes.func.isRequired,
  darkMode: PropTypes.bool,
};
export default DateField;
