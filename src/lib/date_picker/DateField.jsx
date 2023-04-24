import React from 'react';
import '../style/DateTimeRange.css';
import PropTypes from 'prop-types';
import { darkTheme, lightTheme } from '../utils/StyleUtils';

import { ReactComponent as CalendarIcon } from '../icons/calendar.svg';
import clsx from 'clsx';

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
      this.props.mode
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
    let theme = this.props.darkMode ? darkTheme : lightTheme;
    return (
      <div className="flex items-stretch" onClick={this.onClick}>
        <span className="block rounded rounded-l-none border-gray-200 p-2">
          <CalendarIcon
            className={clsx('h-4 w-4', {
              'text-white': this.props.darkMode,
              'text-gray-500': !this.props.darkMode,
            })}
          />
        </span>
        <input
          className="grow rounded rounded-l-none border border-gray-200 p-2"
          id={'DateTimeInput_' + this.props.mode}
          style={theme}
          type="text"
          value={this.props.dateLabel}
          onChange={this.onChangeDateTextHandler}
          onBlur={this.onBlur}
        />
      </div>
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
