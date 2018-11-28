
This project is based upon dangrossman daterangepicker (https://github.com/dangrossman/daterangepicker)

This is a rewrite of the date time range picker only it does not include the singular date picker at present. 

The project has been rewritten in React, this is not a JQuery wrap around. 

It is based off of the V2 UI with some slight adjustments and added keyboard accessibility such as Keyboard arrow key navigation and Tab navigation. 

Properties Required:

ranges = Object : object of ranges that will be you default ranges. 

Example: let ranges = {
            "Today Only": [moment(start), moment(end)],
            "Yesterday Only": [moment(start).subtract(1, "days"), moment(end).subtract(1, "days")],
            "3 Days": [moment(start).subtract(3, "days"), moment(end)]
        }

start = moment : Initial Date Selected
end = moment : Initial End Date Selected
local = Object : defines a local format for date labels to be shown as. Can also set Sunday to be first day or Monday. local object accepts format and sunday first params.

Example: 
let local = {
            "format":"DD-MM-YYYY HH:mm",
            "sundayFirst" : false
        }

applyCallback = funcion : This will be called when the apply button is pressed. It provides the new start and end date as params

Example: 
applyCallback(startDate, endDate){
        console.log(startDate);
        console.log(endDate);
    }

Example Usage:
    ```
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
    </div>
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