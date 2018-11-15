import React from 'react';
import { findDOMNode } from "react-dom";
import './style/DateTimeRange.css'
import Ranges from "./ranges/Ranges"
import DatePicker from "./date_picker/DatePicker"
import moment from "moment"

export const ModeEnum = Object.freeze({"start":"start", "end":"end"});
class DateTimeRangeContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            x : 0,
            y : 0,
            selectedRange: 0,
            start: this.props.start,
            end: this.props.end
        }
        this.resize = this.resize.bind(this);
        this.rangeSelectedCallback = this.rangeSelectedCallback.bind(this);
        this.dateSelectedNoTimeCallback = this.dateSelectedNoTimeCallback.bind(this);
        this.timeChangeCallback = this.timeChangeCallback.bind(this);
    }

    componentDidMount(){
        window.addEventListener('resize', this.resize)
        this.resize();
    }

    componentWillMount(){
        window.removeEventListener('resize', this.resize)
    }

    rangeSelectedCallback(index){
        this.setState({selectedRange:index})
    }

    dateSelectedNoTimeCallback(startDate, endDate){
        // Debugging
        this.debugTimeCallback(startDate, endDate);
        
        let newStart = [startDate.year(), startDate.month(), startDate.date(), this.state.start.hours(), this.state.start.minutes()]
        newStart = moment(newStart);

        let newEnd = [endDate.year(), endDate.month(), endDate.date(), this.state.end.hours(), this.state.end.minutes()]
        newEnd = moment(newEnd);

        this.setState({
            start: newStart,
            end: newEnd
        });
    }

    timeChangeCallback(origDate, newHour, newMinute){
        let startDateSeen = origDate.isSame(this.state.start);
        let endDateSeen = origDate.isSame(this.state.end);
        let dateToChange;
        let date;
        
        if(startDateSeen){
            date = this.state.start;
            dateToChange = "start"
        }else if(endDateSeen){
            date = this.state.end;
            dateToChange = "end"
        }
        if(typeof dateToChange != 'undefined'){
            date.hours(newHour);
            date.minutes(newMinute);
            this.setState({
                dateToChange: date
            }) 
        }
    }

    debugTimeCallback(startDate, endDate){
        console.groupCollapsed("New Date Selected");
        let startDateFormatted = startDate.format("DD MM YYYY");
        console.log(startDateFormatted);
        let endDateFormatted = endDate.format("DD MM YYYY");
        console.log(endDateFormatted);
        console.groupEnd();
    }

    resize(){
        const domNode = findDOMNode(this).children[0];
        let boundingClientRect = domNode.getBoundingClientRect();
        let x = boundingClientRect.top + boundingClientRect.height + 2;
        let y = boundingClientRect.left + 2;        
        this.setState({x:x, y:y});
    }
    
    render(){
       let x = this.state.x;
       let y = this.state.y;
       return (
            <div id="container">
                <div id="children">
                    {this.props.children}
                </div>
                <div id="daterangepicker" className="daterangepicker" style={{top:x, left:y}}>
                    <Ranges 
                        ranges={this.props.ranges}
                        selectedRange={this.state.selectedRange}
                        rangeSelectedCallback={this.rangeSelectedCallback}
                    />
                    <DatePicker 
                        label="From Date"
                        date={this.state.start}
                        otherDate={this.state.end}
                        mode={ModeEnum.start}
                        dateSelectedNoTimeCallback={this.dateSelectedNoTimeCallback}
                        timeChangeCallback={this.timeChangeCallback}
                    />
                    <DatePicker 
                        label="To Date"
                        date={this.state.end}
                        otherDate={this.state.start}
                        mode={ModeEnum.end}
                        dateSelectedNoTimeCallback={this.dateSelectedNoTimeCallback}
                        timeChangeCallback={this.timeChangeCallback}
                        enableButtons={true}
                    />
                </div>
            </div>
        )
    }
}
export {DateTimeRangeContainer};