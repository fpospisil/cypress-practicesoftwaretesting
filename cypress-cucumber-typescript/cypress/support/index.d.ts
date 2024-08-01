/// <reference types="cypress" />

declare namespace Cypress {
	interface Chainable {
	  login(username: string, password: string): Chainable<void>;
	  register(username: string, email: string, password: string): Chainable<void>;
	}
  }