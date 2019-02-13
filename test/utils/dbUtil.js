const admin = require('firebase-admin');
const ramda = require('ramda');
const PROJECT = 'production2hats';
const PROJECT_KEY = {
  type: 'service_account',
  project_id: 'production2hats',
  private_key_id: 'a19495b51b5d6d65822597bc68d3c2fc58049267',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC2W0kPg18lCM2Z\n9j5A9sFgs1gF2J050hE5lf/Fasv1WeFKj/QblvUj9KZrcxwKps5I5MxGnem+gFCs\npZ2K0Q0l76QzjliQ7PWgqTpPzNoYm1fMiwYi9YuL2aTWahJrXPhyBoXnJZ9r2FdJ\nk4SWA2Nj+v30uMNfe/sywbgAHtEZ1igmENxrlANmrHqOWDaSMBwIfxYrRu3v7546\ne1Ssl5s/8mbtnDHtKQ2xwdMJjUtUZZPHK8ejx3BME+ByErICJT5+KYqLuuVxQVV2\nzhh1V7DIzxaAWVZoJm2K0QWxgy98UEW/qGOsQUPE/U247N5XtiuzCGXrnZQiYhRx\nMmCnBCr1AgMBAAECggEALNX1+Tf6QT9QWe4G8W8aLb36wvk28xv4uzlruSzgd/NA\n5tXNFamAnXYOIvYa622G47pJlYVHDt06uLBBs3th6bVpoHl7wipY3EcvfKZn60vq\ngvKdsCPCS0DYfBV5cOdbeKGs85+2+kunboI0Q7QSkGcKYMy60LPJl/m0VWc+T0UD\nMf18xTAq5JA42YuX4QIskcu5HoUjZ1awKwm3c5DB855C5r9r3XLuGmGvIlBGseMW\n66yujnMLV3Wjddldtbj7CcxiWkDezHS024lDe/2v404Zcp6e8CKHsyFdH28mQkR/\nM31RoFHPHBx9SYobID6BjolgMP1/M3lIDFY7tyaJAwKBgQDu6vNae80FykG7us9I\nqj+wFpr8SMd3MsiDOQU/IXoFUen3oTJuwAZm9NskqPNYTzeoxzOPg5XQIbHW6PaO\n9HsjEVj4OGHq4BxfwoJA6vR8COp37qDbUYq/ZPv9FkeQj8Fu/dyNiZXUlddb33JO\neWobYgBCbjHIOZPtCXP8hpMR+wKBgQDDZRASGmdnSB38wDFoSs4Sc8PZ6ysUY5AU\nqb/TQdL6h7kqLj732ktWfn/JbO5sA+t03ZyX8KI01LYEzy8AjX2cUHUGzRah8UMw\nNp4ra+WmkPphiODVaVd8lbWi5CKopf2O1+cxS2fd4109+Rqn2kSBKdCoFFr6DfVA\nkaBIqtkTzwKBgQCZk1+Qh0n38dYlJWT+8aj0uOMxTlshbPxlFW8g8JTt/ISnz++K\nL1cuMTD4tL2Pw4Qksr+a/dt8KVyWp7NtmwvYM9t720pd32d9yptNvXogjN6i7zpp\nIFZOx0wPmJWyACY4AWkXdhxgxVzkypJAjV0+ctV13j2T1icXVF9BMQQypwKBgF3w\ndK1/bD9HeMNPU3GkpTZR2dMnMOr4gwisI8FZYCl6nxccbMGUfavz3VPlvyrHJ6hj\n8ylJU3K64VemlB5b6AwC0oCWkU8CQx8m4xxVH2/ZO8cwm4d+wcTv5QePTupuA11t\nh4U3j5Qp/2YQITSZx12h0OM+Bg86LrMAUGMfYIYZAoGBAORxiEYmJojdsCOh4yB0\nOy/TUR0I5myh66tLCSVxvID8r1jXlgnA3E/qWyboAsPbyjjCM/GzBZf+5QIPugih\nt7AiI3F7W/SLZbxs6PWiqiFLQU878kNF1pqbeG4CNBIrXaLflXBY55vhSLBalbz4\nZnLlz8d4hBxyQioHffOB4Pu0\n-----END PRIVATE KEY-----\n',
  client_email:
    'firebase-adminsdk-ye02m@production2hats.iam.gserviceaccount.com',
  client_id: '109270531465496564555',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ye02m%40production2hats.iam.gserviceaccount.com',
};

admin.initializeApp(
  {
    credential: admin.credential.cert(PROJECT_KEY),
    databaseURL: `https://${PROJECT}.firebaseio.com`,
    storageBucket: `${PROJECT}.appspot.com`,
  },
  PROJECT
);
admin
  .app(PROJECT)
  .firestore()
  .settings({ timestampsInSnapshots: true });

