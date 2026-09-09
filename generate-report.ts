
import reporter from 'cucumber-html-reporter';
import * as fs from 'fs';
import * as path from 'path';

// 🗂️ Setup directories
const reportDir = path.join(__dirname, 'report');
const jsonReportDir = path.join(reportDir, 'json');
const htmlReportDir = path.join(reportDir, 'html');

function ensureFolderExists(folderPath) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
}

ensureFolderExists(jsonReportDir);
ensureFolderExists(htmlReportDir);

// 📅 Format timestamp
const currentDateTime = new Date();
const formattedDateTime = `${currentDateTime.getFullYear()}-${String(currentDateTime.getMonth() + 1).padStart(2, '0')}-${String(currentDateTime.getDate()).padStart(2, '0')}_${String(currentDateTime.getHours()).padStart(2, '0')}-${String(currentDateTime.getMinutes()).padStart(2, '0')}-${String(currentDateTime.getSeconds()).padStart(2, '0')}`;

// 📄 Move JSON report

const browser = process.env.BROWSER || 'unknown';
const jsonReportPath = path.join(__dirname, `cucumber-report.${browser}.json`);
const jsonReportDestination = path.join(jsonReportDir, `cucumber-report_${browser}_${formattedDateTime}.json`);

if (fs.existsSync(jsonReportPath)) {
  fs.renameSync(jsonReportPath, jsonReportDestination);
} else {
  process.exit(0);
}

// 📊 Analyze test results
let totalScenarios = 0;
let passedScenarios = 0;
let totalSteps = 0;
let passedSteps = 0;

// ⏳ Calculate execution duration from report data
let startTimeFromReport: Date | null = null;
let endTimeFromReport: Date | null = null;

try {
  const reportData = JSON.parse(fs.readFileSync(jsonReportDestination, 'utf8'));

  reportData.forEach(feature => {
    feature.elements.forEach(scenario => {
      totalScenarios++;
      const failed = scenario.steps.some(step => step.result.status === 'failed');
      if (!failed) passedScenarios++;
      scenario.steps.forEach(step => {
        totalSteps++;
        if (step.result.status === 'passed') passedSteps++;

        // Extract timestamps if available
        // Use step.result.duration if available (in nanoseconds)
        if (step.result && typeof step.result.duration === 'number') {
          // If startTimeFromReport is null, set it to currentDateTime
          if (!startTimeFromReport) {
            startTimeFromReport = currentDateTime;
          }
          // Accumulate total duration
          if (!endTimeFromReport) {
            endTimeFromReport = new Date(currentDateTime.getTime() + step.result.duration / 1000000);
          } else {
            endTimeFromReport = new Date(endTimeFromReport.getTime() + step.result.duration / 1000000);
          }
        }
      });
    });
  });
} catch (error) {
  console.error('❌ Error reading JSON report:', error);
}
// 📝 Compose summary
const summaryText = `Total ${totalScenarios} scenarios (${passedScenarios} passed), Total ${totalSteps} steps (${passedSteps} passed)`;

// ⏱️ Format duration
let durationFormatted = 'N/A';
if (startTimeFromReport && endTimeFromReport) {
  const durationMs = endTimeFromReport.getTime() - startTimeFromReport.getTime();
  const durationSec = Math.floor(durationMs / 1000);
  const durationMin = Math.floor(durationSec / 60);
  durationFormatted = `${durationMin}m ${durationSec % 60}s`;
}

// 🧾 Generate the HTML report

const suiteName = process.env.REPORT_SUITE || 'bvt';
const options: reporter.Options = {
  theme: 'bootstrap',
  name: `DesignPLUS ${suiteName} Testing Report`,
  jsonFile: jsonReportDestination,
  output: path.join(htmlReportDir, `cucumber-report_${browser}_${formattedDateTime}.html`), // HTML report name unchanged
  reportSuiteAsScenarios: true,
  launchReport: false,
  metadata: {
    "App Version": "1.0.0",
    "Test Environment": "Beta Environment",
    "Browser": browser,
    "Platform": "Windows 10",
    "Parallel": "Scenarios",
    "Executed": "Local",
    "Report Generated On": currentDateTime.toLocaleString(),
    "Execution Duration": durationFormatted,
    "Test Summary": summaryText
  }
};

reporter.generate(options);
