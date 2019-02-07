const admin = require('firebase-admin');
const PROJECT = 'staging2hats';
const PROJECT_KEY = {
  type: 'service_account',
  project_id: 'staging2hats',
  private_key_id: 'e60360dd65942a87627187cc26f7f1bbd01f9bbe',
  private_key:
    '-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCfdylpuw9POV76\nNIN5NKWfTGZB9Zk7A6u+5DWbR0/HJAbQ8NffCe5QL70D1gHTXdjhQ+9njvn0+eXp\nBz5yPk0Tmb1n22gslHkzrFzJU0RAYhymR6Ubl3KTeMBS411DD+1Upqx2jiLK1tPa\nttTg82cYJAmBT7iaMVTa4Cv75RpzYEbNPNorEkiRuTqhj7inck537CsMvsgWvEgD\nov2sEX8sQSroXpRe9SR9s7ysK1RMq2ZgaHNclKE1J67HTesDyv/63yk0XfFUgQ0K\n2iNY1tZ0YSGG0H/6EeWHjsHUALjXkq5DbOUBkjh+nHLjCgasLCPiCfs18wExntZ6\nH2qBCUSnAgMBAAECggEACgZbvCHeXISmy+PxP/VnVBRheVQPRf59FYsTM6fQBBzn\nsMrzRzpAmRnnMA6MHtWPhNnYexIp9JShN30VF+mCvvCzT4wjiGntFKqJSr7JU6LX\nWjy2zH1A3rSAorVYb5bYvLGdtfZJiabnuqAz0dB7crERR+fTGx5uzzO4kCVe/FG/\npeuPYpY5X9PL8xo4BwlTX4nyF0JWJT7Jfe8QzmOEeZxUTMRWDKk4rdQeyvNPwdAb\njpF06ALxxb2xedEu6aFaXp/7yuMGbIlIjmI6qctYiRUUNVBchRvmmXdQ4P4h1sJW\npl8YLCnGhQLOy2QNuKR4P5ou83p/rGGRP9YGb9FfwQKBgQDasekayZa4a+3Vh7Rg\n0UfgfmDaNfg6asdzHMumX3hM2VGvHU0mag3FQEkZdkgVhX8b4pv1q51k09StRllM\n8TUujzQktXOu3HiwR2aUUOmLr7aN8CQNLT44i6sZ6Sx9E5EBe8lpByw0ALnxM5/4\n0pF3gz6tQ+VeXv7RwDDeoCej2wKBgQC6qsk6RsnbVDMNL1hqJpwc5VSI71rYwgTR\nIPc7ntilVGBzxY+DxDwKy0kLqBZG6Pu9Zp8KRpks7Yk8sAN8GIilLmFMZSPXIBD+\nVmqLzGZvxk5JX7XHdk65E+EGWD/s7ALUgLH9g/h920E2vKieNe0ibI++brtrtzVK\nunlXUjqiJQKBgQCmiA2asWFNRBqSnEjV5OeX4oR8BdblHQSN+qJ1KYPg+SeDcoua\nMe4Ug1RmyDQx9zsIj/H1DF7JNalg3Q4JUjAOKUwqm+XghNB+Y5CQZmDBVudrhC7f\nvdEAnBKJo46WG/0ypQGFMcoOO3NcYdRyVF4jJNToeahCyZG/RVuxW0F0OwKBgQCQ\nKBzHOKvjCh9y60FomPCvEBw8tDyAcTWvG7pS/NVquMLUJZoztHR6EYwTyHeLw5nG\nJ15jXSomHDuD9pp6V6gPiMXzbZhEJqt4/9vAotXpNEh5OcT0iVU6cTOy5qxXl9yH\np+vNUQGykITIdOHzbMn5b8WC15k+EnrBf0j+Oq61UQKBgQDUUA5c34uGcnLgyG6P\n2TME+Z5eNnZBCBrnH6mxpzWNUtkil3kRCYKeyqls7DBxrEKoG+N8Qz8HHLXodpuo\nKFbrGS+kO78pmD03mhlEm0jMtyYroP6CRmDSVCjOoxasvyik4x3vcYuEvGSz+CsD\nVa4bioXSIMfAWUWU2Oqf5edxEw==\n-----END PRIVATE KEY-----\n',
  client_email: 'firebase-adminsdk-x1z8t@staging2hats.iam.gserviceaccount.com',
  client_id: '117775015509104956535',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_x509_cert_url:
    'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-x1z8t%40staging2hats.iam.gserviceaccount.com',
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
 * @param {String} UID
 * @param {Array} fields
 */
async function checkUserCreated(email, fields, message = '') {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('done');
    }, 10000);
  });
  console.log(`\x1b[1m${message}\x1b[0m`);
  const userQuery = await db
    .collection('users')
    .where('email', '==', email)
    .get();
  if (userQuery.empty) {
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
  const collectionsByUID = [{ collection: 'submission', field: 'UID' }];
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
};
