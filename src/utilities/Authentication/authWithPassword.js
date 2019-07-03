import { auth, db } from '../../firebase/index';
import { LANDING } from '../../constants/routes';
import firebase from 'firebase/app';
import ReactPixel from 'react-facebook-pixel';

export const createUserWithPassword = (user, routeHandler, errorHandler) => {
  const { firstName, lastName, email, password } = user;

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
          routeHandler(LANDING);
        });
    })
    .catch(error => {
      errorHandler(error);
    });
};

export const signInWithPassword = (user, successHandler, errorHandler) => {
  const { email, password } = user;
  auth
    .signInWithEmailAndPassword(email, password)
    .then(successHandler)
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
