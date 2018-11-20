import React from 'react';
import '../style/DateTimeRange.css'
import {startDateStyle, endDateStyle, inBetweenStyle, normalCellStyle, hoverCellStyle, greyCellStyle} from '../utils/TimeFunctionUtils'
import {isInbetweenDates} from '../utils/TimeFunctionUtils'

class Cell extends React.Component {
    constructor(props){
        super(props);
        this.state = {style:{}};

        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    componentDidUpdate(oldProps){
       if(!this.props.date.isSame(oldProps.date) || !this.props.otherDate.isSame(oldProps.otherDate)) {
            this.styleCell();
       }
       if(!this.props.cellDay.isSame(oldProps.cellDay)) {
           this.styleCell();
       }
    }

    onClick(){
        this.props.dateSelectedNoTimeCallback(this.props.cellDay);
    }

    mouseEnter(){
        let isDateStart = this.props.date.isSameOrBefore(this.props.otherDate, "minute");
        if(isInbetweenDates(isDateStart, this.props.cellDay, this.props.date, this.props.otherDate)){
            this.setState({"style": hoverCellStyle(true)});
        }else{
            this.setState({"style": hoverCellStyle()});
        }
    }

    mouseLeave(){
        this.styleCell();
    }

    shouldStyleCellGrey(cellDay){
        let month = this.props.month;
        let cellDayMonth = cellDay.month();
        if(month !== cellDayMonth){
            return true;
        }
    }

    shouldStyleCellStartEnd(cellDay, date, otherDate, startCheck, endCheck){
        let isCellDateProp = cellDay.isSame(date, "day");
        let isCellOtherDateProp = cellDay.isSame(otherDate, "day")
        let isDateStart = date.isSameOrBefore(otherDate, "minute");
        let isOtherDateStart =  otherDate.isSameOrBefore(date, "minute");
        
        if(startCheck){
            return (isCellDateProp && isDateStart) || (isCellOtherDateProp && isOtherDateStart)
        }else if(endCheck){
            return (isCellDateProp && !isDateStart) || (isCellOtherDateProp && !isOtherDateStart)
        }
    }

    styleCell(){
        let cellDay = this.props.cellDay;
        let date = this.props.date;
        let otherDate = this.props.otherDate;

        if(this.shouldStyleCellGrey(cellDay)){
            this.setState({"style": greyCellStyle()});
            return;
        }

        let isDateStart = date.isSameOrBefore(otherDate, "minute");
        let inbetweenDates = isInbetweenDates(isDateStart, cellDay, date, otherDate);

        if(this.shouldStyleCellStartEnd(cellDay, date, otherDate, true, false)){
            this.setState({"style": startDateStyle()});
        }else if(this.shouldStyleCellStartEnd(cellDay, date, otherDate, false, true)){
            this.setState({"style": endDateStyle()});
        }else if(inbetweenDates){
            this.setState({"style": inBetweenStyle()});
        }else{
            this.setState({"style": normalCellStyle()});
        }
    }

    render(){
        let dateFormatted = this.props.cellDay.format("D");
        return(
            <div 
                className="calendarCell"
                style={this.state.style}
                onMouseEnter={this.mouseEnter} 
                onMouseLeave={this.mouseLeave}
                onClick={this.onClick}
            >
                {dateFormatted}
            </div>
        );
    }
}
export default Cell