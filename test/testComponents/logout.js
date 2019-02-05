const { SELECTORS, CONST } = require('../constants');
const { click, runSteps, checkProtectedRoutes } = require('../utils/functions');

const logout = [
  {
    name: 'mainPortal-selectLogout',
    action: async page => {
      await click(page, SELECTORS.portal.logOutButton);
      await page.waitFor(500);
      await checkProtectedRoutes(page, [
        'uploadResume',
        'dashboard',
        'profile',
        'jobs',
        'assessments',
        'courses',
      ]);
    },
  },
];
const testLogout = async page => {
  await runSteps(page, logout, false);
};

module.exports = { testLogout };
