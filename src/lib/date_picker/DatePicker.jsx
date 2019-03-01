import React from 'react';
import '../style/DateTimeRange.css';
import Label from './Label';
import DateField from './DateField';
import TimeField from './TimeField';
import Calendar from '../calendar/Calendar';
import ApplyCancelButtons from './ApplyCancelButtons';
import ActiveNotifier from './ActiveNotifier';
import moment from 'moment';

class DatePicker extends React.Component {
	dateSelectedNoTimeCallback(data) {
		//console.log('dateSelectedNoTimeCallback ' + JSON.stringify(data));
		this.props.dateSelectedNoTimeCallback(data);
	}

	focusDate(data) {
		//console.log('focusDate ' + JSON.stringify(data));
		this.props.focusDate(data);
	}

	cellFocusedCallback(data) {
		//console.log('cellFocusedCallback ' + JSON.stringify(data));
		this.props.cellFocusedCallback(data);
	}

	render() {
		//If button property present display buttons
		let buttons;
		if (this.props.enableButtons) {
			buttons = (
				<ApplyCancelButtons
					className={this.props.className}
					changeVisibleState={this.props.changeVisibleState}
					applyCallback={this.props.applyCallback}
					local={this.props.local}
					maxDate={this.props.maxDate}
					ApplyString={this.props.translations.Apply}
					CancelString={this.props.translations.Cancel}
				/>
			);
		}
		return (
			<div className="fromDateTimeContainer">
				<div className="fromDateHourContainer">
					<Label label={this.props.label} />
					{!this.props.disableDateBox ? (
						<DateField
							date={moment(this.props.date)}
							dateTextFieldCallback={this.props.dateTextFieldCallback}
							onChangeDateTextHandlerCallback={this.props.onChangeDateTextHandlerCallback}
							dateLabel={this.props.dateLabel}
							mode={this.props.mode}
							changeSelectingModeCallback={this.props.changeSelectingModeCallback}
						/>
					) : (
						''
					)}
					{!this.props.disableTime ? <TimeField date={this.props.date} timeChangeCallback={this.props.timeChangeCallback} mode={this.props.mode} /> : ''}
				</div>

				<Calendar
					date={this.props.date}
					mode={this.props.mode}
					otherDate={this.props.otherDate}
					maxDate={this.props.maxDate}
					dateSelectedNoTimeCallback={this.dateSelectedNoTimeCallback.bind(this)}
					keyboardCellCallback={this.props.keyboardCellCallback}
					focusOnCallback={this.props.focusOnCallback}
					focusDate={this.focusDate.bind(this)}
					cellFocusedCallback={this.cellFocusedCallback.bind(this)}
					local={this.props.local}
					singleDay={this.props.singleDay}
					translations={this.props.translations}
					minYear={this.props.minYear}
					maxYear={this.props.maxYear}
				/>
				<ActiveNotifier selectingModeFrom={this.props.selectingModeFrom} mode={this.props.mode} translations={this.props.translations} />
				{buttons}
			</div>
		);
	}
}
export default DatePicker;
