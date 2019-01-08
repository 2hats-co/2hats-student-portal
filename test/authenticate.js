const puppeteer = require('puppeteer');
const { signUpEmail, loginEmail } = require('./login');
const { SELECTORS, CRED, CONST } = require('./constants');
const { testUploadResume } = require('./uploadResume');

const main = async () => {
  const browser = await puppeteer.launch({ headless: false });
  let page = await browser.newPage();
  page.setViewport({ width: 1200, height: 800 });
  await page.goto('http://localhost:3000');
  page = await loginEmail(page);
  await page.goto('http://localhost:3000/uploadResume');
  await testUploadResume(page);
  await takeScreenshot(page, 'hello');

  browser.close();
};
main();

const takeScreenshot = async (page, stepName) => {
  const now = new Date().getTime();
  await page.screenshot({
    // path: `${CONST.screenshotPath}/${stepName}-${now}.png`
    path: `${CONST.screenshotPath}`,
  });
  await page.waitFor(1000);
};
