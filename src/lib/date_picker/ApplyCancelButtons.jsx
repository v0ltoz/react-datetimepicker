import React from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import clsx from 'clsx';

class ApplyCancelButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hoverColourApply: '#5cb85c',
      hoverColourCancel: '#fff',
      applyFocus: false,
      cancelFocus: false,
    };
    this.bindToFunctions();
  }

  bindToFunctions() {
    this.cancelPressed = this.cancelPressed.bind(this);
    this.applyPressed = this.applyPressed.bind(this);
    this.applyOnKeyPress = this.applyOnKeyPress.bind(this);
    this.cancelOnKeyPress = this.cancelOnKeyPress.bind(this);
  }

  cancelPressed() {
    this.props.changeVisibleState();
  }

  applyPressed() {
    this.props.applyCallback();
  }

  isSpaceBarOrEnterPressed(e) {
    if (e.keyCode === 32 || e.keyCode === 13) {
      return true;
    }
    return false;
  }

  applyOnKeyPress(e) {
    if (this.isSpaceBarOrEnterPressed(e)) {
      this.props.applyCallback();
    }
  }

  cancelOnKeyPress(e) {
    if (this.isSpaceBarOrEnterPressed(e)) {
      this.props.changeVisibleState();
    }
  }

  renderButton(className, onClick, onKeyDown, text) {
    return (
      <button
        className={className}
        type="button"
        onClick={onClick}
        onKeyDown={onKeyDown}
        tabIndex={0}
      >
        {text}
      </button>
    );
  }

  getMaxDateBox() {
    if (this.props.maxDate) {
      let label = this.props.local?.maxDate || 'Max Date';
      return (
        <div className="maxDateLabel p-2 text-xs">
          {label}: {this.props.maxDate.format(this.props.local.format)}
        </div>
      );
    }
  }

  renderButtons() {
    let applyButton;
    let closeButtonText = this.props.local?.close || 'Close';

    if (!this.props.autoApply) {
      applyButton = this.renderButton(
        'applyButton inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm ',
        this.applyPressed,
        this.applyOnKeyPress,
        this.props.local?.apply || 'Apply'
      );
      closeButtonText = this.props.local?.cancel || 'cancel';
    }

    let closeButton = this.renderButton(
      'cancelButton mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm',
      this.cancelPressed,
      this.cancelOnKeyPress,
      closeButtonText
    );
    return (
      <>
        {applyButton}
        {!this.props.standalone ? closeButton : null}
      </>
    );
  }

  render() {
    let maxDateBox = this.getMaxDateBox();
    let buttons = this.renderButtons();

    return (
      <div
        id="buttonContainer"
        className={clsx('buttonContainer', {
          'float-right': this.props.standalone,
          'bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:items-center sm:px-6':
            !this.props.standalone,
        })}
      >
        {buttons}
        {maxDateBox}
      </div>
    );
  }
}

ApplyCancelButtons.propTypes = {
  local: PropTypes.object,
  maxDate: momentPropTypes.momentObj,
  applyCallback: PropTypes.func.isRequired,
  changeVisibleState: PropTypes.func.isRequired,
  autoApply: PropTypes.bool,
  standalone: PropTypes.bool,
};
export default ApplyCancelButtons;
