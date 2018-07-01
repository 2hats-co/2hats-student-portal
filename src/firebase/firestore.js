import { firestore } from './firebase';


export const doCreateUser = (id, username, email) =>
firestore.collection('users').doc(id).set({
    username,
    email,
  });

