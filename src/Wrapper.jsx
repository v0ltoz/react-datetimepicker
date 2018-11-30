import React from 'react';
import DateTimeRangeContainer from './lib/index'
import {FormControl, Grid, Row, Col} from 'react-bootstrap'
import moment from "moment"

class Wrapper extends React.Component {

    constructor(props){
        super(props);
        let now = new Date();
        let start = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0,0,0,0));
        let end = moment(start).add(1, "days").subtract(1, "seconds");
        start = moment(start).subtract(34, "months").subtract(1, "seconds");
        end = moment(start).add(5, "days").add();
        this.state = {
            start : start,
            end : end
        }

        this.onClick = this.onClick.bind(this);
        this.applyCallback = this.applyCallback.bind(this);
    }

    applyCallback(startDate, endDate){
        // console.log("Apply Callback");
        // console.log(startDate.format("DD-MM-YYYY HH:mm"));
        // console.log(endDate.format("DD-MM-YYYY HH:mm"));
        this.setState(
            {
                start: startDate,
                end : endDate
            }
        )
    }

    onClick(){
        let newStart = moment(this.state.start).subtract(3, "days");
        // console.log("On Click Callback");
        // console.log(newStart.format("DD-MM-YYYY HH:mm"));
        this.setState({start : newStart})
    }

    renderContainerNoGrid(ranges, local){
        return(
            <div>
                <DateTimeRangeContainer 
                    ranges={ranges}
                    start={this.state.start}
                    end={this.state.end}
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
                <div onClick={this.onClick}>
                    Click Me to test change state here and updating picker
                </div>
            </div>   
        )
    }

    renderGrid(ranges, local){
        return(
            <Grid>
                <Row className="show-grid" style={{textAlign:"center"}}>
                    <Col xs={3}>
                    1
                    </Col>
                    <Col xs={6} md={4}>
                        <DateTimeRangeContainer 
                            ranges={ranges}
                            start={this.state.start}
                            end={this.state.end}
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
                    </Col>
                    <Col xs={3} md={4}>
                    3
                    </Col>
                </Row>
            </Grid>
        )
    }

     render(){
        let now = new Date();
        let start = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0,0,0,0));
        let end = moment(start).add(1, "days").subtract(1, "seconds");
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
        let local = {
            "format":"DD-MM-YYYY HH:mm",
            "sundayFirst" : false
        }
         return(
             <div>
                {this.renderContainerNoGrid(ranges, local)}
                {this.renderGrid(ranges, local)}
                {this.renderContainerNoGrid(ranges, local)}
            </div>
         );
     }
}
export {Wrapper};