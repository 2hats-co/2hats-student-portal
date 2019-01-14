const loginEmailOld = async page => {
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

async function startStep(page, stepName) {
  await takeScreenshot(page, stepName);
}

async function endStep(page, stepName) {
  await takeScreenshot(page, stepName);
}

async function click(page, selector) {
  await page.waitForSelector(selector);
  await page.click(selector, { delay: 10 });
}

async function type(page, selector, text) {
  await page.waitForSelector(selector);
  await page.type(selector, text, {
    delay: 10,
  });
}

async function selectDropDown(page, selector, optionNum) {
  const element = await page.$(selector);
  element.click({ delay: 10 });
  await page.waitFor(1000);
  for (let i = 0; i < optionNum; i++) {
    element.press('ArrowDown', { delay: 20 });
  }
  element.press('Enter', { delay: 20 });
}

// const loginSteps = {
//     steps: [
//       [
//         { fn: 'waitForSelector', value: SELECTORS.signIn.emailInput },
//         { fn: 'type', value: {selector:SELECTORS.signIn.emailInput, text:CRED.signIn.email} },
//         { fn: 'waitForSelector', value: SELECTORS.signIn.emailButton },
//         {
//           fn: 'click',
//           value: CRED.signIn.email,
//           value: SELECTORS.signIn.emailButton,
//         },
//       ],
//       [
//         { fn: 'waitForSelector', value: SELECTORS.signIn.emailPassword },
//         {
//           fn: 'type',
//           value: [SELECTORS.signIn.emailPassword, CRED.signIn.password],
//         },
//         {
//           fn: 'signinButtonTesting',
//         },
//         { fn: 'waitForNavigation' },
//       ],
//     ],
//     test: 'loginSteps',
//   };

//   /**
//    *
//    * @param {Object} testObj
//    * @param {String} testObj.test
//    * @param {Array} testObj.steps
//    */
//   const runTest = async (page, testObj) => {
//     const { steps, test } = testObj;
//     let stepCount = 0;
//     for await (const step of steps) {
//       console.log(`Running step ${stepCount} of ${test}`);
//       await takeScreenshot(page, `${test}-${stepCount}-0`);
//       for await (const action of step) {
//         switch (action.fn) {
//           case 'waitForSelector':
//             await page.waitForSelector(action.value);
//             break;
//           case 'takeScreenshot':
//             await takeScreenshot(page, action.value);
//             break;
//           case 'click':
//             await page.click(action.value, { delay: 10 });
//             break;
//           case 'type':
//             await page.type(action.value[0], action.value[1], {
//               delay: 10,
//             });
//             break;
//           case 'waitForNavigation':
//             await page.waitForNavigation({ waitUntil: 'networkidle2' });
//             break;
//           case 'signinButtonTesting':
//             const signInButtons = await page.$$(SELECTORS.signIn.emailSignIn);
//             const signInButton = signInButtons[2];
//             signInButton.click({ delay: 10 });
//             break;
//           default:
//             break;
//         }
//         await page.waitFor(500);
//       }
//       await takeScreenshot(page, `${test}-${stepCount}-1`);
//     }
//   };

//   const loginEmail = async page => {
//     await runTest(page, loginSteps);
//   };
