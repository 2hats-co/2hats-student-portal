var fs = require('fs');

console.log('Running staging deploy config script...');

fs.writeFile(
  './.env',
  `REACT_APP_ENV='STAGING'
SKIP_PREFLIGHT_CHECK=true
`,
  function(err) {
    if (err) throw err;
    console.log('Successfully wrote .env');
  }
);

fs.writeFile(
  './.firebaserc',
  `{
    "projects": {
      "default": "staging2hats"
    }
  }
  `,
  function(err) {
    if (err) throw err;
    console.log('Successfully wrote .firebaserc');
  }
);

fs.writeFile(
  './firebase.json',
  `{
    "hosting": {
      "public": "build",
      "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
      "rewrites": [
        {
          "source": "**",
          "destination": "/index.html"
        }
      ],
      "headers": [
        {
          "source": "**/*",
          "headers": [
            {
              "key": "Cache-Control",
              "value": "no-cache, max-age=60"
            }
          ]
        },
        {
          "source": "**/*.@(css|js|jpg|jpeg|gif|png)",
          "headers": [
            {
              "key": "Cache-Control",
              "value": "max-age=31536000, immutable"
            }
          ]
        }
      ]
    }
  }
  
  `,
  function(err) {
    if (err) throw err;
    console.log('Successfully wrote .firebase.json');
  }
);