const db = admin.app(PROJECT).firestore();
const auth = admin.app(PROJECT).auth();
const { CONST } = require('../constants');

const singleDocCollections = [
  'candidates',
  'users',
  'profiles',
  'algoliaCandidates',
  'assessments',
];
const multiDocCollections = [
  'mailchimp',
  'smartLinks',
  'submissions',
  'emails',
  'communications',
];

/**
 *
 * @param {String} email
 * @param {Object} data
 * @param {String} message
 */
async function checkEmailDoc(email, data, message = '') {
  //Set delay
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('done');
    }, 10000);
  });

  const query = await db
    .collection('emails')
    .where('to', '==', email)
    .get();
  let matches = false;
  query.docs.forEach(doc => {
    const docData = doc.data();

    Object.keys(data).forEach(key => {
      if (ramda.equals(data[key], docData[key])) {
        matches = true;
      }
    });
  });
  console.log(`\x1b[1m${message}\x1b[0m`);
  if (matches) {
    console.log(`emailDoc-${email}\x1b[32m matches data!\x1b[0m`);
    return true;
  } else {
    console.log(`emailDoc-${email}\x1b[31m doesnt matches data\x1b[0m`);
    return false;
  }
}

/**
 *
 * @param {String} email
 * @param {Object} data
 * @param {String} message
 */
async function checkCommDoc(email, data, message = '') {
  //Set delay
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('done');
    }, 10000);
  });
  const query = await db
    .collection('communications')
    .where('candidateEmail', '==', email)
    .get();
  let matches = false;
  query.docs.forEach(doc => {
    const docData = doc.data();

    Object.keys(data).forEach(key => {
      if (ramda.equals(data[key], docData[key])) {
        matches = true;
      }
    });
  });
  console.log(`\x1b[1m${message}\x1b[0m`);
  if (matches) {
    console.log(`commDoc-${email}\x1b[32m matches data!\x1b[0m`);
    return true;
  } else {
    console.log(`commDoc-${email}\x1b[31m doesnt matches data\x1b[0m`);
    return false;
  }
}

async function checkSmartLink(email, templateName, data, message = '') {
  //Set delay
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('done');
    }, 10000);
  });
  //Grab UID from emaill
  const query = await db
    .collection('users')
    .where('email', '==', email)
    .get();
  if (query.empty) {
    console.log(`\x1b[31mUID for user does not exist\x1b[0m`);
    return false;
  }
  const UID = query.docs[0].id;

  const smartLinkQuery = await db
    .collection('smartLinks')
    .where('UID', '==', UID)
    .where('templateName', '==', templateName)
    .get();
  if (smartLinkQuery.empty) {
    console.log(`\x1b[1m${message}\x1b[0m`);
    console.log(
      `smartLink for ${UID}-${templateName}\x1b[31m does not exist\x1b[0m`
    );
    return false;
  }
  const smartLinkData = smartLinkQuery.docs[0].data();
  let matches = true;
  Object.keys(data).forEach(key => {
    if (!ramda.equals(data[key], smartLinkData[key])) {
      matches = false;
    }
  });
  if (matches) {
    console.log(`\x1b[1m${message}\x1b[0m`);
    console.log(`smartLink-${templateName}\x1b[32m matches data!\x1b[0m`);
    return true;
  } else {
    console.log(`\x1b[1m${message}\x1b[0m`);
    console.log(`smartLink-${templateName}\x1b[31m doesnt matches data\x1b[0m`);
    return false;
  }
}

/**
 *
 * @param {String} docPath
 * @param {Object} data
 */
async function checkDocMatches(email, collection, data, message = '') {
  //Set delay
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('done');
    }, 10000);
  });
  //Grab UID from emaill
  const query = await db
    .collection('users')
    .where('email', '==', email)
    .get();
  if (query.empty) {
    console.log(`\x1b[1m${message}\x1b[0m`);
    console.log(`\x1b[31mUID for user does not exist\x1b[0m`);
    return false;
  }
  const UID = query.docs[0].id;

  //Check document data
  const docPath = `${collection}/${UID}`;
  const docRef = await db.doc(docPath).get();
  if (!docRef.exists) {
    console.log(`\x1b[1m${message}\x1b[0m`);
    console.log(`${docPath}\x1b[31m does not exist\x1b[0m`);
    return false;
  }
  const docData = docRef.data();
  let matches = true;
  Object.keys(data).forEach(key => {
    if (!ramda.equals(data[key], docData[key])) {
      matches = false;
    }
  });
  if (matches) {
    console.log(`\x1b[1m${message}\x1b[0m`);
    console.log(`${docPath}\x1b[32m matches data!\x1b[0m`);
    return true;
  } else {
    console.log(`\x1b[1m${message}\x1b[0m`);
    console.log(`${docPath}\x1b[31m doesnt matches data\x1b[0m`);
    return false;
  }
}

