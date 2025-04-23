Feature: SignUp functionality
  As a user
  I want to signUp new account
  So that I can access waiver

  Scenario: user signup
    Given the user has browsed to the sign-up page
    When the user sign-up with valid email and password using webUI
      | firstName   | Amrita             |
      | lastName    | Shrestha           |
      | email       | aby                |
      | phone       | +977 9865236153    |
      | password    | amrita@21o3Snt?n/m |
      | companyName | xyz                |
    Then the message "Registration Successful" should pop-up