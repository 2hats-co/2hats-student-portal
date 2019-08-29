import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles, createStyles, Button } from '@material-ui/core';
import PhoneIcon from '@material-ui/icons/PhoneInTalk';
import GoIcon from '@bit/twohats.common.icons.go';

import { CURIOUS_PURPLE } from 'constants/curiousThing';
import { PROFILE, PROFILE_CURIOUS_THING } from 'constants/routes';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      backgroundColor: CURIOUS_PURPLE,
      '&:hover': { backgroundColor: CURIOUS_PURPLE },
      padding: theme.spacing(1.5, 2),
    },

    label: {
      '& svg$phoneIcon': { margin: theme.spacing(0, 1, 0, 0) },
    },
    phoneIcon: {},
  })
);

export interface ICTDashboardButtonProps {
  /** Optional class override */
  className?: string;
}

const CTDashboardButton: React.FunctionComponent<ICTDashboardButtonProps> = ({
  className,
}) => {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      className={className}
      classes={{ root: classes.root, label: classes.label }}
      component={Link}
      to={PROFILE + '#' + PROFILE_CURIOUS_THING}
    >
      <PhoneIcon className={classes.phoneIcon} />
      Talk About Yourself
      <GoIcon />
    </Button>
  );
};

export default CTDashboardButton;
