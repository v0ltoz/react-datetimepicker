import React from 'react';
import '../style/DateTimeRange.css';
import PropTypes from 'prop-types';

class ActiveNotifier extends React.Component {
  getDotDiv(text, style, id) {
    if (!style && !id) {
      return (
        <div className="activeNotifier" style={{ opacity: 0 }}>
          {' '}
          invisible{' '}
        </div>
      );
    }
    return (
      <div className="activeNotifier" id={id}>
        {text} <span className="dot" style={style} />
      </div>
    );
  }

  render() {
    let selectingModeFrom = this.props.selectingModeFrom;
    let mode = this.props.mode;
    let startDotStyle =
      this.props.style && this.props.style.fromDot ? this.props.style.fromDot : { backgroundColor: '#12bc00' };
    let endDotStyle =
      this.props.style && this.props.style.toDot ? this.props.style.toDot : { backgroundColor: '#D70022' };
    let startNotifierID = 'startNotifierID';
    let endNotifierID = 'endNotifierID';

    if (this.props.smartMode) {
      if (selectingModeFrom && mode === 'start') {
        return this.getDotDiv('Selecting From ', startDotStyle, startNotifierID);
      } else if (!selectingModeFrom && mode === 'end') {
        return this.getDotDiv('Selecting To ', endDotStyle, endNotifierID);
      } else {
        // Return an invisible placeholder to stop shifting occurring on change between modes
        return this.getDotDiv('', false, false);
      }
    } else {
      if (mode === 'start') {
        return this.getDotDiv('From Date ', startDotStyle, startNotifierID);
      } else if (mode === 'end') {
        return this.getDotDiv('To Date ', endDotStyle, endNotifierID);
      }
    }
    return <div />;
  }
}

ActiveNotifier.propTypes = {
  mode: PropTypes.string.isRequired,
  selectingModeFrom: PropTypes.bool.isRequired,
  smartMode: PropTypes.bool,
  style: PropTypes.object,
};
export default ActiveNotifier;
