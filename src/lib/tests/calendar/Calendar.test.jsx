import React from "react";
import Calendar from '../../calendar/Calendar'
import {mount, configure} from "enzyme"
import Adapter from 'enzyme-adapter-react-15';
import moment from 'moment';
import {ModeEnum} from '../../DateTimeRangePicker'
import CalendarRows from '../../calendar/CalendarRows'
import Cell from '../../calendar/Cell'
import CalendarHeader from '../../calendar/CalendarHeader'
import MonthYearSelector from '../../calendar/MonthYearSelector'

configure({ adapter: new Adapter() });
let start = moment(new Date(2018, 1, 1, 0,0,0,0));
let end = moment(start).add(1, "days");
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
// let maxDate = moment(start).add(24, "hour");
var dateSelectedCallback;
let dateSelectedNoTimeCallback = (cellDate) => {dateSelectedCallback = cellDate}
let keyboardCellCallback = (originalDate, newDate) => {}
let focusOnCallback = (date) => {}
let focusDate = false;
let cellFocusedCallback = (date) => {}

const dateTimeRangeCalendarExpectedUse = mount(
  <Calendar 
      ranges={ranges}
      date={start}
      otherDate={end}
      mode={ModeEnum.start}
      dateSelectedNoTimeCallback={dateSelectedNoTimeCallback}
      keyboardCellCallback={keyboardCellCallback}
      focusOnCallback={focusOnCallback}
      focusDate={focusDate}
      cellFocusedCallback={cellFocusedCallback}
      local={local}
  />    
);
let localUSA = {
    "format":"MM-DD-YYYY HH:mm",
    "sundayFirst" : true
}
const dateTimeRangeCalendarAmerican = mount(
    <Calendar 
        ranges={ranges}
        date={start}
        otherDate={end}
        mode={ModeEnum.start}
        dateSelectedNoTimeCallback={dateSelectedNoTimeCallback}
        keyboardCellCallback={keyboardCellCallback}
        focusOnCallback={focusOnCallback}
        focusDate={focusDate}
        cellFocusedCallback={cellFocusedCallback}
        local={localUSA}
    />    
  );

  const dateTimeRangeCalendarEndMode = mount(
    <Calendar 
        ranges={ranges}
        date={start}
        otherDate={end}
        mode={ModeEnum.end}
        dateSelectedNoTimeCallback={dateSelectedNoTimeCallback}
        keyboardCellCallback={keyboardCellCallback}
        focusOnCallback={focusOnCallback}
        focusDate={focusDate}
        cellFocusedCallback={cellFocusedCallback}
        local={localUSA}
    />    
  );

beforeEach(() => {
    dateSelectedCallback = null
});

