const PROJECT_NAME = 'staging2hats'
const PRODUCTION_PROJECT_NAME = 'production2hats'
const dev2hatsKey = 'AIzaSyAQ7SF4GnCvUGPUehqR6l1uGYkRRmNqZV0'
const staging2hatsKey = "AIzaSyC5X6WfsorYvEG_wZacfhg7Y6QP4IgJ9DI"
const production2hatsKey = AIzaSyD9EnwYfFxTvnaDMA7r6MbKoXmZbQmukrg
export const stagingConfig = {
    apiKey: key,
    authDomain: `${PROJECT_NAME}.firebaseapp.com`,
    databaseURL: `https://${PROJECT_NAME}.firebaseio.com`,
    projectId: PROJECT_NAME,
    storageBucket: `${PROJECT_NAME}.appspot.com`,
    messagingSenderId: "188089188588"
  };

// export const productionConfig = {
//     apiKey: "AIzaSyAao6BwLXZzmhzLSGSypBFYw-zAM9wbI44",
//     authDomain: "hatstest-860eb.firebaseapp.com",
//     databaseURL: "https://hatstest-860eb.firebaseio.com",
//     projectId: "hatstest-860eb",
//     storageBucket: "hatstest-860eb.appspot.com",
//     messagingSenderId: "839771603283"
//   };

export const productionConfig = {
    apiKey: production2hatsKey,
    authDomain: `${PRODUCTION_PROJECT_NAME}.firebaseapp.com`,
    databaseURL: `https://${PRODUCTION_PROJECT_NAME}.firebaseio.com`,
    projectId: PRODUCTION_PROJECT_NAME,
    storageBucket: `${PRODUCTION_PROJECT_NAME}.appspot.com`,
    messagingSenderId: "188089188588"
  };