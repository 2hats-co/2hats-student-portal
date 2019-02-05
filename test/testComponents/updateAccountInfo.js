const { SELECTORS, CONST } = require('../constants');
const { click, runSteps, uploadFile } = require('../utils/functions');

const logout = [
  {
    name: 'updateAccInfo-click',
    action: async page => {
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

const testUpdateAccInfo = async page => {
  await runSteps(page, logout, true);
};

module.exports = { testUpdateAccInfo };
