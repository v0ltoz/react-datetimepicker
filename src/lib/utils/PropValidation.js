export const propValidation = props => {
  if (props.years) {
    if (!Array.isArray(props.years)) {
      return 'Year props should be an array e.g. [2019, 2020]';
    }
    if (props.years.length !== 2) {
      return 'Year props should be an array of 2, with the first number being the start date and the second being the end';
    }
    let { start, end, years } = props;
    if (years[0] > years[1]) {
      return 'Start year must be before the end';
    }
    // Start year defined must be between the custom user defined dates
    let isStartYearBetweenUserDefinedYears =
      start.year() >= years[0] && start.year() <= years[1];
    // End year defined must be between the custom user defined dates
    let isEndYearBetweenUserDefinedYears =
      end.year() >= years[0] && end.year() <= years[1];
    if (!isStartYearBetweenUserDefinedYears) {
      return 'Start year should be in the custom years defined';
    }
    if (!isEndYearBetweenUserDefinedYears) {
      return 'End year should be in the custom years defined';
    }
  }
  return true;
};
