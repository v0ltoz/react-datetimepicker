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
        this.props.timeChangeCallback(this.props.date, parseInt(event.target.value), this.props.date.minute());
    }

    handleMinuteChange(event){
        this.props.timeChangeCallback(this.props.date, this.props.date.hour(), parseInt(event.target.value));
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
                        <select 
                            value={hour}
                            onChange={this.handleHourChange}
                        >
                            {hours}
                        </select>
                    </div>
                    <div className="multipleContentOnLine">
                        :
                    </div>
                    <div className="multipleContentOnLine">
                        <select 
                            value={minute}
                            onChange={this.handleMinuteChange}
                        >
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