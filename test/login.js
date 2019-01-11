const { SELECTORS, CRED } = require('./constants');
const { takeScreenshot } = require('./screenshotUtil');

const loginEmail = async page => {
  //Select Email Address form
  await page.waitForSelector(SELECTORS.signIn.emailInput);
  await page.type(SELECTORS.signIn.emailInput, CRED.signIn.email, {
    delay: 10,
  });
  //Select next button
  await takeScreenshot(page, 'loginEmail1');
  await page.waitForSelector(SELECTORS.signIn.emailButton);
  await page.click(SELECTORS.signIn.emailButton, { delay: 10 });
  //Fill in password and click signin
  await page.waitForSelector(SELECTORS.signIn.emailPassword);
  await page.type(SELECTORS.signIn.emailPassword, CRED.signIn.password, {
    delay: 10,
  });
  await takeScreenshot(page, 'loginEmail2');
  const signInButtons = await page.$$(SELECTORS.signIn.emailSignIn);
  const signInButton = signInButtons[2];
  signInButton.click({ delay: 10 });
  await page.waitForNavigation({ waitUntil: 'networkidle2' });
  //Should be signed in from here
  return page;
};

// const loginSteps = {
//   steps: [
//     { fn: 'waitForSelector', value: SELECTORS.signIn.emailInput },
//     { fn: 'type', value: CRED.signIn.email },
//   ],
//   test: 'loginSteps',
// };

// /**
//  *
//  * @param {Object} testObj
//  * @param {String} testObj.test
//  * @param {Array} testObj.steps
//  */
// const runTest = async (page, testObj) => {
//   const { steps, test } = testObj;
//   let stepCount = 0;
//   for await (const step of steps) {
//     console.log(`Running step ${stepCount} of ${test}`);
//     for await (const action of step) {
//       switch (action.fn) {
//         case 'waitForSelector':
//           await page.waitForSelector(action.value);
//           break;
//         case 'takeScreenshot':
//           await takeScreenshot(page, action.value);
//           break;
//         case 'click':
//           await page.click(action.value, { delay: 10 });
//           break;
//         case 'type':
//           await page.type(action.value[0], action.value[1], {
//             delay: 10,
//           });
//           break;
//         case 'waitForNavigation':
//           await page.waitForNavigation({ waitUntil: 'networkidle2' });
//           break;
//         case 'waitForNavigation':
//           await page.waitForNavigation({ waitUntil: 'networkidle2' });
//           break;
//         case 'waitForNavigation':
//           await page.waitForNavigation({ waitUntil: 'networkidle2' });
//           break;

//         default:
//           break;
//       }
//       await page.waitFor(500);
//     }
//   }
// };

const signUpEmail = async page => {
  //Select Email Address form
  await page.waitForSelector(SELECTORS.signIn.emailInput);
  await page.type(SELECTORS.signIn.emailInput, CRED.signIn.email, {
    delay: 10,
  });
  //Select next button
  await page.waitForSelector(SELECTORS.signIn.emailButton);
  await page.click(SELECTORS.signIn.emailButton, { delay: 10 });

  //Fill in the forms and click sign up
  await page.waitForSelector(SELECTORS.signUp.firstName);
  await page.type(SELECTORS.signUp.firstName, CRED.signUp.firstName, {
    delay: 10,
  });
  await page.type(SELECTORS.signUp.lastName, CRED.signUp.lastName, {
    delay: 10,
  });
  await page.type(SELECTORS.signUp.password, CRED.signIn.password, {
    delay: 10,
  });

  await page.click(SELECTORS.signUp.signUpButton, { delay: 10 });

  //Should be signed in from here
  return page;
};

//DOESNT WORK RIGHT NOW
const loginGoogle = async page => {
  //Click on Google Button
  await page.waitForSelector(SELECTORS.signIn.google);
  await page.click(SELECTORS.signIn.google, { delay: 10 });
  //Type in email
  await page.waitForSelector(SELECTORS.signIn.googleEmail);
  await page.type(SELECTORS.signIn.googleEmail, CRED.signIn.googleEmail, {
    delay: 10,
  });

  return page;
};

module.exports = { loginGoogle, signUpEmail, loginEmail };
