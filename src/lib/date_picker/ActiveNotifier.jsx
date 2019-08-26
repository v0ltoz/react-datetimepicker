import React from 'react';
import '../style/DateTimeRange.css';
import PropTypes from 'prop-types';

class ActiveNotifier extends React.Component {
  getDotDiv(text, style, id) {
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
    let local = this.props.local;
    if (this.props.smartMode) {
      if (selectingModeFrom && mode === 'start') {
        let label = local && local.selectingFrom ? local.selectingFrom : 'Selecting From';
        return this.getDotDiv(`${label} `, startDotStyle, startNotifierID);
      } else if (!selectingModeFrom && mode === 'end') {
        let label = local && local.selectingTo ? local.selectingTo : 'Selecting To';
        return this.getDotDiv(`${label} `, endDotStyle, endNotifierID);
      }
    } else {
      if (mode === 'start') {
        let label = local && local.fromDate ? local.fromDate : 'From Date';
        return this.getDotDiv(`${label} `, startDotStyle, startNotifierID);
      } else if (mode === 'end') {
        let label = local && local.toDate ? local.toDate : 'To Date';
        return this.getDotDiv(`${label} `, endDotStyle, endNotifierID);
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
  local: PropTypes.object,
};
export default ActiveNotifier;
