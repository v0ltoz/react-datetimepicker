# React Advanced  Date Time Range Picker
[![CircleCI](https://circleci.com/gh/v0ltoz/react-datetimepicker.svg?style=svg)](https://circleci.com/gh/v0ltoz/react-datetimepicker)
[![](https://badge.fury.io/js/react-advanced-datetimerange-picker.svg)](https://www.npmjs.com/package/react-joyride)
[![Maintainability](https://api.codeclimate.com/v1/badges/3b5c72752ef7cf3932b9/maintainability)](https://codeclimate.com/github/v0ltoz/react-datetimepicker/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/3b5c72752ef7cf3932b9/test_coverage)](https://codeclimate.com/github/v0ltoz/react-datetimepicker/test_coverage)
<br>
<b>
Development still in progress, Stable release coming soon 
</b>
<br>

This is a fully rewritten, keyboard friendly implementation of a date time range picker. It has been designed for selecting date ranges and does not currently include a single date picker.

It has been designed currently to work with React Version 15

![Date Time Picker](https://raw.githubusercontent.com/v0ltoz/react-datetimepicker/master/public/Date_Picker_Image.png)





## Setup
Run the following command:
```bash
npm install react-advanced-datetimerange-picker
```

## Requirements

This project requires react-bootstrap to be installed

## General Info

This project is based upon dangrossman daterangepicker (https://github.com/dangrossman/daterangepicker)

The project has been rewritten in React, this is not a JQuery wrap around. 

It is based off of the V2 UI with some slight adjustments and added keyboard accessibility such as Keyboard arrow key navigation and Tab navigation. 

## Properties Required

**ranges** {React.Object}  
Object of ranges that will be you default ranges. Example:
```js
let ranges = {
            "Today Only": [moment(start), moment(end)],
            "Yesterday Only": [moment(start).subtract(1, "days"), moment(end).subtract(1, "days")],
            "3 Days": [moment(start).subtract(3, "days"), moment(end)]
        }
```
**start (Required)** {Moment Object}  
Initial Start Date that will be selected, should be a moment object

**end (Required)** {Moment Object}  
Initial End Date that will be selected, should be a moment object

**local (Required)** {Object}  
Defines a local format for date labels to be shown as. Can also set Sunday to be first day or Monday. Local object accepts format and sunday first params. 

--> format: moment display format <br>
--> sundayFirst: True Sunday the first day of the week. False, Monday first day of the week. 

```js
let local = {
    "format":"DD-MM-YYYY HH:mm",
    "sundayFirst" : false
}
```

**applyCallback (Required)** {React.func} <br>
Function which is called when the apply button is clicked/pressed. Takes two params, that start date and the end date.

```js
func applyCallback(startDate, endDate){
    ... 
}
```

**maxDate (optional)** {Moment Object} <br>
Maximum date that can be selected. 


## Getting Started

```js
import React from 'react';
import DateTimeRangeContainer from 'react-advanced-datetimerange-picker'
import {FormControl} from 'react-bootstrap'
import moment from "moment"

class Wrapper extends React.Component {

    constructor(props){
        super(props);
        let now = new Date();
        let start = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0,0,0,0));
        let end = moment(start).add(1, "days").subtract(1, "seconds");
        this.state = {
            start : start,
            end : end
        }

        this.applyCallback = this.applyCallback.bind(this);
    }

    applyCallback(startDate, endDate){
        this.setState({
                start: startDate,
                end : endDate
            }
        )
    }

    render(){
            let now = new Date();
            let start = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0,0,0,0));
            let end = moment(start).add(1, "days").subtract(1, "seconds");
            let ranges = {
                "Today Only": [moment(start), moment(end)],
                "Yesterday Only": [moment(start).subtract(1, "days"), moment(end).subtract(1, "days")],
                "3 Days": [moment(start).subtract(3, "days"), moment(end)]
            }
            let local = {
                "format":"DD-MM-YYYY HH:mm",
                "sundayFirst" : false
            }
            let maxDate = moment(start).add(24, "hour")
            return(
                <div>
                    <DateTimeRangeContainer 
                        ranges={ranges}
                        start={this.state.start}
                        end={this.state.end}
                        local={local}
                        maxDate={maxDate}
                        applyCallback={this.applyCallback}
                    >    
                        <FormControl
                        id="formControlsTextB"
                        type="text"
                        label="Text"
                        placeholder="Enter text"
                        /> 
                    </DateTimeRangeContainer>
                </div>
            );
        }
}
```


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

### npm test -- --coverage

Gets test coverage when running tests to see how much of the code is covered by your tests.