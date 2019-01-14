const { SELECTORS, CRED } = require('./constants');
const { type, click, runSteps, selectDropDown } = require('./functions');

const login = [
  {
    name: 'login-typeEmail',
    action: async page => {
      await type(page, SELECTORS.signIn.emailInput, CRED.signIn.email);
      await click(page, SELECTORS.signIn.emailButton);
    },
  },
  {
    name: 'login-typePassword',
    action: async page => {
      await type(page, SELECTORS.signIn.emailPassword, CRED.signIn.password);
      await click(page, SELECTORS.signIn.emailSignIn);
      await page.waitForNavigation({ waitUntil: 'networkidle2' });
    },
  },
];

const loginEmail = async page => {
  await runSteps(page, login);
};

module.exports = { loginEmail };
