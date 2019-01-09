const puppeteer = require('puppeteer');
const { initiateTestConfig } = require('./init');
initiateTestConfig({ width: 1200, height: 800 });
const CONFIG = require('./testconfig.json');
const { signUpEmail, loginEmail } = require('./login');
const { takeScreenshot, compareAllScreenshots } = require('./screenshotUtil');
const { testUploadResume } = require('./uploadResume');

const main = async () => {
  console.log(CONFIG);
  // const browser = await puppeteer.launch({ headless: true });
  // let page = await browser.newPage();
  // page.setViewport(CONFIG.viewport);
  // await page.goto('http://localhost:3000');
  // page = await loginEmail(page);
  // await page.goto('http://localhost:3000/uploadResume');
  // await testUploadResume(page);
  // await takeScreenshot(page, 'end');
  // browser.close();

  // await compareScreenshots(
  //   './test/screenshots/bd3a164/loginEmail1.png',
  //   './test/screenshots/testbd3a164/loginEmail2.png',
  //   './diff.png'
  // );
  compareAllScreenshots();
};
main();
