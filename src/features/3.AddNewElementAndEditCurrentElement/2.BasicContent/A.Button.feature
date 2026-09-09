Feature: DesignPLUS – "Button" Tool Functionality

  @bvt
  Scenario: Validate available tools in "Basic Content" Section
    Given click on the "Add New Elements" button in DesignPLUS header
    Then the following "tools" should be visible under "Basic Content" section:
      | Button              |
      | Course Links        |
      | Description List    |
      | Divider             |
      | Image               |
      | Image & Caption     |
      | Link                |
      | List: Ordered       |
      | List: Unordered     |
      | Table               |
      | Text                |
      | Text Highlight      |

  @bvt
  Scenario: Validating the "Button" tool functionality
    Given click on the "Add New Elements" button in DesignPLUS header
    When user click on the "Button" tool under the "Basic Content" category in the "Add New Elements" tab
    Then the "Button" editing tab should open in the DesignPLUS sidebar
    Then following panel should be visible in the "Banner Title" editing tab
      | Content      |
      | Style        |
      | Quick Styles |
      | Advanced     |
      | Preview      |
    Then "Button" tool should be created in the "Rich Content Editor" frame

  @bvt
  Scenario: Validating functionality of "Info" icon and "User Guide: Buttons" link under the "Button" tool
    Given the "Button" editing tab should open in the DesignPLUS sidebar
    Then user clciks on the "Info" icon in the "Button" editing tab
    Then validate the available text in "Button Help" pop-up
    Then verify the "User Guide: Buttons" link in the "Button Help" pop-up
