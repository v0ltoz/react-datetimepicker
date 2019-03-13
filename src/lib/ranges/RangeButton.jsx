import React from 'react';
import ReactDOM from 'react-dom';
import '../style/DateTimeRange.css';
import { addFocusStyle, rangesStyles } from '../utils/StyleUtils';
import { copyMissingProperties } from '../utils/ObjectUtils';

import './RangeButton.css';

class RangeButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cssclass: '',
			style: {}
		};

		this.onFocus = this.onFocus.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.keyDown = this.keyDown.bind(this);
	}

	getSelectedStyle() {
		if (this.props.calendarStyles == null) {
			return rangesStyles;
		}

		return copyMissingProperties(this.props.calendarStyles, rangesStyles);
	}

	componentWillReceiveProps(nextProps) {
		let focused = nextProps.focused[nextProps.index];
		// If selected index or focused set to selected style
		if (nextProps.index === nextProps.selectedRange || focused) {
			this.setState({ cssclass: 'selected', style: this.getSelectedStyle().selectedRangeStyle() });
		} else {
			this.setState({ cssclass: '', style: this.getSelectedStyle().normalRangeStyle() });
		}
	}

	componentDidUpdate(prevProps, prevState) {
		let isComponentViewing = this.props.index === this.props.viewingIndex;
		let focused = this.props.focused;
		let focusedOnARange = false;
		for (let i = 0; i < focused.length; i++) {
			if (focused[i] === true) {
				focusedOnARange = true;
				break;
			}
		}
		// If the component we are currently on is the selected viewing component
		// and we are focused on it according to our focused matrix.
		// Then add an event listener for this button and set it as focused
		if (isComponentViewing && focusedOnARange) {
			document.addEventListener('keydown', this.keyDown, false);
			this.button.focus();
		}
	}

	onFocus() {
		this.setState({ focused: true });
		this.props.setFocusedCallback(this.props.index, true);
	}

	onBlur() {
		this.setState({ focused: false });
		this.props.setFocusedCallback(this.props.index, false);
		this.setState({ cssclass: 'selected' });
		document.removeEventListener('keydown', this.keyDown, false);
	}

	keyDown(e) {
		let componentFocused = document.activeElement === ReactDOM.findDOMNode(this.button);
		// Up Key
		if (e.keyCode === 38 && componentFocused) {
			e.preventDefault();
			this.props.viewingIndexChangeCallback(this.props.index - 1);
		}
		// Down Key
		else if (e.keyCode === 40 && componentFocused) {
			e.preventDefault();
			this.props.viewingIndexChangeCallback(this.props.index + 1);
		}
		// Space Bar and Enter
		else if (e.keyCode === 32 || e.keyCode === 13) {
			this.props.rangeSelectedCallback(this.props.index, this.props.label);
		}
	}

	render() {
		let isViewingIndex = this.props.viewingIndex === this.props.index;
		let tabIndex = isViewingIndex ? 0 : -1;

		let focusStyle = this.state.style;
		focusStyle = addFocusStyle(this.state.focused, focusStyle);

		return (
			<div
				ref={button => {
					this.button = button;
				}}
				className={`rangebuttonstyle ${this.state.cssclass}`}
				onFocus={this.onFocus}
				onBlur={this.onBlur}
				tabIndex={tabIndex}
				style={focusStyle}
			>
				<div className="text" onClick={() => this.props.rangeSelectedCallback(this.props.index, this.props.label)}>
					{this.props.label}
				</div>
			</div>
		);
	}
}
export default RangeButton;
