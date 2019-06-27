import moment from 'moment';

export const datePicked = (
  startDate,
  endDate,
  newDate,
  startMode,
  smartMode,
) => {
  if (startMode) {
    return newDateStartMode(newDate, endDate, smartMode, startDate);
  } else {
    return newDateEndMode(newDate, startDate);
  }
};

const newDateStartMode = (newDate, endDate, smartMode, startDate) => {
  // Create a new moment object which combines the new date and the original start date as newDate
  // doesnt contain time info which is important to determining equality
  let newDateTmp = [newDate.year(), newDate.month(), newDate.date()];
  let newDateWithTime = moment(newDateTmp);
  newDateWithTime.hour(startDate.hour());
  newDateWithTime.minute(startDate.minute());
  if (newDateWithTime.isSameOrBefore(endDate, 'minutes')) {
    return returnDateObject(newDate, endDate);
  } else if (smartMode) {
    let newEnd = moment(newDate);
    newEnd.add(1, 'days');
    return returnDateObject(newDate, newEnd);
  } else {
    return returnDateObject(startDate, endDate);
  }
};

const newDateEndMode = (newDate, startDate) => {
  if (newDate.isSameOrAfter(startDate, 'minutes')) {
    return returnDateObject(startDate, newDate);
  } else {
    let newStart = moment(newDate);
    newStart.subtract(1, 'days');
    return returnDateObject(newStart, newDate);
  }
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
  if (minuteMode && maxDate && currentDate.isAfter(maxDate, 'minute')) {
    return true;
  }
  if (maxDate && currentDate.isAfter(maxDate, 'day')) {
    return true;
  }
  return false;
};
