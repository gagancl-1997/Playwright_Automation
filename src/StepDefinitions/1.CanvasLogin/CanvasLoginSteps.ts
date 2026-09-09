import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

import testData = require('../../../resources/CommonTestData.json');
import fs = require('fs');
import path = require('path');
import dotenv from 'dotenv';

if(!process.env.CI) {
  dotenv.config();
}


Given('user browse the cidilabs canvas url', async function () {
  await this.page.goto(process.env.BETA_URL);
  //await this.page.goto(this.testData.Url);
});

// When('enter valid {string} in login page', { timeout: 120 * 1000 }, async function (value: string) {
//   let isUserFound = false;

//   for (const user of this.testData.Users) {
//     if (user.UserKey === "validUser") {
//       //  console.log('Valid user:', value);
//       await this.reusable.fillInTextBox(this.login[value], user[value]);
//       isUserFound = true;
//       break;
//     }
//   }
//   if (!isUserFound) {
//     console.error(` Login failed: User validUser not found in test data.`);
//     throw new Error(` Login failed: User validUser not found in test data.`);
//   }
// });

When('enter valid {string} in login page', { timeout: 120 * 1000 }, async function (value: string) {
  let username = process.env.BETA_USERNAME;
  let password = process.env.BETA_PASSWORD;
  if (!username || !password) {
    console.error('Login failed: VALID_USER credentials not found in environment variables.');
    throw new Error('Login failed: VALID_USER credentials not found in environment variables.');
  }
  if (value.toLowerCase() === 'username') {
    await this.reusable.fillInTextBox(this.login[value], username);
  } else if (value.toLowerCase() === 'password') {
    await this.reusable.fillInTextBox(this.login[value], password);
  } else {
    throw new Error(`Login failed: Unknown field "${value}"`);
  }
});

When('enter Invalid {string} in login page', async function (value: string) {
  let isUserFound = false;
  for (const user of this.testData.Users) {
    if (user.UserKey === "invalidUser") {
      //  console.log('Valid user:', value);
      await this.reusable.fillInTextBox(this.login[value], user[value]);
      isUserFound = true;
      break;
    }
  }

  if (!isUserFound) {
    console.error(` Login failed: User validUser not found in test data.`);
    throw new Error(` Login failed: User validUser not found in test data.`);
  }
});

When('click on {string} button in login page', async function (buttonName: string) {
  await this.reusable.click(this.login[buttonName]);
});

//02-07-2025

Then('the click on the Settings link', async function () {
  if (!this.reusable) {
    throw new Error('❌ "reusable" is not initialized in the test context.');
  }
  if (!this.po || !this.po.loginPage || !this.po.loginPage.Settings) {
    throw new Error('❌ "po.loginPage.Settings" is not initialized in the test context.');
  }
  await this.reusable.click(this.po.loginPage.Settings);
});

When('the click on the Navigation link', async function () {
  // Wait for the navigation tab to be visible (your locator)
  await this.po.loginPage.navitation.waitFor({ state: 'visible', timeout: 10000 });
  // Optionally, you can click it if it's clickable (uncomment if needed)
  await this.reusable.click(this.po.loginPage.Settings);
  await this.po.loginPage.navitation.click();
});

When('user ensures {string} is in the Home navigation list', async function (itemName: string) {
  // Dynamic locator for the Home navigation list item
  const itemLocator = this.page.locator(`(//div[contains(text(),'Home')]/../..//div[contains(text(),'${itemName}')])[1]`);

  // Check if the item is visible in Home
  if (await itemLocator.isVisible()) {
    console.log(`✅ "${itemName}" is already in the Home navigation list.`);
  } else {
    // Try to find in Hidden navigation (adjust the XPath as needed)
    const hiddenLocator = this.page.locator(`//div[contains(text(),'Hidden')]/../..//div[contains(text(),'${itemName}')]`);
    if (await hiddenLocator.isVisible()) {
      // Drag and drop logic (implement as needed)
      await hiddenLocator.dragTo(itemLocator);
      console.log(`🔄 "${itemName}" was dragged to the Home navigation list.`);
    } else {
      throw new Error(`❌ "${itemName}" not found in either navigation list.`);
    }
  }
});

Then('{string} should be present in the Home navigation list', async function (itemName: string) {
  const navPage = this.navigationPage;
  expect(await navPage.isItemInHome(itemName)).toBeTruthy();
});

Then('the user should be redirected to the {string} page', async function (expectedPage: string) {
  await this.page.waitForTimeout(8000);
  await this.reusable.titleValidation(expectedPage);
});

Then('an error message {string} should be displayed', async function (expectedMessage: string) {
  await this.reusable.IsValueDisplayed(this.login.ErrorMessage, expectedMessage);
});

Then('the login page should be displayed in the correct viewport', async function () {
  const viewport = await this.page.viewportSize();
  const browserType = process.env.BROWSER || 'chromium';

  if (browserType.toLowerCase() === 'chromium') {
    // For chromium, we expect maximized window
    expect(viewport).toBeTruthy();
  } else {
    // For other browsers, we expect specific viewport
    expect(viewport?.width).toBe(1440);
    expect(viewport?.height).toBe(694);
  }
});

When('user clicks on {string} button without entering credentials', async function (buttonText: string) {
  const loginPage = await this.po.getLoginPage();
  await loginPage.clickLoginButton();
});

Then('validation message {string} should be displayed', async function (message: string) {
  const loginPage = await this.po.getLoginPage();
  const errorMessage = await loginPage.getErrorMessage();
  await expect(errorMessage).toContain(message);
});

