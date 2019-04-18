import React from 'react';
import '../style/DateTimeRange.css';
import { InputGroup, FormControl, Glyphicon } from 'react-bootstrap';
import PropTypes from 'prop-types';

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
    return (
      <InputGroup onClick={this.onClick} style={{ cursor: 'pointer' }}>
        <InputGroup.Addon className="calendarAddon">
          <Glyphicon glyph="calendar" />
        </InputGroup.Addon>
        <FormControl
          className="inputDate"
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
};
export default DateField;
