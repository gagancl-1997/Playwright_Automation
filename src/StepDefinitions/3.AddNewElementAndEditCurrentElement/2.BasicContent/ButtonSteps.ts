import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';


Then('the following {string} should be visible under {string} section:', async function (type: string, sectionName: string, dataTable) {
  const toolNames = dataTable.raw().flat(); // Extract tool names from table
  for (const toolName of toolNames) {
    const toolLocator = this.po.bannerTitlePage.toolButton(sectionName, toolName);
    const isVisible = await toolLocator.isVisible().catch(() => false);
    expect(isVisible).toBeTruthy();
    console.log(`✅ "${toolName}" is visible under "${sectionName}" section`);
  }
});

Then('"Button" tool should be created in the "Rich Content Editor" frame', async function () {
  await expect(this.po.buttonPage.button).toBeVisible();
  console.log('✅ "Button" tool is successfully created in the "Rich Content Editor" frame');
});

Then('user clciks on the "Info" icon in the "Button" editing tab', async function () {
  await this.po.reusableMethods.click(this.po.buttonPage.buttonInfoIcon);
  console.log('✅ Clicked on the "Info" icon in the "Button" editing tab');
});

Then('validate the available text in "Button Help" pop-up', async function () {
  await this.po.reusableMethods.isVisible(this.po.buttonPage.infoText);
  console.log('The info text is:', await this.po.buttonPage.infoText.textContent());
});

Then('verify the "User Guide: Buttons" link in the "Button Help" pop-up', async function () {
  const userGuideLink = this.po.buttonPage.userGuideButtonLink;
  const [newPage] = await Promise.all([
    this.page.context().waitForEvent('page'),
    userGuideLink.click()
  ]);
  await newPage.waitForLoadState('domcontentloaded');
  const pageTitle = await newPage.title();
  expect(pageTitle).toBe('Links and Buttons: [New] DesignPLUS User Guide');
  console.log(`✅ Verified new tab title: ${pageTitle}`);
  await newPage.close();
});




