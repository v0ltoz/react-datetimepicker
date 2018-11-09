import React from 'react';
import '../style/DateTimeRange.css'
import "../style/DateTimeRange.css"
import {Glyphicon} from 'react-bootstrap'
import moment from 'moment'

class Calendar extends React.Component {

    createCalendarMonths(){
        let months = [
            "January", "February", "March", "April",
            "May", "June", "July", "August", "September",
            "October", "November","December" ];
        
        return months.map(function(month, i){
            return <option key={i}>{month}</option>
        })
    }

    createYears(){
        //Range from 1900 to 25 years into the future
        let past = moment("19000101", "YYYYMMDD");
        let yearsToGetFuture = 10;
        let endYear = moment().add(yearsToGetFuture, "years").get('year')
        let addedCurrentYear = false
        let years = [];
        while(!addedCurrentYear){
            if(past.get("years") === endYear){
                addedCurrentYear = true;
            }
            years.push(past.year());
            past.add(1, "years");
        }
        return years.map(function(year, i){
            return <option key={i}>{year}</option>
        })
    }

    render(){
        let months = this.createCalendarMonths();
        let years = this.createYears();
        return(
            <div className="monthYearContainer">
                <div className="multipleContentOnLine leftChevron" >
                    <Glyphicon glyph="chevron-left" />
                </div>
                <div className="multipleContentOnLine">
                    <select>
                        {months}
                    </select>
                </div>
                <div className="multipleContentOnLine">
                    <select>
                        {years}
                    </select>
                </div>
                <div className="multipleContentOnLine rightChevron">
                    <Glyphicon glyph="chevron-right" />
                </div>
            </div>
        );
  }
}
export default Calendar