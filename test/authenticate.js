const puppeteer = require('puppeteer');
const { initiateTestConfig } = require('./init');
initiateTestConfig({ width: 1200, height: 800 });
const CONFIG = require('./testconfig.json');
const { signUpEmail, loginEmail } = require('./login');
const { takeScreenshot, compareAllScreenshots } = require('./screenshotUtil');
const { testUploadResume } = require('./uploadResume');
const { testMainPortal } = require('./mainPortal');

const main = async () => {
  console.log(CONFIG);
  const browser = await puppeteer.launch({ headless: true });
  browser.on('targetcreated', e => {
    console.log(`New page opened: ${e._targetInfo.url}`);
  });
  let page = await browser.newPage();
  page.setViewport(CONFIG.viewport);
  await page.goto('http://localhost:3000');
  page = await loginEmail(page);
  await page.goto('http://localhost:3000/uploadResume');
  await testUploadResume(page);
  await page.goto('http://localhost:3000/profile');
  await testMainPortal(page);
  //Run through Edit Account Information (try deleting from DB?)
  browser.close();
  await compareAllScreenshots();
};
main();
