Feature: Adding a new event

  Scenario: Add a new event
    Given I want to add a new event
    When I create an event by providing a name
    Then I am provided a permalink for my event which I can share with friends
