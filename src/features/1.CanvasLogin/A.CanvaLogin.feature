Feature: DesignPLUS - Canvas Login and Dashboard Page Functionality

  @bvt
  Scenario: User logs in with invalid credentials
    Given user browse the cidilabs canvas url
    And enter Invalid "Username" in login page
    And enter Invalid "Password" in login page
    And click on "LogIn" button in login page
    Then an error message "Please verify your username or password and try again. Trouble logging in? " should be displayed

  @bvt @regression_suite1 @regression_suite2 @regression_suite3
  Scenario: User logs in with valid credentials
    Given user browse the cidilabs canvas url
    And enter valid "Username" in login page
    And enter valid "Password" in login page
    And click on "LogIn" button in login page
    Then the user should be redirected to the "Dashboard" page

  @bvt @regression_suite1 @regression_suite2 @regression_suite3
  Scenario: Ensure course page opens and navigate to Pages to create a pages
    Given user navigates to a course from the Dashboard
    Then the corresponding course page should open
    When user click on the "Pages" link in the Canvas course left navigation bar
    And user click on the "Page Creation" button

  @bvt @regression_suite1 @regression_suite2 @regression_suite3
  Scenario: Launch DesignPLUS from Canvas course page
    Then user Launches the DesignPLUS from Canvas course page

  @bvt @regression_suite1 @regression_suite2 @regression_suite3
  Scenario: Validate if Automatically Launch Sidebar is checked
    Then user clicks on "More options" button in DesignPLUS header
    Then user clicks on "User Settings" option in More options button
    Then "Automatically Launch Sidebar" checkbox should be checked in User Settings
    Then user closes the User Settings modal