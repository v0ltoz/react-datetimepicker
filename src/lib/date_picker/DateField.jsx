import React from 'react';
import '../style/DateTimeRange.css';
// import { InputGroup } from 'react-bootstrap';
import { Form, Input, Label, Icon } from 'semantic-ui-react';
import Glyphicon from '@strongdm/glyphicon';
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
      <Form.Group onClick={this.onClick} style={{ cursor: 'pointer' }}>
        {/* <span className="calendarAddon"> */}
        {/* <Icon name="calendar alternate" /> */}
        {/* </span> */}
        <Input
          className="inputDate"
          id={"DateTimeInput_" + this.props.mode}
          icon="calendar alternate"
          iconPosition="left"
          style={theme}
          type="text"
          value={this.props.dateLabel}
          onChange={this.onChangeDateTextHandler}
          onBlur={this.onBlur}
        />
      </Form.Group>
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
