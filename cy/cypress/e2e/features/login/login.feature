@test
Feature: Test
  Check Check

  Scenario: 1) Add Employee
    Given an Employer
    And I am on the Benefits Dashboard page
    When I select Add Employee
    Then I should be able to enter employee details
    And the employee should save
    And I should see the employee in the table
    And the benefit cost calculations are correct


  Scenario: 2) Edit Employee
    Given an Employer
    And I am on the Benefits Dashboard page
    When I select the Action Edit
    Then I can edit employee details
    And the data should change in the table


  Scenario: 3) Delete Employee
    Given an Employer
    And I am on the Benefits Dashboard page
    When I click the Action X
    Then the employee should be deleted


  Scenario: 4) Add Employee API
    When Pushing Employee from API
    Then the employee should save


  Scenario: 5) Edit Employee API
    When Updating Employee from API
    Then the data should change in the table


  Scenario: 6) Delete Employee API
    When Removing Employee from API
    Then the employee should be deleted