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

const signup = [
  {
    name: 'signup-clickSignUp',
    action: async page => {
      await click(page, SELECTORS.signUp.toggleLink);
    },
  },
  {
    name: 'signup-enterEmail',
    action: async page => {
      await type(page, SELECTORS.signUp.emailInput, CRED.signUp.email);
      await click(page, SELECTORS.signUp.emailButton);
    },
  },
  {
    name: 'signup-enterDetails',
    action: async page => {
      await type(page, SELECTORS.signUp.firstName, CRED.signUp.firstName);
      await type(page, SELECTORS.signUp.lastName, CRED.signUp.lastName);
      await type(page, SELECTORS.signUp.password, CRED.signUp.password);
      await click(page, SELECTORS.signUp.signUpButton);
    },
  },
];

const loginEmail = async page => {
  await runSteps(page, login);
};

const signupEmail = async page => {
  await runSteps(page, signup);
};

module.exports = { loginEmail, signupEmail };
