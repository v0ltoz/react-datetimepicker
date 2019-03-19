import React from 'react';
import '../style/DateTimeRange.css';

class ActiveNotifier extends React.Component {
	getDotDiv(text, style) {
		return (
			<div className="activeNotifier">
				{text} <span className={'dot ' + style} />
			</div>
		);
	}

	render() {
		let selectingModeFrom = this.props.selectingModeFrom;
		let mode = this.props.mode;

		let notifier;
		if (selectingModeFrom && mode === 'start') {
			notifier = this.getDotDiv(this.props.translations.SelectingFrom, 'start');
		} else if (!selectingModeFrom && mode === 'end') {
			notifier = this.getDotDiv(this.props.translations.SelectingTo, 'end');
		} else {
			notifier = <div className="activeNotifier"> &zwnj; </div>;
		}
		return <div>{notifier}</div>;
	}
}
export default ActiveNotifier;
