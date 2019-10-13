import React, { useEffect, useState } from 'react';
import LogoInCard from '../components/LogoInCard';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { auth, db } from '../firebase';
import { CLOUD_FUNCTIONS, cloudFunction } from '../utilities/CloudFunctions';
import * as routes from '../constants/routes';
import { COLLECTIONS } from '@bit/twohats.common.constants';

import queryString from 'query-string';

const SmartLinkContainer = props => {
  const { history } = props;

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [snackbar, setSnackbar] = useState(null);

  useEffect(() => {
    const queryStr = history.location.search;
    const parsedQuery = queryString.parse(queryStr);
    console.log(parsedQuery);
    handleKey(parsedQuery.slKey, parsedQuery.slSecret, history.location);
  }, []);

  const handleKey = (slKey, slSecret, location) => {
    if (slKey) {
      if (slKey !== '') {
        const request = {
          slKey: slKey,
          slSecret: slSecret,
        };

        cloudFunction(
          CLOUD_FUNCTIONS.SMART_LINK,
          request,
          async result => {
            console.log(result);
            if (result.data.token) {
              // Sign in user with custom token.
              auth.signInWithCustomToken(result.data.token).then(authUser => {
                // Redirect page based on the route.
                const route = result.data.route;
                //routing to target page
                if (
                  route === routes.CREATE_PASSWORD ||
                  route === routes.RESET_PASSWORD
                ) {
                  const firstName = authUser.user.displayName.split(' ')[[0]];
                  history.replace(
                    route + `?firstName=${firstName}&smartKey=${slKey}`
                  );
                } else if (route === routes.VALIDATE_EMAIL) {
                  db.collection(COLLECTIONS.users)
                    .doc(authUser.user.uid)
                    .update({ emailVerified: true });
                  history.replace(route);
                } else {
                  history.replace(route);
                }
              });
            } else {
              const route = result.data.route;
              if (
                route === routes.CREATE_PASSWORD ||
                route === routes.RESET_PASSWORD
              ) {
                cloudFunction(
                  route === routes.CREATE_PASSWORD
                    ? CLOUD_FUNCTIONS.CREATE_PASSWORD
                    : CLOUD_FUNCTIONS.RESET_PASSWORD,
                  { email: result.data.email.toLowerCase() },
                  setSnackbar({
                    variant: 'success',
                    message: 'You should receive the email shortly',
                  }),
                  e => {
                    setSnackbar({
                      variant: 'error',
                      message:
                        'An error has occured. Please try again in a moment',
                    });
                    console.log(e);
                  }
                );

                setErrorMessage(
                  `This link has expired.

                    Check your email again—we’ve sent you a fresh one!`
                );

                setIsLoading(false);
              } else {
                history.replace(
                  `${routes.SIGN_IN}?email=${result.data.email}&route=${
                    result.data.route
                  }`
                );
              }
            }
          },
          error => {
            console.error('Call smartLink error: ', error.message);
            if (slKey.includes('<route>')) {
              const redirectRoute = decodeURIComponent(
                location.search.split('?slKey=')[1]
              )
                .replace('{{<route>', '')
                .replace('<route>}}', '');
              setErrorMessage('Redirecting you…');
              setIsLoading(false);
              history.replace(redirectRoute);
            } else {
              setErrorMessage(error.message);
              setIsLoading(false);
            }
          }
        );
      }
    } else {
      setErrorMessage('Invalid link');
      setIsLoading(false);
    }
  };

  return (
    <Grid
      container
      style={{ height: '100vh' }}
      alignItems="center"
      justify="center"
    >
      <Grid item>
        <LogoInCard isLoading={isLoading} height={330} snackBar={snackbar}>
          <Typography
            variant="h6"
            style={{
              paddingTop: 50,
              width: '100%',
              textAlign: 'center',
              whiteSpace: 'pre-line',
            }}
          >
            {isLoading ? 'Hold on to your hat 🤠' : errorMessage}
          </Typography>
        </LogoInCard>
      </Grid>
    </Grid>
  );
};

export default SmartLinkContainer;
