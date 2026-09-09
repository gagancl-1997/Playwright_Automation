module.exports = {
  default: [
    '--require-module ts-node/register',
    '--require src/util/Environment-utils.ts',
    '--require src/StepDefinitions/**/**/*.ts',
    '--require src/util/hooks.ts',
    '--format progress-bar',
  `--format json:cucumber-report.${process.env.BROWSER || 'unknown'}.json`,
    '--publish-quiet',
    'src/features/**/**/*.feature' // ✅ No need for --require; features are automatically picked
  ].join(' ')
};
