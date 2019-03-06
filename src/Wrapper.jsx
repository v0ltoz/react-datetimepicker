import React from 'react';
import DateTimeRangeContainer, { DateTimeRangeComponent } from './lib/index';

import moment from 'moment';

class Wrapper extends React.Component {
	constructor(props) {
		super(props);
		let now = new Date();
		let start = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0));
		let end = moment(start)
			.add(1, 'days')
			.subtract(1, 'seconds');
		start = moment(start)
			.subtract(34, 'months')
			.subtract(1, 'seconds');
		end = moment(start)
			.add(5, 'days')
			.add();
		this.state = {
			start: start,
			end: end
		};

		this.onClick = this.onClick.bind(this);
		this.applyCallback = this.applyCallback.bind(this);
	}

	applyCallback(startDate, endDate) {
		//console.log('Apply Callback');
		//console.log(startDate.format('DD-MM-YYYY HH:mm'));
		//console.log(endDate.format('DD-MM-YYYY HH:mm'));
		this.setState({
			start: startDate,
			end: endDate
		});
	}
	onChangeReady(data) {
		//console.log(data);
	}
	onClick() {
		let newStart = moment(this.state.start).subtract(3, 'days');
		// console.log("On Click Callback");
		// console.log(newStart.format("DD-MM-YYYY HH:mm"));
		this.setState({ start: newStart });
	}

	renderContainerNoGrid(ranges, local, maxDate) {
		return (
			<div className="single-example">
				<h1 style={h1style}>renderContainerNoGrid</h1>
				<DateTimeRangeContainer ranges={ranges} start={this.state.start} end={this.state.end} local={local} maxDate={maxDate} applyCallback={this.applyCallback}>
					<input id="formControlsTextB" type="text" label="Text" placeholder="Enter text" />
				</DateTimeRangeContainer>
				<div onClick={this.onClick}>Click Me to test change state here and updating picker</div>
			</div>
		);
	}

	renderGrid(ranges, local, maxDate) {
		return (
			<div className="single-example">
				<h1 style={h1style}>renderGrid</h1>

				<DateTimeRangeContainer ranges={ranges} start={this.state.start} end={this.state.end} local={local} applyCallback={this.applyCallback}>
					<input id="formControlsTextB" type="text" label="Text" placeholder="Enter text" />
				</DateTimeRangeContainer>
			</div>
		);
	}
	renderMaxDays(ranges, local, maxDate) {
		return (
			<div className="single-example">
				<h1 style={h1style}>renderMaxDays</h1>
				<DateTimeRangeContainer ranges={ranges} start={this.state.start} end={this.state.end} local={local} applyCallback={this.applyCallback} maxDays={7}>
					<input id="formControlsTextB" type="text" label="Text" placeholder="Enter text" />
				</DateTimeRangeContainer>
			</div>
		);
	}
	renderDisableTime(ranges, local, maxDate) {
		return (
			<div className="single-example">
				<h1 style={h1style}>renderDisableTime</h1>

				<DateTimeRangeContainer ranges={ranges} start={this.state.start} end={this.state.end} local={local} applyCallback={this.applyCallback} disableTime>
					<input id="formControlsTextB" type="text" label="Text" placeholder="Enter text" />
				</DateTimeRangeContainer>
			</div>
		);
	}
	renderDisableDateBox(ranges, local, maxDate) {
		return (
			<div className="single-example">
				<h1 style={h1style}>renderDisableDateBox</h1>
				<DateTimeRangeContainer ranges={ranges} start={this.state.start} end={this.state.end} local={local} applyCallback={this.applyCallback} disableDateBox>
					<input id="formControlsTextB" type="text" label="Text" placeholder="Enter text" />
				</DateTimeRangeContainer>
			</div>
		);
	}

	renderDisabled(ranges, local, maxDate) {
		return (
			<div className="single-example">
				<h1 style={h1style}>renderDisabled</h1>
				<DateTimeRangeContainer ranges={ranges} start={this.state.start} end={this.state.end} local={local} applyCallback={this.applyCallback} disabled>
					<input id="formControlsTextB" type="text" label="Text" placeholder="Enter text" />
				</DateTimeRangeContainer>
			</div>
		);
	}
	renderTranslated(ranges, local, maxDate) {
		return (
			<div className="single-example">
				<h1 style={h1style}>renderTranslated</h1>
				<DateTimeRangeContainer ranges={ranges} start={this.state.start} end={this.state.end} local={local} applyCallback={this.applyCallback} translations={translations}>
					<input id="formControlsTextB" type="text" label="Text" placeholder="Enter text" />
				</DateTimeRangeContainer>
			</div>
		);
	}

	renderMax1Day(ranges, local, maxDate) {
		return (
			<div className="single-example">
				<h1 style={h1style}>renderMax1Day</h1>
				<DateTimeRangeContainer ranges={ranges} start={this.state.end} end={this.state.end} local={local} applyCallback={this.applyCallback} maxDays={1}>
					<input id="formControlsTextB" type="text" label="Text" placeholder="Enter text" />
				</DateTimeRangeContainer>
			</div>
		);
	}
	renderReadyToUseWT(ranges, local, maxDate) {
		return (
			<div className="single-example">
				<h1 style={h1style}>renderReadyToUseWithTime</h1>
				<DateTimeRangeComponent ranges={ranges} start={this.state.end} end={this.state.end} local={local} onChange={this.onChangeReady.bind(this)} enableTime={true} />
			</div>
		);
	}
	renderReadyToUseDisabled(ranges, local, maxDate) {
		return (
			<div className="single-example">
				<h1 style={h1style}>renderReadyToUseDisabled</h1>
				<DateTimeRangeComponent ranges={ranges} start={this.state.end} end={this.state.end} local={local} onChange={this.onChangeReady.bind(this)} disabled />
			</div>
		);
	}
	renderReadyToUse(ranges, local, maxDate) {
		return (
			<div className="single-example">
				<h1 style={h1style}>renderReadyToUse</h1>
				<DateTimeRangeComponent ranges={ranges} start={this.state.end} end={this.state.end} local={local} onChange={this.onChangeReady.bind(this)} />
			</div>
		);
	}
	renderCustomStyles(ranges, local, maxDate) {
		return (
			<div className="single-example">
				<h1 style={h1style}>renderCustomStyles</h1>
				<DateTimeRangeComponent ranges={ranges} start={this.state.end} end={this.state.end} local={local} onChange={this.onChangeReady.bind(this)} calendarStyles={customStyles} />
			</div>
		);
	}

	renderRangeCallback(ranges, local, maxDate) {
		return (
			<div className="single-example">
				<h1 style={h1style}>renderRangeCallback</h1>
				<DateTimeRangeComponent ranges={ranges} start={this.state.end} end={this.state.end} local={local} onChange={this.onChangeReady.bind(this)} rangeCallback={this.onRange.bind(this)} />
			</div>
		);
	}

	renderConfusingRanges(ranges, local, maxDate) {
		return (
			<div className="single-example">
				<h1 style={h1style}>renderConfusingRanges</h1>
				<DateTimeRangeContainer ranges={ranges} start={this.state.end} end={this.state.end} local={local} applyCallback={this.applyCallback}>
					<input id="formControlsTextB" type="text" label="Text" placeholder="Enter text" />
				</DateTimeRangeContainer>
			</div>
		);
	}

	onRange(value, data, cbdata) {
		//console.log('range selected callback: ' + value + ' > ' + data);
		//console.log(cbdata);
	}

	render() {
		let now = new Date();
		let start = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0));
		let end = moment(start)
			.add(1, 'days')
			.subtract(1, 'seconds');
		let ranges = {
			'Today Only': [moment(start), moment(end)],
			'Yesterday Only': [moment(start).subtract(1, 'days'), moment(end).subtract(1, 'days')],
			'3 Days': [moment(start).subtract(3, 'days'), moment(end)],
			'5 Days': [moment(start).subtract(5, 'days'), moment(end)],
			'1 Week': [moment(start).subtract(7, 'days'), moment(end)],
			'2 Weeks': [moment(start).subtract(14, 'days'), moment(end)],
			'1 Month': [moment(start).subtract(1, 'months'), moment(end)],
			'90 Days': [moment(start).subtract(90, 'days'), moment(end)],
			'1 Year': [moment(start).subtract(1, 'years'), moment(end)]
		};

		const ranges2 = [
			{ title: 'prima colonna', ranges: ranges },
			{ title: 'seconda colonna', ranges: ranges },
			{ title: 'tersa colonna', ranges: ranges },
			{ title: 'quarsa colonna', ranges: ranges }
		];

		let local = {
			format: 'DD-MM-YYYY HH:mm',
			sundayFirst: false
		};
		let maxDate = moment(start).add(24, 'hour');
		return (
			<div style={divstyle}>
				{this.renderMax1Day(ranges, local, maxDate)}

				{this.renderGrid(ranges, local, maxDate)}

				{this.renderContainerNoGrid(ranges, local, maxDate)}

				{this.renderDisableTime(ranges, local, maxDate)}

				{this.renderDisableDateBox(ranges, local, maxDate)}

				{this.renderMaxDays(ranges, local, maxDate)}

				{this.renderDisabled(ranges, local, maxDate)}

				{this.renderTranslated(ranges, local, maxDate)}

				{this.renderReadyToUse(ranges, local, maxDate)}
				{this.renderReadyToUseWT(ranges, local, maxDate)}

				{this.renderCustomStyles(ranges, local, maxDate)}

				{this.renderReadyToUseDisabled(ranges, local, maxDate)}
				{this.renderRangeCallback(ranges, local, maxDate)}

				{this.renderConfusingRanges(ranges2, local, maxDate)}
			</div>
		);
	}
}
export { Wrapper };

