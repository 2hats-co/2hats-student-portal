const PROJECT_NAME = 'staging2hats'

export const developmentConfig = {
    apiKey: "AIzaSyAQ7SF4GnCvUGPUehqR6l1uGYkRRmNqZV0",
    authDomain: "staging2hats.firebaseapp.com",
    databaseURL: `https://${PROJECT_NAME}.firebaseio.com`,
    projectId: PROJECT_NAME,
    storageBucket: "${PROJECT_NAME}.appspot.com",
    messagingSenderId: "983671595153"
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
    apiKey: "AIzaSyAQ7SF4GnCvUGPUehqR6l1uGYkRRmNqZV0",
    authDomain: `${PROJECT_NAME}.firebaseapp.com`,
    databaseURL: `https://${PROJECT_NAME}.firebaseio.com`,
    projectId: PROJECT_NAME,
    storageBucket: `${PROJECT_NAME}.appspot.com`,
    messagingSenderId: "983671595153"
  };