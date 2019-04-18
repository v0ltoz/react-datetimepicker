import React from 'react';
import '../style/DateTimeRange.css';
import PropTypes from 'prop-types';

class Label extends React.Component {
  render() {
    return <div className="dateTimeLabel">{this.props.label}</div>;
  }
}
export default Label;

Label.propTypes = {
  label: PropTypes.string.isRequired,
};
