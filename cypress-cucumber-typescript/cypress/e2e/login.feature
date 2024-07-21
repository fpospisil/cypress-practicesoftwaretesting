Feature: Login functionality
  As a user
  I want to login to the system
  So that I can access my account

  Scenario: Successful login
    Given the user is on the login page
    When the user enters a valid username and password
    Then the user should be redirected to the dashboard