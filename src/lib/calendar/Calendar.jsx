import React from 'react';
import '../style/DateTimeRange.css'
import "../style/DateTimeRange.css"
import MonthYearSelector from './MonthYearSelector'
import CalendarHeader from './CalendarHeader'
import CalendarRows from './CalendarRows'

class Calendar extends React.Component {
  render(){
    return(
        <div>
            <MonthYearSelector />
            <CalendarHeader />
            <CalendarRows />
        </div>
    );
  }
}
export default Calendar