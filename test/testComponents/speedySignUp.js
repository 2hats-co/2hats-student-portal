const { SELECTORS, CONST } = require('../constants');
const { click, runSteps, selectDropDown, type } = require('../utils/functions');

const logout = [
  {
    name: 'speedySignUp-navigate',
    action: async page => {
      await page.goto('http://localhost:3333/speedySignup');
    },
  },
  {
    name: 'speedySignUp-fill',
    action: async page => {
      await type(page, SELECTORS.speedySignUp.firstName, 'Victor');
      await type(page, SELECTORS.speedySignUp.lastName, 'Chan');
      await type(page, SELECTORS.speedySignUp.email, 'test2hats@gmail.com');
      await selectDropDown(page, '', 1);
      await type(page, SELECTORS.speedySignUp.currentDegree, 'Commerce');
      await click(page, SELECTORS.speedySignUp.courses);
      await click(page, SELECTORS.speedySignUp.signUp);
      //await page.waitFor(2000);
      await page.waitForSelector(SELECTORS.speedySignUp.reset);
    },
  },
  {
    name: 'speedySignUp-reset',
    action: async page => {
      await click(page, SELECTORS.speedySignUp.reset);
      await page.waitForSelector(SELECTORS.speedySignUp.email);
    },
  },
];

const testSpeedySignUp = async page => {
  await runSteps(page, logout, true);
};

module.exports = { testSpeedySignUp };
