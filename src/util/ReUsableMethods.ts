import { Page, Locator, expect } from '@playwright/test';
import { clear } from 'console';

class ReUsableMethods {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Clicks on the specified web element (button or similar).
   * Handles errors if the element is not interactable or fails to click.
   * Includes retry logic for browser context issues.
   * 
   * @param element - The Playwright Locator object representing the element to click.
   */
  async click(element: Locator, retries: number = 2) {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        // Check if page is valid before attempting to click
        const isPageValid = await this.ensurePageIsValid();
        if (!isPageValid) {
          throw new Error('Page/context is closed and cannot be recovered');
        }
        
        await element.click();
        return; // Success, exit the method
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`Error clicking on element (attempt ${attempt}/${retries}):`, errorMessage);
        
        // Check if it's a browser context issue
        if (errorMessage.includes('Target page, context or browser has been closed') || 
            errorMessage.includes('Page/context is closed and cannot be recovered')) {
          if (attempt < retries) {
            console.log(`Browser context closed, waiting before retry ${attempt + 1}...`);
            await this.page.waitForTimeout(2000); // Wait 2 seconds before retry
            continue;
          } else {
            console.error('Browser context closed and retries exhausted');
            throw new Error(`Browser context closed after ${retries} attempts: ${errorMessage}`);
          }
        }
        
