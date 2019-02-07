const { SELECTORS, CONST } = require('../constants');
const { click, runSteps, uploadFile } = require('../utils/functions');

const logout = [
  {
    name: 'Courses-click',
    action: async page => {
      await page.waitFor(1000);
      await click(page, SELECTORS.courses.button);
      // await page.waitForNavigation({ waitUntil: 'networkidle0' });
    },
  },
];

const testCourses = async page => {
  await runSteps(page, logout, true);
};

module.exports = { testCourses };
