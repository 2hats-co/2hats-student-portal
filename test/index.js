const puppeteer = require('puppeteer');
const { initiateTestConfig } = require('./init');
initiateTestConfig({ width: 1200, height: 800 });
const CONFIG = require('./testconfig.json');
const { signupEmail, loginEmail } = require('./login');
const { takeScreenshot, compareAllScreenshots } = require('./screenshotUtil');
const { testUploadResume } = require('./uploadResume');
const { testMainPortal } = require('./mainPortal');
const { testCourses } = require('./courses');
const { clearUserData } = require('./dbUtil');
const { testLogout } = require('./logout');

const main = async () => {
  console.log(CONFIG);
  const browser = await puppeteer.launch({ headless: false });
  browser.on('targetcreated', e => {
    console.log(`New page opened: ${e._targetInfo.url}`);
  });
  let page = await browser.newPage();
  page.setViewport(CONFIG.viewport);
  await signupSteps(page);
  //await compareAllScreenshots();
};
main();

async function signupSteps(page) {
  await clearUserData('test2hats@gmail.com');
  await page.goto('http://localhost:3333');
  await signupEmail(page);
  await testLogout(page);
  browser.close();
}
