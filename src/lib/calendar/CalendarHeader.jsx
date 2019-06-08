import React from 'react';
import '../style/DateTimeRange.css';
import {
  getCalendarGridClassName,
  getCalendarGridHeaderClassName,
} from '../utils/CssClassNameHelper';

class CalendarHeader extends React.Component {
  mapHeaderToDiv(headers) {
    let className = getCalendarGridHeaderClassName();
    return headers.map(function(header, i) {
      return (
        <div key={i} className={className}>
          {header}
        </div>
      );
    });
  }

  render() {
    let headerDivs = this.mapHeaderToDiv(this.props.headers);
    let className = getCalendarGridClassName();
    return <div className={className}>{headerDivs}</div>;
  }
}
export default CalendarHeader;
