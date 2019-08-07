import { auth } from '../../store';
import { CLOUD_FUNCTIONS, cloudFunction } from '../CloudFunctions';
import ReactPixel from 'react-facebook-pixel';

export const speedyAuth = (userInfo, router, errorBar) =>
  cloudFunction(
    CLOUD_FUNCTIONS.SPEEDY_SIGNUP,
    userInfo,
    result => {
      auth.signInWithCustomToken(result.data.token).then(() => {
        ReactPixel.trackCustom('CompleteRegistration');
        router(result.data.route);
      });
      console.log('success: ', result);
    },
    error => {
      errorBar(error);
      console.log('speedy error: ', error);
    }
  );
