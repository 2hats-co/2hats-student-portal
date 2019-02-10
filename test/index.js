const puppeteer = require('puppeteer');
const fs = require('fs');
const { initiateTestConfig } = require('./utils/init');
initiateTestConfig({ width: 1200, height: 800 });
const CONFIG = JSON.parse(fs.readFileSync(`./test/testconfig.json`, 'utf8'));
// console.log(file);
// const CONFIG = require('./test/testconfig.json');
const {
  takeScreenshot,
  compareAllScreenshots,
} = require('./utils/screenshotUtil');
const { clearUserData } = require('./utils/dbUtil');
const { signupEmail } = require('./testComponents/login');
const { testLogout, testLogoutM } = require('./testComponents/logout');
const {
  testActivityLog,
  testActivityLogM,
} = require('./testComponents/activityLog');
const {
  testProfileUploader,
  testProfileUploaderM,
} = require('./testComponents/profileUploader');
const { testSideBar, testSideBarM } = require('./testComponents/sideBar');
const {
  testUpdateAccInfo,
  testUpdateAccInfoM,
} = require('./testComponents/updateAccountInfo');
const { testSpeedySignUp } = require('./testComponents/speedySignUp');
const { testCourses } = require('./testComponents/courses');
const { testAssessments } = require('./testComponents/assessments');
const { testJobs } = require('./testComponents/jobs');
const { testProfileContainer } = require('./testComponents/profileContainer');

const main = async () => {
  console.log(CONFIG);
  const browser = await puppeteer.launch({ headless: false });
  browser.on('targetcreated', e => {
    // console.log(`New page opened: ${e._targetInfo.url}`);
  });
  let page = await browser.newPage();

  console.log(CONFIG.viewport);
  page.setViewport({ width: 400, height: 600 });
  //await signupSteps(page);
  await mobileSteps(page);
  //browser.close();
  //await compareAllScreenshots();
};
main();

async function signupSteps(page) {
  await clearUserData('test2hats@gmail.com');
  //await testSpeedySignUp(page);
  await page.goto('http://localhost:3333');
  await signupEmail(page);
  await testActivityLog(page);
  await testProfileUploader(page);
  await testSideBar(page);
  await testUpdateAccInfo(page);
  await testProfileContainer(page);
  await page.goto('http://localhost:3333/courses');
  await testCourses(page);
  await page.goto('http://localhost:3333/assessments');
  await testAssessments(page);
  await page.goto('http://localhost:3333/jobs');
  await testJobs(page);

  await testLogout(page);
}

async function mobileSteps(page) {
  await clearUserData('test2hats@gmail.com');
  //await testSpeedySignUp(page);
  await testActivityLogM(page);
  await testProfileUploaderM(page);
  await testSideBarM(page);
  await testUpdateAccInfoM(page);
  await testProfileContainer(page);
  await page.goto('http://localhost:3333/courses');
  await testCourses(page);
  await page.goto('http://localhost:3333/assessments');
  await testAssessments(page);
  await page.goto('http://localhost:3333/jobs');
  await testJobs(page);
  await testLogoutM(page);
}
