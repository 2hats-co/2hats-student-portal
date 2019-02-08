const { SELECTORS, CONST } = require('../constants');
const { click, runSteps, selectDropDown, type } = require('../utils/functions');
const {
  checkUserCreated,
  checkDocMatches,
  checkSmartLink,
} = require('../utils/dbUtil');

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
      checkUserCreated(
        'test2hats@gmail.com',
        ['signupMethod', 'email', 'firstName', 'lastName', 'interest'],
        'speedySignUp-Testing for User Creation'
      );
      const profileData = {
        bio: '',
        currentDegree: 'Commerce',
        currentUniversity: 'University of New South Wales',
        firstName: 'Victor',
        lastName: 'Chan',
      };
      checkDocMatches(
        'test2hats@gmail.com',
        'profiles',
        profileData,
        'speedySignUp-Testing for Profile Creation'
      );
      const candidateData = {
        email: 'test2hats@gmail.com',
        emailVerified: false,
        interest: 'course',
        firstName: 'Victor',
        lastName: 'Chan',
        noPassword: true,
        signupMethod: 'speedy',
      };
      checkDocMatches(
        'test2hats@gmail.com',
        'candidates',
        candidateData,
        'speedySignUp-Testing for Candidate Creation'
      );
      const algoliaCandidateData = {
        email: 'test2hats@gmail.com',
        emailVerified: false,
        firstName: 'Victor',
        lastName: 'Chan',
        signupMethod: 'speedy',
      };
      checkDocMatches(
        'test2hats@gmail.com',
        'algoliaCandidates',
        algoliaCandidateData,
        'speedySignUp-Testing for algoliaCandidate Creation'
      );
      const smartLinkData = {
        templateName: 'createPassword',
        route: '/createPassword',
        disable: false,
      };
      checkSmartLink(
        'test2hats@gmail.com',
        'createPassword',
        smartLinkData,
        'speedySignUp-Testing for smartLink Creation'
      );

      console.log('done');
    },
  },
];

const testSpeedySignUp = async page => {
  await runSteps(page, logout, { screenshot: false });
};

module.exports = { testSpeedySignUp };

//http://email.2coins.com.au/c/eJwdzruOgzAQheGnMaU1HhtsChdJCIq0qVKlHQcDVriJcYp9-w0rne6XPp3OO2e6oOoieQRVA4IDg1orqWQFeLYXV16udeNaexYG8LWmheVrnSV9itEDEihFJgRLTtmypt511Btbxipo6IrJjzlvQp8Ett9xpiEtA46UWfZpj4E40rYd4pFn2vM9LW8WuuXpJ_4K3Yx6uGXGbQp8qvrm8Yzrvdh9jpz_ne-tYaY0HcYfDw9ADw
