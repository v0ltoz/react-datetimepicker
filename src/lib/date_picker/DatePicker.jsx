import React from 'react';
import '../style/DateTimeRange.css'
import "../style/DateTimeRange.css"
import Label from './Label'
import DateField from './DateField'
import TimeField from './TimeField'
import Calendar from '../calendar/Calendar'
import ApplyCancelButtons from './ApplyCancelButtons'

class DatePicker extends React.Component {
  render(){
    return(
        <div className="fromDateTimeContainer">
            <div className="fromDateHourContainer"> 
                <Label label={this.props.label}/>
                <DateField />
                <TimeField />
            </div>
            <Calendar />
            {this.props.enableButtons? <ApplyCancelButtons />: null}
        </div>
    );
  }
}
export default DatePicker