import React from 'react';
import '../style/DateTimeRange.css';
import PropTypes from 'prop-types';
import Fragment from 'react-dot-fragment';

class ActiveNotifier extends React.Component {
  getDotDiv(text, style) {
    return (
      <div className="activeNotifier">
        {text} <span className="dot" style={{ backgroundColor: style }} />
      </div>
    );
  }

  render() {
    let selectingModeFrom = this.props.selectingModeFrom;
    let mode = this.props.mode;

    if (selectingModeFrom && mode === 'start') {
      return this.getDotDiv('Selecting From ', '#12bc00');
    } else if (!selectingModeFrom && mode === 'end') {
      return this.getDotDiv('Selecting To ', '#D70022');
    }
    return <div />;
  }
}

ActiveNotifier.propTypes = {
  mode: PropTypes.string.isRequired,
  selectingModeFrom: PropTypes.bool.isRequired,
};
export default ActiveNotifier;
