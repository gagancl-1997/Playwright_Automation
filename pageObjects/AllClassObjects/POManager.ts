import { Page } from 'playwright';
import { LoginPage } from '../Pages/1.CanvasLogin/CanvasLoginPage';
import { ReUsableMethods } from '../../src/util/ReUsableMethods';
import { DesignPLUSHeaderPage } from '../Pages/2.AddNewElement/DesignPLUSHeaderPage';
import { BannerTitlePage } from '../Pages/3.AddNewElementAndEditCurrentElement/1.GettingStarted/BannerTitlePage';
import { ButtonPage } from '../Pages/3.AddNewElementAndEditCurrentElement/2.BasicContent/ButtonPage';
//import { DesignPLUSIssuesCreationPage } from '../Pages/DesignPLUSIssuesCreationPage';

class PoManager {
  private page: Page;
  public loginPage: LoginPage;
  public reusableMethods: ReUsableMethods;
  public designPLUSHeaderPage:DesignPLUSHeaderPage;
  public bannerTitlePage:BannerTitlePage;
  public buttonPage:ButtonPage;
  // Issue Creation Page Object
  //public issueCreation: DesignPLUSIssuesCreationPage;

 

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.reusableMethods = new ReUsableMethods(page);
    this.designPLUSHeaderPage=new DesignPLUSHeaderPage(page);
    this.bannerTitlePage=new BannerTitlePage(page);
    this.buttonPage=new ButtonPage(page);
    //this.issueCreation = new DesignPLUSIssuesCreationPage(page);

  
    

  }
}

export { PoManager };