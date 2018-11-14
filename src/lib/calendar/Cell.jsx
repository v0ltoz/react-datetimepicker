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

    componentDidMount(){
        this.styleCell();
    }

    componentDidUpdate(oldProps){
       if(!this.props.date.isSame(oldProps.date) || !this.props.otherDate.isSame(oldProps.otherDate)) {
            this.styleCell();
       }
    }

    onClick(){
        // TODO: Temporary Functionality to enable the rest of the fields to update as
        // expected on change. Actual click will depend on the mode active and where 
        // they clicked in terms of dates
        let isDateStart = this.props.date.isSameOrBefore(this.props.otherDate, "minute");
        let cellClickedBeforeStart;
        if(isDateStart){
            cellClickedBeforeStart = this.props.cellDay.isSameOrBefore(this.props.date)
        }else{
            cellClickedBeforeStart = this.props.cellDay.isSameOrBefore(this.props.otherDate)
        }
        if(isDateStart || cellClickedBeforeStart){
            this.props.dateSelectedNoTimeCallback(this.props.cellDay, this.props.otherDate);
        }else{
            this.props.dateSelectedNoTimeCallback(this.props.otherDate, this.props.cellDay);
        }
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

    shouldStyleCellGrey(cellDay, date){
       // TODO Add functionality in at the minute 
       // not enough props to do this
       return false;
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

        if(this.shouldStyleCellGrey(cellDay, date)){
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