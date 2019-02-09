const { SELECTORS, CONST } = require('../constants');
const { click, runSteps, uploadFile } = require('../utils/functions');
const { checkDocMatches, checkUserCreated } = require('../utils/dbUtil');

const logout = [
  {
    name: 'ProfileUploader-upload',
    action: async page => {
      await page.waitFor(1000);
      await click(page, SELECTORS.profileUploader.button);
      await uploadFile(
        page,
        SELECTORS.profileUploader.input,
        SELECTORS.profileUploader.testImg
      );
      await click(page, SELECTORS.profileUploader.done);
      checkUserCreated(
        'test2hats@gmail.com',
        ['avatarURL'],
        'ProfileUploader-Testing for Profile avatar update'
      );
    },
  },
];

const testProfileUploader = async page => {
  await runSteps(page, logout, { checkForDbChange: true });
};

module.exports = { testProfileUploader };
