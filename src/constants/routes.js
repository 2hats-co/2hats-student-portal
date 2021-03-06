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
export const PROFILE_PREFERRED_INDUSTRIES = 'preferredIndustries';
export const PROFILE_CURIOUS_THING = 'curiousThing';

export const PROFILE_SETTINGS = PROFILE + '/settings';
export const PROFILE_DELETE_ACCOUNT = PROFILE + '/deleteAccount';
export const ACCOUNT_DELETED = '/accountDeleted';

export const JOBS = '/jobs';
export const JOBS_NEW = JOBS + '/new';
export const JOBS_PAST = JOBS + '/past';
export const JOBS_YOURS = JOBS + '/yours';

export const ASSESSMENTS = '/assessments';
export const ASSESSMENTS_ONGOING = ASSESSMENTS + '/ongoing';
export const ASSESSMENTS_ALL = ASSESSMENTS + '/all';
export const ASSESSMENTS_COMPLETED = ASSESSMENTS + '/completed';

export const COURSES = '/courses';
export const COURSES_ONGOING = COURSES + '/ongoing';
export const COURSES_ALL = COURSES + '/all';
export const COURSES_COMPLETED = COURSES + '/completed';

export const JOB = '/job';
export const JOB_APPLICATION = '/apply';
export const ASSESSMENT = '/assessment';
export const COURSE = '/course';
export const COURSE_REDIRECT = '/courseRedirect';

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
