import { Page, Locator, expect, FrameLocator } from '@playwright/test';
import { ReUsableMethods } from '../../../../src/util/ReUsableMethods';


class BannerTitlePage {
    private page:Page;
    private bannerTitileToolButton:Locator;
    private richContentEditorFrame:FrameLocator;
    private bannerTitleFrame:Locator;
    private walkthroughIcon:Locator;
    private favoriteIcon:Locator;
    private infoIcon:Locator;

    constructor(page: Page){
        this.page = page;
        //this.bannerTitileToolButton = this.page.locator("(//strong[text()='Getting Started']/../following-sibling::div)[1]/button//span[text()='Banner Title']");
        this.richContentEditorFrame=this.page.frameLocator("//iframe[@id='wiki_page_body_ifr']");
        this.bannerTitleFrame=this.richContentEditorFrame.locator("//body//header[@class='dp-header']/h2//span[text()='Name ']");
        this.walkthroughIcon=this.page.locator("//a[@aria-label='Walkthrough']");
        this.favoriteIcon=this.page.locator("//a[@aria-label='Favorite Banner Title Tool']");
        this.infoIcon=this.page.locator("//a[@aria-label='Banner Title Help']");

    }
    toolButton(categoryName:String, toolName: string): Locator {
    return this.page.locator(`(//*[.//text()='${categoryName}']/following-sibling::div)[1]/button//span[text()='${toolName}']`);
    }

    editerToolName(editingTool: string): Locator {
    return this.page.locator(`//h3[contains(normalize-space(.), '${editingTool}')]`);
    }

     panelName(panel: string): Locator {
    return this.page.locator(`//h4/span[text()='${panel}']`);
    }
}

export{BannerTitlePage}