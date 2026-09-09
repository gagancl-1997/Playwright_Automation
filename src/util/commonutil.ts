import { setWorldConstructor, IWorldOptions, IWorld } from '@cucumber/cucumber';
import { LoginPage } from '../../pageObjects/Pages/1.CanvasLogin/CanvasLoginPage';
import { getTestData } from './Environment-utils';
import { page } from './hooks';
import fs from 'fs';
import path from 'path';

const testData = getTestData();

interface CustomWorldOptions extends IWorldOptions {
  /** Function to create a link attachment (Cucumber v9+) */
  link: IWorld['link'];
}

class CustomWorld implements IWorld {
  attach: IWorld['attach'];
  log: IWorld['log'];
  parameters: IWorld['parameters'];
  link: IWorld['link']; // ✅ Required in Cucumber v9+

  testData: typeof testData;
  login?: LoginPage;

  constructor(options: CustomWorldOptions) {
    this.attach = options.attach;
    this.log = options.log;
    this.parameters = options.parameters;
    this.link = options.link; // ✅ Assign link

    this.testData = testData;

    if (page) {
      this.login = new LoginPage(page);
    } else {
      console.warn('⚠️ Page instance is undefined—LoginPage will not be initialized.');
    }
  }

  

  async captureScreenshot(testName: string): Promise<string | undefined> {
    try {
      const currentDateTime = new Date();
      const timestamp = `${currentDateTime.getFullYear()}-${String(currentDateTime.getMonth() + 1).padStart(2, '0')}-${String(currentDateTime.getDate()).padStart(2, '0')}_${String(currentDateTime.getHours()).padStart(2, '0')}-${String(currentDateTime.getMinutes()).padStart(2, '0')}-${String(currentDateTime.getSeconds()).padStart(2, '0')}`;

      const screenshotDir = path.resolve('./report/screenshot');
      if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir, { recursive: true });
      }

      const fileSafeName = testName.replace(/[^a-zA-Z0-9-_]/g, '_');
      const screenshotPath = path.join(screenshotDir, `${fileSafeName}_${timestamp}.png`);

      await page.screenshot({ path: screenshotPath });

      const imageBuffer = fs.readFileSync(screenshotPath);
      await this.attach(imageBuffer, 'image/png');

      return screenshotPath;
    } catch (error) {
      console.error('❌ Failed to capture screenshot:', error);
    }
  }
}

setWorldConstructor(CustomWorld);
