const { SELECTORS, CRED } = require('./constants');
const { takeScreenshot } = require('./screenshotUtil');
const FILEPATH = './testResume.pdf';

const selectCareerInterests = async page => {
  //Career Interests
  await page.waitForSelector(SELECTORS.uploadResume.nextCI);
  await page.waitFor(1000);
  await takeScreenshot(page, 'resume0b-selectCareerInterests');
  try {
    await page.click(SELECTORS.uploadResume.appInput, { delay: 10 });
    await page.click(SELECTORS.uploadResume.webInput, { delay: 10 });
    await page.click(SELECTORS.uploadResume.dataInput, { delay: 10 });
  } catch (error) {
    //console.log(error);
  }
  await takeScreenshot(page, 'resume0a-selectCareerInterests');
  await page.waitFor(1000);
  await page.click(SELECTORS.uploadResume.nextCI, { delay: 10 });
};

const selectRelevantSkills = async page => {
  await page.waitForSelector(SELECTORS.uploadResume.skillInput);
  await takeScreenshot(page, 'resume1b-selectRelevantSkills');
  await page.type(SELECTORS.uploadResume.skillInput, 'JavaScript', {
    delay: 10,
  });
  await page.click(SELECTORS.uploadResume.addButton, { delay: 10 });
  await takeScreenshot(page, 'resume1a-selectRelevantSkills');
  await page.waitForSelector(SELECTORS.uploadResume.nextRS);
  await page.click(SELECTORS.uploadResume.nextRS, { delay: 10 });
};

const selectCurrentUniversity = async page => {
  await page.waitForSelector(SELECTORS.uploadResume.nextSU);
  await takeScreenshot(page, 'resume2b-selectCurrentUniversity');
  //Click the university container here (not working yet)
  await takeScreenshot(page, 'resume2a-selectCurrentUniversity');
  await page.waitFor(1000);
  await page.click(SELECTORS.uploadResume.nextSU);
};

const selectUploadResume = async page => {
  await page.waitForSelector(SELECTORS.uploadResume.uploadResumeField);
  await takeScreenshot(page, 'resume3b-selectUploadResume');
  //Upload resume
  const uploadButton = await page.$(SELECTORS.uploadResume.uploadResumeField);
  await uploadButton.uploadFile(FILEPATH);

  await page.waitFor(1000);
  await page.waitForSelector(SELECTORS.uploadResume.nextUR);
  await takeScreenshot(page, 'resume3a-selectUploadResume');
  await page.waitFor(1000);
  await page.click(SELECTORS.uploadResume.nextUR);
};

const selectWorkAvaliability = async page => {
  await page.waitForSelector(SELECTORS.uploadResume.nextWA);
  //Click the two input fields
  const availableDaysInput = await page.$(
    SELECTORS.uploadResume.availableDaysInput
  );
  const workConditionInput = await page.$(
    SELECTORS.uploadResume.workConditionInput
  );
  await takeScreenshot(page, 'resume4b-selectWorkAvailability');
  //Select items
  availableDaysInput.click({ delay: 10 });
  await page.waitFor(1000);
  availableDaysInput.press('ArrowDown', { delay: 20 });
  availableDaysInput.press('Enter', { delay: 20 });
  await page.waitFor(2000);
  workConditionInput.click({ delay: 10 });
  await page.waitFor(1000);
  workConditionInput.press('ArrowDown', { delay: 20 });
  workConditionInput.press('Enter', { delay: 20 });

  await takeScreenshot(page, 'resume4a-selectWorkAvailability');
  await page.waitFor(1000);
  await page.click(SELECTORS.uploadResume.nextWA);
};

const testUploadResume = async page => {
  await selectCareerInterests(page);
  await selectRelevantSkills(page);
  await selectCurrentUniversity(page); //Problem with this one
  await selectUploadResume(page);
  await selectWorkAvaliability(page);
  console.log('testedResume');
};

module.exports = { testUploadResume };
