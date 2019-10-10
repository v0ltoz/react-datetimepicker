import React from 'react';
import '../style/DateTimeRange.css';
import moment from 'moment';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import Label from './Label';
import DateField from './DateField';
import TimeField from './TimeField';
import Calendar from '../calendar/Calendar';
import ApplyCancelButtons from './ApplyCancelButtons';
import ActiveNotifier from './ActiveNotifier';

class DatePicker extends React.Component {
  render() {
    //If button property present display buttons
    let buttons;
    if (this.props.enableButtons) {
      buttons = (
        <ApplyCancelButtons
          changeVisibleState={this.props.changeVisibleState}
          applyCallback={this.props.applyCallback}
          local={this.props.local}
          maxDate={this.props.maxDate}
          autoApply={this.props.autoApply}
          standalone={this.props.standalone}
        />
      );
    }
    return (
      <div className="fromDateTimeContainer">
        <div className="fromDateHourContainer">
          <Label label={this.props.label} />
          <DateField
            date={moment(this.props.date)}
            dateTextFieldCallback={this.props.dateTextFieldCallback}
            onChangeDateTextHandlerCallback={
              this.props.onChangeDateTextHandlerCallback
            }
            dateLabel={this.props.dateLabel}
            mode={this.props.mode}
            changeSelectingModeCallback={this.props.changeSelectingModeCallback}
            darkMode={this.props.darkMode}
          />
          <TimeField
            date={this.props.date}
            timeChangeCallback={this.props.timeChangeCallback}
            mode={this.props.mode}
            darkMode={this.props.darkMode}
          />
        </div>
        <Calendar
          date={this.props.date}
          mode={this.props.mode}
          otherDate={this.props.otherDate}
          maxDate={this.props.maxDate}
          dateSelectedNoTimeCallback={this.props.dateSelectedNoTimeCallback}
          keyboardCellCallback={this.props.keyboardCellCallback}
          focusOnCallback={this.props.focusOnCallback}
          focusDate={this.props.focusDate}
          cellFocusedCallback={this.props.cellFocusedCallback}
          local={this.props.local}
          descendingYears={this.props.descendingYears}
          years={this.props.years}
          pastSearchFriendly={this.props.pastSearchFriendly}
          smartMode={this.props.smartMode}
          style={this.props.style}
          darkMode={this.props.darkMode}
        />
        <ActiveNotifier
          selectingModeFrom={this.props.selectingModeFrom}
          mode={this.props.mode}
          smartMode={this.props.smartMode}
          style={this.props.style}
          local={this.props.local}
        />
        {buttons}
      </div>
    );
  }
}

DatePicker.propTypes = {
  local: PropTypes.object,
  date: momentPropTypes.momentObj.isRequired,
  otherDate: momentPropTypes.momentObj,
  mode: PropTypes.string.isRequired,
  maxDate: momentPropTypes.momentObj,
  applyCallback: PropTypes.func.isRequired,
  dateSelectedNoTimeCallback: PropTypes.func.isRequired,
  keyboardCellCallback: PropTypes.func.isRequired,
  cellFocusedCallback: PropTypes.func.isRequired,
  focusOnCallback: PropTypes.func.isRequired,
  focusDate: PropTypes.any.isRequired,
  selectingModeFrom: PropTypes.bool.isRequired,
  changeVisibleState: PropTypes.func,
  timeChangeCallback: PropTypes.func.isRequired,
  changeSelectingModeCallback: PropTypes.func.isRequired,
  onChangeDateTextHandlerCallback: PropTypes.func.isRequired,
  dateTextFieldCallback: PropTypes.func.isRequired,
  dateLabel: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  descendingYears: PropTypes.bool,
  years: PropTypes.array,
  pastSearchFriendly: PropTypes.bool,
  smartMode: PropTypes.bool,
  enableButtons: PropTypes.bool,
  autoApply: PropTypes.bool,
  style: PropTypes.object,
  darkMode: PropTypes.bool,
  standalone: PropTypes.bool,
};
export default DatePicker;
