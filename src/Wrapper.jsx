import React from 'react';
import { DateTimeRangeContainer } from './lib/index'
import {FormControl} from 'react-bootstrap'
import moment from "moment"

class Wrapper extends React.Component {
    constructor(props){
        super(props);
    }

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


         return(
             <div>

                <DateTimeRangeContainer 
                    ranges={ranges}
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