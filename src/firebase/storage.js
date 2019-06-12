import firebase from 'firebase/app';
import 'firebase/storage';
import '../store';
export const firebaseStorage = firebase.storage().ref();
