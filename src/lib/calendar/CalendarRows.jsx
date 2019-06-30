import React from 'react';
import '../style/DateTimeRange.css';
import momentPropTypes from 'react-moment-proptypes';
import PropTypes from 'prop-types';
import CalendarRow from './CalendarRow';

class CalendarRows extends React.Component {
  generateDays() {
    let calendarRows = [];
    for (let i = 0; i < 6; i++) {
      let startIndex = i * 7;
      let endIndex = (i + 1) * 7;
      let rowDays = this.props.fourtyTwoDays.slice(startIndex, endIndex);
      calendarRows.push(
        <CalendarRow
          key={i}
          row={i}
          rowDays={rowDays}
          date={this.props.date}
          otherDate={this.props.otherDate}
          maxDate={this.props.maxDate}
          month={this.props.month}
          year={this.props.year}
          dateSelectedNoTimeCallback={this.props.dateSelectedNoTimeCallback}
          keyboardCellCallback={this.props.keyboardCellCallback}
          focusOnCallback={this.props.focusOnCallback}
          focusDate={this.props.focusDate}
          cellFocusedCallback={this.props.cellFocusedCallback}
          mode={this.props.mode}
          smartMode={this.props.smartMode}
          style={this.props.style}
          darkMode={this.props.darkMode}
        />,
      );
    }
    return calendarRows;
  }

  render() {
    let calendarRows = this.generateDays();
    return <div>{calendarRows}</div>;
  }
}

CalendarRows.propTypes = {
  date: momentPropTypes.momentObj,
  fourtyTwoDays: PropTypes.array.isRequired,
  otherDate: momentPropTypes.momentObj,
  maxDate: momentPropTypes.momentObj,
  dateSelectedNoTimeCallback: PropTypes.func.isRequired,
  keyboardCellCallback: PropTypes.func.isRequired,
  focusOnCallback: PropTypes.func.isRequired,
  focusDate: PropTypes.any.isRequired,
  cellFocusedCallback: PropTypes.func.isRequired,
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  mode: PropTypes.string.isRequired,
  smartMode: PropTypes.bool,
  style: PropTypes.object,
  darkMode: PropTypes.bool,
};

export default CalendarRows;
