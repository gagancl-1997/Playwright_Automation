import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';

import fs = require('fs');
import path = require('path');
import dotenv from 'dotenv';

if(!process.env.CI) {
  dotenv.config();
}


Given('click on the "Add New Elements" button in DesignPLUS header', async function () {
await this.page.waitForTimeout(3000);
const headerVisible = await this.po.designPLUSHeaderPage.addNewElementsButtonHeader.isVisible({timeout: 10000 });

if (!headerVisible) {
  await this.po.designPLUSHeaderPage.addNewElementsButton.click();
  await this.po.designPLUSHeaderPage.addNewElementsButtonHeader.waitFor({ state: 'visible', timeout: 10000 });
  console.log('"Add New Elements" header is now visible after clicking.');
} else {
  console.log('"Add New Elements" header is already visible, no need to click.');
}

});


Then('the "Add New Elements" page should open', async function () {
  // Verify page heading or title
  const heading = await this.po.designPLUSHeaderPage.addNewElementsButtonHeader;
  await expect(heading).toBeVisible();
});

When('user verify the available categories in the Add New Elements page', async function (dataTable) {
  // Extract expected categories from the feature file table
  const expectedCategories: string[] = dataTable.raw().map(row => row[0]);

  for (const category of expectedCategories) {
    const element = this.po.designPLUSHeaderPage.toolsCategoriesName(category);
    await expect(element).toBeVisible();
  }
});
