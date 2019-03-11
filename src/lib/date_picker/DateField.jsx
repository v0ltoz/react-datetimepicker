import React from 'react';
import '../style/DateTimeRange.css';
import SmallGlyphicon from '../SmallGlyphicon';

class DateField extends React.Component {
	constructor(props) {
		super(props);

		this.onChangeDateTextHandler = this.onChangeDateTextHandler.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.onClick = this.onClick.bind(this);
	}

	onChangeDateTextHandler(event) {
		debugger;
		this.props.onChangeDateTextHandlerCallback(event.target.value, this.props.mode);
	}

	onBlur() {
		this.props.dateTextFieldCallback(this.props.mode);
	}

	onClick() {
		if (this.props.mode === 'start') {
			this.props.changeSelectingModeCallback(true);
		} else {
			this.props.changeSelectingModeCallback(false);
		}
	}

	render() {
		return (
			<div className={'anci-input-group'} onClick={this.onClick} style={{ cursor: 'pointer' }}>
				<span className="calendarAddon anci-input-group-addon">
					<SmallGlyphicon glyph="calendar" />
				</span>
				<input className="inputDate" type="text" value={this.props.dateLabel} onChange={this.onChangeDateTextHandler} onBlur={this.onBlur} />
			</div>
		);
	}
}
export default DateField;
