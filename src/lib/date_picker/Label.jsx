import React from 'react';
import PropTypes from 'prop-types';

class Label extends React.Component {
  render() {
    return (
      <div className="dateTimeLabel pb-1 text-center font-bold">
        {this.props.label}
      </div>
    );
  }
}
export default Label;

Label.propTypes = {
  label: PropTypes.string.isRequired,
};
