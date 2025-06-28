// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.on('uncaught:exception', (err, runnable) => {
  // Handle known, non-breaking exceptions
  if (
    err.message.includes('messaging/permission-blocked') ||
    err.message.includes('Registration failed - push service not available') ||
    err.message.includes("Subscription failed - no active Service Worker") ||
    err.message.includes("Failed to execute 'subscribe' on 'PushManager'")
  ) {
    return false;
  }
  return true;
});

Cypress.Commands.add('login', () => {
  cy.visit('/');

  cy.origin(Cypress.env('originUrl'), () => {
    cy.get('#username').should('be.visible').type(Cypress.env('username'));
    cy.get('#password').should('be.visible').type(Cypress.env('password'));
    cy.get('#kc-login').click();
  });

  // Optional: assert redirection
  cy.url().should('include', '/console');
});


