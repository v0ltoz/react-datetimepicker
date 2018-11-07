import React from 'react';
import '../style/DateTimeRange.css'
import "../style/DateTimeRange.css"

class Calendar extends React.Component {

    mapHeaderToDiv(headers){
        return headers.map(function(header, i){
            return <div key={i}>{header}</div>
        })
    }

    render(){
        let headers = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
        let headerDivs = this.mapHeaderToDiv(headers);
        return(
            <div className="calendarGrid">
                {headerDivs}
            </div>
        );
  }
}
export default Calendar