import { auth } from '../../firebase';
import { CLOUD_FUNCTIONS, cloudFunction } from '../CloudFunctions';

import firebase from 'firebase/app';
import { getDoc, updateDoc } from '../firestore';
import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';

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
      console.log(result.data);

      auth.signInWithCustomToken(result.data.token).then(async authUser => {
        const uid = authUser.user.uid;
        const userDoc = await getDoc(COLLECTIONS.users, uid);

        const userDocUpdates = {
          lastSignedInAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        };

        if (!userDoc.homeReferrerId)
          userDocUpdates.homeReferrerId = user.homeReferrerId;

        updateDoc(COLLECTIONS.users, uid, userDocUpdates);

        callback(result.data.route); // this route is NOT USED
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
