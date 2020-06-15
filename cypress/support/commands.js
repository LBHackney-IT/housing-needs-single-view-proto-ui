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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import jwt from 'jsonwebtoken';

const setHackneyCookie = isValidGroup => {
  const group = isValidGroup
    ? 'housingneeds-singleview-beta'
    : 'some-other-group';
  const token = jwt.sign({ groups: [group] }, 'a-secure-signature');
  cy.setCookie('hackneyToken', token, {
    url: 'http://localhost:3001',
    domain: 'localhost'
  });
};

const setSharedPlanCookie = isValidGroup => {
  const token = isValidGroup ? '[%22shared_plan%22]' : 'some-other-group';
  cy.setCookie('singleViewFeatures', token, {
    url: 'http://localhost:3001',
    domain: 'localhost'
  });
};

Cypress.Commands.add('setSharedPlanCookie', setSharedPlanCookie);
Cypress.Commands.add('setHackneyCookie', setHackneyCookie);
