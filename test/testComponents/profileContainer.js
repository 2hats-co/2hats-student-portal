const { SELECTORS, CONST } = require('../constants');
const {
  click,
  runSteps,
  uploadFile,
  toggle,
  type,
} = require('../utils/functions');
const { setProfileData } = require('../utils/dbUtil');

const steps = [
  {
    name: 'ProfileContainer-click',
    action: async page => {
      await page.goto('http://localhost:3333/profile');
      //await page.waitForNavigation({ waitUntil: 'networkidle0' });
      //await click(page, SELECTORS.profileContainer.button);
    },
  },
  {
    name: 'ProfileContainer-toggleButtons',
    action: async page => {
      await toggle(page, SELECTORS.profileContainer.workInfo);
      await toggle(page, SELECTORS.profileContainer.assessmentsInfo);
      await toggle(page, SELECTORS.profileContainer.resumeInfo);
    },
  },
  {
    name: 'ProfileContainer-editBio',
    action: async page => {
      await click(page, SELECTORS.profileContainer.bioEdit);
      await type(
        page,
        SELECTORS.profileContainer.bioInput,
        'This is a sample bio'
      );
      await click(page, SELECTORS.profileContainer.bioSubmit);
      //DB check here needed
    },
  },
  {
    name: 'ProfileContainer-uploadResume',
    action: async page => {
      //Check backend and reset the resume to empty
      await setProfileData('test2hats@gmail.com', {
        resume: {},
        resumeFile: {},
      });
      //Click resume upload and upload file
      await uploadFile(
        page,
        SELECTORS.profileContainer.resumeInput,
        SELECTORS.profileContainer.file
      );
      await page.waitForSelector(SELECTORS.profileContainer.chip);
    },
  },
];

const testProfileContainer = async page => {
  await runSteps(page, steps, { checkForDbChange: true });
};

module.exports = { testProfileContainer };
