Feature: Product filter functionality
  As a user
  I want to filter the products
  So that I can choose the products

  Scenario: Filtering products
    Given the user is on the main page
    When the user click on filter
    Then the user should see the filtered products