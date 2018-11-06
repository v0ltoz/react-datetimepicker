import React from 'react';
import '../style/DateTimeRange.css'
import "../style/DateTimeRange.css"
import RangeButton from "./RangeButton"

class Ranges extends React.Component{

    render(){
        // Map the range index and object name and value to a range button
        return(
            <div className="rangecontainer">
                {Object.keys(this.props.ranges).map((range, i) => (
                    <RangeButton 
                        key={i} 
                        index={i} 
                        label={range} 
                        value={this.props.ranges[range]} 
                        selectedRange={this.props.selectedRange}
                        rangeSelectedCallback={this.props.rangeSelectedCallback}
                    />
                ))}
            </div>
        )
    }
}
export default Ranges