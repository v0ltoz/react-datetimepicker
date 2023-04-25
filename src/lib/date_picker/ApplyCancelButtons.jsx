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
        'applyButton border border-green-700 text-white rounded py-1 mr-1 px-3 bg-green-600 hover:bg-green-700 focus:ring-2 ',
        this.applyPressed,
        this.applyOnKeyPress,
        this.props.local?.apply || 'Apply'
      );
      closeButtonText = this.props.local?.cancel || 'cancel';
    }

    let closeButton = this.renderButton(
      'cancelButton border bg-white text-gray-700 rounded px-3 py-1 hover:bg-gray-100 focus:ring-2',
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
          'absolute bottom-0 right-0 m-3 flex': !this.props.standalone,
        })}
      >
        {maxDateBox}
        {buttons}
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
