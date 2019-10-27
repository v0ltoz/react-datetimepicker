import moment from 'moment';

export const datePicked = (startDate, endDate, newDate, startMode, smartMode) => {
  if (startMode) {
    return newDateStartMode(newDate, endDate, smartMode, startDate);
  } else {
    return newDateEndMode(newDate, startDate, smartMode, endDate);
  }
};

const newDateStartMode = (newDate, endDate, smartMode, startDate) => {
  // Create a new moment object which combines the new date and the original start date as newDate
  // doesnt contain time info which is important to determining equality
  let newDateWithTime = createNewDateWithTime(newDate, startDate.hour(), startDate.minute(), startDate.second());
  if (newDateWithTime.isSameOrBefore(endDate, 'seconds')) {
    return returnDateObject(newDate, endDate);
  } else if (smartMode) {
    let newEnd = moment(newDate);
    newEnd.add(1, 'days');
    return returnDateObject(newDate, newEnd);
  } else {
    return returnDateObject(startDate, endDate);
  }
};

const newDateEndMode = (newDate, startDate, smartMode, endDate) => {
  // Create a new moment object which combines the new date and the original end date as newDate
  // doesnt contain time info which is important to determining equality
  let newDateWithTime = createNewDateWithTime(newDate, endDate.hour(), endDate.minute(), endDate.second());
  if (newDateWithTime.isSameOrAfter(startDate, 'seconds')) {
    return returnDateObject(startDate, newDate);
  } else if (smartMode) {
    let newStart = moment(newDate);
    newStart.subtract(1, 'days');
    return returnDateObject(newStart, newDate);
  } else {
    return returnDateObject(startDate, endDate);
  }
};

const createNewDateWithTime = (newDate, hour, minute, second) => {
  let newDateTmp = [newDate.year(), newDate.month(), newDate.date()];
  let newDateWithTime = moment(newDateTmp);
  newDateWithTime.hour(hour);
  newDateWithTime.minute(minute);
  newDateWithTime.second(second);
  return newDateWithTime;
};

const returnDateObject = (startDate, endDate) => {
  let returnValues = {};
  returnValues.startDate = startDate;
  returnValues.endDate = endDate;
  return returnValues;
};

export const pastMaxDate = (currentDate, maxDate, minuteMode) => {
  if (!maxDate) {
    return false;
  }
  if (minuteMode && maxDate && currentDate.isAfter(maxDate, 'seconds')) {
    return true;
  }
  if (maxDate && currentDate.isAfter(maxDate, 'day')) {
    return true;
  }
  return false;
};
