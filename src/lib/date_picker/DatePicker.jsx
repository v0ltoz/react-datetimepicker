import React from 'react';
import '../style/DateTimeRange.css'
import "../style/DateTimeRange.css"
import Label from './Label'
import DateField from './DateField'
import TimeField from './TimeField'
import Calendar from '../calendar/Calendar'
import ApplyCancelButtons from './ApplyCancelButtons'
import ActiveNotifier from './ActiveNotifier'

class DatePicker extends React.Component {

    render(){
        //If button property present display buttons 
        let buttons;
        if(this.props.enableButtons){
            buttons = <ApplyCancelButtons />;
        }
        return(
            <div className="fromDateTimeContainer">
                <div className="fromDateHourContainer"> 
                    <Label label={this.props.label}/>
                    <DateField 
                        date={this.props.date}
                    />
                    <TimeField 
                        date={this.props.date}
                        timeChangeCallback={this.props.timeChangeCallback}
                    />
                </div>
                <Calendar 
                    date={this.props.date}
                    mode={this.props.mode}
                    otherDate={this.props.otherDate}
                    dateSelectedNoTimeCallback={this.props.dateSelectedNoTimeCallback}
                />
                <ActiveNotifier />
                {buttons}
            </div>
        );
  }
}
export default DatePicker