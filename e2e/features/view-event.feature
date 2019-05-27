Feature: Viewing an event

  Scenario: A friend who sent me a URL wants me to check the event
    Given I have a URL my friend sent to me for an event
    When I visit that URL
    Then I see the event name
