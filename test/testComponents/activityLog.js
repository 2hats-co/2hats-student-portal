const { SELECTORS, CONST } = require('../constants');
const { click, runSteps, checkProtectedRoutes } = require('../utils/functions');

const steps = [
  {
    name: 'activityLog-select',
    action: async page => {
      await page.waitFor(1000);
      await click(page, SELECTORS.activityLog.icon);
    },
  },
  {
    name: 'activityLog-close',
    action: async page => {
      await page.waitFor(1000);
      await click(page, SELECTORS.activityLog.close);
    },
  },
];

const testActivityLog = async page => {
  await runSteps(page, steps);
};

const mobileSteps = [
  {
    name: 'activityLogM-select',
    action: async page => {
      await page.waitFor(1000);
      await click(page, SELECTORS.activityLogM.icon);
    },
  },
  {
    name: 'activityLogM-close',
    action: async page => {
      await page.waitFor(1000);
      await click(page, SELECTORS.activityLogM.close);
    },
  },
];

const testActivityLogM = async page => {
  await runSteps(page, mobileSteps);
};

module.exports = { testActivityLog, testActivityLogM };