/**
 *
 * @param {String} UID
 * @param {Array} fields
 */
async function checkUserCreated(email, fields, message = '') {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('done');
    }, 10000);
  });
  const userQuery = await db
    .collection('users')
    .where('email', '==', email)
    .get();
  if (userQuery.empty) {
    console.log(`\x1b[1m${message}\x1b[0m`);
    console.log('User not created');
    return false;
  } else {
    const userDoc = userQuery.docs[0];
    const userData = userDoc.data();
    fields.forEach(field => {
      const exists = !!userData[field];
      console.log(
        `${email}-${field}-${
          exists ? '\x1b[32m Yes\x1b[0m' : '\x1b[31m No\x1b[0m'
        }`
      );
    });
  }
}

async function checkDb() {
  //
  try {
    const docRef = await db
      .collection('users')
      .doc(CONST.sampleUserId)
      .get();
    const data = docRef.data();
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
}

async function clearUserData(email) {
  //FIRST: grab their UID
  const userQuery = await db
    .collection('users')
    .where('email', '==', email)
    .get();
  if (userQuery.empty) {
    console.log('\x1b[5m\x1b[31mNo user document found for:\x1b[0m', email);
    return;
  }
  console.log('\x1b[5m\x1b[32mUser document found for:\x1b[0m', email);
  const userDoc = userQuery.docs[0];
  const UID = userDoc.id;

  //Clear AUTH
  try {
    await auth.deleteUser(UID);
    console.log('AUTH: Successfully deleted user', UID);
  } catch (error) {
    console.log('AUTH: Error deleting user:', error);
  }

  //Clear collections by email
  const collectionsByEmail = [
    { collection: 'users', field: 'email' },
    { collection: 'algoliaCandidates', field: 'email' },
    { collection: 'campaignSubscriptions', field: 'email' },
    { collection: 'candidates', field: 'email' },
    { collection: 'communications', field: 'candidateEmail' },
    { collection: 'emails', field: 'to' },
  ];

  //Delete
  collectionsByEmail.forEach(async x => {
    const query = await db
      .collection(x.collection)
      .where(x.field, '==', email)
      .get();
    query.docs.forEach(async doc => {
      const res = await doc.ref.delete();
      console.log(res);
    });
  });

  //Clear collections by UID
  const collectionsByUID = [
    { collection: 'submission', field: 'UID' },
    { collection: 'smartLinks', field: 'UID' },
  ];
  collectionsByUID.forEach(async x => {
    const query = await db
      .collection(x.collection)
      .where(x.field, '==', UID)
      .get();
    query.docs.forEach(async doc => {
      const res = await doc.ref.delete();
      console.log(res);
    });
  });

  //Clear profiles by UID
  const res = await db
    .collection('profiles')
    .doc(UID)
    .delete();
  console.log(res);

  //Clear collections by UID inside subcollection
  const subCollectionsByUID = [
    { collection: 'jobs', subcollection: 'submissions', field: 'UID' },
    { collection: 'assessments', subcollection: 'submissions', field: 'UID' },
  ];
  subCollectionsByUID.forEach(async x => {
    const query = await db.collection(x.collection).get();
    query.docs.forEach(async y => {
      const subQuery = await db
        .collection(x.collection)
        .doc(y.id)
        .collection(x.subcollection)
        .where(x.field, '==', UID)
        .get();
      subQuery.docs.forEach(async doc => {
        console.log(doc.id);
        await doc.ref.delete();
      });
    });
  });

  return;
}

async function setProfileData(email, data) {
  const query = await db
    .collection('users')
    .where('email', '==', email)
    .get();
  if (query.empty) {
    console.log(`UID for ${email} not found`);
    return;
  }
  const UID = query.docs[0].id;
  await db
    .collection('profiles')
    .doc(UID)
    .update({ ...data });
}

async function getProfileData(email) {
  const query = await db
    .collection('users')
    .where('email', '==', email)
    .get();
  if (query.empty) {
    console.log(`UID for ${email} not found`);
    return;
  }
  const UID = query.docs[0].id;
  const doc = await db
    .collection('profiles')
    .doc(UID)
    .get();
  return doc.data();
}

module.exports = {
  checkDb,
  checkUserCreated,
  clearUserData,
  setProfileData,
  getProfileData,
  checkDocMatches,
  checkSmartLink,
  checkCommDoc,
  checkEmailDoc,
};
