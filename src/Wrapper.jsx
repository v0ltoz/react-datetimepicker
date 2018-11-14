import React from 'react';
import { DateTimeRangeContainer } from './lib/index'
import {FormControl} from 'react-bootstrap'
import moment from "moment"

class Wrapper extends React.Component {

     render(){
        let now = new Date();
        let start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0,0,0,0)
        let end = moment(start).add(1, "days").subtract(1, "seconds").toDate();
        let ranges = {
            "Today Only": [moment(start), moment(end)],
            "Yesterday Only": [moment(start), moment(end)],
            "3 Days": [moment(start), moment(end)],
            "5 Days": [moment(start), moment(end)],
            "1 Week": [moment(start), moment(end)],
            "2 Weeks": [moment(start), moment(end)],
            "1 Month": [moment(start), moment(end)],
            "90 Days": [moment(start), moment(end)],
            "1 Year": [moment(start), moment(end)],
            "Custom Range": ""
        }
        start = moment(start).subtract(34, "months").subtract(1, "seconds");
        end = moment(start).add(5, "days").add(5, "months");

         return(
             <div>
                <DateTimeRangeContainer 
                    ranges={ranges}
                    start={start}
                    end={end}
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