// cypress/support/commands.ts

Cypress.Commands.add('login', (username: string, password: string) => {
	cy.visit('https://practice.automationtesting.in/')
	cy.get('[data-test="nav-sign-in"]').click()
	cy.get('[data-test="email"]').type(username)
	cy.get('[data-test="password"]').type(password)
	cy.get('[data-test="login-submit"]').click()
})
