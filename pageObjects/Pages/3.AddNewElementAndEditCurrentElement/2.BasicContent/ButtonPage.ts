import { Page, Locator, expect, FrameLocator } from '@playwright/test';
import { ReUsableMethods } from '../../../../src/util/ReUsableMethods';


class ButtonPage {
    private page:Page;
    private richContentEditorFrame:FrameLocator;
    private button:Locator;
    private buttonWalkthroughIcon:Locator;
    private buttonFavoriteIcon:Locator;
    private buttonInfoIcon:Locator;
    private infoText:Locator;
    private userGuideButtonLink:Locator;


    constructor(page: Page){
        this.page = page;
        this.richContentEditorFrame=this.page.frameLocator("//iframe[@id='wiki_page_body_ifr']");
        this.button=this.richContentEditorFrame.locator("//body//a[@class='btn btn-outline-primary']");
        this.buttonWalkthroughIcon=this.page.locator("//a[@aria-label='Walkthrough']");
        this.buttonFavoriteIcon=this.page.locator("//a[@aria-label='Favorite Button Tool']");
        this.buttonInfoIcon=this.page.locator("//a[@aria-label='Button Help']");
        this.infoText=this.page.locator("//li[contains(text(), 'Insert and edit')]/..");
        this.userGuideButtonLink=this.page.locator("//a[contains(text(),'User Guide: Buttons')]");


    }


}

export{ButtonPage}