// cypress/support/index.d.ts

/// <reference types="cypress" />

declare namespace Cypress {
	interface Chainable {
		/**
		 * Custom command to login
		 * @example cy.login('username', 'password')
		 */
		login(username: string, password: string): Chainable<void>

		/**
		 * Custom command to register
		 * @example cy.register('username', 'email', 'password')
		 */
		register(
			username: string,
			email: string,
			password: string,
		): Chainable<void>
	}
}
