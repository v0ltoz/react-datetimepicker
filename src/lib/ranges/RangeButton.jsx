import React from 'react';
import ReactDOM from 'react-dom';
import '../style/DateTimeRange.css';
import PropTypes from 'prop-types';
import { addFocusStyle } from '../utils/StyleUtils';
import { rangeButtonSelectedStyle, rangeButtonStyle } from '../utils/TimeFunctionUtils';

class RangeButton extends React.Component {
  constructor(props) {
    super(props);

    if (props.index === props.selectedRange) {
      this.state = {
        style: rangeButtonSelectedStyle(),
      };
    } else {
      this.state = {
        style: rangeButtonStyle(),
      };
    }

    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.keyDown = this.keyDown.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let focused = nextProps.focused[nextProps.index];
    // If selected index or focused set to selected style
    if (nextProps.index === nextProps.selectedRange || focused) {
      this.setRangeSelectedStyle();
    } else {
      this.setRangeButtonStyle();
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

  setRangeSelectedStyle() {
    let style;
    if (this.props.style && this.props.style.customRangeSelected) {
      style = Object.assign(rangeButtonSelectedStyle(), this.props.style.customRangeSelected);
    } else {
      style = rangeButtonSelectedStyle();
    }
    this.setState({
      style: style,
    });
  }

  setRangeButtonStyle() {
    let style;
    if (this.props.style && this.props.style.customRangeButtons) {
      style = Object.assign(rangeButtonStyle(), this.props.style.customRangeButtons);
    } else {
      style = rangeButtonStyle();
    }
    this.setState({
      style: style,
    });
  }

  mouseEnter() {
    // Set hover style
    this.setRangeSelectedStyle();
  }

  mouseLeave(focused) {
    let isFocused;
    if (typeof focused === 'boolean') {
      isFocused = focused;
    } else {
      isFocused = this.state.focused;
    }
    let isSelected = this.props.index === this.props.selectedRange;
    // If not selected and not focused then on mouse leave set to normal style
    if (!isSelected && !isFocused) {
      this.setRangeButtonStyle();
    }
  }

  onFocus() {
    this.setState({ focused: true });
    this.props.setFocusedCallback(this.props.index, true);
    this.mouseEnter(true);
  }

  onBlur() {
    this.setState({ focused: false });
    this.props.setFocusedCallback(this.props.index, false);
    this.mouseLeave(false);
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
    let tabIndex;
    if (isViewingIndex) {
      tabIndex = 0;
    } else {
      tabIndex = -1;
    }
    let style = {};
    style = addFocusStyle(this.state.focused, style);
    style = Object.assign(style, this.state.style);
    return (
      <div
        ref={button => {
          this.button = button;
        }}
        id={"rangeButton" + this.props.index}
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        tabIndex={tabIndex}
        style={style}
        onMouseDown={() => {
          this.props.rangeSelectedCallback(this.props.index, this.props.label);
          this.onFocus();
        }}
      >
        <div className="rangebuttontextstyle">{this.props.label}</div>
      </div>
    );
  }
}

RangeButton.propTypes = {
  selectedRange: PropTypes.number.isRequired,
  rangeSelectedCallback: PropTypes.func.isRequired,
  viewingIndexChangeCallback: PropTypes.func.isRequired,
  setFocusedCallback: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  viewingIndex: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  focused: PropTypes.array.isRequired,
  style: PropTypes.object,
};
export default RangeButton;
