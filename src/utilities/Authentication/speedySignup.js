import { auth } from '../../firebase';
import { CLOUD_FUNCTIONS, cloudFunction } from '../CloudFunctions';
import ReactPixel from 'react-facebook-pixel';

export const speedyAuth = (userInfo, router, errorBar) =>
  cloudFunction(
    CLOUD_FUNCTIONS.SPEEDY_SIGNUP,
    userInfo,
    result => {
      auth.signInWithCustomToken(result.data.token).then(() => {
        setTimeout(() => {
          ReactPixel.trackCustom('CompleteRegistration');
        }, 1000);
        router(result.data.route);
      });
      console.log('success: ', result);
    },
    error => {
      errorBar(error);
      console.log('speedy error: ', error);
    }
  );
