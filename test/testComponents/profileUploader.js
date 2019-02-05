const { SELECTORS, CONST } = require('../constants');
const { click, runSteps, uploadFile } = require('../utils/functions');

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
    },
  },
];

const testProfileUploader = async page => {
  await runSteps(page, logout, true);
};

module.exports = { testProfileUploader };
