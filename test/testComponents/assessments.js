const { SELECTORS, CONST } = require('../constants');
const { click, runSteps, uploadFile } = require('../utils/functions');

const logout = [
  {
    name: 'Assessments-click',
    action: async page => {
      await page.waitFor(1000);
      await click(page, SELECTORS.assessments.button);
    },
  },
  {
    name: 'Assessments-getStarted',
    action: async page => {
      await click(page, SELECTORS.assessments.start);
    },
  },
  {
    name: 'Assessments-upload',
    action: async page => {
      await uploadFile(
        page,
        SELECTORS.assessments.input,
        SELECTORS.assessments.file
      );
      await click(page, SELECTORS.assessments.submit);
    },
  },
  {
    name: 'Assessments-clickBack',
    action: async page => {
      await click(page, SELECTORS.assessments.back);
    },
  },
];

const testAssessments = async page => {
  await runSteps(page, logout, { checkForDbChange: true });
};

module.exports = { testAssessments };
