import moment from 'moment';

export const createYears = descendingYears => {
  let years = [];
  //Range from 1900 to 25 years into the future
  let past = moment('19000101', 'YYYYMMDD');
  let yearsToGetFuture = 10;
  let endYear = moment()
    .add(yearsToGetFuture, 'years')
    .get('year');
  let addedCurrentYear = false;
  while (!addedCurrentYear) {
    if (past.get('years') === endYear) {
      addedCurrentYear = true;
    }
    years.push(past.year());
    past.add(1, 'years');
  }
  return sortYears(years, descendingYears);
};

const sortYears = (years, descendingYears) => {
  // Decides whether to order dates in ascending or descending order
  if (descendingYears) {
    return years.reverse();
  }
  return years;
};
