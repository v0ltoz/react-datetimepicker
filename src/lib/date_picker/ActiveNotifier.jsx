import React from 'react';
import '../style/DateTimeRange.css';
import PropTypes from 'prop-types';

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

    let notifier;
    if (selectingModeFrom && mode === 'start') {
      notifier = this.getDotDiv('Selecting From ', '#12bc00');
    } else if (!selectingModeFrom && mode === 'end') {
      notifier = this.getDotDiv('Selecting To ', '#D70022');
    } else {
      notifier = <div className="activeNotifier"> &zwnj; </div>;
    }
    return <div>{notifier}</div>;
  }
}

ActiveNotifier.propTypes = {
  mode: PropTypes.string.isRequired,
  selectingModeFrom: PropTypes.bool.isRequired,
};
export default ActiveNotifier;
