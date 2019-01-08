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
    careerInterestsHeader: 'h2',
    appInput: 'input#APP-checkbox-false',
    webInput: 'input#WEB-checkbox-false',
    dataInput: 'input#DA-checkbox-false',
    nextCI: 'button#next-Career',
    nextRS: 'button#next-Relevant',
    nextSU: 'button#next-Current',
    nextUR: 'button#next-Upload',
    nextWA: 'button#next-Work',
    relevantSkillsHeader: 'h2',
    skillInput: "input[type='text']",
    addButton: "button[type='button']",
    selectUniversityHeader: 'h2',
    uploadResumeField: "input[type='file']",
    selectWorkHeader: 'h2',
    availableDaysInput: '#availableDays',
    workConditionInput: '#workingRights',
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
  screenshotPath: './screenshots',
};

module.exports = { SELECTORS, CRED, CONST };
