import React from 'react';
import { HashLink } from 'react-router-hash-link';

import {
  makeStyles,
  createStyles,
  useTheme,
  useMediaQuery,
  Button,
} from '@material-ui/core';
import PersonSpeakingIcon from '@material-ui/icons/RecordVoiceOver';
import GoIcon from '@bit/twohats.common.icons.go';

import { CURIOUS_PURPLE } from 'constants/curiousThing';
import { PROFILE, PROFILE_CURIOUS_THING } from 'constants/routes';

const useStyles = makeStyles(theme =>
  createStyles({
    hashLink: { textDecoration: 'none' },

    root: {
      backgroundColor: CURIOUS_PURPLE,
      '&:hover': { backgroundColor: CURIOUS_PURPLE },
      padding: theme.spacing(1.5, 2),
      textDecoration: 'none',
    },

    label: {
      '& svg$phoneIcon': { margin: theme.spacing(0, 1.5, 0, 0.5) },
    },
    phoneIcon: {},
  })
);

export interface ICTDashboardButtonProps {
  /** Optional class override */
  className?: string;
}

/**
 * The button to display on the dashboard that links to the Curious Thing
 * section on the Profile page
 */
const CTDashboardButton: React.FunctionComponent<ICTDashboardButtonProps> = ({
  className,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const smallerButton = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <HashLink
      className={classes.hashLink}
      to={PROFILE + '#' + PROFILE_CURIOUS_THING}
    >
      <Button
        variant="contained"
        color="primary"
        size={'large'}
        className={className}
        classes={{ root: classes.root, label: classes.label }}
        id="curious-thing-dashboard-button"
      >
        <PersonSpeakingIcon className={classes.phoneIcon} />
        {!smallerButton && 'Start '}Discovery Interview
        <GoIcon />
      </Button>
    </HashLink>
  );
};

export default CTDashboardButton;
