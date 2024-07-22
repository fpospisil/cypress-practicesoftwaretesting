export default class LoginPage {
    // Locators
    get usernameInput() {
      return cy.get('[data-test="email"]');
    }
  
    get passwordInput() {
      return cy.get('[data-test="password"]');
    }
  
    get loginButton() {
      return cy.get('[data-test="login-submit"]');
    }
  
    // Methods
    visit() {
      cy.visit('https://practicesoftwaretesting.com/auth/login');
    }
  
    login() {
      const username = Cypress.env('username');
      const password = Cypress.env('password');
  
      this.visit();
      this.usernameInput.type(username);
      this.passwordInput.type(password);
      this.loginButton.click();
    }
  }
  
  export const loginPage = new LoginPage();