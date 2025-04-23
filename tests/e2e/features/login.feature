Feature: Login functionality
  As a user
  I want to login into my account
  So that I can manage my waiver

  Scenario: user logs in successfully with valid credentials
    Given the user has browsed to the sign-up page
    And the user had sign-up with valid email and password using webUI
      | firstName   | Amrita             |
      | lastName    | Shrestha           |
      | email       | aby                |
      | phone       | +977 9865236153    |
      | password    | amrita@21o3Snt?n/m |
      | companyName | xyz                |
    And the user has browsed to the login page
    When the user logs in with email "aby" and password "amrita@21o3Snt?n/m"
    Then the message "User Logged In" should pop-up

  Scenario: user tries to logs in with invalid valid credentials
    Given the user has browsed to the sign-up page
    And the user had sign-up with valid email and password using webUI
      | firstName   | Amrita             |
      | lastName    | Shrestha           |
      | email       | aby                |
      | phone       | +977 9865236153    |
      | password    | amrita@21o3Snt?n/m |
      | companyName | xyz                |
    And the user has browsed to the login page
    When the user tries to log in with email "failure" and password "amrita@21o3Snt?n/m"
    Then the warning message "Please enter a valid email" should pop-up

  # this scenario will fail and generate report-tracing and video for debugging purpose
  Scenario: user tries to logs in with invalid valid credentials (intentionally failed scenario)
    Given the user has browsed to the sign-up page
    And the user had sign-up with valid email and password using webUI
      | firstName   | Amrita             |
      | lastName    | Shrestha           |
      | email       | aby                |
      | phone       | +977 9865236153    |
      | password    | amrita@21o3Snt?n/m |
      | companyName | xyz                |
    And the user has browsed to the login page
    When the user logs in with email "failure" and password "amrita@21o3Snt?n/m"
    Then the message "User Logged In" should pop-up