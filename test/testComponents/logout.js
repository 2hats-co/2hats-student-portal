const { SELECTORS, CONST } = require('../constants');
const { click, runSteps, checkProtectedRoutes } = require('../utils/functions');

const logout = [
  {
    name: 'mainPortal-selectLogout',
    action: async page => {
      await click(page, SELECTORS.portal.logOutButton);
      await page.waitFor(1000);
      //await page.waitForNavigation({ waitUntil: 'networkidle2' });
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
  await runSteps(page, logout);
};

const mobileSteps = [
  {
    name: 'mainPortal-selectLogout',
    action: async page => {
      await click(page, SELECTORS.mobile.nav);
      await click(page, SELECTORS.portal.logOutButton);
      await page.waitFor(1000);
      await checkProtectedRoutes(page, [
        'dashboard',
        'profile',
        'jobs',
        'assessments',
        'courses',
      ]);
    },
  },
];
const testLogoutM = async page => {
  await runSteps(page, mobileSteps);
};

module.exports = { testLogout, testLogoutM };
