var utils = require('./utils');

console.log('Running production deploy config script...');

utils.writeEnv('PRODUCTION');
utils.writeFirebaserc('PRODUCTION');
utils.writeFirebaseJson('PRODUCTION');
