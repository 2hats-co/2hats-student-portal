import { functions } from '../firebase';

export const CLOUD_FUNCTIONS = {
  TAG_TRACKER: 'callablesEventTracker',
  RESUME_SCRAPER: 'callablesAlgoliaResumes',
  SPEEDY_SIGNUP: 'callablesAuthSpeedySignup',
  AUTHENTICATE_GOOGLE: 'callablesAuthGoogle',
  AUTHENTICATE_LINKEDIN: 'callablesAuthenticateLinkedIn', // not used
  CHECK_EMAIL: 'callablesCheckEmail',
  // SMART_LINK: 'callablesSmartLinkActivate',//From old code
  SMART_LINK: 'smartLinkActivate', //From new code
  // RESET_PASSWORD: 'callablesAuthResetPassword',//From old code
  RESET_PASSWORD: 'authResetPassword', //From ts2
  // CREATE_PASSWORD: 'callablesAuthCreatePassword',//From old code
  CREATE_PASSWORD: 'authCreatePassword', //From ts2
  // DISABLE_SMART_LINK: 'callablesSmartLinkDisable', //From old code
  DISABLE_SMART_LINK: 'smartLinkDisable', //From new code
  LEARN_WORLD_SSO: 'callablesLearnWorldSignon',
  CHARGE_STRIPE_TOKEN: 'callablesStripeChargeToken', //not used
  LW_SINGLE_SIGN_ON: 'callablesLearnWorldSignon',
  WHATS_NEXT_AI: 'callablesWhatsNextAI',
  // CREATE_SMART_LINK: 'callablesSmartLinkCreate', //From old code
  CREATE_SMART_LINK: 'smartLinkCreate', //From new code
  CHECK_FREE_TIMESLOTS: 'callablesCalendarFreeTimeslots',
  CACHED_STATS: 'callablesCachedStats',
};

/**
 * Original CloudFunction wrapper function, with success/fail callbacks
 * @param name - CloudFunction name
 * @param input - input to the CloudFunction
 * @param success - callback on success
 * @param fail - callback on fail
 */
export const cloudFunction = (
  name: string,
  input: any,
  success: (result: any) => void,
  fail: (result: any) => void
) => {
  const callable = functions.httpsCallable(name);

  callable(input)
    .then(result => {
      if (success) {
        success(result);
      }
    })
    .catch(error => {
      if (fail) {
        fail(error);
      }
    });
};

/**
 * Updated CloudFunction wrapper function. Returns the promise directly.
 * @param name - CloudFunction name
 * @param input - input to the CloudFunction
 * @param options - optional CloudFunction options
 */
export const cloudFn = (
  name: string,
  input: any,
  options?: firebase.functions.HttpsCallableOptions
) => functions.httpsCallable(name, options)(input);
