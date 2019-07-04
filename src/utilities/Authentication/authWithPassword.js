import { auth, db } from '../../store/index';
import { DASHBOARD } from '../../constants/routes';
import firebase from 'firebase/app';
import ReactPixel from 'react-facebook-pixel';
import { getDoc, updateDoc } from '../firestore';
import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';

export const createUserWithPassword = (user, routeHandler, errorHandler) => {
  const { firstName, lastName, email, password, homeReferrerId } = user;

  auth
    .createUserWithEmailAndPassword(email, password)
    .then(authUser => {
      ReactPixel.trackCustom('CompleteRegistration');
      authUser.user
        .updateProfile({
          displayName: `${firstName} ${lastName}`,
        })
        .then(() => {
          const uid = authUser.user.uid;
          const normlizedEmail = email.toLowerCase();
          db.collection('users')
            .doc(uid)
            .set({
              emailVerified: false,
              email: normlizedEmail,
              firstName,
              lastName,
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              lastSignedInAt: firebase.firestore.FieldValue.serverTimestamp(),
              signupMethod: 'password',
            });
          db.collection('profiles')
            .doc(uid)
            .set({
              bio: '',
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              firstName,
              lastName,
            });
          routeHandler(DASHBOARD);
        });
    })
    .catch(error => {
      errorHandler(error);
    });
};

export const signInWithPassword = (user, successHandler, errorHandler) => {
  const { email, password, homeReferrerId } = user;
  auth
    .signInWithEmailAndPassword(email, password)
    .then(async authUser => {
      const uid = authUser.user.uid;
      const userDoc = await getDoc(COLLECTIONS.users, uid);

      const userDocUpdates = {
        lastSignedInAt: firebase.firestore.FieldValue.serverTimestamp(),
      };

      if (!userDoc.homeReferrerId)
        userDocUpdates.homeReferrerId = homeReferrerId;

      updateDoc(COLLECTIONS.users, uid, userDocUpdates);

      successHandler(authUser);
    })
    .catch(error => {
      errorHandler(error);
    });
};

export const updateUserPassword = (password, routeHandler, errorHandler) => {
  auth.currentUser
    .updatePassword(password)
    .then(() => {
      // Update successful.
      db.collection('users')
        .doc(auth.currentUser.uid)
        .update({
          noPassword: false,
          providers: [{ id: auth.currentUser.uid, service: 'password' }],
        });
      routeHandler();
    })
    .catch(error => {
      // An error happened.
      errorHandler(error);
    });
};
