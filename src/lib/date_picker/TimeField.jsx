import React from 'react';
import '../style/DateTimeRange.css'
import "../style/DateTimeRange.css"
import {Glyphicon} from 'react-bootstrap'
import {generateHours, generateMinutes} from '../utils/TimeFunctionUtils'

class TimeField extends React.Component {

    constructor(props){
        super(props);

        this.handleHourChange = this.handleHourChange.bind(this);
        this.handleMinuteChange = this.handleMinuteChange.bind(this);
    }

    generateHourSelectValues() {
        let hours = generateHours();
        let selectValues = [];
        for(let i = 0; i < hours.length; i++){
            selectValues.push(<option key={i} value={i}>{i}</option>);
        }
        return selectValues;
    }

    generateMinuteSelectValues(){
        let minutes = generateMinutes();
        let selectValues = []
        for(let i = 0; i < minutes.length; i++){
           selectValues.push(<option key={i} value={i}>{minutes[i]}</option>);
        }
        return selectValues;
    }

    handleHourChange(event){
        this.props.timeChangeCallback(parseInt(event.target.value), this.props.date.minute(), this.props.mode);
    }

    handleMinuteChange(event){
        this.props.timeChangeCallback(this.props.date.hour(), parseInt(event.target.value), this.props.mode);
    }

    renderSelectField(valueInput, onChangeInput, optionsInput){
        return(
            <select 
                value={valueInput}
                onChange={onChangeInput}
            >
                {optionsInput}
            </select>
        );
    }

    render(){
        let hours = this.generateHourSelectValues();
        let minutes = this.generateMinuteSelectValues();
        let hour = this.props.date.hour();
        let minute = this.props.date.minute();
        return(
            <div className="timeContainer">
                <div className="timeSelectContainer">
                    <div className="multipleContentOnLine">
                        {this.renderSelectField(hour, this.handleHourChange, hours)}
                    </div>
                    <div className="multipleContentOnLine">
                        :
                    </div>
                    <div className="multipleContentOnLine">
                        {this.renderSelectField(minute, this.handleMinuteChange, minutes)}
                    </div>
                </div>
                <Glyphicon className="timeIconStyle" glyph="time" />
            </div>
        );
  }
}
export default TimeField