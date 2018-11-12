import React from 'react';
import '../style/DateTimeRange.css'
import {startDateStyle, endDateStyle, inBetweenStyle, normalCellStyle, hoverCellStyle} from '../utils/TimeFunctionUtils'
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
        if(isDateStart){
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

    styleCell(){
        let cellDay = this.props.cellDay;
        let date = this.props.date;
        let otherDate = this.props.otherDate;

        // console.groupCollapsed("Style Check")
        // console.log(cellDay.format("DD MM YYYY"))
        // console.log(date.format("DD MM YYYY"))
        // console.log(otherDate.format("DD MM YYYY"))
        // console.groupEnd();

        let isThisCellDate = cellDay.isSame(date, "day");
        let isDateStart = date.isSameOrBefore(otherDate, "minute");
        
        let inbetweenDates = isInbetweenDates(isDateStart, cellDay, date, otherDate);
        
        if(isThisCellDate && isDateStart){
            this.setState({"style": startDateStyle()});
        }else if(isThisCellDate && !isDateStart){
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