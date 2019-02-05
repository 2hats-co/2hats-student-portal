const { SELECTORS, CONST } = require('../constants');
const { click, runSteps } = require('../utils/functions');

const logout = [
  {
    name: 'sideBar-clickDashboard',
    action: async page => {
      await click(page, SELECTORS.sideBar.dashboard);
    },
  },
  {
    name: 'sideBar-clickProfile',
    action: async page => {
      await click(page, SELECTORS.sideBar.profile);
    },
  },
  {
    name: 'sideBar-clickJobs',
    action: async page => {
      await click(page, SELECTORS.sideBar.jobs);
    },
  },
  {
    name: 'sideBar-clickAssessments',
    action: async page => {
      await click(page, SELECTORS.sideBar.assessments);
    },
  },
  {
    name: 'sideBar-clickCourses',
    action: async page => {
      await click(page, SELECTORS.sideBar.courses);
    },
  },
];

const testSideBar = async page => {
  await runSteps(page, logout);
};

module.exports = { testSideBar };
