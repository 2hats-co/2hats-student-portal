const { takeScreenshot } = require('./screenshotUtil');
const { checkDb } = require('./dbUtil');
const { CONST } = require('../constants');

async function runSteps(page, stepsArray, checkForDbChange = false) {
  let beforeData, afterData;
  if (checkForDbChange) {
    beforeData = JSON.stringify(await checkDb());
  }
  for (let i = 0; i < stepsArray.length; i++) {
    const step = stepsArray[i];
    if (!step) {
      break;
    }
    await takeScreenshot(page, `${step.name}-0`);
    await step.action(page);
    await takeScreenshot(page, `${step.name}-1`);
    console.log(`Ran ${step.name}`);
  }
  if (checkForDbChange) {
    afterData = JSON.stringify(await checkDb());
    if (afterData !== beforeData) {
      console.log(`Db change success`);
    } else {
      console.log(`Db change failed`);
    }
  }
}

async function click(page, selector) {
  await page.waitForSelector(selector, { timeout: 10000 });
  await page.waitFor(500);
  await page.click(selector, { delay: 10 });
  await page.waitFor(500);
}

async function type(page, selector, text) {
  await page.waitForSelector(selector);
  await page.waitFor(500);
  await page.type(selector, text, {
    delay: 10,
  });
  await page.waitFor(500);
}

async function selectDropDown(page, selector = '', optionNum) {
  if (selector !== '') {
    await page.waitForSelector(selector);
    const element = await page.$(selector);
    element.click({ delay: 10 });
    await page.waitFor(1000);
  } else {
    await page.keyboard.press('Tab');
    await page.waitFor(700);
    await page.keyboard.press('Space');
    await page.waitFor(700);
  }
  for (let i = 0; i < optionNum; i++) {
    await page.keyboard.press('ArrowDown', { delay: 20 });
  }
  await page.keyboard.press('Enter', { delay: 20 });
}

async function uploadFile(page, selector, filepath) {
  await page.waitForSelector(selector);
  const uploadButton = await page.$(selector);
  await uploadButton.uploadFile(filepath);
}

async function checkRedirect(page, url) {
  const didRedirect = page.url() === url;
  if (didRedirect) {
    console.log(`Page redirected to: ${url}`);
  } else {
    console.log(`Failed redirect to: ${url}`);
  }
  return didRedirect;
}

async function checkProtectedRoutes(page, routes) {
  if (typeof routes === 'string') {
    routes = [routes];
  }
  for (let i = 0; i < routes.length; i++) {
    const route = routes[i];
    await page.goto(`${CONST.urlPath}/${route}`);
    const didRedirect = page.url() === CONST.protectedRedirectPath;
    if (didRedirect) {
      console.log(`\x1b[32m Protected route: \x1b[0m ${route}`);
    } else {
      console.log(`\x1b[31m Unprotected route: \x1b[0m ${route}`);
    }
  }
}

module.exports = {
  runSteps,
  click,
  type,
  selectDropDown,
  uploadFile,
  checkRedirect,
  checkProtectedRoutes,
};
