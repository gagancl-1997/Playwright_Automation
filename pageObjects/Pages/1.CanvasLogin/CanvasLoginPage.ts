import { Page, Locator, expect } from '@playwright/test';
import { ReUsableMethods } from '../../../src/util/ReUsableMethods';


class LoginPage {
  private page: Page;
  private Username: Locator;
  private Password: Locator;
  private LogIn: Locator;
  private ErrorMessage: Locator;
  private mycourse: Locator;
  private Settings: Locator; 
  private navitation: Locator; 
  readonly homeList: Locator;
  readonly hiddenList: Locator;
  readonly saveButton: Locator;

  //admin
  private canvasPage:Locator;
  private adminModule:Locator;
  private accountLink:Locator;
  private dashBoardModule:Locator;
  private pageLink:Locator;
  private noButton:Locator;
  private addPageButton:Locator;
  private designPlusButton:Locator;
  private designPlusLogo:Locator;
  private moreOptionsButton:Locator;
  private autoLaunchSidebarChecked:Locator;
  private autoLaunchSidebarUnchecked:Locator;
  private dpSidebarOpen:Locator;
  private userSettingsClose:Locator;

  constructor(page: Page) {
    this.page = page;
    this.Username = page.locator('#pseudonym_session_unique_id');
    this.Password = page.locator('#pseudonym_session_password');
    this.LogIn = page.getByRole('button', { name: 'Log In' });
    this.ErrorMessage = page.locator("div[class='ic-flash-error flash-message-container']").first();
    this.mycourse = this.page.locator("//div[@class='ic-DashboardCard__header_hero']")

    //validate in settings page // Girish wright
   this.Settings = this.page.locator("//a[@id='settings-link']")
   this.navitation = this.page.locator("//*[@id='tab-navigation']")

    this.homeList = page.locator('div[aria-label="Course Navigation"] ul').first();
    // Bottom list (hidden from students)
    this.hiddenList = page.locator('div[aria-label="Course Navigation"] ul').nth(1);
    this.saveButton = page.locator('button', { hasText: 'Save' });

    //admin
    this.canvasPage=page.locator("#header");
    this.adminModule=page.locator("#global_nav_accounts_link");
    this.accountLink=page.getByText("QA Beta - Automated Testing Team");
    this.dashBoardModule=page.locator("//a[@id='global_nav_dashboard_link']");
    this.pageLink = this.page.locator("#pages-link");
    this.noButton = this.page.locator("//button/span/span[contains(text(), 'No')]");
    this.addPageButton = this.page.locator("//div[@class='header-bar']//a[contains(text(),'Page')]");
    this.designPlusButton = this.page.locator("#dp-launch-button");
    this.designPlusLogo = this.page.locator("img[alt='Design Plus by Cidi Labs']");
    this.moreOptionsButton=page.locator("//button[@data-tippy-content='More options']/span/i");
    this.autoLaunchSidebarChecked=page.locator("//input[@id='autoLaunchCheckbox' and @checked='checked']");
    this.autoLaunchSidebarUnchecked=page.locator("//label[normalize-space(text())='Automatically Launch Sidebar']/preceding-sibling::input[@id='autoLaunchCheckbox']");
    this.dpSidebarOpen=page.locator("//body[contains(@class, 'dp-toolbar-open')]");
    this.userSettingsClose = this.page.locator("#settingsModalClose");

   
  }
  // Method to navigate to the course settings page

async isItemInHome(itemName: string): Promise<boolean> {
    return await this.homeList.locator(`li:has-text("${itemName}")`).count() > 0;
  }

  async isItemInHidden(itemName: string): Promise<boolean> {
    return await this.hiddenList.locator(`li:has-text("${itemName}")`).count() > 0;
  }

  async dragItemToHome(itemName: string) {
    const item = this.hiddenList.locator(`li:has-text("${itemName}")`);
    const target = this.homeList.locator('li').last();
    await item.dragTo(target);
    await this.saveButton.click();
  }

  async getUsernameField() {
    return this.Username;
  }

  async getPasswordField() {
    return this.Password;
  }

  async getLoginButton() {
    return this.LogIn;
  }

  async getErrorMessage() {
    return this.ErrorMessage;
  }

  async enterUsername(username: string) {
    await this.Username.fill(username);
  }

  async enterPassword(password: string) {
    await this.Password.fill(password);
  }

  async clickLoginButton() {
    await this.LogIn.click();
  }

  getCourseByName(courseName: string): Locator {
    return this.page.locator(`//h3/span[text()='${courseName}']`);
  }
}

export { LoginPage };