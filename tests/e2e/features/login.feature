Feature: Login functionality
  As a user
  I want to login into my account
  So that I can manage my waiver

  Scenario: user logs in successfully with valid credentials
    Given the user has browsed to the sign-up page
    And the user had sign-up with valid email and password using webUI
    And the user has browsed to the login page
    When the user logs in with valid email and password
    Then the message "User Logged In" should pop-up