var fs = require('fs');

/**
 * Generates a callback function to pass to `fs` calls
 * @param {string} fileName The filename to display in the logs
 */
function fsCallback(fileName) {
  return function(err) {
    if (err) throw err;
    console.log(`Successfully wrote ${fileName}`);
  };
}

module.exports.writeEnv = function(env) {
  fs.writeFile(
    './.env',
    `REACT_APP_ENV='${env}'
SKIP_PREFLIGHT_CHECK=true
  `,
    fsCallback('.env')
  );
};

module.exports.writeFirebaserc = function(env) {
  let fileContents = '';

  if (env === 'PRODUCTION')
    fileContents = {
      projects: { default: 'production2hats' },
      targets: { production2hats: { hosting: { SP3: ['sp3-2hats'] } } },
    };
  else if (env === 'STAGING')
    fileContents = { projects: { default: 'staging2hats' } };

  fs.writeFile(
    './.firebaserc',
    JSON.stringify(fileContents),
    fsCallback('.firebaserc')
  );
};

module.exports.writeFirebaseJson = function(env) {
  let fileContents = {
    hosting: {
      public: 'build',
      ignore: ['firebase.json', '**/.*', '**/node_modules/**'],
      rewrites: [
        {
          source: '**',
          destination: '/index.html',
        },
      ],
      headers: [
        {
          source: '**/*',
          headers: [
            {
              key: 'Cache-Control',
              value: 'no-cache, max-age=60',
            },
          ],
        },
        {
          source: '**/*.@(css|js|jpg|jpeg|gif|png)',
          headers: [
            {
              key: 'Cache-Control',
              value: 'max-age=31536000, immutable',
            },
          ],
        },
      ],
    },
  };

  if (env === 'PRODUCTION') fileContents.hosting.target = 'SP3';

  fs.writeFile(
    './firebase.json',
    JSON.stringify(fileContents),
    fsCallback('firebase.json')
  );
};