        // For other errors, don't retry
        throw error;
      }
    }
  }

  /**
 * Validates the title of the current page by comparing it with the expected title.
 * Waits for the page to fully load before retrieving and asserting the title.
 * 
 * @param expectedTitle - The expected title of the page to validate against.

*/
 async titleValidation(expectedTitle: string, timeout: number = 50000): Promise<void> {
  await this.page.waitForLoadState('networkidle', { timeout });
  const start = Date.now();
  let actualTitle = await this.page.title();
  // Retry until timeout or title matches
  while (actualTitle !== expectedTitle && Date.now() - start < timeout) {
    await this.page.waitForTimeout(800); // Wait 0.5s before retry
    actualTitle = await this.page.title();
  }
  console.log('Actual title:', actualTitle);
  console.log('Expected title:', expectedTitle);
  expect(actualTitle).toBe(expectedTitle);
  console.log('Title validation successful.');
}

  /**
   * Fills in a text box with the specified value.
   * Handles errors if the element is not interactable or fails to fill.
   * 
   * @param element - The Playwright Locator object representing the text box to fill.
   * @param value - The value to fill into the text box.
   */
  async fillInTextBox(element: Locator, value: string): Promise<void> {
    try {
      await element.fill(value);
    } catch (error) {
      console.error('Error filling in text box:', error);
      throw error;
    }
  }

  /**
   * Retrieves a web element (Locator) from the provided element map using the specified name.
   * Throws an error if the element with the given name is not found in the map.
   * 
   * @param name - The key representing the name of the element to retrieve.
   * @param elementMap - An object mapping element names to their corresponding Playwright Locators.
   * @returns The Locator object corresponding to the specified name.
   * @throws Error if no element is found for the given name.
   */
  getElement(name: string, elementMap: { [key: string]: Locator }): Locator {
    const element = elementMap[name];
    if (!element) {
      throw new Error(`No element found for key: "${name}"`);
    }
    return element;
  }

  /**
* Clears the text content of the specified text box element.
* Uses the Playwright `fill` method to replace the text with an empty string.
* Logs an error and rethrows it if the operation fails.
* 
* @param element - The Playwright Locator representing the text box to be cleared.
* @returns A Promise that resolves when the text box is successfully cleared.
* @throws Error if an issue occurs while attempting to clear the text box.
*/
  async clearTextBox(element: Locator): Promise<void> {
    try {
      await element.fill(''); // Clear the text box by filling it with an empty string
    } catch (error) {
      console.error('Error clearing text box:', error);
      throw error;
    }

  }
  /**
* Selects an option from a dropdown menu using the provided Playwright Locator.
* Uses the `selectOption` method to choose the specified option.
* Logs the selected option to the console upon success.
* Logs an error and rethrows it if the operation fails.
* @param element - The Playwright Locator representing the dropdown menu.
* @param option - The value of the option to be selected from the dropdown.
* @returns A Promise that resolves when the option is successfully selected.
* @throws Error if an issue occurs while attempting to select the option.
*/
  async selectFromDropdown(element: Locator, option: string): Promise<void> {
    try {
      await element.selectOption(option);
      console.log(`Selected option: ${option}`);
    } catch (error) {
      console.error('Error selecting from dropdown:', error);
      throw error;
    }
  }
  /**
   * Checks if the specified element is visible on the page.
   * Uses the Playwright `isVisible` method to determine visibility.
   * Logs an error and rethrows it if the operation fails.
   * 
   * @param element - The Playwright Locator representing the element to check visibility.
   * @returns A Promise that resolves to a boolean indicating whether the element is visible.
   * @throws Error if an issue occurs while checking visibility.
   */
  async elementIsVisible(element: Locator): Promise<boolean> {
    try {
      return await element.isVisible();
    } catch (error) {
      console.error('Error checking element visibility:', error);
      throw error;
    }
  }

  /**
   * Checks if the specified element is disabled.
   * Uses the Playwright `isDisabled` method to determine if the element is disabled.
   * Logs an error and rethrows it if the operation fails.
   * 
   * @param element - The Playwright Locator representing the element to check disabled state.
   * @returns A Promise that resolves to a boolean indicating whether the element is disabled.
   * @throws Error if an issue occurs while checking the disabled state.
   */
  
  async elementIsDisabled(element: Locator): Promise<boolean> {
    try {
      return await element.isDisabled();
    } catch (error) {
      console.error('Error checking element disabled state:', error);
      throw error;
    }
  }


  /**
   * Waits for the specified element to become visible on the page.
   * Uses the Playwright `waitFor` method with a timeout to ensure the element is visible.
   * Logs an error and rethrows it if the operation fails.
   * 
   * @param element - The Playwright Locator representing the element to wait for visibility.
   * @param timeout - The maximum time to wait for the element to become visible (default is 5000 ms).
   * @returns A Promise that resolves when the element is visible or throws an error if it times out.
   */

  async waitForElementToBeVisible(element: Locator, timeout: number = 5000): Promise<void> {
    try {
      await element.waitFor({ state: 'visible', timeout });
    } catch (error) {
      console.error('Error waiting for element to be visible:', error);
      throw error;
    }
  }

  async scrollUntilVisible(
    page: Page,
    locator: Locator,
    maxScrolls: number = 10,
    scrollStep: number = 300
  ): Promise<void> {
    for (let i = 0; i < maxScrolls; i++) {
      console.log(`Scroll attempt ${i + 1}/${maxScrolls}`);
      if (await locator.isVisible()) return;
      await page.evaluate((step: number) => window.scrollBy(0, step), scrollStep);
      await page.waitForTimeout(1000);
      await page.mouse.move(100, 100);
    }
    throw new Error('Element not found after scrolling');
  }
  async IsValueDisplayed(element: Locator, Value: string) {
    try {
      await expect(element).toContainText(Value);
    } catch (error) {
      console.error('Error checking value is not displayed:', error);
      throw error;
    }
  }

  /**
   * Checks if the page/context is still valid and attempts recovery if needed
   * @returns Promise<boolean> - true if page is valid, false if recovery failed
   */
  async ensurePageIsValid(): Promise<boolean> {
    try {
      // Try to access the page title to check if page is still valid
      await this.page.title();
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (errorMessage.includes('Target page, context or browser has been closed')) {
        console.error('❌ Page/context is closed and cannot be recovered from ReUsableMethods');
        return false;
      }
      return true; // Other errors might be recoverable
    }
  }
}
export { ReUsableMethods };

































