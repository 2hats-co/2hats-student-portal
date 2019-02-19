import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import LogoInCard from '../components/LogoInCard';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { auth, db } from '../store';
import { CLOUD_FUNCTIONS, cloudFunction } from '../utilities/CloudFunctions';
import * as routes from '../constants/routes';
import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';

const SmartLinkContainer = props => {
  const { history } = props;

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [snackbar, setSnackbar] = useState(null);

  useEffect(() => {
    handleKey();
  }, []);

  const handleKey = () => {
    const queryStr = history.location.search;
    if (queryStr) {
      const slKeyName = '?slKey=';

      if (queryStr.indexOf(slKeyName) !== -1) {
        const slKey = queryStr.slice(slKeyName.length, queryStr.length);

        if (slKey !== '') {
          const request = {
            slKey: slKey,
          };

          cloudFunction(
            CLOUD_FUNCTIONS.SMART_LINK,
            request,
            async result => {
              console.log(result);
              if (result.data.success) {
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
              console.log('Call smartLink error: ', error.message);
              setErrorMessage(error.message);
              setIsLoading(false);
            }
          );
        }
      }
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

export default withRouter(SmartLinkContainer);
