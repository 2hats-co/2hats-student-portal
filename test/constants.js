const SELECTORS = {
  signIn: {
    google: '#google-button',
    googleEmail: '#identifierId',
    linkedIn: '#linkedin-button',
    emailInput: '#email',
    emailButton: '#check-button',
    emailSignIn: '#password-sign-in',
    emailPassword: '#passwordField',
  },
  signUp: {
    firstName: '#firstName',
    lastName: '#lastName',
    password: '#passwordField',
    signUpButton: '.MuiButton-root-187', //Wont work, change later
  },
  uploadResume: {
    appInput: 'input#APP-checkbox-false',
    webInput: 'input#WEB-checkbox-false',
    dataInput: 'input#DA-checkbox-false',
    nextCI: 'button#next-Career',
    nextRS: 'button#next-Relevant',
    nextSU: 'button#next-Current',
    nextUR: 'button#next-Upload',
    nextWA: 'button#next-Work',
    skillInput: "input[type='text']",
    addButton: "button[type='button']",
    uploadResumeField: "input[type='file']",
    availableDaysInput: '#availableDays',
    workConditionInput: '#workingRights',
  },
  portal: {
    dashButton: 'button#logo-button',
    profileButton: "button[type='button']",
    profileImage: 'button#profile-button',
    profilePhoto: "button[type='button']",
    profilePhotoCancel: 'button#dialog-cancel',
    profilePhotoUpdate: 'button#dialog-activity',
    profilePhotoInput: "input[type='file']",
    profileRouteButton: 'div#profile',
    jobsButton: 'div#jobs',
    assessmentButton: 'div#assessments',
    coursesButton: 'div#courses',
    contactUsButton: 'div#contactus',
    contactUsClose: '.intercom-launcher',
    FAQButton: 'a#FAQ',
    accountInfoButton: 'div#editaccountinfo',
    logOutButton: 'div#logout',
  },
  editAccInfo: {
    fName: '#firstName',
    lName: '#lastName',
    currUni: "div[type='text']", //select
    workCond: 'div#workingRights', //Used to be button
    availDays: 'div#availableDays', //used to be button
    mobileNum: '#phoneNumber',
    promoCode: '#component-error',
    cancel: 'button#dialog-cancel',
    save: 'button#dialog-activity',
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
  urlPath: 'http://localhost:3000',
  protectedRedirectPath: 'http://localhost:3000/signin',
};

module.exports = { SELECTORS, CRED, CONST };
