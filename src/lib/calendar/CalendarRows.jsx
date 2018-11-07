import React from 'react';
import '../style/DateTimeRange.css'
import "../style/DateTimeRange.css"
import CalendarRow from './CalendarRow'

class CalendarRows extends React.Component {
  render(){
    return(
        <div>
            <CalendarRow />
            <CalendarRow />
            <CalendarRow />
            <CalendarRow />
            <CalendarRow />
        </div>
    );
  }
}
export default CalendarRows