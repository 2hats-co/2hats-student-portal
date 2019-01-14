const { SELECTORS, CRED } = require('./constants');
const {
  type,
  click,
  runSteps,
  selectDropDown,
  uploadFile,
} = require('./functions');
const FILEPATH = './testResume.pdf';

const uploadResume = [
  {
    name: 'uploadResume-selectCI',
    action: async page => {
      try {
        await click(page, SELECTORS.uploadResume.appInput);
        await click(page, SELECTORS.uploadResume.webInput);
        await click(page, SELECTORS.uploadResume.dataInput);
      } catch (error) {}
      await click(page, SELECTORS.uploadResume.nextCI);
    },
  },
  {
    name: 'uploadResume-selectRS',
    action: async page => {
      await type(page, SELECTORS.uploadResume.skillInput, 'JavaScript');
      await click(page, SELECTORS.uploadResume.addButton);
      await click(page, SELECTORS.uploadResume.nextRS);
    },
  },
  {
    name: 'uploadResume-selectCU',
    action: async page => {
      await click(page, SELECTORS.uploadResume.nextSU);
    },
  },
  {
    name: 'uploadResume-selectUR', //Need to await file upload somehow
    action: async page => {
      await uploadFile(
        page,
        SELECTORS.uploadResume.uploadResumeField,
        FILEPATH
      );
      await page.waitFor(5000);
      await click(page, SELECTORS.uploadResume.nextUR);
    },
  },
  {
    name: 'uploadResume-selectWA',
    action: async page => {
      await selectDropDown(page, SELECTORS.uploadResume.availableDaysInput, 1);
      await page.waitFor(2000);
      await selectDropDown(page, SELECTORS.uploadResume.workConditionInput, 1);
      await click(page, SELECTORS.uploadResume.nextWA);
    },
  },
];

const testUploadResume = async page => {
  await runSteps(page, uploadResume, true);
};

module.exports = { testUploadResume };
