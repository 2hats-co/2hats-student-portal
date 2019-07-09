import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import GoIcon from 'assets/icons/Go';

import { getNextStageRoute } from 'utilities/onboarding';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(1.25, 4),
  },
}));

/**
 * Padded CTA button for Onboarding screens. Also routes to the next stage
 */
const OnboardingCta = ({ match, action }) => {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      className={classes.root}
      component={Link}
      to={getNextStageRoute(match.params.stage)}
    >
      {action}
      <GoIcon />
    </Button>
  );
};

OnboardingCta.propTypes = {
  /** From React Router */
  match: PropTypes.object.isRequired,
  /** Action text used inside the button */
  action: PropTypes.node.isRequired,
};
OnboardingCta.defaultProps = {
  action: 'Let’s go!',
};

export default withRouter(OnboardingCta);
