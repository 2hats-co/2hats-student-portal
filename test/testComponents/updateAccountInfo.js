const { SELECTORS, CONST } = require('../constants');
const { click, runSteps, selectDropDown, type } = require('../utils/functions');

const logout = [
  {
    name: 'updateAccInfo-click',
    action: async page => {
      await click(page, SELECTORS.updateAccInfo.button);
    },
  },
  {
    name: 'updateAccInfo-fill',
    action: async page => {
      await type(page, SELECTORS.updateAccInfo.firstName, 'Victor');
      await type(page, SELECTORS.updateAccInfo.lastName, 'Chan');
      await selectDropDown(page, '', 1);
      await type(page, SELECTORS.updateAccInfo.currentDegree, 'Commerce');
      await selectDropDown(page, '', 1);
      await type(page, SELECTORS.updateAccInfo.mobileNumber, '0403157878');
      await click(page, SELECTORS.updateAccInfo.update);
    },
  },
];

const testUpdateAccInfo = async page => {
  await runSteps(page, logout, { checkForDbChange: true });
};

module.exports = { testUpdateAccInfo };
