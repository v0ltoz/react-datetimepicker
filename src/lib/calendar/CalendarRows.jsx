import React from "react";
import "../style/DateTimeRange.css";
import CalendarRow from "./CalendarRow";

class CalendarRows extends React.Component {
    generateDays() {
        let calendarRows = [];
        for (let i = 0; i < 6; i++) {
            let startIndex = i * 7;
            let endIndex = (i + 1) * 7;
            let rowDays = this.props.fourtyTwoDays.slice(startIndex, endIndex);
            calendarRows.push(
                <CalendarRow
                    calendarStyles={this.props.calendarStyles}
                    key={i}
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
                    selectingModeFrom={this.props.selectingModeFrom}
                    cellDateHover={this.props.cellDateHover}
                />
            );
        }
        return calendarRows;
    }

    render() {
        let calendarRows = this.generateDays();
        return <div>{calendarRows}</div>;
    }
}
export default CalendarRows;
