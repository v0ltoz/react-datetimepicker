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
                    <Glyphicon 
                        glyph="chevron-left" 
                        style={{cursor:"pointer"}}
                        onClick={ () => this.props.changeMonthArrowsCallback(true, false)}
                    />
                </div>
                <div className="multipleContentOnLine">
                    <select 
                        value={this.props.months[this.props.month]}
                        onChange={this.props.changeMonthCallback}
                    >
                        {months}
                    </select>
                </div>
                <div className="multipleContentOnLine">
                    <select
                        value={this.props.year}
                        onChange={this.props.changeYearCallback}
                    >
                        {years}
                    </select>
                </div>
                <div className="multipleContentOnLine rightChevron">
                    <Glyphicon 
                        glyph="chevron-right" 
                        style={{cursor:"pointer"}} 
                        onClick={ () => this.props.changeMonthArrowsCallback(false, true)}
                    />
                </div>
            </div>
        );
  }
}
export default MonthYearSelector