describe("DateTimeRangeContainer", () => {
    it("Render Calendar Test", () => {
        const wrappingDiv = dateTimeRangeCalendarExpectedUse.first().children().children();
        expect(wrappingDiv.length).toBe(3);
    });

    it("Calendar Rows Renders", () => {
        const wrappingDiv = dateTimeRangeCalendarExpectedUse;
        expect(wrappingDiv.find(CalendarRows).length).toBe(1);
    });

    it("Calendar Test Correct Amount of Cells Generated", () => {
        const wrappingDiv = dateTimeRangeCalendarExpectedUse;
        const cells = wrappingDiv.find(Cell);
        expect(cells.length).toBe(42);
    });

    it("Calendar Test January 2018, First Cell set to 25th December", () => {
        const wrappingDiv = dateTimeRangeCalendarExpectedUse;
        const cells = wrappingDiv.find(Cell);
        let cellDay = cells.at(0).props().cellDay;
        let expectedDate = moment(new Date(2017, 11, 25));
        expect(cellDay.isSame(expectedDate, "day")).toBe(true);
        // console.log(wrappingDiv.find(CalendarRows).debug())
        // console.log(wrappingDiv.debug());
        // console.log(cellDay.format("YYYY-MM-DD"))
    });

    it("Calendar Test January 2018, Last Cell to be Cell set to 4th Feb", () => {
        const wrappingDiv = dateTimeRangeCalendarExpectedUse;
        const cells = wrappingDiv.find(Cell);
        let cellDay = cells.at(41).props().cellDay;
        let expectedDate = moment(new Date(2018, 1, 4));
        expect(cellDay.isSame(expectedDate, "day")).toBe(true);
    });

    it("Calendar Test January 2018, 8th Cell is the 1st of Jan", () => {
        const wrappingDiv = dateTimeRangeCalendarExpectedUse;
        const cells = wrappingDiv.find(Cell);
        let cellDay = cells.at(7).props().cellDay;
        let expectedDate = moment(new Date(2018, 0, 1));
        expect(cellDay.isSame(expectedDate, "day")).toBe(true);
    });

    it("Calendar Test January 2018, 38th Cell is the 31st of Jan", () => {
        const wrappingDiv = dateTimeRangeCalendarExpectedUse;
        const cells = wrappingDiv.find(Cell);
        let cellDay = cells.at(37).props().cellDay;
        let expectedDate = moment(new Date(2018, 0, 31));
        expect(cellDay.isSame(expectedDate, "day")).toBe(true);
    });

    it("Calendar Test January 2018, First Cell Clicked Callback Test", () => {
        const wrappingDiv = dateTimeRangeCalendarExpectedUse;
        const cells = wrappingDiv.find(Cell);
        let firstCell = cells.at(0);
        firstCell.simulate('click');
        let expectedDate = moment(new Date(2017, 11, 25));
        expect(dateSelectedCallback.isSame(expectedDate, "day")).toBe(true);
    });

    it("Calendar Test January 2018, First Cell Clicked Callback Test", () => {
        const wrappingDiv = dateTimeRangeCalendarExpectedUse;
        const cells = wrappingDiv.find(Cell);
        let firstCell = cells.at(0);
        firstCell.simulate('click');
        let expectedDate = moment(new Date(2017, 11, 25));
        expect(dateSelectedCallback.isSame(expectedDate, "day")).toBe(true);
    });

    it("Calendar Test January 2018, Last Cell Clicked Callback Test", () => {
        const wrappingDiv = dateTimeRangeCalendarExpectedUse;
        const cells = wrappingDiv.find(Cell);
        let lastCell = cells.at(41);
        lastCell.simulate('click');
        let expectedDate = moment(new Date(2018, 1, 4));
        expect(dateSelectedCallback.isSame(expectedDate, "day")).toBe(true);
    });

    it("UK: Expect Headers Mo-Su", () => {
        const wrappingDiv = dateTimeRangeCalendarExpectedUse;
        const cells = wrappingDiv.find(CalendarHeader);
        let headers = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
        let index = 0;
        let success = true;
        cells.children().children().forEach((node) => {
            if(success){
                success = node.contains(
                    <div>
                        {headers[index]}
                    </div>
                );
                index++;
            }
        })
        expect(success).toBe(true);
    });

    it("American: Expect Headers Su-Sat", () => {
        const wrappingDiv = dateTimeRangeCalendarAmerican;
        const cells = wrappingDiv.find(CalendarHeader);
        let headers = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
        let index = 0;
        let success = true;
        cells.children().children().forEach((node) => {
            if(success){
                success = node.contains(
                    <div>
                        {headers[index]}
                    </div>
                );
                index++;
            }
        })
        expect(success).toBe(true);
    });

    it("Calendar Month Set To January Test", () => {
        const wrappingDiv = dateTimeRangeCalendarExpectedUse;
        const monthYearSelector = wrappingDiv.find(MonthYearSelector);
        let monthSelected = monthYearSelector.children().children().at(1).children().props().value;
        expect(monthSelected).toBe("January");
    });

    it("Calendar Year Set To Be 2018 Test", () => {
        const wrappingDiv = dateTimeRangeCalendarExpectedUse;
        const monthYearSelector = wrappingDiv.find(MonthYearSelector);
        let yearSelected = monthYearSelector.children().children().at(2).children().props().value;
        expect(yearSelected).toBe(2018);
    });

    it("Calendar Year Change to 2017, Changes Cells Test", () => {
        const wrappingDiv = dateTimeRangeCalendarExpectedUse;
        const monthYearSelector = wrappingDiv.find(MonthYearSelector);
        monthYearSelector.children().children().at(2).children().simulate('change', {target: { value : 2017}});;  
        const cells = wrappingDiv.find(Cell);
        let cellDay = cells.at(0).props().cellDay;
        let expectedDate = moment(new Date(2016, 11, 26));
        expect(cellDay.isSame(expectedDate, "day")).toBe(true);
        // Reset To Previous Value
        monthYearSelector.children().children().at(2).children().simulate('change', {target: { value : 2018}});;  
    });

    it("Calendar Left Arrow Press Test", () => {
        const wrappingDiv = dateTimeRangeCalendarExpectedUse;
        const monthYearSelector = wrappingDiv.find(MonthYearSelector);
        monthYearSelector.children().children().at(0).children().simulate('click'); 
        const cells = wrappingDiv.find(Cell);
        let cellDay = cells.at(0).props().cellDay;
        let expectedDate = moment(new Date(2017, 10, 27));
        expect(cellDay.isSame(expectedDate, "day")).toBe(true);
        // Reset To Previous Value
        monthYearSelector.children().children().at(3).children().simulate('click'); 
    });

    it("Calendar Right Arrow Press Test", () => {
        const wrappingDiv = dateTimeRangeCalendarExpectedUse;
        const monthYearSelector = wrappingDiv.find(MonthYearSelector);
        monthYearSelector.children().children().at(3).children().simulate('click'); 
        const cells = wrappingDiv.find(Cell);
        let cellDay = cells.at(0).props().cellDay;
        let expectedDate = moment(new Date(2018, 0, 29));
        expect(cellDay.isSame(expectedDate, "day")).toBe(true);
        // Reset To Previous Value
        monthYearSelector.children().children().at(0).children().simulate('click'); 
    });

    it("Calendar Update Month Year after Props Change Test, Different Month Year", () => {
        const wrappingDiv = dateTimeRangeCalendarExpectedUse;
        let props = JSON.parse(JSON.stringify(wrappingDiv.props()));
        props.date = moment(new Date(2017, 11, 1));
        props.otherDate = moment(new Date(2018, 1, 10));
        wrappingDiv.setProps(props);
        expect(wrappingDiv.state().year).toBe(2017);
        expect(wrappingDiv.state().month).toBe(11)
    });

    it("Calendar Update Month Year after Props Change Test, Same Month Year Start Mode", () => {
        const wrappingDiv = dateTimeRangeCalendarExpectedUse;
        let props = JSON.parse(JSON.stringify(wrappingDiv.props()));
        props.date = moment(new Date(2017, 11, 1));
        props.otherDate = moment(new Date(2017, 11, 10));
        wrappingDiv.setProps(props);
        expect(wrappingDiv.state().year).toBe(2017);
        expect(wrappingDiv.state().month).toBe(10)
    });

    it("Calendar Update Month Year after Props Change Test, Same Month Year End Mode", () => {
        const wrappingDiv = dateTimeRangeCalendarEndMode;
        let props = JSON.parse(JSON.stringify(wrappingDiv.props()));
        props.date = moment(new Date(2017, 11, 1));
        props.otherDate = moment(new Date(2017, 11, 10));
        wrappingDiv.setProps(props);
        expect(wrappingDiv.state().year).toBe(2017);
        expect(wrappingDiv.state().month).toBe(11)
    });

});