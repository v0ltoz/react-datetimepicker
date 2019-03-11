import React, { Component } from 'react';
import { DateTimeRangeComponent } from './lib';
import moment from 'moment';

export default class DemoBase extends Component {
	constructor(props) {
		super(props);

		let now = new Date();
		let start = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0));
		let end = moment(start)
			.add(1, 'days')
			.subtract(1, 'seconds');

		this.state = {
			start: start,
			end: end
		};

		this.applyCallback = this.applyCallback.bind(this);
	}

	applyCallback(startDate, endDate) {
		this.setState({
			start: startDate,
			end: endDate
		});
	}

	render() {
		return (
			<div>
				<DateTimeRangeComponent start={this.state.start} end={this.state.end} applyCallback={this.applyCallback} />
			</div>
		);
	}
}
