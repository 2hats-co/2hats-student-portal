import { auth } from '../../store';
import { CLOUD_FUNCTIONS, cloudFunction } from '../CloudFunctions';

export const getTokenWithGoogle = async (user, callback) => {
  const request = {
    jwtToken: user.jwtToken,
  };
  if (user.avatarURL) {
  }
  cloudFunction(
    CLOUD_FUNCTIONS.AUTHENTICATE_GOOGLE,
    request,
    result => {
      auth.signInWithCustomToken(result.data.token).then(() => {
        callback(result.data.route);
      });
      console.log('Call authenticate3rdParty success: ', result);
    },
    error => {
      console.log('Call authenticate3rdParty error: ', error);
    }
  );
};

export const getTokenWithLinkedIn = async (authCodeObj, callback) => {
  const request = {
    authCode: authCodeObj.code,
    state: authCodeObj.state,
    redirectUri: authCodeObj.redirectUri,
  };
  console.log('request', request);
  cloudFunction(
    CLOUD_FUNCTIONS.AUTHENTICATE_LINKEDIN,
    request,
    result => {
      // auth.signInWithCustomToken(result.data.tokens).then(() => {
      callback(result);
      // });
      console.log('Call getTokenWithLinkedIn success: ', result);
    },
    error => {
      console.log('Call getTokenWithLinkedIn error: ', error);
    }
  );
};
