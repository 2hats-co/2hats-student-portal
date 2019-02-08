const { SELECTORS, CONST } = require('../constants');
const { click, runSteps, selectDropDown, type } = require('../utils/functions');
const { checkUserCreated } = require('../utils/dbUtil');

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
      await type(page, SELECTORS.speedySignUp.mobile, '0403157878');
      await click(page, SELECTORS.speedySignUp.courses);
      await click(page, SELECTORS.speedySignUp.signUp);
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
  {
    name: 'speedySignUp-checkDB',
    action: async page => {
      await page.waitFor(3000);
      checkUserCreated(
        'test2hats@gmail.com',
        ['signupMethod', 'email', 'firstName', 'lastName', 'interest'],
        'speedySignUp-Testing for User Creation'
      );
      console.log('done');
    },
  },
];

const testSpeedySignUp = async page => {
  await runSteps(page, logout, true);
};

module.exports = { testSpeedySignUp };
