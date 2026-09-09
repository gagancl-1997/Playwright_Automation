import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
// const issueData = require('../../resources/assets/HTML/EmbeddedMedia.json');
import fs = require('fs');
import path = require('path');

When('user click on the {string} tool under the {string} category in the "Add New Elements" tab', async function (toolName:String,categoryName:string) {
  await this.po.bannerTitlePage.toolButton(categoryName,toolName).click();
});

Then('the {string} editing tab should open in the DesignPLUS sidebar', async function (toolName:String) {
  await expect(this.po.bannerTitlePage.editerToolName(toolName)).toBeVisible();
});

Then('following panel should be visible in the "Banner Title" editing tab', async function (dataTable) {
  const expectedPanels: string[] = dataTable.raw().map(row => row[0]);

  for (const panel of expectedPanels) {
    const panelLocator = this.po.bannerTitlePage.panelName(panel);
    await expect(panelLocator).toBeVisible();
  }
});

Then('"Banner Title" should be open in the "Rich Content Editor" frame', async function () {
  await expect(this.po.bannerTitlePage.bannerTitleFrame).toBeVisible();
});

Then('validate the visibility of the "Walkthrough", "Favorite", and "Info" icons under the "Banner Title" editing tab',async function () {
    // Locators for the icons under Banner Title editing tab
    const walkthroughIcon = this.po.bannerTitlePage.walkthroughIcon;
    const favoriteIcon = this.po.bannerTitlePage.favoriteIcon;
    const infoIcon = this.po.bannerTitlePage.infoIcon;
    // Assertions
    await expect(walkthroughIcon).toBeVisible();
    await expect(favoriteIcon).toBeVisible();
    await expect(infoIcon).toBeVisible();

  }
);
