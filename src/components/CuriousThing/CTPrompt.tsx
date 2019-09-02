import React from 'react';

import {
  makeStyles,
  createStyles,
  Typography,
  Button,
} from '@material-ui/core';
import ExternalIcon from '@material-ui/icons/OpenInNew';

import CTPoweredBy from './CTPoweredBy';

import {
  CURIOUS_PURPLE,
  CURIOUS_THING_COBRANDED_URL,
  externalLinkProps,
} from 'constants/curiousThing';

const useStyles = makeStyles(theme =>
  createStyles({
    buttonWrapper: {
      margin: theme.spacing(4, 0, 5),
      textAlign: 'center',
    },

    button: {
      backgroundColor: CURIOUS_PURPLE,
      '&:hover': { backgroundColor: CURIOUS_PURPLE },

      margin: theme.spacing(0, 1),
    },
  })
);

const CTPrompt: React.FunctionComponent = () => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        Tell us about yourself over a behavioural phone interview with Kristine,
        an AI bot by Curious Thing. It will take up to 10 minutes and you can
        repeat it as many times as you wish.
      </Typography>

      <div className={classes.buttonWrapper}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          {...externalLinkProps}
          href={CURIOUS_THING_COBRANDED_URL}
        >
          Let’s Start <ExternalIcon />
        </Button>

        <CTPoweredBy />
      </div>

      <Typography variant="body1" color="textSecondary" gutterBottom>
        Your results will be displayed here, but may take a few hours to do so.
      </Typography>
    </>
  );
};

export default CTPrompt;
