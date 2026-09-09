import { Page, Locator, expect } from '@playwright/test';
import { ReUsableMethods } from '../../../src/util/ReUsableMethods';

class DesignPLUSHeaderPage {
    private page: Page;
    private addNewElementsButton:Locator;
    private addNewElementsButtonHeader:Locator;

    constructor(page: Page) {
    this.page = page;
    this.addNewElementsButton=page.locator("//button[@data-tippy-content='Add New Elements']/span/i");
    this.addNewElementsButtonHeader=page.locator("//h3[@class='sidebar-heading add-elements-heading section-heading']");
    }

         toolsCategoriesName(categoriesName: string): Locator {
    return this.page.locator(`//h4[.//text()='${categoriesName}']`);
  }
}
export { DesignPLUSHeaderPage };