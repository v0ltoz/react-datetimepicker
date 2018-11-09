import React from 'react';
import '../style/DateTimeRange.css'
import {InputGroup, FormControl, Glyphicon} from 'react-bootstrap'

class DateField extends React.Component {
  render(){
    let dateFormatted = this.props.date.format("DD-MM-YYYY HH:mm");
    return(
        <InputGroup>
            <InputGroup.Addon className="calendarAddon"><Glyphicon glyph="calendar" /></InputGroup.Addon>
            <FormControl 
              className="inputDate" 
              type="text" 
              value={dateFormatted}
            />
        </InputGroup>
    );
  }
}
export default DateField