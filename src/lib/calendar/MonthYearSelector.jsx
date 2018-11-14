import React from 'react';
import '../style/DateTimeRange.css'
import "../style/DateTimeRange.css"
import {Glyphicon} from 'react-bootstrap'

class MonthYearSelector extends React.Component {

    createCalendarMonths(months){ 
        return this.mapToOption(months);
    }

    createYears(years){
        return this.mapToOption(years);
    }

    mapToOption(variableArray){
        return variableArray.map(function(varInstance, i){
            return <option key={i}>{varInstance}</option>
        })
    }

    createGlyph(icon, onClickHandler, previous, next){
        return <Glyphicon 
            glyph={icon}
            style={{cursor:"pointer"}}
            onClick={ () => onClickHandler(previous, next)}
        />
    }

    render(){
        let months = this.createCalendarMonths(this.props.months);
        let years = this.createYears(this.props.years);
        let leftArrow = this.createGlyph("chevron-left", this.props.changeMonthArrowsCallback, true, false);
        let rightArrow = this.createGlyph("chevron-right", this.props.changeMonthArrowsCallback, false, true);
        return(
            <div className="monthYearContainer">
                <div className="multipleContentOnLine leftChevron" >
                    {leftArrow}
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
                    {rightArrow}
                </div>
            </div>
        );
  }
}
export default MonthYearSelector