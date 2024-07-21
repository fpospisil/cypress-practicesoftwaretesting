class RegisterPage {
	// Locators
	get firstNameInput() {
		return cy.get('[data-test="first-name"]')
	}

	get lastNameInput() {
		return cy.get('[data-test="last-name"]')
	}

	get dobInput() {
		return cy.get('[data-test="dob"]')
	}

	get addressInput() {
		return cy.get('[data-test="address"]')
	}

	get postcodeInput() {
		return cy.get('[data-test="postcode"]')
	}

	get cityInput() {
		return cy.get('[data-test="city"]')
	}

	get stateInput() {
		return cy.get('[data-test="state"]')
	}

	get countryInput() {
		return cy.get('[data-test="country"]').select('Albania')
	}

	get phoneInput() {
		return cy.get('[data-test="phone"]')
	}

	get emailInput() {
		return cy.get('[data-test="email"]')
	}

	get passwordInput() {
		return cy.get('[data-test="password"]')
	}

	get registerBtn() {
		return cy.get('[data-test="register-submit"]')
	}

	get firstNameError() {
		return cy.get('[data-test="first-name-error"]')
	}

	get lastNameError() {
		return cy.get('[data-test="last-name-error"]')
	}

	get dobError() {
		return cy.get('[data-test="dob-error"]')
	}

	get addressError() {
		return cy.get('[data-test="address-error"]')
	}

	get postCodeError() {
		return cy.get('[data-test="postcode-error"]')
	}

	get cityError() {
		return cy.get('[data-test="city-error"]')
	}

	get stateError() {
		return cy.get('[data-test="state-error"]')
	}

	get countryError() {
		return cy.get('[data-test="country-error"]')
	}

	get phoneError() {
		return cy.get('[data-test="phone-error"]')
	}

	get emailError() {
		return cy.get('[data-test="email-error"]')
	}

	get passwordError() {
		return cy.get('[data-test="password-error"]')
	}

	// Methods
	visit() {
		cy.visit('https://practicesoftwaretesting.com/auth/register')
	}

	selectCountry(country: string) {
		this.countryInput.select(country)
	}

	register(userData: {
		firstName: string
		lastName: string
		dob: string
		address: string
		postcode: string
		city: string
		state: string
		country: string
		phone: string
		email: string
		password: string
	}) {
		this.visit()
		this.firstNameInput.type(userData.firstName)
		this.lastNameInput.type(userData.lastName)
		this.dobInput.click().focused().type(userData.dob)
		this.addressInput.type(userData.address)
		this.postcodeInput.type(userData.postcode)
		this.cityInput.type(userData.city)
		this.stateInput.type(userData.state)
		this.countryInput.select(userData.country)
		this.phoneInput.type(userData.phone)
		this.emailInput.type(userData.email)
		this.passwordInput.type(userData.password)
		this.registerBtn.click()
	}
}

export const registerPage = new RegisterPage()
