Feature: DesignPLUS - Add New Elements Page Functionality

  @bvt
  Scenario: Validating the avilable categories in the Add New Elements Page
    Given click on the "Add New Elements" button in DesignPLUS header
    #Then the "Add New Elements" page should open
    When user verify the available categories in the Add New Elements page

      | Favorite Tools      |
      | Getting Started     |
      | Basic Content       |
      | Navigation          |
      | Page Layout         |
      | Interactive         |
      | Visual Enhancements |
      | Themed Elements     |
      | Custom Content      |
      | Page Information    |
      | Course Information  |
      | Media               |
      | Editor Action Items |

