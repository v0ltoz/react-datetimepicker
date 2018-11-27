import React from 'react';
import './style/DateTimeRange.css'
import Ranges from "./ranges/Ranges"
import DatePicker from "./date_picker/DatePicker"
import Fragment from 'react-dot-fragment'
import moment from "moment"
import {isValidTimeChange} from './utils/TimeFunctionUtils'
import {datePicked} from './utils/DateSelectedUtils'

export const ModeEnum = Object.freeze({"start":"start", "end":"end"});
export var momentFormat = "DD-MM-YYYY HH:mm";

class DateTimeRangePicker extends React.Component {
    constructor(props){
        super(props);
        let ranges = {}
        let customRange = {"Custom Range": "Custom Range"}
        Object.assign(ranges, this.props.ranges, customRange);

        if(this.props.local && this.props.local.format){
            momentFormat = this.props.local.format;
        }

        this.state = {
            selectedRange: 0,
            selectingModeFrom: true,
            ranges : ranges,
            start: this.props.start,
            startLabel: this.props.start.format(momentFormat),
            end: this.props.end,
            endLabel: this.props.end.format(momentFormat),
            focusDate : false
        }
        this.bindToFunctions();
    }

    bindToFunctions(){
        this.rangeSelectedCallback = this.rangeSelectedCallback.bind(this);
        this.dateSelectedNoTimeCallback = this.dateSelectedNoTimeCallback.bind(this);
        this.timeChangeCallback = this.timeChangeCallback.bind(this);
        this.dateTextFieldCallback = this.dateTextFieldCallback.bind(this);
        this.onChangeDateTextHandlerCallback = this.onChangeDateTextHandlerCallback.bind(this);
        this.changeSelectingModeCallback = this.changeSelectingModeCallback.bind(this);
        this.applyCallback = this.applyCallback.bind(this);
        this.keyboardCellCallback = this.keyboardCellCallback.bind(this);
        this.focusOnCallback = this.focusOnCallback.bind(this);
        this.cellFocusedCallback = this.cellFocusedCallback.bind(this);
    }

    componentDidMount(){
        this.setToRangeValue(this.state.start, this.state.end)
    }

    applyCallback(){
        this.props.applyCallback(this.state.start, this.state.end);
        this.props.changeVisibleState();
    }

    rangeSelectedCallback(index, value){
        this.setState({selectedRange:index});
        if(value !== "Custom Range"){
            this.updateStartEndAndLabels(this.state.ranges[value][0], this.state.ranges[value][1]);
        }
    }

    setToRangeValue(startDate, endDate){
        let rangesArray = Object.values(this.state.ranges)
        for(let i = 0; i < rangesArray.length; i++){            
            if(rangesArray[i] === "Custom Range"){
                continue;
            }else if(rangesArray[i][0].isSame(startDate, "minutes") && rangesArray[i][1].isSame(endDate, "minutes")){
                this.setState({selectedRange:i});
                return;
            }
        }
        this.setToCustomRange();
    }

