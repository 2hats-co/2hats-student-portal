export const LANDING = '/';

export const SIGN_UP = '/signup';
export const LOG_OUT = '/logout';
export const SPEEDY_SIGN_UP = '/speedySignup';
export const SIGN_IN = '/signin';
export const RESET_PASSWORD = '/resetPassword';
export const VALIDATE_EMAIL = '/validateEmail';
// export const EMAIL_VERIFICATION = '/emailVerifications';
export const CREATE_PASSWORD = '/createPassword';
export const NO_PASSWORD = '/noPassword';
export const SMART_LINK = '/smartLinks';
// export const PREVIOUS_SUBMISSION = '/prevSubmission';

// SP3 MAIN NAV ITEMS
export const DASHBOARD = '/dashboard';
export const PROFILE = '/profile';
export const JOBS = '/jobs';
export const JOB = '/job';
export const ASSESSMENTS = '/assessments';
export const ASSESSMENT = '/assessment';
export const COURSES = '/courses';
export const EVENTS = '/events';
// SP3 MORE VIEWS
export const COURSE_REDIRECT = '/courseRedirect';
export const SCHEDULER = '/scheduler';

export const ONBOARDING = '/welcome';

export const AUTH_ROUTES = [
  SIGN_UP,
  LOG_OUT,
  SPEEDY_SIGN_UP,
  SIGN_IN,
  RESET_PASSWORD,
  VALIDATE_EMAIL,
  CREATE_PASSWORD,
  NO_PASSWORD,
  SMART_LINK,
];

// Prevent showing the back button if it goes to these routes
export const ROUTES_PREVENT_BACK = [...AUTH_ROUTES, LANDING, ONBOARDING];

// Hide the back button on these routes
export const ROUTES_HIDE_BACK = [
  ...ROUTES_PREVENT_BACK,
  DASHBOARD,
  PROFILE,
  JOBS,
  ASSESSMENTS,
  COURSES,
];
