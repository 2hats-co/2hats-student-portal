import { auth, db } from '../../firebase/index';
import { LANDING } from '../../constants/routes';
import firebase from 'firebase/app';
import ReactPixel from 'react-facebook-pixel';
import { getDoc, updateDoc } from '../firestore';
import { COLLECTIONS } from '@bit/twohats.common.constants';

export const createUserWithPassword = (user, routeHandler, errorHandler) => {
  const { firstName, lastName, email, password, homeReferrerId } = user;

  auth
    .createUserWithEmailAndPassword(email, password)
    .then(authUser => {
      setTimeout(() => {
        ReactPixel.trackCustom('CompleteRegistration');
      }, 1000);
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
              updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
              lastSignedInAt: firebase.firestore.FieldValue.serverTimestamp(),
              signupMethod: 'password',
              homeReferrerId,
            });
          db.collection('profiles')
            .doc(uid)
            .set({
              bio: '',
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
              updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
              firstName,
              lastName,
            });
          routeHandler(LANDING);
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
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
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
          lastSignedInAt: firebase.firestore.FieldValue.serverTimestamp(),
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
      routeHandler();
    })
    .catch(error => {
      // An error happened.
      errorHandler(error);
    });
};
