import React from 'react';
import '../style/DateTimeRange.css'
import "../style/DateTimeRange.css"
import MonthYearSelector from './MonthYearSelector'
import CalendarHeader from './CalendarHeader'
import CalendarRows from './CalendarRows'
import moment from 'moment'
import {getInitialMonth, getInitialYear, getInitialThirtyFiveDays} from '../utils/TimeFunctionUtils'

class Calendar extends React.Component {

  createMonths(){
    let months = [
      "January", "February", "March", "April",
      "May", "June", "July", "August", "September",
      "October", "November","December" ];
    return months;
  }

  createYears(){
    let years = []
    //Range from 1900 to 25 years into the future
    let past = moment("19000101", "YYYYMMDD");
    let yearsToGetFuture = 10;
    let endYear = moment().add(yearsToGetFuture, "years").get('year')
    let addedCurrentYear = false
    while(!addedCurrentYear){
        if(past.get("years") === endYear){
            addedCurrentYear = true;
        }
        years.push(past.year());
        past.add(1, "years");
    }
    return years;
  }

  render(){
    let months = this.createMonths();
    let years = this.createYears();
    let headers = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]

    let initialMonth = getInitialMonth(this.props.date, this.props.otherDate, this.props.mode);
    let initialYear = getInitialYear(this.props.date, this.props.otherDate, this.props.mode);
    let initialThiryFiveDays = getInitialThirtyFiveDays(initialMonth, initialYear);
    
    return(
        <div>
            <MonthYearSelector 
              date={this.props.date}
              mode={this.props.mode}
              otherDate={this.props.otherDate}
              months={months}
              years={years}
              initialMonth={initialMonth}
              initialYear={initialYear}
            />
            <CalendarHeader 
              headers={headers}
            />
            <CalendarRows />
        </div>
    );
  }
}
export default Calendar