import React from 'react';
import '../style/DateTimeRange.css';
import Cell from './Cell';

class CalendarRow extends React.Component {
	generateCells() {
		let cells = [];
		let daysSize = this.props.rowDays.length;
		for (let i = 0; i < daysSize; i++) {
			cells.push(
				<Cell
					calendarStyles={this.props.calendarStyles}
					key={i}
					cellDay={this.props.rowDays[i]}
					date={this.props.date}
					otherDate={this.props.otherDate}
					maxDate={this.props.maxDate}
					minDate={this.props.minDate}
					month={this.props.month}
					year={this.props.year}
					dateSelectedNoTimeCallback={this.props.dateSelectedNoTimeCallback}
					keyboardCellCallback={this.props.keyboardCellCallback}
					focusOnCallback={this.props.focusOnCallback}
					focusDate={this.props.focusDate}
					cellFocusedCallback={this.props.cellFocusedCallback}
					selectingModeFrom={this.props.selectingModeFrom}
					cellDateHover={this.props.cellDateHover}
					className={this.props.className}
				/>
			);
		}
		return cells;
	}

	render() {
		let cells = this.generateCells();
		return <div className="calendarGrid">{cells}</div>;
	}
}
export default CalendarRow;
