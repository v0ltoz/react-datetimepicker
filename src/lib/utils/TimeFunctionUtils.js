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

function workOutInitMonthYear(date, secondDate, mode){
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

export const getInitialMonth = (date, secondDate, mode) => {
   return workOutInitMonthYear(date, secondDate, mode).month();
}

export const getInitialYear = (date, secondDate, mode) => {
    return workOutInitMonthYear(date, secondDate, mode).year();
}