import React from 'react';
import '../style/DateTimeRange.css';
import RangeButton from './RangeButton';
import { mobileBreakPoint } from '../DateTimeRangeContainer';

class Ranges extends React.Component {
	constructor(props) {
		super(props);

		let focused = [];
		let ranges = Object.values(this.props.ranges);
		for (let i = 0; i < ranges.length; i++) {
			focused.push(false);
		}

		this.state = {
			viewingIndex: 0,
			focused: focused
		};

		this.viewingIndexChangeCallback = this.viewingIndexChangeCallback.bind(this);
		this.setFocusedCallback = this.setFocusedCallback.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		// On Change of Selected Range reset viewing index to be the range index
		if (this.props.selectedRange !== nextProps.selectedRange) {
			this.setState({
				viewingIndex: nextProps.selectedRange
			});
		}
	}

	viewingIndexChangeCallback(newIndex) {
		// Allow a new item selected to be made
		let length = this.state.focused.length;
		if (newIndex >= 0 && newIndex < length) {
			this.setState({
				viewingIndex: newIndex
			});
		}
	}

	setFocusedCallback(index, focusedInput) {
		// Set the focus value of indexed item, focusedInput is true or false
		let focused = this.state.focused;
		focused[index] = focusedInput;
		this.setState({
			focused: focused
		});
	}

	render() {
		let displayI = this.props.screenWidthToTheRight < mobileBreakPoint ? 'contents' : '';

		const { ranges } = this.props;

		if (!Array.isArray(ranges)) {
			// Map the range index and object name and value to a range button
			return (
				<div className="rangecontainer" style={{ display: displayI }}>
					{this.getButtons(ranges)}
				</div>
			);
		} //if (Array.isArray(ranges.columns))
		else {
			return (
				<div className={`rangecontainer columns col${ranges.length}`} style={{ display: displayI }}>
					{Object.keys(ranges).map((column, i) => {
						const curColumn = ranges[column];
						return (
							<div className="range-column" key={`col-range-${i}`}>
								<div className="title">{curColumn.title}</div>

								<div className="buttons">{this.getButtons(curColumn.ranges)}</div>
							</div>
						);
					})}
				</div>
			);
		}
	}

	getButtons(ranges) {
		return Object.keys(ranges).map((range, i) => (
			<RangeButton
				key={i}
				index={i}
				label={range}
				value={ranges[range]}
				selectedRange={this.props.selectedRange}
				rangeSelectedCallback={this.props.rangeSelectedCallback}
				viewingIndex={this.state.viewingIndex}
				viewingIndexChangeCallback={this.viewingIndexChangeCallback}
				focused={this.state.focused}
				setFocusedCallback={this.setFocusedCallback}
				calendarStyles={this.props.calendarStyles}
			/>
		));
	}
}
export default Ranges;
