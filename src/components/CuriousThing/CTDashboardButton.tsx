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

import { useUser } from 'contexts/UserContext';

import { CURIOUS_PURPLE } from 'constants/curiousThing';
import { PROFILE, PROFILE_CURIOUS_THING } from 'constants/routes';
import { CARD_COLS_MEDIA_QUERIES } from 'constants/cards';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      backgroundColor: CURIOUS_PURPLE,
      '&:hover': { backgroundColor: CURIOUS_PURPLE },
      padding: theme.spacing(1.5, 2),
      paddingLeft: theme.spacing(3),
      textDecoration: 'none',
    },

    startIcon: {
      // marginLeft: 0,
      marginRight: theme.spacing(1.5),
    },
  })
);

export interface ICTDashboardButtonProps {
  /** Optional class override */
  className?: string;
}

/**
 * The button to display on the dashboard that links to the Curious Thing
 * section on the Profile page. Displays either Start Discovery Interview
 * or View Results if the user has completed the interview
 */
const CTDashboardButton: React.FunctionComponent<ICTDashboardButtonProps> = ({
  className,
}) => {
  const classes = useStyles();
  const fullButton = useMediaQuery(CARD_COLS_MEDIA_QUERIES[2]);

  const { profile } = useUser();

  let buttonText = 'Discovery Interview';
  if (fullButton) buttonText = 'Start Discovery Interview';
  if (!!profile.curiousThingResult) buttonText = 'View Results';

  return (
    <Button
      variant="contained"
      color="primary"
      size={'large'}
      className={className}
      classes={{ root: classes.root, startIcon: classes.startIcon }}
      id="curious-thing-dashboard-button"
      component={Link}
      to={PROFILE + '#' + PROFILE_CURIOUS_THING}
      startIcon={<PersonSpeakingIcon />}
      endIcon={<GoIcon />}
    >
      {buttonText}
    </Button>
  );
};

export default CTDashboardButton;
