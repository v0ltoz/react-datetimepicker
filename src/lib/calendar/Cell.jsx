import React from 'react';
import ReactDOM from 'react-dom';
import { isInbetweenDates } from '../utils/TimeFunctionUtils';
import moment from 'moment';
import { addFocusStyle, calendarStyles } from '../utils/StyleUtils';
import { pastMaxDate, beforeMinDate } from '../utils/DateSelectedUtils';

import '../style/DateTimeRange.css';
import './Cell.css';
import { copyMissingProperties } from '../utils/ObjectUtils';

class Cell extends React.Component {
	constructor(props) {
		super(props);
		this.state = { style: {}, cssclass: '' };

		this.mouseEnter = this.mouseEnter.bind(this);
		this.mouseLeave = this.mouseLeave.bind(this);
		this.onClick = this.onClick.bind(this);
		this.keyDown = this.keyDown.bind(this);
		this.onFocus = this.onFocus.bind(this);
		this.onBlur = this.onBlur.bind(this);
	}

	getSelectedStyle() {
		if (this.props.calendarStyles == null) {
			return calendarStyles;
		}

		return copyMissingProperties(this.props.calendarStyles, calendarStyles);
	}

	componentDidUpdate(oldProps) {
		if (!this.props.date.isSame(oldProps.date) || !this.props.otherDate.isSame(oldProps.otherDate)) {
			this.styleCell();
		}
		if (!this.props.cellDay.isSame(oldProps.cellDay)) {
			this.styleCell();
		}

		// If a Cell is Selected
		// If the focusDate is this cell
		// and its not a gray cell
		// Then Focus on this cell
		let cellFocused = false;
		let focusDateIsCellDate = typeof this.props.focusDate === 'object' && this.props.focusDate.isSame(this.props.cellDay, 'day');
		if (document.activeElement.id === 'cell') {
			cellFocused = true;
		}
		if (cellFocused && focusDateIsCellDate && this.isCellThisMonth(this.props.cellDay)) {
			this.cell.focus();
			this.props.focusOnCallback(false);
		}
	}

	pastMaxDatePropsChecker(isCellDateProp, days) {
		if (isCellDateProp) {
			if (pastMaxDate(moment(this.props.date).add(days, 'days'), this.props.maxDate, true)) {
				return true;
			}
		} else {
			if (pastMaxDate(moment(this.props.otherDate).add(days, 'days'), this.props.maxDate, true)) {
				return true;
			}
		}
		return false;
	}

	beforeMinDatePropsChecker(isCellDateProp, days) {
		days = days * -1;

		if (isCellDateProp) {
			if (beforeMinDate(moment(this.props.date).add(days, 'days'), this.props.minDate, true)) {
				return true;
			}
		} else {
			if (beforeMinDate(moment(this.props.otherDate).add(days, 'days'), this.props.minDate, true)) {
				return true;
			}
		}
		return false;
	}
	keyDown(e) {
		let componentFocused = document.activeElement === ReactDOM.findDOMNode(this.cell);
		if (componentFocused && e.keyCode >= 37 && e.keyCode <= 40) {
			e.preventDefault();
			let newDate = moment(this.props.cellDay);
			// Check to see if this cell is the date prop
			let isCellDateProp = this.props.cellDay.isSame(this.props.date, 'day');
			if (e.keyCode === 38) {
				// Up Key
				newDate.subtract(7, 'days');
			} else if (e.keyCode === 40) {
				// Down Key
				if (this.pastMaxDatePropsChecker(isCellDateProp, 7)) {
					return;
				}
				if (this.beforeMinDatePropsChecker(isCellDateProp, 7)) {
					return;
				}
				newDate.add(7, 'days');
			} else if (e.keyCode === 37) {
				// Left Key
				newDate.subtract(1, 'days');
			} else if (e.keyCode === 39) {
				// Right Key
				if (this.pastMaxDatePropsChecker(isCellDateProp, 1)) {
					return;
				}
				if (this.beforeMinDatePropsChecker(isCellDateProp, 1)) {
					return;
				}
				newDate.add(1, 'days');
			}
			this.props.keyboardCellCallback(this.props.cellDay, newDate);
			this.props.focusOnCallback(newDate);
		}
	}

	onClick() {
		if (pastMaxDate(this.props.cellDay, this.props.maxDate, false)) {
			return;
		}
		if (beforeMinDate(this.props.cellDay, this.props.minDate, false)) {
			return;
		}
		this.props.dateSelectedNoTimeCallback(this.props.cellDay);
	}

