import { functions } from '../store';

export const CLOUD_FUNCTIONS = {
  TAG_TRACKER: 'callablesEventTracker',
  RESUME_SCRAPER: 'callablesAlgoliaResumes',
  SPEEDY_SIGNUP: 'callablesAuthSpeedySignup',
  AUTHENTICATE_GOOGLE: 'callablesAuthGoogle',
  AUTHENTICATE_LINKEDIN: 'callablesAuthenticateLinkedIn', // not used
  CHECK_EMAIL: 'callablesCheckEmail',
  SMART_LINK: 'callablesSmartLinkActivate',
  RESET_PASSWORD: 'callablesAuthResetPassword',
  CREATE_PASSWORD: 'callablesAuthCreatePassword',
  DISABLE_SMART_LINK: 'callablesSmartLinkDisable',
  LEARN_WORLD_SSO: 'callablesLearnWorldSignon',
  CHARGE_STRIPE_TOKEN: 'callablesStripeChargeToken', //not used
  LW_SINGLE_SIGN_ON: 'callablesLearnWorldSignon',
  WHATS_NEXT_AI: 'callablesWhatsNextAI',
  CREATE_SMART_LINK: 'callablesSmartLinkCreate',
  CHECK_FREE_TIMESLOTS: 'callablesCalendarFreeTimeslots',
  CACHED_STATS: 'callablesCachedStats',
};

export const cloudFunction = (name, input, success, fail) => {
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
