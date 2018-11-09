import React from 'react';
import '../style/DateTimeRange.css'
import "../style/DateTimeRange.css"
import {Glyphicon} from 'react-bootstrap'

class MonthYearSelector extends React.Component {

    createCalendarMonths(months){ 
        return months.map(function(month, i){
            return <option key={i}>{month}</option>
        })
    }

    createYears(years){
        return years.map(function(year, i){
            return <option key={i}>{year}</option>
        })
    }

    render(){
        let months = this.createCalendarMonths(this.props.months);
        let years = this.createYears(this.props.years);
        
        return(
            <div className="monthYearContainer">
                <div className="multipleContentOnLine leftChevron" >
                    <Glyphicon glyph="chevron-left" />
                </div>
                <div className="multipleContentOnLine">
                    <select defaultValue={this.props.months[this.props.initialMonth]}>
                        {months}
                    </select>
                </div>
                <div className="multipleContentOnLine">
                    <select defaultValue={this.props.initialYear}>
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
export default MonthYearSelector