import { functions } from '../store';

export const CLOUD_FUNCTIONS = {
  TAG_TRACKER: 'restApiEventTracker',
  RESUME_SCRAPER: 'callablesAlgoliaResumes',
  SPEEDY_SIGNUP: 'restApiSpeedySignup',
  AUTHENTICATE_3RD_PARTY: 'restApiAuthenticate3rdParty',
  AUTHENTICATE_GOOGLE: 'restApiAuthenticateGoogle',
  AUTHENTICATE_LINKEDIN: 'restApiAuthenticateLinkedIn',
  CHECK_EMAIL: 'restApiCheckEmail',
  SMART_LINK: 'restApiSmartLink',
  RESET_PASSWORD: 'restApiResetPassword',
  CREATE_PASSWORD: 'restApiCreatePassword',
  VALIDATE_EMAIL: 'restApiVaildateEmail',
  DISABLE_SMART_LINK: 'restApiDisableSmartLink',
  LEARN_WORLD_SSO: 'callablesLearnWorldSSO',
  CHARGE_STRIPE_TOKEN: 'callablesChargeStripeToken',
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
