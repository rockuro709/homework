@productTests
Feature: Product

  Scenario Outline: Validate name and price consistency for products
    When I open the product page with ID <testDataIdProductIndex> from home page
    Then the name and the price should match the product card

    Examples:
      | testDataIdProductIndex |
      | 0                      |
      | 1                      |

  Scenario: Submit a product review
    When I submit a review for the product
    Then I should see an alert of successful review submission
