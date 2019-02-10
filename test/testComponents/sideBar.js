const { SELECTORS, CONST } = require('../constants');
const { click, runSteps } = require('../utils/functions');

const steps = [
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
  await runSteps(page, steps);
};

const mobileSteps = [
  {
    name: 'sideBar-clickDashboard',
    action: async page => {
      await click(page, SELECTORS.mobile.nav);
      await click(page, SELECTORS.sideBar.dashboard);
    },
  },
  {
    name: 'sideBar-clickProfile',
    action: async page => {
      await click(page, SELECTORS.mobile.nav);
      await click(page, SELECTORS.sideBar.profile);
    },
  },
  {
    name: 'sideBar-clickJobs',
    action: async page => {
      await click(page, SELECTORS.mobile.nav);
      await click(page, SELECTORS.sideBar.jobs);
    },
  },
  {
    name: 'sideBar-clickAssessments',
    action: async page => {
      await click(page, SELECTORS.mobile.nav);
      await click(page, SELECTORS.sideBar.assessments);
    },
  },
  {
    name: 'sideBar-clickCourses',
    action: async page => {
      await click(page, SELECTORS.mobile.nav);
      await click(page, SELECTORS.sideBar.courses);
    },
  },
];

const testSideBarM = async page => {
  await runSteps(page, mobileSteps);
};

module.exports = { testSideBar, testSideBarM };
