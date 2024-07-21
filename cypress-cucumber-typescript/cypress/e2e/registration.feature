Feature: Registration functionality
  As a new user
  I want to register for an account
  So that I can access the system

  Background:
    Given the user is on the registration page

  Scenario: Registration with invalid details
    When the user submits the registration form without filling any details
    Then the user should see validation error messages

  Scenario: Successful registration
    When the user enters valid registration details
    Then the user should be redirected to the welcome page