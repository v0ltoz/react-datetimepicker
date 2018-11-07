import React from 'react';
import '../style/DateTimeRange.css'
import "../style/DateTimeRange.css"
import {InputGroup, FormControl, Glyphicon} from 'react-bootstrap'

class DateField extends React.Component {
  render(){
    return(
        <InputGroup>
            <InputGroup.Addon className="calendarAddon"><Glyphicon glyph="calendar" /></InputGroup.Addon>
            <FormControl className="inputDate" type="text" />
        </InputGroup>
    );
  }
}
export default DateField