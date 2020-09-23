describe('Basic Render Tests', function() {
  it('Does Render the picker!', function() {
    cy.visit('http://localhost:3000/');
    cy.get('#DateRangePickerContainer').within(() => {
      cy.get('#daterangepicker').should('be.hidden');
    });
    cy.get('#DateRangePickerContainer').click();
    cy.get('#DateRangePickerContainer').should('be.visible');
    cy.get('#DateTimeInput_start').should('have.value', '20-09-2016 00:00')
  })
});


describe('Vanilla Values Tests', function() {
  it('Does Show Correct Range', function() {
    visitAndClickDateTime();
    cy.get('#DateRangePickerContainer').within(() => {
      cy.get('#rangeButton9').contains('Custom Range');
    })
    cy.get('#YearSelector_start').find(':selected').contains('2016')
  });

  it('Correct From Date Displayed', function() {
    visitAndClickDateTime();
    cy.get('#DateRangePickerContainer').within(() => {
      cy.get('#DateTimeInput_start').should('have.value', '20-09-2016 00:00')
    });
  });

  it('Does Show Correct From Start Hour', function() {
    visitAndClickDateTime();
    cy.get('#DateRangePickerContainer').within(() => {
      cy.get('#Hour_start').find(':selected').contains('0')
    });
  })

  it('Does Show Correct From Start Minute', function() {
    visitAndClickDateTime();
    cy.get('#DateRangePickerContainer').within(() => {
      cy.get('#Minutes_start').find(':selected').contains('0')
    });
  })


  it('Does Show Correct From Month', function() {
    visitAndClickDateTime();
    cy.get('#DateRangePickerContainer').within(() => {
      cy.get('#MonthSelector_start').find(':selected').contains('September')
    });
  })

  it('Does Show Correct From Year', function() {
    visitAndClickDateTime();
    cy.get('#DateRangePickerContainer').within(() => {
      cy.get('#YearSelector_start').find(':selected').contains('2016')
    });
  })

  it('Correct To Date Displayed', function() {
    visitAndClickDateTime();
    cy.get('#DateRangePickerContainer').within(() => {
      cy.get('#DateTimeInput_end').should('have.value', '24-09-2016 23:59');
    });
  });

  it('Does Show Correct To Start Hour', function() {
    visitAndClickDateTime();
    cy.get('#DateRangePickerContainer').within(() => {
      cy.get('#Hour_end').find(':selected').contains('23')
    });
  })

  it('Does Show Correct To Start Minute', function() {
    visitAndClickDateTime();
    cy.get('#DateRangePickerContainer').within(() => {
      cy.get('#Minutes_end').find(':selected').contains('59')
    });
  })

  it('Does Show Correct To Month', function() {
    visitAndClickDateTime();
    cy.get('#DateRangePickerContainer').within(() => {
      cy.get('#MonthSelector_end').find(':selected').contains('October')
    });
  })

  it('Does Show Correct To Year', function() {
    visitAndClickDateTime();
    cy.get('#DateRangePickerContainer').within(() => {
      cy.get('#YearSelector_end').find(':selected').contains('2016')
    });
  })

  it('Is the Start Date Cell Styled and Selected', function() {
    visitAndClickDateTime();
    cy.get('#row_3_cell_1_start').should('have.css', 'color', 'rgb(255, 255, 255)')
  });

  it('Is the End Date Cell Styled and Selected', function() {
    visitAndClickDateTime();
    cy.get('#row_3_cell_5_start').should('have.css', 'color', 'rgb(255, 255, 255)')
  });

  it('Is the First Date Cell Not Styled and Selected', function() {
    visitAndClickDateTime();
    cy.get('#row_0_cell_0_start').should('not.have.css', 'color', 'rgb(255, 255, 255)');
  });
});

let visitAndClickDateTime = () => {
  cy.visit('http://localhost:3000/');
  cy.get('#DateRangePickerContainer').click();
};

