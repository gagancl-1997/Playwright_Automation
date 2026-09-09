import { defineConfig, devices } from '@playwright/test';

const browserEnvRaw = process.env.BROWSER || 'chromium';
const browserEnv = browserEnvRaw === 'edge' ? 'msedge' : browserEnvRaw;

const config = defineConfig({
  testDir: './testsforTs',
  /* Maximum time one test can run for */
  timeout: 10000 * 1000,
  expect: {
    timeout: 60000,
  },
  reporter: 'html',
         name: browserEnv,
  use: {
    browserName: browserEnv === 'msedge' ? 'chromium' : (browserEnv as 'chromium' | 'firefox' | 'webkit'),
    channel: browserEnv === 'msedge' ? 'msedge' : undefined,
    headless: false,
    screenshot: 'only-on-failure', 
    trace: 'retain-on-failure',
    viewport: { width: 800, height: 600 },
    launchOptions: {
      args: [],
    },
  },
});

export default config;