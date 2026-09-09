import {  BeforeAll,  Before,  AfterAll,  After,  AfterStep,  setDefaultTimeout, BeforeStep,} from '@cucumber/cucumber';
import {  chromium,firefox,webkit, Browser,BrowserContext,Page,} from 'playwright';
import { PoManager } from '../../pageObjects/AllClassObjects/POManager';
import { exec } from 'child_process';
import { getTestData } from './Environment-utils';
import fs from 'fs';
import path from 'path';
import { defaultTimeout } from './constants';

const testData = getTestData();

export let page: Page;
let browser: Browser;


let context: BrowserContext;
// --- Add at the top ---
let logBuffer = '';

const originalLog = console.log;
const originalWarn = console.warn;
const originalError = console.error;

console.log = (...args: any[]) => {
  logBuffer += args.join(' ') + '\n';
  originalLog(...args);
};
console.warn = (...args: any[]) => {
  logBuffer += '[WARN] ' + args.join(' ') + '\n';
  originalWarn(...args);
};
console.error = (...args: any[]) => {
  logBuffer += '[ERROR] ' + args.join(' ') + '\n';
  originalError(...args);
};

setDefaultTimeout(defaultTimeout);

const browserType = process.env.BROWSER || 'chromium';


BeforeAll(async function () {
  console.log(`🟢 BeforeAll: Launching browser: ${browserType}`);

  switch (browserType.toLowerCase()) {
    case 'firefox':
      browser = await firefox.launch({ headless: true });
      context = await browser.newContext({
        viewport: { width: 1440, height: 694 },
      });
      break;

    case 'webkit':
      browser = await webkit.launch({ headless: true });
      context = await browser.newContext({
        viewport: { width: 1440, height: 694 },
      });
      break;

      case 'chromium':  
    default:
      browser = await chromium.launch({
        headless: false ,
        args: [
          '--start-maximized',
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu',
          '--disable-web-security',
          '--disable-features=VizDisplayCompositor',
          '--memory-pressure-off',
        ],
      });
      context = await browser.newContext({
        viewport: null,
      });
      break;
  }

  page = await context.newPage();
});

// BeforeStep(async function ({ result }) {
//   await page.waitForSelector('body');

//   const isReportsPage = await page.evaluate(() => {
//     const elements = document.querySelectorAll('span.css-1gcu026-item__label');
//     return Array.from(elements).some(el => el.textContent.includes('Reports'));
//   }).catch(() => false);

//   if (!isReportsPage) {
//     await page.setViewportSize({ width: 1300, height: 800 });

//     await page.addStyleTag({
//       content: `
//         /* Keep sidebar fixed */
//         .sidebar-class { position: fixed; left: 0; }

//         /* Center main content */
//         .main-content-class {
//           margin: 0 auto;
//           transform: scale(0.5);
//           transform-origin: top center;
//           width: 100%; /* Adjust as needed */
//         }
//       `
//     });

//     await page.waitForTimeout(300);
//   }
// });


Before(async function () {
  console.log('🔄 Before: Reusing existing browser context...');
  this.page = page;
  this.testData = testData;
  this.po = new PoManager(this.page);
  this.login = this.po.loginPage;
  this.reusable=this.po.reusableMethods;
});

AfterStep(async function ({ result }) {
  if (result?.status === 'FAILED' && this.page) {
    const screenshot = await this.page.screenshot({ type: 'png', fullPage: true });
    await this.attach(screenshot, 'image/png');
    console.log('📸 Screenshot for failed step attached');
  }
});

After(async function (scenario) {
  //console.log(`📌 Scenario "${scenario.pickle.name}" finished with status: ${scenario.result?.status}`);
    console.log(`📌 Scenario "${scenario.pickle.name}" finished with status: ${scenario.result?.status}`);

  // Attach error details if scenario failed
  if (scenario.result?.status === 'FAILED' && scenario.result?.exception) {
    const errorDetails =
      typeof scenario.result.exception === 'object'
        ? (scenario.result.exception as any)?.stack || (scenario.result.exception as any)?.message
        : scenario.result.exception;
    if (errorDetails) {
      await this.attach(`Error Details:\n${errorDetails}`, 'text/plain');
    }
  }
  // Attach logBuffer to the report
  if (logBuffer) {
    await this.attach(logBuffer, 'text/plain');
    logBuffer = ''; // Reset for next scenario
  }
});

AfterAll(async function () {
  await context.close();
  await browser.close();
  console.log('🔴 AfterAll: Closing browser session...');
  // console.log('📝 Generating HTML and JSON reports...');
  exec('npm run generate-report', (error, stdout, stderr) => {
     console.log('📝 Generating HTML and JSON reports...');
    if (error) {
      console.error('❌ Report generation failed:', stderr || error);
    } else {
      console.log(stdout);
    }
  });
});
