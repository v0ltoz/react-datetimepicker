import React from 'react';
import { findDOMNode } from 'react-dom';
import './style/DateTimeRange.css';
import { DateTimeRangePicker } from './DateTimeRangePicker';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
export const mobileBreakPoint = 680;

class DateTimeRangeContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			x: 0,
			y: 0,
			screenWidthToTheRight: 0,
			errorClass: ''
		};
		this.resize = this.resize.bind(this);
		this.onClickContainerHandler = this.onClickContainerHandler.bind(this);
		this.handleOutsideClick = this.handleOutsideClick.bind(this);
		this.changeVisibleState = this.changeVisibleState.bind(this);
		this.keyDown = this.keyDown.bind(this);
	}

	componentDidMount() {
		window.addEventListener('resize', this.resize);
		document.addEventListener('keydown', this.keyDown, false);
		this.resize();
	}

	componentWillMount() {
		window.removeEventListener('resize', this.resize);
		document.removeEventListener('keydown', this.keyDown, false);
	}

	resize() {
		const domNode = findDOMNode(this).children[0];
		let boundingClientRect = domNode.getBoundingClientRect();
		let widthRightOfThis = window.innerWidth - boundingClientRect.x;
		if (widthRightOfThis < mobileBreakPoint) {
			// If in small mode put picker in middle of child
			let childMiddle = boundingClientRect.width / 2;
			let containerMiddle = 144;
			let newY = childMiddle - containerMiddle;
			this.setState({ x: boundingClientRect.height + 5, y: newY, screenWidthToTheRight: widthRightOfThis });
		} else {
			this.setState({ x: boundingClientRect.height + 5, y: 0, screenWidthToTheRight: widthRightOfThis });
		}
	}

	keyDown(e) {
		if (e.keyCode === 27) {
			this.setState({ visible: false });
			document.removeEventListener('keydown', this.keyDown, false);
		}
	}

	onClickContainerHandler(event) {
		if (!this.state.visible) {
			document.addEventListener('click', this.handleOutsideClick, false);
			document.addEventListener('keydown', this.keyDown, false);
			this.changeVisibleState();
		}
	}

	handleOutsideClick(e) {
		// ignore clicks on the component itself
		if (this.state.visible) {
			if (this.container.contains(e.target)) {
				return;
			}
			document.removeEventListener('click', this.handleOutsideClick, false);
			this.changeVisibleState();
		}
	}

	changeVisibleState() {
		this.setState(prevState => ({
			visible: !prevState.visible
		}));
	}

	shouldShowPicker() {
		if (this.state.visible && this.state.screenWidthToTheRight < mobileBreakPoint) {
			return 'block';
		} else if (this.state.visible) {
			return 'flex';
		} else {
			return 'none';
		}
	}

	updateErrorClass(className) {
		if (this.state.errorClass !== className) this.setState({ errorClass: className });
	}

	render() {
		let showPicker = this.shouldShowPicker();
		let x = this.state.x;
		let y = this.state.y;
		return (
			<div
				id="DateRangePickerContainer"
				className={`daterangepickercontainer ${this.state.errorClass}`}
				onClick={this.onClickContainerHandler}
				ref={container => {
					this.container = container;
				}}
			>
				{this.props.children && <div id="DateRangePickerChildren">{this.props.children}</div>}
				<div id="daterangepicker" className={`daterangepicker ${this.state.errorClass}`} style={{ top: x, left: y, display: showPicker }}>
					<DateTimeRangePicker
						disableTime={this.props.disableTime}
						disableDateBox={this.props.disableDateBox}
						ranges={this.props.ranges}
						start={this.props.start}
						end={this.props.end}
						local={this.props.local}
						applyCallback={this.props.applyCallback}
						changeVisibleState={this.changeVisibleState}
						screenWidthToTheRight={this.state.screenWidthToTheRight}
						maxDate={this.props.maxDate}
						maxDays={this.props.maxDays}
						updateErrorClass={this.updateErrorClass.bind(this)}
					/>
				</div>
			</div>
		);
	}
}

DateTimeRangeContainer.propTypes = {
	ranges: PropTypes.object.isRequired,
	start: momentPropTypes.momentObj,
	end: momentPropTypes.momentObj,
	local: PropTypes.object.isRequired,
	applyCallback: PropTypes.func.isRequired,
	maxDate: momentPropTypes.momentObj,
	disableTime: PropTypes.bool,
	disableDateBox: PropTypes.bool,
	maxDays: PropTypes.number
};

DateTimeRangeContainer.defaultProps = {
	maxDays: 366,
	disableDateBox: false,
	disableTime: false
};

export default DateTimeRangeContainer;
