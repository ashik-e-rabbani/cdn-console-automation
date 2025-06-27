describe('Asians Group CDN Console Login', () => {

  const editDomain = (domainName) => {
    cy.contains('h3', domainName)
      .parentsUntil('.ant-list-item')
      .parent()
      .first()
      .within(() => {
        cy.contains('button', 'Edit').click();
      });
  };

  const clickTab = (tabLabel) => {
    cy.get('div[role="tab"]').contains(tabLabel)
      .should('be.visible')
      .click();
  };

  const clickSave = () => {
    cy.contains('Save')
      .click();

    cy.contains('Domain saved successfully').should('be.visible');
  };

  it('Logs in and modifies domain configs', () => {
    cy.visit('/');

    // Handle cross-origin Keycloak login
    cy.origin(Cypress.env('originUrl'), () => {
      cy.get('#username').should('be.visible').type(Cypress.env('username'));
      cy.get('#password').should('be.visible').type(Cypress.env('password'));
      cy.get('#kc-login').click();
    });

    // test03.p9m.net
    editDomain('test03.p9m.net');

    // Ensure tab is visible and click Advanced configuration
    cy.get('.ant-tabs-tab-next')
      .should('be.visible')
      .click();

    clickTab('Advanced configuration');
    cy.contains(' Cache strategy ').should('be.visible').click();

    // Toggle switch ON
 cy.get('.d-flex.flex-fill > .flex-fill > .d-flex > .mr-2').click();

    clickSave();

    // test01.p9m.net
    editDomain('test01.p9m.net');
    clickTab('Basic configuration');

    // Assert radio button is checked
cy.get('#redirect-traffic-action')
  .should('be.checked');


  // save button
  cy.contains('Save').click()

  // validate successful save
  cy.contains('Domain saved successfully').should('be.visible')
  });
});
