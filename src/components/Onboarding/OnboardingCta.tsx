import React from 'react';
import { withRouter, Link, RouteComponentProps } from 'react-router-dom';

import {
  makeStyles,
  createStyles,
  useTheme,
  useMediaQuery,
  Button,
} from '@material-ui/core';
import GoIcon from '@bit/twohats.common.icons.go';

import { getNextStageRoute } from 'utilities/onboarding';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      margin: theme.spacing(3, 1, 1),
      padding: theme.spacing(1.25, 4),

      // Remvoe top padding for when the buttons are on top of each other
      '&+&': { marginTop: theme.spacing(0) },
      verticalAlign: 'baseline',

      [theme.breakpoints.down('xs')]: { padding: theme.spacing(1, 3) },
    },
  })
);

export interface OnboardingCtaProps
  extends RouteComponentProps<{ stage: string }> {
  /** Action text used inside the button */
  action: React.ReactNode;
  /** Show the secondary style instead */
  secondary?: boolean;
  /** Optionally disable the button */
  disabled?: boolean;
}

/**
 * Padded CTA button for Onboarding screens. Also routes to the next stage
 */
const OnboardingCta: React.FC<OnboardingCtaProps> = ({
  location,
  match,
  action = 'Let’s go!',
  secondary = false,
  disabled = false,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const normalSize = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Button
      variant={secondary ? 'outlined' : 'contained'}
      color="primary"
      size={normalSize ? 'medium' : 'large'}
      className={classes.root}
      component={Link}
      to={{
        ...location,
        pathname: getNextStageRoute(match.params.stage),
      }}
      disabled={disabled}
    >
      {action}
      {!secondary && <GoIcon />}
    </Button>
  );
};

export default withRouter(OnboardingCta);
