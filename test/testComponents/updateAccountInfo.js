const { SELECTORS, CONST } = require('../constants');
const { click, runSteps, selectDropDown, type } = require('../utils/functions');
const { checkDocMatches } = require('../utils/dbUtil');
const steps = [
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
  {
    name: 'updateAccInfo-checkDB',
    action: async page => {
      const profileData = {
        firstName: 'Victor',
        lastName: 'Chan',
        currentDegree: 'Commerce',
        mobileNumber: '0403157878',
        availableDays: 1,
      };
      checkDocMatches(
        'test2hats@gmail.com',
        'profiles',
        profileData,
        'ProfileUploader-Testing for Profile details update'
      );
    },
  },
];

const testUpdateAccInfo = async page => {
  await runSteps(page, steps, { checkForDbChange: true });
};

const mobileSteps = [
  {
    name: 'updateAccInfo-click',
    action: async page => {
      await click(page, SELECTORS.mobile.nav);
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
  {
    name: 'updateAccInfo-checkDB',
    action: async page => {
      const profileData = {
        firstName: 'Victor',
        lastName: 'Chan',
        currentDegree: 'Commerce',
        mobileNumber: '0403157878',
        availableDays: 1,
      };
      checkDocMatches(
        'test2hats@gmail.com',
        'profiles',
        profileData,
        'ProfileUploader-Testing for Profile details update'
      );
    },
  },
];

const testUpdateAccInfoM = async page => {
  await runSteps(page, mobileSteps, { checkForDbChange: true });
};

module.exports = { testUpdateAccInfo, testUpdateAccInfoM };