const h1style = { borderTop: '1px solid gray', fontSize: 14, fontWeight: 600 };

const divstyle = { padding: 30 };

const translations = {
	Apply: 'appleeeeca',
	Cancel: 'annuuuuu',
	customRange: 'customme',
	FromDate: 'daaaa',
	ToDate: 'aaaaa',
	months: ['1January', '2February', '3March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
	days: ['Lu', 'Ma', 'Me', 'Th', 'Fr', 'Sa', 'Su']
};

const customStyles = {
	inBetweenStyle: () => {
		return {
			borderRadius: '0',
			borderColour: 'transparent',
			color: 'red',
			backgroundColor: '#ffaaaa',
			cursor: 'pointer'
		};
	},

	startDateStyle: () => {
		return {
			borderRadius: '10px 0 0 10px',
			borderColour: 'transparent',
			color: '#fff',
			backgroundColor: 'red',
			cursor: 'pointer'
		};
	},

	endDateStyle: () => {
		return {
			borderRadius: '0 10px 10px 0',
			borderColour: 'transparent',
			color: '#fff',
			backgroundColor: 'red',
			cursor: 'pointer'
		};
	},

	normalRangeStyle: () => {
		return { color: 'red' };
	},
	selectedRangeStyle: () => {
		return {
			backgroundColor: 'red'
		};
	}
};
