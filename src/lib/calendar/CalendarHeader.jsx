import React from 'react';
import '../style/DateTimeRange.css';

class CalendarHeader extends React.Component {
	mapHeaderToDiv(headers) {
		return headers.map(function(header, i) {
			return <div key={i}>{header}</div>;
		});
	}

	render() {
		let headerDivs = this.mapHeaderToDiv(this.props.headers);
		return <div className="calendarGrid header">{headerDivs}</div>;
	}
}
export default CalendarHeader;
