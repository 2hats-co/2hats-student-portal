var fs = require('fs');

console.log('Running production deploy config script...');

fs.writeFile(
  './.env',
  `REACT_APP_ENV='PRODUCTION'
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
      "default": "production2hats"
    },
    "targets": {
      "production2hats": {
        "hosting": {
          "SP3": ["sp3-2hats"]
        }
      }
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
      "target": "SP3",
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
        },
      ]
    }
  }
  
  `,
  function(err) {
    if (err) throw err;
    console.log('Successfully wrote .firebase.json');
  }
);
