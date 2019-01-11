const { SELECTORS, CONST } = require('./constants');
const { takeScreenshot } = require('./screenshotUtil');

const selectHomeButton = async page => {
  await page.waitForSelector(SELECTORS.portal.dashButton);
  const dashButton = (await page.$$(SELECTORS.portal.dashButton))[0];
  await dashButton.click({ delay: 10 });
  await takeScreenshot(page, 'portal0-selectHomeButton');
};

const selectProfilePhoto = async page => {
  //Click Profile button
  await page.waitForSelector(SELECTORS.portal.profileImage);
  let profileButton = (await page.$$(SELECTORS.portal.profileButton))[1];
  await profileButton.click({ delay: 10 });
  await page.waitFor(1000);
  //Test cancel button
  await page.waitForSelector(SELECTORS.portal.profilePhotoInput);
  const profilePhotoCancel = (await page.$$(
    SELECTORS.portal.profilePhotoCancel
  ))[3];
  await profilePhotoCancel.click({ delay: 10 });
  //Click Profile button again
  await page.waitFor(3000);
  await page.waitForSelector(SELECTORS.portal.profileButton);
  profileButton = (await page.$$(SELECTORS.portal.profileButton))[1];
  await profileButton.click({ delay: 10 });
  //Upload an image
  await page.waitFor(2000);
  await takeScreenshot(page, 'portal1b-selectProfilePic');
  await page.waitForSelector(SELECTORS.portal.profilePhotoInput);
  const uploadInput = await page.$(SELECTORS.portal.profilePhotoInput);
  await uploadInput.uploadFile(CONST.sampleProfilePath);
  //Click Update
  await page.waitFor(3000);
  await takeScreenshot(page, 'portal1a-uploadProfilePic');
  const updateButton = (await page.$$(SELECTORS.portal.profilePhotoUpdate))[4];
  await updateButton.click({ delay: 10 });
  await page.waitFor(1000);
};

const selectProfile = async page => {
  //Click Profile button
  await page.waitForSelector(SELECTORS.portal.profileRouteButton);
  const profileRouteButton = (await page.$$(
    SELECTORS.portal.profileRouteButton
  ))[0];
  await profileRouteButton.click({ delay: 10 });
  await page.waitFor(500);
  await takeScreenshot(page, 'portal2-selectProfileButton');
  checkRedirect(page, 'http://localhost:3000/profile');
};

const selectJobs = async page => {
  //Click Jobs button
  await page.waitForSelector(SELECTORS.portal.jobsButton);
  const jobsButton = (await page.$$(SELECTORS.portal.jobsButton))[1];
  await jobsButton.click({ delay: 10 });
  await page.waitFor(500);
  await takeScreenshot(page, 'portal3-selectJobsButton');
  checkRedirect(page, 'http://localhost:3000/jobs');
};

const selectAssessments = async page => {
  //Click Assessments button
  await page.waitForSelector(SELECTORS.portal.assessmentButton);
  const assessmentButton = (await page.$$(
    SELECTORS.portal.assessmentButton
  ))[2];
  await assessmentButton.click({ delay: 10 });
  await page.waitFor(500);
  await takeScreenshot(page, 'portal4-selectAssessmentButton');
  checkRedirect(page, 'http://localhost:3000/assessments');
};

const selectCourses = async page => {
  //Click Courses button
  await page.waitForSelector(SELECTORS.portal.coursesButton);
  const coursesButton = (await page.$$(SELECTORS.portal.coursesButton))[3];
  await coursesButton.click({ delay: 10 });
  await page.waitFor(500);
  await takeScreenshot(page, 'portal5-selectCoursesButton');
  checkRedirect(page, 'http://localhost:3000/courses');
};

const selectFAQ = async page => {
  //Click FAQ Button
  await page.waitForSelector(SELECTORS.portal.FAQButton);
  const FAQButton = await page.$(SELECTORS.portal.FAQButton);
  await FAQButton.click({ delay: 10 });
  //Check if a new tab is opened with url (later)
};

