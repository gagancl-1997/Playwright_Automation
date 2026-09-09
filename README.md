
# 🎭 Playwright + TypeScript + Cucumber + Page Object Model (POM) Automation Framework

This project is a UI automation framework using **Playwright**, **Cucumber**, and **TypeScript**. 
This framework enables the creation of BDD-style test scenarios and their execution across supported browsers.

---

## 📦 Prerequisites

Make sure the following tools are installed:

- [Node.js (v18+ recommended)](https://nodejs.org/)
- [Git](https://git-scm.com/)
- Code editor like [VS Code](https://code.visualstudio.com/)

---

## 🚀 Project Setup

### 1. Clone the Repository

```bash
git clone https://gitlab.com/cidilabs/testing/udoit-automation.git
cd your-project-name
```

### 2. Open Terminal in VS Code and Initialize Project

1. Open the project folder in **Visual Studio Code**.
2. Open a new terminal:
   - Go to **View** > **Terminal**
   - Or press: `` Ctrl + ` `` (backtick key)
3. Run the following command to initialize a new Node.js project:

   ```bash
   npm init -y
   ```

4. Then install dependencies (after you add them to `package.json` or via direct install):

   ```bash
   npm install
   ```

> 🔹 **Note**:  
> - `npm init -y` creates a new `package.json` file.  
> - `npm install` installs all dependencies listed in `package.json`.  
> - These two commands are **not the same**. One sets up the project; the other installs packages.

---

## 📥 Install Required Packages

Install all dependencies required for Playwright + Cucumber + TypeScript:

```bash
npm install playwright @cucumber/cucumber ts-node typescript @types/node --save-dev
```
Each package serves a specific role:
1.	@playwright/test → Playwright’s official testing library for browser automation.
2.	@cucumber/cucumber → Provides support for Behaviour-Driven Development (BDD) testing.
3.	typescript → Enables TypeScript support for type-safe coding.
4.	ts-node → Allows direct execution of TypeScript files.
5.	@types/node → TypeScript definitions for Node.js – helps with IntelliSense and type checking.

-----
### To use @playwright/test in your step definitions:

```bash
npm install @playwright/test --save-dev
```
---
-----
### To install Playwright browsers:

```bash
npx playwright install
```
---

## 🛠️ Project Structure

```
UDOIT-AUTOMATION/
├── .vscode/                  # VS Code workspace settings
├── node_modules/             # Installed npm packages
├── pageObjects/              # Page Object Model files (e.g., LoginPage.ts, DashboardPage.ts)
├── report/                   # Test and cucumber reports (e.g., cucumber-report.json, html reports)
├── resources/                # Test data, environment files, or other resources (e.g., test-data.json)
├── src/                      # Source code
│   ├── features/             # Cucumber feature files (*.feature)
│   ├── steps/                # Step definitions (*.ts)
│   ├── support/              # Hooks, custom world, helpers
│   └── utils/                # Utility/helper functions
├── .env                      # Environment variables
├── .gitignore                # Git ignore rules
├── cucumber.js               # Cucumber configuration
├── generate-report.ts        # Script to generate HTML report
├── package-lock.json         # NPM lock file
├── package.json              # NPM scripts and dependencies
├── playwright.config.ts      # Playwright configuration
└── tsconfig.json             # TypeScript

```
## ✅ Test Runner Scripts

The following npm scripts are available for running different test suites across multiple browsers. Each script sets environment variables for the suite and browser, runs the tests using Playwright and Cucumber, and generates a report.

### 🔹BVT Suite

- **Chromium:**  
  `npm run test:bvt:chromium`
- **Firefox:**  
  `npm run test:bvt:firefox`
- **Webkit:**  
  `npm run test:bvt:webkit`
- **MS Edge:**  
  `npm run test:bvt:msedge`
- **All Browsers Simultaneously:**  
  `npm run test:bvt:runAllBrowsersSimultaneously`

### 🔹Regression Suite 1

- **Chromium:**  
  `npm run test:regressionsuite1:chromium`
- **Firefox:**  
  `npm run test:regressionsuite1:firefox`
- **Webkit:**  
  `npm run test:regressionsuite1:webkit`
- **MS Edge:**  
  `npm run test:regressionsuite1:msedge`
- **All Browsers Simultaneously:**  
  `npm run test:regressionsuite1:runAllBrowsersSimultaneously`

### 🔹Regression Suite 2

- **Chromium:**  
  `npm run test:regressionsuite2:chromium`
- **Firefox:**  
  `npm run test:regressionsuite2:firefox`
- **Webkit:**  
  `npm run test:regressionsuite2:webkit`
- **MS Edge:**  
  `npm run test:regressionsuite2:msedge`
- **All Browsers Simultaneously:**  
  `npm run test:regressionsuite2:runAllBrowsersSimultaneously`

### 🔹 Regression Suite 3

- **Chromium:**  
  `npm run test:regressionsuite3:chromium`
- **Firefox:**  
  `npm run test:regressionsuite3:firefox`
- **Webkit:**  
  `npm run test:regressionsuite3:webkit`
- **MS Edge:**  
  `npm run test:regressionsuite3:msedge`
- **All Browsers Simultaneously:**  
  `npm run test:regressionsuite3:runAllBrowsersSimultaneously`

### 🔹Complete Suite

- **Chromium:**  
  `npm run test:completeSuite:chromium`
- **Firefox:**  
  `npm run test:completeSuite:firefox`
- **Webkit:**  
  `npm run test:completeSuite:webkit`
- **MS Edge:**  
  `npm run test:completeSuite:msedge`
- **All Browsers Simultaneously:**  
  `npm run test:completeSuite:runAllBrowsersSimultaneously`

---

## 📊 HTML Report

Automation test reports are generated automatically after each test suite execution. These reports provide detailed insights into test outcomes, browser configurations, and error traces.

```
report/report.html
```
Open it in a browser to view test results.
## ✅ Test Report Details

After running the test suites, a detailed report is generated containing the following information:

- ✅ **Suite Name:**  
  Indicates which suite was executed (e.g., Complete Suite, BVT, Regression Suite).

- 🌍 **Browser Used:**  
  Specifies the browser for each test run (Chromium, Firefox, Webkit, MSedge).

- 📊 **Pass/Fail Status:**  
  Shows the result for each test case (passed or failed).

- 🐞 **Error Details:**  
  Provides error messages and stack traces for any failed tests.

- 📋 **Step-by-Step Execution Logs:**  
  Lists each step executed in every scenario for traceability.

- 🖼️ **Failed Scenario Screenshot:**  
  Includes screenshots for failed scenarios to help with quick visual debugging.

---

## 🔍 Troubleshooting

- Ensure you have installed all dependencies.
- If browser installation fails, run:  

  ```bash
  npx playwright install
  ```

---

## 📚 References

- [Playwright Docs](https://playwright.dev/)
- [Cucumber.js Docs](https://github.com/cucumber/cucumber-js)
- [TypeScript Docs](https://www.typescriptlang.org/)

---

## 💡 Tips

- Add more `.feature` files under the `features/` folder for additional test cases.
- Keep page objects inside the `pages/` directory using the Page Object Model pattern.

---

## 🏁 GitLab CI/CD

If you want to set up GitLab CI for this, create `.gitlab-ci.yml`:

---

## 🔚 End of README

Happy Testing! 🧪
