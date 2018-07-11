import { auth,
 // googleProvider
 } from '../store';

// Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

// Sign In
export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

export const doSignInWithCustomToken = (token) =>
 auth.signInWithCustomToken(token);
// Sign In/up with google
// export const doAuthWithGoogle  = () =>
//    auth.signInWithPopup(googleProvider);
// export const doAuthWithGoogle = () => dispatch => {
//     auth
//       .signInWithPopup(googleProvider)
//       .then(result => {})
//       .catch(error => {
//         console.log(error);
//       });
// };
// Sign out
export const doSignOut = () =>
  auth.signOut();


// Password Reset
export const doPasswordReset = (email) =>
  auth.sendPasswordResetEmail(email);

// Password Change
export const doPasswordUpdate = (password) =>
  auth.currentUser.updatePassword(password);
