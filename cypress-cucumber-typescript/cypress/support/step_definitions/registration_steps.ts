import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import { registerPage } from '../../page-object/registerPage'

Given('the user is on the registration page', () => {
	registerPage.visit()
})

When(
	'the user submits the registration form without filling any details',
	() => {
		// Přímo klikneme na tlačítko registrace bez vyplnění jakýchkoliv polí
		registerPage.registerBtn.click()
	},
)

Then('the user should see validation error messages', () => {
	// Ověření chybových zpráv
	registerPage.firstNameError.should('be.visible')
	registerPage.lastNameError.should('be.visible')
	registerPage.dobError.should('be.visible')
	registerPage.addressError.should('be.visible')
	registerPage.postCodeError.should('be.visible')
	registerPage.cityError.should('be.visible')
	registerPage.stateError.should('be.visible')
	registerPage.countryError.should('be.visible')
	registerPage.phoneError.should('be.visible')
	registerPage.emailError.should('be.visible')
	registerPage.passwordError.should('be.visible')
})

When('the user enters valid registration details', function () {
	cy.fixture('userData.json').then((userData) => {
		registerPage.register({
			firstName: userData.firstName,
			lastName: userData.lastName,
			dob: userData.dob,
			address: userData.address,
			postcode: userData.postcode,
			city: userData.city,
			state: userData.state,
			country: userData.country,
			phone: userData.phoneNumber,
			email: userData.email,
			password: userData.password,
		})
	})
})

Then('the user should be redirected to the welcome page', () => {
	cy.url().should('include', '/login')
})
