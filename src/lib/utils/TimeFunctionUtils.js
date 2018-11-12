import {ModeEnum} from '../DateTimeRangeContainer'
import moment from 'moment'

export const generateHours = () => {
    let hours = [];
    for(let i = 0; i < 24; i++){
        hours.push(i);
    }
    return hours;
}

export const generateMinutes = () => {
    let minutes = [];
    for(let i = 0; i < 60; i++){
        if(i < 10){
            minutes.push("0" + i.toString());  
        }else{
            minutes.push(i.toString());
        }
    }
    return minutes;
}

function workOutMonthYear(date, secondDate, mode){
    // If both months are different months then
    // allow normal display in the calendar
    let selectedMonth = date.month();
    let otherMonth = secondDate.month();
    if(selectedMonth !== otherMonth){
      return date;
    }
    // If both months are the same have "end"/right as the
    // month and "start"/left as -1 month
    else if(mode === ModeEnum.start){
      let lastMonth = JSON.parse(JSON.stringify(date));
      lastMonth = moment(lastMonth);
      lastMonth.subtract(1, "month");
      return lastMonth;
    }else{
      return date;
    }
}

export const getMonth = (date, secondDate, mode) => {
   return workOutMonthYear(date, secondDate, mode).month();
}

export const getYear = (date, secondDate, mode) => {
    return workOutMonthYear(date, secondDate, mode).year();
}

export const getThirtyFiveDays = (initMonth, initYear) => {
    let thirtyFiveDays = []

    // Get start date of month, and get that day of the week
    // Keep subtracting values till 0 reached in order to get
    // all the days in the previous month upto the start of the 
    // week

    let firstDayOfMonth = moment(new Date(initYear, initMonth, 1));
    let dayBeforeFirstDayOfMonth = firstDayOfMonth.day() - 1; // We dont want to include the first day of the new month
    for(let i = dayBeforeFirstDayOfMonth; i > 0; i--){
        let firstDayOfMonthCopy = firstDayOfMonth.clone();
        firstDayOfMonthCopy = firstDayOfMonthCopy.subtract(i, 'd');
        thirtyFiveDays.push(firstDayOfMonthCopy);
    }
    // Add in all days this month
    for(let i = 0; i < firstDayOfMonth.daysInMonth(); i++){
        thirtyFiveDays.push(firstDayOfMonth.clone().add(i,'d'));
    } 
    // Add in all days at the end of the month until last day of week seen
    let lastDayOfMonth = moment(new Date(initYear, initMonth, firstDayOfMonth.daysInMonth()));
    let lastDayDayOfWeek = lastDayOfMonth.day();
    let toAdd = 1;
    for(let i = lastDayDayOfWeek; i < 7; i++){
        thirtyFiveDays.push(lastDayOfMonth.clone().add(toAdd,'d'));
        toAdd++;
    }
    return thirtyFiveDays;
};

export const isInbetweenDates = (isStartDate, dayToFindOut, start, end) => {
    let isInBetweenDates;
    if(isStartDate){
        isInBetweenDates = dayToFindOut.isAfter(start) && dayToFindOut.isBefore(end);
    }else{
        isInBetweenDates = dayToFindOut.isBefore(start) && dayToFindOut.isAfter(end);
    }
    return isInBetweenDates;
};

export const startDateStyle = () => {
    return {
        borderRadius:"4px 0 0 4px",
        borderColour:"transparent",
        color:"#fff",
        backgroundColor:"#357abd",
        cursor:"pointer"
    };
};

export const endDateStyle = () => {
    return {
        borderRadius:"0 4px 4px 0",
        borderColour:"transparent",
        color:"#fff",
        backgroundColor:"#357abd",
        cursor:"pointer"
    };
};

export const inBetweenStyle = () => {
    return {
        borderRadius:"0",
        borderColour:"transparent",
        color:"#000",
        backgroundColor:"#ebf4f8",
        cursor:"pointer"
    };
};

export const normalCellStyle = () => {
    return {
        borderRadius:"0 0 0 0",
        borderColour:"transparent",
        color:"black",
        backgroundColor:""
    };
};

export const hoverCellStyle = (between) => {
    let borderRadius = "4px 4px 4px 4px";
    if(between){
        borderRadius = "0 0 0 0";
    }
    return {
        borderRadius:borderRadius,
        borderColour:"transparent",
        color:"inherit",
        backgroundColor:"#eee",
        cursor:"pointer"
    };
};