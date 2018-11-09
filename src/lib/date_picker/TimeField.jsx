import React from 'react';
import '../style/DateTimeRange.css'
import "../style/DateTimeRange.css"
import {Glyphicon} from 'react-bootstrap'
import {generateHours, generateMinutes} from '../utils/TimeFunctionUtils'

class TimeField extends React.Component {

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

    render(){
        let hours = this.generateHourSelectValues();
        let minutes = this.generateMinuteSelectValues();
        let initHour = this.props.date.hour();
        let initMinute = this.props.date.minute();
        return(
            <div className="timeContainer">
                <div className="timeSelectContainer">
                    <div className="multipleContentOnLine">
                        <select defaultValue={initHour}>
                            {hours}
                        </select>
                    </div>
                    <div className="multipleContentOnLine">
                        :
                    </div>
                    <div className="multipleContentOnLine">
                        <select defaultValue={initMinute}>
                            {minutes}
                        </select>
                    </div>
                </div>
                <Glyphicon className="timeIconStyle" glyph="time" />
            </div>
        );
  }
}
export default TimeField