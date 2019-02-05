const { SELECTORS, CONST } = require('./constants');
const {
  type,
  click,
  runSteps,
  selectDropDown,
  uploadFile,
  checkRedirect,
  checkProtectedRoutes,
} = require('./utils/functions');

const mainPortal = [
  {
    name: 'mainPortal-selectLogo',
    action: async page => {
      await click(page, SELECTORS.portal.dashButton);
    },
  },
  {
    name: 'mainPortal-selectProfilePhotoCancel',
    action: async page => {
      await click(page, SELECTORS.portal.profileImage);
      await click(page, SELECTORS.portal.profilePhotoCancel);
      // await page.waitFor(3000);
    },
  },
  {
    name: 'mainPortal-selectProfilePhotoUpload',
    action: async page => {
      await click(page, SELECTORS.portal.profileImage);

      await uploadFile(
        page,
        SELECTORS.portal.profilePhotoInput,
        CONST.sampleProfilePath
      );
      await click(page, SELECTORS.portal.profilePhotoUpdate);
    },
  },
  {
    name: 'mainPortal-selectProfileRoute',
    action: async page => {
      await click(page, SELECTORS.portal.profileRouteButton);
      await checkRedirect(page, 'http://localhost:3000/profile');
    },
  },
  {
    name: 'mainPortal-selectJobsRoute',
    action: async page => {
      await click(page, SELECTORS.portal.jobsButton);
      await checkRedirect(page, 'http://localhost:3000/jobs');
    },
  },
  {
    name: 'mainPortal-selectAssessmentsRoute',
    action: async page => {
      await click(page, SELECTORS.portal.assessmentButton);
      await checkRedirect(page, 'http://localhost:3000/assessments');
    },
  },
  {
    name: 'mainPortal-selectCoursesRoute',
    action: async page => {
      await click(page, SELECTORS.portal.coursesButton);
      await checkRedirect(page, 'http://localhost:3000/courses');
    },
  },
  {
    name: 'mainPortal-selectContactUsOpen',
    action: async page => {
      await click(page, SELECTORS.portal.contactUsButton);
    },
  },
  {
    name: 'mainPortal-selectContactUsClose',
    action: async page => {
      await click(page, SELECTORS.portal.contactUsClose);
    },
  },
  {
    name: 'mainPortal-selectFAQ',
    action: async page => {
      await click(page, SELECTORS.portal.FAQButton);
      //Then check if new tab opened -- do later
    },
  },
  {
    name: 'mainPortal-selectEditAccountInfoCancel',
    action: async page => {
      await click(page, SELECTORS.portal.accountInfoButton);
      await page.waitFor(1000);
      await click(page, SELECTORS.editAccInfo.cancel);
    },
  },
  {
    name: 'mainPortal-selectEditAccountInfoUpdate',
    action: async page => {
      await click(page, SELECTORS.portal.accountInfoButton);
      await page.waitFor(1000);
      await type(page, SELECTORS.editAccInfo.fName, 'Victor');
      await type(page, SELECTORS.editAccInfo.lName, 'Chan');
      await selectDropDown(page, SELECTORS.editAccInfo.currUni, 1);
      await selectDropDown(page, SELECTORS.editAccInfo.workCond, 1);
      await selectDropDown(page, SELECTORS.editAccInfo.availDays, 1);
      await type(page, SELECTORS.editAccInfo.mobileNum, '0403157878');
      await type(page, SELECTORS.editAccInfo.promoCode, 'TESTING');
      await click(page, SELECTORS.editAccInfo.save);
    },
  },
  {
    name: 'mainPortal-selectLogout',
    action: async page => {
      await click(page, SELECTORS.portal.logOutButton);
      await page.waitFor(500);
      await checkProtectedRoutes(page, [
        'uploadResume',
        'dashboard',
        'profile',
        'jobs',
        'assessments',
        'courses',
      ]);
    },
  },
];
const testMainPortal = async page => {
  await runSteps(page, mainPortal, true);
};

module.exports = { testMainPortal };
