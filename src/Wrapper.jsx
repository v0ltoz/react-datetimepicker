import React from 'react';
import { DateTimeRangeContainer } from './lib/index'
import {FormControl} from 'react-bootstrap'
import moment from "moment"

class Wrapper extends React.Component {

    applyCallback(startDate, endDate){
        console.log(startDate);
        console.log(endDate);
    }

     render(){
        let now = new Date();
        let start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0,0,0,0)
        let end = moment(start).add(1, "days").subtract(1, "seconds").toDate();
        let ranges = {
            "Today Only": [moment(start), moment(end)],
            "Yesterday Only": [moment(start).subtract(1, "days"), moment(end).subtract(1, "days")],
            "3 Days": [moment(start).subtract(3, "days"), moment(end)],
            "5 Days": [moment(start).subtract(5, "days"), moment(end)],
            "1 Week": [moment(start).subtract(7, "days"), moment(end)],
            "2 Weeks": [moment(start).subtract(14, "days"), moment(end)],
            "1 Month": [moment(start).subtract(1, "months"), moment(end)],
            "90 Days": [moment(start).subtract(90, "days"), moment(end)],
            "1 Year": [moment(start).subtract(1, "years"), moment(end)],
        }
        start = moment(start).subtract(34, "months").subtract(1, "seconds");
        end = moment(start).add(5, "days").add();
        let local = {
            "format":"DD-MM-YYYY HH:mm",
            "sundayFirst" : false
        }
         return(
             <div>
                <DateTimeRangeContainer 
                    ranges={ranges}
                    start={start}
                    end={end}
                    local={local}
                    applyCallback={this.applyCallback}
                >    
                    <FormControl
                    id="formControlsTextB"
                    ref="formChild"
                    type="text"
                    label="Text"
                    placeholder="Enter text"
                    /> 
                </DateTimeRangeContainer>
                <DateTimeRangeContainer 
                    ranges={ranges}
                    start={start}
                    end={end}
                    local={local}
                    applyCallback={this.applyCallback}
                >    
                    <FormControl
                    id="formControlsTextB"
                    ref="formChild"
                    type="text"
                    label="Text"
                    placeholder="Enter text"
                    /> 
                </DateTimeRangeContainer>
            </div>
         );
     }
}
export {Wrapper};