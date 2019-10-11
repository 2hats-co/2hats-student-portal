import React from 'react';
import { Link } from 'react-router-dom';

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
import { CARD_COLS_MEDIA_QUERIES } from 'constants/cards';

const useStyles = makeStyles(theme =>
  createStyles({
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
  const fullButton = useMediaQuery(CARD_COLS_MEDIA_QUERIES[2]);

  return (
    <Button
      variant="contained"
      color="primary"
      size={'large'}
      className={className}
      classes={{ root: classes.root, label: classes.label }}
      id="curious-thing-dashboard-button"
      component={Link}
      to={PROFILE + '#' + PROFILE_CURIOUS_THING}
    >
      <PersonSpeakingIcon className={classes.phoneIcon} />
      {fullButton && 'Start '}Discovery Interview
      <GoIcon />
    </Button>
  );
};

export default CTDashboardButton;