const selectEditAccountInfo = async page => {
  //Click the EditAccountInfo Button
  await page.waitForSelector(SELECTORS.portal.accountInfoButton);
  let accountInfoButton = (await page.$$(
    SELECTORS.portal.accountInfoButton
  ))[5];
  await accountInfoButton.click({ delay: 10 });
  await page.waitFor(1000);
  await takeScreenshot(page, 'editAccInfoCancel0');
  //Click the Cancel button
  const cancel = (await page.$$(SELECTORS.editAccInfo.cancel))[2];
  cancel.click({ delay: 10 });
  await page.waitFor(500);
  await takeScreenshot(page, 'editAccInfoCancel1');
  //Click the EditAccountInfo Button Again
  await page.waitForSelector(SELECTORS.portal.accountInfoButton);
  accountInfoButton = (await page.$$(SELECTORS.portal.accountInfoButton))[5];
  await accountInfoButton.click({ delay: 10 });
  await page.waitFor(1000);
  await takeScreenshot(page, 'editAccInfo0');
  //Enter firstname
  await page.waitForSelector(SELECTORS.editAccInfo.fName);
  await page.type(SELECTORS.editAccInfo.fName, 'Victor', {
    delay: 10,
  });
  await takeScreenshot(page, 'editAccInfo1');
  //Enter lastName
  await page.waitForSelector(SELECTORS.editAccInfo.lName);
  await page.type(SELECTORS.editAccInfo.lName, 'Chan', {
    delay: 10,
  });
  await takeScreenshot(page, 'editAccInfo2');
  //Select Current University
  const currUni = (await page.$$(SELECTORS.editAccInfo.currUni))[0];
  currUni.click({ delay: 10 });
  await page.waitFor(1000);
  currUni.press('ArrowDown', { delay: 20 });
  currUni.press('Enter', { delay: 20 });
  await takeScreenshot(page, 'editAccInfo3');
  //Select Work Condition
  const workCond = (await page.$$(SELECTORS.editAccInfo.workCond))[7];
  workCond.click({ delay: 10 });
  await page.waitFor(1000);
  workCond.press('ArrowDown', { delay: 20 });
  workCond.press('Enter', { delay: 20 });
  await takeScreenshot(page, 'editAccInfo4');
  //Select AvaiableDays
  const availDays = (await page.$$(SELECTORS.editAccInfo.availDays))[8];
  availDays.click({ delay: 10 });
  await page.waitFor(1000);
  availDays.press('ArrowDown', { delay: 20 });
  availDays.press('Enter', { delay: 20 });
  await takeScreenshot(page, 'editAccInfo5');
  //Input Mobile Number
  await page.waitForSelector(SELECTORS.editAccInfo.mobileNum);
  await page.type(SELECTORS.editAccInfo.mobileNum, '0403157878', {
    delay: 10,
  });
  await takeScreenshot(page, 'editAccInfo6');
  //Input Promo Code
  await page.waitForSelector(SELECTORS.editAccInfo.promoCode);
  await page.type(SELECTORS.editAccInfo.promoCode, 'TESTING', {
    delay: 10,
  });
  await takeScreenshot(page, 'editAccInfo7');
  //Click the Save button
  const save = (await page.$$(SELECTORS.editAccInfo.save))[3];
  save.click({ delay: 10 });
  await page.waitFor(500);
  await takeScreenshot(page, 'editAccInfo8');
};

const selectLogout = async page => {
  //Click Logout
  await page.waitForSelector(SELECTORS.portal.logOutButton);
  const logOutButton = (await page.$$(SELECTORS.portal.logOutButton))[6];
  await logOutButton.click({ delay: 10 });
  await page.waitFor(500);
  await takeScreenshot(page, 'portal8b-selectLogoutButton');
  //Try navigate to dashboard (Should redirect to signin)
  await page.waitFor(500);
  await page.goto('http://localhost:3000/dashboard');
  await page.waitFor(500);
  await takeScreenshot(page, 'portal8a-selectLogoutButton');
  checkRedirect(page, 'http://localhost:3000/signin');
};

function checkRedirect(page, url) {
  const didRedirect = page.url() === url;
  if (didRedirect) {
    console.log(`Page redirected to: ${url}`);
  } else {
    console.log(`Failed redirect to: ${url}`);
  }
  return didRedirect;
}

const testMainPortal = async page => {
  await selectHomeButton(page);
  await selectProfilePhoto(page);
  await selectProfile(page);
  await selectJobs(page);
  await selectAssessments(page);
  await selectCourses(page);
  await selectFAQ(page);
  await selectEditAccountInfo(page);
  await selectLogout(page);
  console.log(`testedMainPortal`);
};

module.exports = { testMainPortal };
