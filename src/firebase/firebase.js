import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const prodConfig = {
  apiKey: "AIzaSyAao6BwLXZzmhzLSGSypBFYw-zAM9wbI44",
  authDomain: "hatstest-860eb.firebaseapp.com",
  databaseURL: "https://hatstest-860eb.firebaseio.com",
  projectId: "hatstest-860eb",
  storageBucket: "hatstest-860eb.appspot.com",
  messagingSenderId: "839771603283"
};

const devConfig = {
  apiKey: "AIzaSyAQ7SF4GnCvUGPUehqR6l1uGYkRRmNqZV0",
  authDomain: "dev2hats.firebaseapp.com",
  databaseURL: "https://dev2hats.firebaseio.com",
  projectId: "dev2hats",
  storageBucket: "",
  messagingSenderId: "983671595153"
};

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);

const auth = firebase.auth();

export {
  firestore,
  auth,
};