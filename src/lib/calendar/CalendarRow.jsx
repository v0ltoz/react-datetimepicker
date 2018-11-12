import React from 'react';
import '../style/DateTimeRange.css'
import Cell from './Cell'
class CalendarRow extends React.Component {
    generateCells(){
        let cells = [];
        let daysSize = this.props.days.length;
        for(let i = 0; i < daysSize; i++){
            cells.push(<Cell 
                key={i} 
                day={this.props.days[i]}
            />);
        }
        return cells;
    }


    render(){
        let cells = this.generateCells();
        return(
            <div className="calendarGrid">
                {cells}
            </div>
        );
    }
}
export default CalendarRow