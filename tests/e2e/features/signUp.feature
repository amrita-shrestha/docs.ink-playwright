Feature: SignUp functionality
  As a user
  I want to signUp new account
  So that I can access waiver

  Scenario: user signup
    Given the user has browsed to the sign-up page
    When the user sign-up with valid email and password using webUI
    Then the message "Registration Successful" should pop-up