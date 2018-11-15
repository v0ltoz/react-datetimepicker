import React from 'react';
import { findDOMNode } from "react-dom";
import './style/DateTimeRange.css'
import Ranges from "./ranges/Ranges"
import DatePicker from "./date_picker/DatePicker"
import moment from "moment"
import {isValidTimeChange} from './utils/TimeFunctionUtils'

export const ModeEnum = Object.freeze({"start":"start", "end":"end"});
export const momentFormat = "DD-MM-YYYY HH:mm";

class DateTimeRangeContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            x : 0,
            y : 0,
            selectedRange: 0,
            start: this.props.start,
            startLabel: this.props.start.format(momentFormat),
            end: this.props.end,
            endLabel: this.props.end.format(momentFormat)
        }
        this.resize = this.resize.bind(this);
        this.rangeSelectedCallback = this.rangeSelectedCallback.bind(this);
        this.dateSelectedNoTimeCallback = this.dateSelectedNoTimeCallback.bind(this);
        this.timeChangeCallback = this.timeChangeCallback.bind(this);
        this.dateTextFieldCallback = this.dateTextFieldCallback.bind(this);
        this.onChangeDateTextHandlerCallback = this.onChangeDateTextHandlerCallback.bind(this);
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
            startLabel: newStart.format(momentFormat),
            end: newEnd,
            endLabel: newEnd.format(momentFormat)
        });
    }

    timeChangeCallback(newHour, newMinute, mode){
        let date;
        if(mode == "start"){
            this.updateStartTime(newHour, newMinute, mode);
        }else if(mode === "end"){
            this.updateEndTime(newHour, newMinute, mode);
        }
    }

    updateStartTime(newHour, newMinute, mode){
        this.updateTime(this.state.start, newHour, newMinute, mode, "start", "startLabel")
    }

    updateEndTime(newHour, newMinute, mode){
        this.updateTime(this.state.end, newHour, newMinute, mode, "end", "endLabel")
    }

    updateTime(origDate, newHour, newMinute, mode, stateDateToChangeName, stateLabelToChangeName){
        let date = moment(origDate);
        date.hours(newHour);
        date.minutes(newMinute);
        if(isValidTimeChange(mode, date, this.state.start, this.state.end)){
            this.setState({
                [stateDateToChangeName]:date,
                [stateLabelToChangeName]: date.format(momentFormat)
            });
        }else{
            let newDate = moment(date);
            if(mode === "start"){
                newDate.add(1, "minute");
                this.updateStartEndAndLabels(date, newDate)
            }else{
                newDate.subtract(1, "minute");
                this.updateStartEndAndLabels(newDate, date)
            }
        }
    }

    updateStartEndAndLabels(newStart, newEnd){
        this.setState({
            start : newStart,
            startLabel: newStart.format(momentFormat),
            end: newEnd,
            endLabel: newEnd.format(momentFormat)
        });
    }

    dateTextFieldCallback(mode){
        if(mode === "start"){
            let newDate = moment(this.state.startLabel, momentFormat)
            let isValidNewDate = newDate.isValid();
            let isSameOrBeforeEnd = newDate.isSameOrBefore(this.state.end, "minute");
            let isAfterEndDate = newDate.isAfter(this.state.end);
            this.updateStartDate(newDate, isValidNewDate, isSameOrBeforeEnd, isAfterEndDate);
        }else{
            let newDate = moment(this.state.endLabel, momentFormat)
            let isValidNewDate = newDate.isValid();
            let isBeforeStartDate = newDate.isBefore(this.state.start);
            let isSameOrAfterStartDate = newDate.isSameOrAfter(this.state.start, "minute");
            this.updateEndDate(newDate, isValidNewDate, isBeforeStartDate, isSameOrAfterStartDate);
        }
    }

    updateStartDate(newDate, isValidNewDate, isSameOrBeforeEnd, isAfterEndDate){
        if(isValidNewDate && isSameOrBeforeEnd){
            this.setState({
                start: newDate,
                startLabel: newDate.format(momentFormat)
            })
        }else if(isValidNewDate && isAfterEndDate){
            let newEndDate = moment(newDate).add(1, "day")
            this.setState({
                start: newDate,
                startLabel: newDate.format(momentFormat),
                end: newEndDate,
                endLabel: newEndDate.format(momentFormat)
            })
        }
        else{
            this.setState({
                startLabel: this.state.start.format(momentFormat)
            })
        }
    }

    updateEndDate(newDate, isValidNewDate, isBeforeStartDate, isSameOrAfterStartDate){
        if(isValidNewDate && isSameOrAfterStartDate){
            this.setState({
                end: newDate,
                endLabel: newDate.format(momentFormat)
            })
        }else if(isValidNewDate && isBeforeStartDate){
            let newStartDate = moment(newDate).subtract(1, "day")
            this.setState({
                start: newStartDate,
                startLabel: newStartDate.format(momentFormat),
                end: newDate,
                endLabel: newDate.format(momentFormat)
            })
        }
        else{
            this.setState({
                endLabel: this.state.end.format(momentFormat)
            })
        }
    }

    onChangeDateTextHandlerCallback(newValue, mode){
        if(mode === "start"){
            this.setState({
                startLabel: newValue
            })
        }else if(mode === "end"){
            this.setState({
                endLabel: newValue
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
                        dateTextFieldCallback={this.dateTextFieldCallback}
                        onChangeDateTextHandlerCallback={this.onChangeDateTextHandlerCallback}
                        dateLabel={this.state.startLabel}
                    />
                    <DatePicker 
                        label="To Date"
                        date={this.state.end}
                        otherDate={this.state.start}
                        mode={ModeEnum.end}
                        dateSelectedNoTimeCallback={this.dateSelectedNoTimeCallback}
                        timeChangeCallback={this.timeChangeCallback}
                        dateTextFieldCallback={this.dateTextFieldCallback}
                        onChangeDateTextHandlerCallback={this.onChangeDateTextHandlerCallback}
                        dateLabel={this.state.endLabel}
                        enableButtons={true}
                    />
                </div>
            </div>
        )
    }
}
export {DateTimeRangeContainer};