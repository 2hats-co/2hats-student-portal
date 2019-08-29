import React from 'react';

import {
  makeStyles,
  createStyles,
  Typography,
  Button,
} from '@material-ui/core';
import ExternalIcon from '@material-ui/icons/OpenInNew';

import HeadingCaps from '@bit/twohats.common.components.heading-caps';
import CTPoweredBy from './CTPoweredBy';

import { ProfileComponentProps } from 'containers/ProfileContainer';
import { PROFILE_CURIOUS_THING } from 'constants/routes';
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

interface ICuriousThingProps extends ProfileComponentProps {}

const CuriousThing: React.FunctionComponent<ICuriousThingProps> = ({
  profileData,
}) => {
  const classes = useStyles();

  return (
    <section id={PROFILE_CURIOUS_THING}>
      <HeadingCaps>My Workplace Vibe</HeadingCaps>

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
    </section>
  );
};

export default CuriousThing;
