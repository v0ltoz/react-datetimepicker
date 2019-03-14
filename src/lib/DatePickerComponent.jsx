import React, { Component } from 'react';
import DateTimeRangeComponent from './DateTimeRangeComponent';
import PropTypes from 'prop-types';

export default class DatePickerComponent extends Component {
	dateSelected() {}

	render() {
		let translations = this.props.translations || {};
		if (this.props.label != null) translations.ToDate = this.props.label;

		return (
			<DateTimeRangeComponent
				maxDays={1}
				maxDate={this.props.maxDate}
				minDate={this.props.minDate}
				start={this.props.date}
				end={this.props.date}
				ranges={{}}
				enableTime={this.props.enableTime}
				disabled={this.props.disabled}
				onChange={data => this.props.onChange(data.start)}
				className={'single-picker ' + (this.props.className != null ? this.props.className : '')}
				minYear={this.props.minYear}
				maxYear={this.props.maxYear}
				translations={translations}
				calendarStyles={this.props.calendarStyles}
				rangeCallback={() => {}}
				showCurrentState={false}
				autoCloseOnSelection={true}
				useVirtualSelection={false}
				rangesOnTheRight={false}
				local={this.props.local}
				disableDateBox={this.props.disableDateBox == null || this.props.disableDateBox === true}
			/>
		);
	}
}

DatePickerComponent.propTypes = {
	date: PropTypes.object,
	translations: PropTypes.object,
	maxDate: PropTypes.object,
	minDate: PropTypes.object,
	label: PropTypes.string,
	enableTime: PropTypes.bool,
	disabled: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
	className: PropTypes.string,
	minYear: PropTypes.number,
	maxYear: PropTypes.number,
	calendarStyles: PropTypes.object,
	local: PropTypes.object,
	disableDateBox: PropTypes.bool
};

DatePickerComponent.defaultProps = {
	disableDateBox: true
};
