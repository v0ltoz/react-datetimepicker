import React from 'react';
import '../style/DateTimeRange.css'
import "../style/DateTimeRange.css"
import {Glyphicon} from 'react-bootstrap'

class Calendar extends React.Component {
  render(){
    return(
        <div className="monthYearContainer">
            <div className="multipleContentOnLine leftChevron" >
                <Glyphicon glyph="chevron-left" />
            </div>
            <div className="multipleContentOnLine">
                <select>
                    <option>May</option>
                    <option>December</option>
                </select>
            </div>
            <div className="multipleContentOnLine">
                <select>
                    <option>2018</option>
                </select>
            </div>
            <div className="multipleContentOnLine rightChevron">
                <Glyphicon glyph="chevron-right" />
            </div>
        </div>
    );
  }
}
export default Calendar