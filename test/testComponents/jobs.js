const { SELECTORS, CONST } = require('../constants');
const { click, runSteps, uploadFile } = require('../utils/functions');

const logout = [
  {
    name: 'Jobs-click',
    action: async page => {
      await click(page, SELECTORS.jobs.button);
    },
  },
  {
    name: 'Jobs-back',
    action: async page => {
      await click(page, SELECTORS.jobs.back);
    },
  },
];

const testJobs = async page => {
  await runSteps(page, logout, { checkForDbChange: true });
};

module.exports = { testJobs };
