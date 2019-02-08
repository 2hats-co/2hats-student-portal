const { SELECTORS, CONST } = require('../constants');
const { click, runSteps, checkProtectedRoutes } = require('../utils/functions');

const logout = [
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
  await runSteps(page, logout);
};

module.exports = { testActivityLog };