    setToCustomRange(){
        let rangesArray = Object.values(this.state.ranges)
        for(let i = 0; i < rangesArray.length; i++){
            if(rangesArray[i] === "Custom Range"){
                this.setState({selectedRange:i});
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

    dateSelectedNoTimeCallback(cellDate){        
        let newDates = datePicked(this.state.start, this.state.end, cellDate, this.state.selectingModeFrom)
        let startDate = newDates.startDate;
        let endDate = newDates.endDate;
        let newStart = this.duplicateMomentTimeFromState(startDate, true);
        let newEnd = this.duplicateMomentTimeFromState(endDate, false);
        this.updateStartEndAndLabels(newStart, newEnd);
        this.setToRangeValue(newStart, newEnd);
        this.setState((prevState) => ({
            selectingModeFrom: !prevState.selectingModeFrom
        }))
    }

    changeSelectingModeCallback(selectingModeFromParam){
        this.setState({selectingModeFrom: selectingModeFromParam});
    }

    duplicateMomentTimeFromState(date, startDate){
        let state;
        if(startDate){
            state = this.state.start;
        }else{
            state = this.state.end;
        }
        let newDate = [date.year(), date.month(), date.date(), state.hours(), state.minutes()]
        return moment(newDate);
    }

    timeChangeCallback(newHour, newMinute, mode){
        if(mode === "start"){
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
            this.updateTimeCustomRangeUpdator(stateDateToChangeName, date);
        }else{
            let newDate = moment(date);
            if(mode === "start"){
                newDate.add(1, "minute");
                this.updateStartEndAndLabels(date, newDate)
                this.setToRangeValue(date, newDate);
            }else{
                newDate.subtract(1, "minute");
                this.updateStartEndAndLabels(newDate, date);
                this.setToRangeValue(newDate, date);
            }
        }
    }

    updateTimeCustomRangeUpdator(stateDateToChangeName, date){
        if(stateDateToChangeName === "start"){
            this.setToRangeValue(date, this.state.end);
        }else{
            this.setToRangeValue(this.state.start, date);
        }
    }

    dateTextFieldCallback(mode){
        if(mode === "start"){
            let newDate = moment(this.state.startLabel, momentFormat)
            let isValidNewDate = newDate.isValid();
            let isSameOrBeforeEnd = newDate.isSameOrBefore(this.state.end, "minute");
            let isAfterEndDate = newDate.isAfter(this.state.end);
            this.updateDate(mode, newDate, isValidNewDate, isSameOrBeforeEnd, isAfterEndDate, "start", "startLabel")
        }else{
            let newDate = moment(this.state.endLabel, momentFormat)
            let isValidNewDate = newDate.isValid();
            let isBeforeStartDate = newDate.isBefore(this.state.start);
            let isSameOrAfterStartDate = newDate.isSameOrAfter(this.state.start, "minute");
            this.updateDate(mode, newDate, isValidNewDate, isSameOrAfterStartDate, isBeforeStartDate, "end", "endLabel")
        }
    }

    updateDate(mode, newDate, isValidNewDate, isValidDateChange, isInvalidDateChange, stateDateToChangeName, stateLabelToChangeName){
        if(isValidNewDate && isValidDateChange){
            this.setState({
                [stateDateToChangeName]: newDate,
                [stateLabelToChangeName]: newDate.format(momentFormat)
            });
            this.updateTimeCustomRangeUpdator(stateDateToChangeName, newDate);
        }else if(isValidNewDate && isInvalidDateChange){
            this.updateInvalidDate(mode, newDate);
        }else if(!isValidNewDate){
            this.updateStartEndAndLabels(this.state.start, this.state.end);
        }
    }

    updateInvalidDate(mode, newDate){
        if(mode === "start"){
            let newEndDate = moment(newDate).add(1, "day");
            this.updateLabelsAndRangeValues(newDate, newEndDate);
        }else{
            let newStartDate = moment(newDate).subtract(1, "day");
            this.updateStartEndAndLabels(newStartDate, newDate);
        }
    }

    updateLabelsAndRangeValues(startDate, endDate){
        this.updateStartEndAndLabels(startDate, endDate);
        this.setToRangeValue(startDate, endDate);
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

    keyboardCellCallback(originalDate, newDate){
        let startDate;
        let endDate;
        if(originalDate.isSame(this.state.start, "day")){
            startDate = this.duplicateMomentTimeFromState(newDate, true);
            endDate = moment(this.state.end);
        }else{
            startDate = moment(this.state.start);
            endDate = this.duplicateMomentTimeFromState(newDate, false);;
        }

        if(startDate.isBefore(endDate, "day")){
            this.updateStartEndAndLabels(startDate, endDate);
        }else{
            this.updateStartEndAndLabels(endDate, startDate);
        }
    }

    focusOnCallback(date){
        if(date){
            this.setState({
                focusDate : date
            })
        }else{
            this.setState({
                focusDate: false
            })
        }
    }

    cellFocusedCallback(date){
        if(date.isSame(this.state.start, "day")){
            this.changeSelectingModeCallback(true);
        }else if(date.isSame(this.state.end, "day")){
            this.changeSelectingModeCallback(false);
        }
    }

    renderStartDate(){
        return(
                <DatePicker 
                    label="From Date"
                    date={this.state.start}
                    otherDate={this.state.end}
                    mode={ModeEnum.start}
                    dateSelectedNoTimeCallback={this.dateSelectedNoTimeCallback}
                    timeChangeCallback={this.timeChangeCallback}
                    dateTextFieldCallback={this.dateTextFieldCallback}
                    keyboardCellCallback={this.keyboardCellCallback}
                    focusOnCallback={this.focusOnCallback}
                    focusDate={this.state.focusDate}
                    cellFocusedCallback={this.cellFocusedCallback}
                    onChangeDateTextHandlerCallback={this.onChangeDateTextHandlerCallback}
                    dateLabel={this.state.startLabel}
                    selectingModeFrom={this.state.selectingModeFrom}
                    changeSelectingModeCallback={this.changeSelectingModeCallback}
                    applyCallback={this.applyCallback}
                    local={this.props.local}
                />
        )
    }

    renderEndDate(){
        return(
            <DatePicker 
                label="To Date"
                date={this.state.end}
                otherDate={this.state.start}
                mode={ModeEnum.end}
                dateSelectedNoTimeCallback={this.dateSelectedNoTimeCallback}
                timeChangeCallback={this.timeChangeCallback}
                dateTextFieldCallback={this.dateTextFieldCallback}
                keyboardCellCallback={this.keyboardCellCallback}
                focusOnCallback={this.focusOnCallback}
                focusDate={this.state.focusDate}
                cellFocusedCallback={this.cellFocusedCallback}
                onChangeDateTextHandlerCallback={this.onChangeDateTextHandlerCallback}
                dateLabel={this.state.endLabel}
                changeVisibleState={this.props.changeVisibleState}
                selectingModeFrom={this.state.selectingModeFrom}
                changeSelectingModeCallback={this.changeSelectingModeCallback}
                applyCallback={this.applyCallback}
                local={this.props.local}
                enableButtons={true}
            />
            )
    }

    render(){
        
        return (
            <Fragment>
                <Ranges 
                    ranges={this.state.ranges}
                    selectedRange={this.state.selectedRange}
                    rangeSelectedCallback={this.rangeSelectedCallback}
                />
                {this.renderStartDate()}
                {this.renderEndDate()}                
            </Fragment>
        )
    }
}
export {DateTimeRangePicker};