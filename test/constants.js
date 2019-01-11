const SELECTORS = {
  signIn: {
    google: '.GoogleButton-socialButton-185',
    googleEmail: '#identifierId',
    linkedIn: '',
    emailInput: '#email',
    emailButton: '#check-button',
    emailSignIn: "button[type='button']",
    emailPassword: '#passwordField',
  },
  signUp: {
    firstName: '#firstName',
    lastName: '#lastName',
    password: '#passwordField',
    signUpButton: '.MuiButton-root-187', //Wont work, change later
  },
  uploadResume: {
    careerInterestsHeader: 'h6',
    appInput: 'input#APP-checkbox-false',
    webInput: 'input#WEB-checkbox-false',
    dataInput: 'input#DA-checkbox-false',
    nextCI: 'button#next-Career',
    nextRS: 'button#next-Relevant',
    nextSU: 'button#next-Current',
    nextUR: 'button#next-Upload',
    nextWA: 'button#next-Work',
    relevantSkillsHeader: 'h6',
    skillInput: "input[type='text']",
    addButton: "button[type='button']",
    selectUniversityHeader: 'h6',
    uploadResumeField: "input[type='file']",
    selectWorkHeader: 'h6',
    availableDaysInput: '#availableDays',
    workConditionInput: '#workingRights',
  },
  portal: {
    dashButton: "button[type='button']", //0
    profileButton: "button[type='button']", //1
    profileImage: 'div>img',
    profilePhoto: "button[type='button']", //2
    profilePhotoCancel: "button[type='button']", //3
    profilePhotoUpdate: "button[type='button']", //4
    profilePhotoInput: "input[type='file']", //0
    profileRouteButton: "div[role='button']", //0
    jobsButton: "div[role='button']", //1
    assessmentButton: "div[role='button']", //2
    coursesButton: "div[role='button']", //3
    contactUsButton: "div[role='button']", //4
    FAQButton: "a[target='_blank']",
    accountInfoButton: "div[role='button']", //5
    logOutButton: "div[role='button']", //6
  },
  editAccInfo: {
    fName: '#firstName',
    lName: '#lastName',
    currUni: "div[type='text']",
    workCond: "div[role='button']", //7
    availDays: "div[role='button']", //8
    mobileNum: '#phoneNumber',
    promoCode: '#component-error',
    cancel: "button[type='button']", //2
    save: "button[type='button']", //3
  },
};
const CRED = {
  signIn: {
    googleEmail: 'test2hats@gmail.com',
    email: 'test2hats5@gmail.com',
    password: '2hatsSpiderman',
  },
  signUp: {
    firstName: 'Victor',
    lastName: 'Chan',
  },
};

const CONST = {
  screenshotPath: './test/screenshots',
  testPath: './test',
  sampleProfilePath: './test/passiveAngrey.jpg',
  sampleUserId: 'TO4P3eMVGGOben7jgUbekwNylQh1',
};

module.exports = { SELECTORS, CRED, CONST };