When('user enters invalid email format in {string} field', async function (fieldName: string) {
  const loginPage = await this.po.getLoginPage();
  await loginPage.enterUsername('invalidemail');
});

When('user enters password less than minimum length in {string} field', async function (fieldName: string) {
  const loginPage = await this.po.getLoginPage();
  await loginPage.enterPassword('short');
});

Then('user navigates to a course from the Dashboard', async function () {
  await this.po.loginPage.getCourseByName(this.testData.Courses.CanvasCourse).click();
  await this.page.waitForTimeout(4000);
});

Then('the corresponding course page should open', async function () {
  await this.reusable.titleValidation(this.testData.Courses.CanvasCourse)
});

Then('user navigates to a "Reports Testing Course" from the Dashboard', async function () {
  await this.po.loginPage.getCourseByName(this.testData.Courses.ReportsCanvasCourse).click();
  await this.page.waitForTimeout(4000);
});

Then('the corresponding "Reports Testing Course" page should open', async function () {
  await this.reusable.titleValidation(this.testData.Courses.ReportsCanvasCourse)
});

When('user click on the "Pages" link in the Canvas course left navigation bar', async function () {
    await this.reusable.click(this.po.loginPage.pageLink);
    await this.page.waitForTimeout(2000);
});

When('user click on the "Page Creation" button',{timeout: 30000}, async function () {
    await this.po.loginPage.addPageButton.waitFor({ state: 'visible', timeout: 20000 });
    const addPageBtn = this.po.loginPage.addPageButton;
    await addPageBtn.waitFor({ state: 'visible', timeout: 2000 });
    const visible = await addPageBtn.isVisible();
    console.log('Add Page button visible:', visible);
    await this.reusable.click(addPageBtn);
    await this.page.waitForTimeout(2000);
    const noButton = this.po.loginPage.noButton;
    if (await noButton.isVisible().catch(() => false)) {
        await this.reusable.click(noButton);
        console.log('Clicked noButton after page creation.');
    }
    await this.page.waitForTimeout(3000);
});

When('user Launches the DesignPLUS from Canvas course page', async function () {
  await this.page.waitForTimeout(2000);

  const btn = this.po.loginPage.designPlusButton;
  const logo = this.po.loginPage.designPlusLogo;
  const moreBtn = this.po.loginPage.moreOptionsButton;
  const dpOpen = this.po.loginPage.dpSidebarOpen;

  // Wait for page load state before checking logo
  await this.page.waitForTimeout(3000);
  await this.page.waitForLoadState('domcontentloaded');

  // Check if DesignPLUS is open
    const isdpOpenVisible = await dpOpen.isVisible().catch(() => false);
    if (isdpOpenVisible) {
    console.log('DesignPLUS Sidebar is already open');
  } 
  else {
    // Logo not visible, check if DesignPLUS button is visible
    console.log('DesignPLUS Sidebar is not present');
    const isBtnVisible = await btn.isVisible().catch(() => false);
    if (isBtnVisible) {
      console.log('DesignPLUS button is visible, clicking it directly.');
      await this.reusable.click(btn);
    } else {
      // Button not visible, use keyboard shortcut to open DesignPLUS tool
      console.log('DesignPLUS button not visible – using shortcut to enable it.');
      await this.page.keyboard.down('Alt');
      await this.page.keyboard.down('Shift');
      await this.page.keyboard.press('KeyD');
      await this.page.keyboard.up('Shift');
      await this.page.keyboard.up('Alt');

      // Wait for button to appear and click it
      await btn.waitFor({ state: 'visible', timeout: 15000 });
    }
    // Wait for sidebar to load
    await this.page.waitForTimeout(2000);
  }

  // Check and close notification center if visible
  const notificationCloseBtn = this.page.locator("//button[@class='float-end footer-button open' and @id='toggleNotificationVisibility']");
  const isNotificationVisible = await notificationCloseBtn.isVisible().catch(() => false);
  if (isNotificationVisible) {
    await this.reusable.click(notificationCloseBtn);
    console.log('Closed notification center.');
    await this.page.waitForTimeout(2000);
  } else {
    console.log('No notification center to close.');
  }
});

When('user clicks on "More options" button in DesignPLUS header', async function () {
  const moreBtn = this.po.loginPage.moreOptionsButton;
  const dropdownMenu = this.page.locator('//ul[@class="dropdown-menu show"]');

  // Check if dropdown is already open
  const isDropdownVisible = await dropdownMenu.isVisible().catch(() => false);

  if (isDropdownVisible) {
    console.log('"More Options" dropdown is already open — no need to click.');
  } else {
    console.log('"More Options" dropdown not open — clicking button.');
    await moreBtn.scrollIntoViewIfNeeded();
    await this.reusable.click(moreBtn);
  }
});

Then('user clicks on {string} option in More options button', async function (option: string) {
    const optionLocator = this.page.locator(`//ul[@class="dropdown-menu show"]//a[text()='${option}']`);
    await optionLocator.click();
    console.log(`Clicked on option: ${option}`);
});

Then('"Automatically Launch Sidebar" checkbox should be checked in User Settings', async function () {
  const isChecked = await this.po.loginPage.autoLaunchSidebarChecked.isVisible().catch(() => false);
  if (isChecked) {
    console.log('✅ "Automatically Launch Sidebar" checkbox is checked.');
  } else {
    await this.po.loginPage.autoLaunchSidebarUnchecked.click();
    console.log('🔄 "Automatically Launch Sidebar" checkbox was unchecked. Now checked it.');
  }
});

Then('user closes the User Settings modal', async function () {
  await this.reusable.click(this.po.loginPage.userSettingsClose);
  console.log('Closed User Settings modal.');
});
