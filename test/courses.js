const { SELECTORS, CRED } = require('./constants');
const {
  type,
  click,
  runSteps,
  selectDropDown,
  uploadFile,
  checkRedirect,
} = require('./utils/functions');

const courses = [
  {
    name: 'courses-selectCourse',
    action: async page => {
      await click(page, SELECTORS.courses.getStarted);
      await page.waitForNavigation();
      await checkRedirect(
        page,
        'https://2hats.getlearnworlds.com/course?courseid=diy-car-service'
      );
    },
  },
  {
    name: 'courses-checkEnrol',
    action: async page => {
      //User should be enrolled into course automatically
      try {
        await page.waitForSelector(SELECTORS.courses.enrolledPageHeader, {
          timeout: 10000,
        });
      } catch (error) {
        console.log('FAIL:Could not get to LW Enrolled Page');
      }
    },
  },
];

const testCourses = async page => {
  await runSteps(page, courses, { checkForDbChange: true });
};

module.exports = { testCourses };
