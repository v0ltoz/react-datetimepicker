import React from 'react';
import PropTypes from 'prop-types';

class CalendarHeader extends React.Component {
  mapHeaderToDiv(headers) {
    return headers.map(function (header, i) {
      return (
        <div key={i} className="">
          {header}
        </div>
      );
    });
  }

  render() {
    let headerDivs = this.mapHeaderToDiv(this.props.headers);
    return <div className="grid grid-cols-7 text-center mb-2">{headerDivs}</div>;
  }
}

CalendarHeader.propTypes = {
  headers: PropTypes.array,
};
export default CalendarHeader;
