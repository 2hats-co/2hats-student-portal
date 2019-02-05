const puppeteer = require('puppeteer');
const { initiateTestConfig } = require('./utils/init');
initiateTestConfig({ width: 1200, height: 800 });
const CONFIG = require('./utils/testconfig.json');
const {
  takeScreenshot,
  compareAllScreenshots,
} = require('./utils/screenshotUtil');
const { clearUserData } = require('./utils/dbUtil');
const { signupEmail } = require('./testComponents/login');
const { testLogout } = require('./testComponents/logout');
const { testActivityLog } = require('./testComponents/activityLog');
const { testProfileUploader } = require('./testComponents/profileUploader');
const { testSideBar } = require('./testComponents/sideBar');
const { testUpdateAccInfo } = require('./testComponents/updateAccountInfo');
const { testSpeedySignUp } = require('./testComponents/speedySignUp');
const fs = require('fs');

const main = async () => {
  console.log(CONFIG);
  const browser = await puppeteer.launch({ headless: false });
  browser.on('targetcreated', e => {
    // console.log(`New page opened: ${e._targetInfo.url}`);
  });
  let page = await browser.newPage();
  //DOESNT WORK
  // page.on('error', async e => {
  //   console.log(e);
  //   const imgData = await page.screenshot({ encoding: 'binary' });
  //   const fileName = `${
  //     CONST.screenshotPath
  //   }/errors-${gitTag}/error-${new Date().getTime()}.jpg`;
  //   const file = fs.createWriteStream(fileName);
  //   imgData.pipe(file);
  // });

  page.setViewport(CONFIG.viewport);
  await signupSteps(page);
  //browser.close();
  //await compareAllScreenshots();
};
main();

async function signupSteps(page) {
  await clearUserData('test2hats@gmail.com');
  await testSpeedySignUp(page);
  // await page.goto('http://localhost:3333');
  //await signupEmail(page);
  //await testActivityLog(page);
  //await testProfileUploader(page);
  //await testSideBar(page);
  //await testUpdateAccInfo(page); //Doesnt check the DB YET
  //await testLogout(page);
}
