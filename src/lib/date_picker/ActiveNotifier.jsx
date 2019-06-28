import React from 'react';
import '../style/DateTimeRange.css';
import PropTypes from 'prop-types';

class ActiveNotifier extends React.Component {
  getDotDiv(text, style, id) {
    return (
      <div className="activeNotifier" id={id}>
        {text} <span className="dot" style={{ backgroundColor: style }} />
      </div>
    );
  }

  render() {
    let selectingModeFrom = this.props.selectingModeFrom;
    let mode = this.props.mode;
    let startDotStyle = '#12bc00';
    let endDotStyle = '#D70022';
    let startNotifierID = 'startNotifierID';
    let endNotifierID = 'endNotifierID';

    if (this.props.smartMode) {
      if (selectingModeFrom && mode === 'start') {
        return this.getDotDiv('Selecting From ', startDotStyle, startNotifierID);
      } else if (!selectingModeFrom && mode === 'end') {
        return this.getDotDiv('Selecting To ', endDotStyle, endNotifierID);
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
};
export default ActiveNotifier;
