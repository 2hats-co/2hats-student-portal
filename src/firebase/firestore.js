import { firestore } from './firebase';


export const doCreateUser = (id, firstName,lastName, email) =>
firestore.collection('users').doc(id).set({
    firstName,
    lastName,
    email,
  });