	mouseEnter() {
		// If Past Max Date Style Cell Out of Use
		if (this.checkAndSetMaxDateStyle(this.props.cellDay)) {
			return;
		}
		if (this.checkAndSetMinDateStyle(this.props.cellDay)) {
			return;
		}
		let classAdd = this.props.selectingModeFrom ? ' start' : ' end';

		// Hover Style Cell, Different if inbetween start and end date
		let isDateStart = this.props.date.isSameOrBefore(this.props.otherDate, 'minute');
		if (isInbetweenDates(isDateStart, this.props.cellDay, this.props.date, this.props.otherDate)) {
			this.setState({ style: this.getSelectedStyle().hoverCellStyle(true), cssclass: 'hover-in' + classAdd });
		} else {
			this.setState({ style: this.getSelectedStyle().hoverCellStyle(), cssclass: 'hover-out' + classAdd });
		}

		if (this.props.cellDateHover && this.isCellThisMonth(this.props.cellDay)) {
			this.props.cellDateHover(this.props.cellDay, this.props.selectingModeFrom);
		}
	}

	mouseLeave() {
		this.styleCell();
	}

	onFocus() {
		this.props.cellFocusedCallback(this.props.cellDay);
		this.setState({ focus: true });
	}

	onBlur() {
		this.setState({ focus: false });
	}

	isCellThisMonth(cellDay) {
		return this.props.month === cellDay.month();
	}

	shouldStyleCellStartEnd(cellDay, date, otherDate, startCheck, endCheck) {
		let isCellDateProp = cellDay.isSame(date, 'day');
		let isCellOtherDateProp = cellDay.isSame(otherDate, 'day');
		let isDateStart = date.isSameOrBefore(otherDate, 'minute');
		let isOtherDateStart = otherDate.isSameOrBefore(date, 'minute');

		if (startCheck) {
			return (isCellDateProp && isDateStart) || (isCellOtherDateProp && isOtherDateStart);
		} else if (endCheck) {
			return (isCellDateProp && !isDateStart) || (isCellOtherDateProp && !isOtherDateStart);
		}
	}

	checkAndSetMaxDateStyle(cellDate) {
		if (pastMaxDate(cellDate, this.props.maxDate, false)) {
			this.setState({ style: this.getSelectedStyle().invalidStyle(), cssclass: 'invalid' });
			return true;
		}
		return false;
	}

	checkAndSetMinDateStyle(cellDate) {
		if (beforeMinDate(cellDate, this.props.minDate, false)) {
			this.setState({ style: this.getSelectedStyle().invalidStyle(), cssclass: 'invalid' });
			return true;
		}
		return false;
	}

	styleCell() {
		let cellDay = this.props.cellDay;
		let date = this.props.date;
		let otherDate = this.props.otherDate;

		// If Past Max Date Style Cell Out of Use
		if (this.checkAndSetMaxDateStyle(cellDay)) {
			return;
		}

		if (this.checkAndSetMinDateStyle(cellDay)) {
			return;
		}

		if (!this.isCellThisMonth(cellDay)) {
			this.setState({ style: this.getSelectedStyle().greyCellStyle(), cssclass: 'grey' });
			return;
		}

		let isDateStart = date.isSameOrBefore(otherDate, 'minute');
		let inbetweenDates = isInbetweenDates(isDateStart, cellDay, date, otherDate);

		if (this.shouldStyleCellStartEnd(cellDay, date, otherDate, true, false)) {
			this.setState({ style: this.getSelectedStyle().startDateStyle(), cssclass: 'start' });
		} else if (this.shouldStyleCellStartEnd(cellDay, date, otherDate, false, true)) {
			this.setState({ style: this.getSelectedStyle().endDateStyle(), cssclass: 'end' });
		} else if (inbetweenDates) {
			this.setState({ style: this.getSelectedStyle().inBetweenStyle(), cssclass: 'between' });
		} else {
			this.setState({ style: this.getSelectedStyle().normalCellStyle(), cssclass: '' });
		}
	}

	isStartOrEndDate() {
		let cellDay = this.props.cellDay;
		let date = this.props.date;
		let otherDate = this.props.otherDate;
		if (this.shouldStyleCellStartEnd(cellDay, date, otherDate, true, false) || this.shouldStyleCellStartEnd(cellDay, date, otherDate, false, true)) {
			return true;
		}
		return false;
	}

	render() {
		let dateFormatted = this.props.cellDay.format('D');
		let tabIndex = -1;
		if (this.isStartOrEndDate() && this.isCellThisMonth(this.props.cellDay)) {
			document.addEventListener('keydown', this.keyDown, false);
			tabIndex = 0;
		} else {
			document.removeEventListener('keydown', this.keyDown, false);
		}
		let style = addFocusStyle(this.state.focus, this.state.style);

		return (
			<div
				ref={cell => {
					this.cell = cell;
				}}
				className={`calendarCell ${this.state.cssclass} ${this.props.className ? this.props.className : ''}`}
				tabIndex={tabIndex}
				style={style}
				onMouseEnter={this.mouseEnter}
				onMouseLeave={this.mouseLeave}
				onClick={this.onClick}
				onFocus={this.onFocus}
				onBlur={this.onBlur}
			>
				{dateFormatted}
			</div>
		);
	}
}
export default Cell;
