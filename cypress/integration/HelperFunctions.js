export let visitAndClickDateTime = (container = 'DateRangePickerContainer') => {
  cy.visit('http://localhost:3000/');
  cy.get(`#${container}`).click();
};

export let keyboardOrClickThenCheckAllChangesWithin = (
  container = 'DateRangePickerContainer',
  cellToFocus,
  newFocusedCell,
  arrowOrClick,
  hourStart,
  minuteStart,
  monthStart,
  yearStart,
  hourEnd,
  minuteEnd,
  monthEnd,
  yearEnd,
  oldRowStart,
  oldRowEnd,
  newRowStart,
  newRowEnd,
  newStartDate,
  newEndDate,
) => {
  cy.get(`#${container}`).within(() => {
    if (arrowOrClick === 'click') {
      cy.get(`#${cellToFocus}`)
          .focus()
          .click();
    } else {
      cy.get(`#${cellToFocus}`)
          .focus()
          .type(`{${arrowOrClick}}`);
    }
    cy.focused().should('have.id', newFocusedCell);
  });
  assertSelectedDateCorrectBothDatesChange(
    container,
    hourStart,
    minuteStart,
    monthStart,
    yearStart,
    hourEnd,
    minuteEnd,
    monthEnd,
    yearEnd,
    oldRowStart,
    oldRowEnd,
    newRowStart,
    newRowEnd,
    newStartDate,
    newEndDate,
  );
};

export let keyboardOrClickThenCheckAllChanges = (
  container = 'DateRangePickerContainer',
  cellToFocus,
  newFocusedCell,
  arrowOrClick,
  hourStart,
  minuteStart,
  monthStart,
  yearStart,
  hourEnd,
  minuteEnd,
  monthEnd,
  yearEnd,
  oldRowStart,
  oldRowEnd,
  newRowStart,
  newRowEnd,
  newStartDate,
  newEndDate,
) => {
  if (arrowOrClick === 'click') {
    cy.get(`#${cellToFocus}`)
      .focus()
      .click();
  } else {
    cy.get(`#${cellToFocus}`)
      .focus()
      .type(`{${arrowOrClick}}`);
  }
  cy.focused().should('have.id', newFocusedCell);
  assertSelectedDateCorrectBothDatesChange(
    container,
    hourStart,
    minuteStart,
    monthStart,
    yearStart,
    hourEnd,
    minuteEnd,
    monthEnd,
    yearEnd,
    oldRowStart,
    oldRowEnd,
    newRowStart,
    newRowEnd,
    newStartDate,
    newEndDate,
  );
};

export let assertSelectedDateCorrectBothDatesChange = (
  container = 'DateRangePickerContainer',
  hourStart,
  minuteStart,
  monthStart,
  yearStart,
  hourEnd,
  minuteEnd,
  monthEnd,
  yearEnd,
  oldRowStart,
  oldRowEnd,
  newRowStart,
  newRowEnd,
  newStartDate,
  newEndDate,
) => {
  cy.get(`#${container}`).within(() => {
    cy.get('#DateTimeInput_start').should('have.value', newStartDate);
    cy.get('#Hour_start')
      .find(':selected')
      .contains(hourStart);
    cy.get('#Minutes_start')
      .find(':selected')
      .contains(minuteStart);
    cy.get('#MonthSelector_start')
      .find(':selected')
      .contains(monthStart);
    cy.get('#YearSelector_start')
      .find(':selected')
      .contains(yearStart);
    cy.get('#DateTimeInput_end').should('have.value', newEndDate);
    cy.get('#Hour_end')
      .find(':selected')
      .contains(hourEnd);
    cy.get('#Minutes_end')
      .find(':selected')
      .contains(minuteEnd);
    cy.get('#MonthSelector_end')
      .find(':selected')
      .contains(monthEnd);
    cy.get('#YearSelector_end')
      .find(':selected')
      .contains(yearEnd);
    cy.get(`#${oldRowStart}`).should('not.have.css', 'color', 'rgb(255, 255, 255)');
    cy.get(`#${oldRowEnd}`).should('not.have.css', 'color', 'rgb(255, 255, 255)');
    cy.get(`#${newRowStart}`).should('have.css', 'color', 'rgb(255, 255, 255)');
    cy.get(`#${newRowEnd}`).should('have.css', 'color', 'rgb(255, 255, 255)');
  });
};

export const checkStyleOfSelector = (selector, cssProperty, cssValue) => {
  cy.get(`#${selector}`).should('have.css', cssProperty, cssValue);
};

export const checkStyleOfSelectorWithin = (container, selector, cssProperty, cssValue) => {
  cy.get(`#${container}`).within(() => {
    cy.get(`#${selector}`).should('have.css', cssProperty, cssValue);
  });
};
