var utils = require('./utils');

console.log('Running staging deploy config script...');

utils.writeEnv('STAGING');
utils.writeFirebaserc('STAGING');
utils.writeFirebaseJson('STAGING');
