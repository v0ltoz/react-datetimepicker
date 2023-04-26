import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

class RangeButton extends React.Component {
  constructor(props) {
    super(props);

    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.keyDown = this.keyDown.bind(this);
  }

  componentDidUpdate() {
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
    document.removeEventListener('keydown', this.keyDown, false);
  }

  keyDown(e) {
    let componentFocused = document.activeElement === this.button;
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
    return (
      <button
        ref={(button) => {
          this.button = button;
        }}
        type="button"
        id={'rangeButton' + this.props.index}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        tabIndex={tabIndex}
        className={clsx(
          'rangebuttontextstyle whitespace-nowrap rounded bg-gray-50 px-3 py-1 text-sm text-sky-600 hover:bg-sky-700 hover:text-white',
          {
            '!bg-sky-600 !text-white hover:!bg-sky-600 hover:!text-white':
              this.props.focused[this.props.index] ||
              this.props.index === this.props.selectedRange,
          }
        )}
        onMouseDown={() => {
          this.props.rangeSelectedCallback(this.props.index, this.props.label);
          this.onFocus();
        }}
      >
        {this.props.label}
      </button>
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
