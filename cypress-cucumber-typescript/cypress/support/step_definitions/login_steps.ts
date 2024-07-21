import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { loginPage } from '../../page-object/loginPage';

Given('the user is on the login page', () => {
  loginPage.visit();
});

When('the user enters a valid username and password', () => {
  loginPage.login();
});

Then('the user should be redirected to the dashboard', () => {
  cy.url().should('include', '/account');
});