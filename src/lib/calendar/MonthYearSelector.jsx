import React from 'react';
import '../style/DateTimeRange.css'
import "../style/DateTimeRange.css"
import {Glyphicon} from 'react-bootstrap'
import {addFocusStyle} from '../utils/StyleUtils.js'

class MonthYearSelector extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            monthFocus : false,
            yearFocus : false
        }

        this.monthFocus = this.monthFocus.bind(this);
        this.yearFocus = this.yearFocus.bind(this);
        this.monthBlur = this.monthBlur.bind(this);
        this.yearBlur = this.yearBlur.bind(this);
    }

    createCalendarMonths(months){ 
        return this.mapToOption(months);
    }

    createYears(years){
        return this.mapToOption(years);
    }

    monthFocus(){
        this.setState({monthFocus: true})
    }

    monthBlur(){
        this.setState({monthFocus: false})
    }

    yearFocus(){
        this.setState({yearFocus: true})
    }

    yearBlur(){
        this.setState({yearFocus: false})
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
        let monthFocusStyle = {};
        monthFocusStyle = addFocusStyle(this.state.monthFocus, monthFocusStyle);
        let yearFocusStyle = {};
        yearFocusStyle = addFocusStyle(this.state.yearFocus, yearFocusStyle);
        
        return(
            <div className="monthYearContainer">
                <div className="multipleContentOnLine leftChevron" >
                    {leftArrow}
                </div>
                <div className="multipleContentOnLine" onFocus={this.monthFocus} onBlur={this.monthBlur} style={monthFocusStyle}>
                    <select 
                        value={this.props.months[this.props.month]}
                        onChange={this.props.changeMonthCallback}
                    >
                        {months}
                    </select>
                </div>
                <div className="multipleContentOnLine" onFocus={this.yearFocus} onBlur={this.yearBlur} style={yearFocusStyle}>
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