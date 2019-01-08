const { SELECTORS, CRED } = require("./constants");
const FILEPATH = "./testResume.pdf";

const selectCareerInterests = async page => {
  //Career Interests
  await page.waitForSelector(SELECTORS.uploadResume.careerInterestsHeader);
  await page.waitFor(1000);
  try {
    await page.click(SELECTORS.uploadResume.appInput, { delay: 10 });
    await page.click(SELECTORS.uploadResume.webInput, { delay: 10 });
    await page.click(SELECTORS.uploadResume.dataInput, { delay: 10 });
  } catch (error) {
    //console.log(error);
  }
  await page.waitFor(1000);
  await page.waitForSelector(SELECTORS.uploadResume.nextCI);
  await page.click(SELECTORS.uploadResume.nextCI, { delay: 10 });
};

const selectRelevantSkills = async page => {
  await page.waitForSelector(SELECTORS.uploadResume.skillInput);
  await page.type(SELECTORS.uploadResume.skillInput, "JavaScript", {
    delay: 10
  });
  await page.click(SELECTORS.uploadResume.addButton, { delay: 10 });
  await page.waitForSelector(SELECTORS.uploadResume.nextRS);
  await page.click(SELECTORS.uploadResume.nextRS, { delay: 10 });
};

const selectCurrentUniversity = async page => {
  await page.waitForSelector(SELECTORS.uploadResume.selectUniversityHeader);
  //Click the university container here (not working yet)
  await page.waitForSelector(SELECTORS.uploadResume.nextSU);
  await page.waitFor(1000);
  await page.click(SELECTORS.uploadResume.nextSU);
};

const selectUploadResume = async page => {
  await page.waitForSelector(SELECTORS.uploadResume.uploadResumeField);
  //Upload resume
  const uploadButton = await page.$(SELECTORS.uploadResume.uploadResumeField);
  await uploadButton.uploadFile(FILEPATH);

  await page.waitFor(3000);
  await page.waitForSelector(SELECTORS.uploadResume.nextUR);
  await page.waitFor(1000);
  await page.click(SELECTORS.uploadResume.nextUR);
};

const selectWorkAvaliability = async page => {
  await page.waitForSelector(SELECTORS.uploadResume.selectWorkHeader);
  //Click the two input fields
  const availableDaysInput = await page.$("#availableDays");
  const workConditionInput = await page.$("#workingRights");
  //Select items
  availableDaysInput.click({ delay: 10 });
  await page.waitFor(1000);
  availableDaysInput.press("ArrowDown", { delay: 20 });
  availableDaysInput.press("Enter", { delay: 20 });
  await page.waitFor(2000);
  workConditionInput.click({ delay: 10 });
  await page.waitFor(1000);
  workConditionInput.press("ArrowDown", { delay: 20 });
  workConditionInput.press("Enter", { delay: 20 });

  await page.waitForSelector(SELECTORS.uploadResume.nextWA);
  await page.waitFor(1000);
  await page.click(SELECTORS.uploadResume.nextWA);
};

const testUploadResume = async page => {
  await selectCareerInterests(page);
  await selectRelevantSkills(page);
  await selectCurrentUniversity(page); //Problem with this one
  await selectUploadResume(page);
  await selectWorkAvaliability(page);
  console.log("testedResume");
};

module.exports = { testUploadResume };
