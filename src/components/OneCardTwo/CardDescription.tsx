import React from 'react';

import { makeStyles, createStyles, Typography } from '@material-ui/core';
import { fade } from '@material-ui/core/styles';

import { cleanTextForDisplay } from 'utilities';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      height: 80,
      overflow: 'hidden',

      // fade out instead of ellipsis since there isn't a cross-browser solution
      // see https://css-tricks.com/line-clampin/
      position: 'relative',

      '&::after': {
        content: '""',
        textAlign: 'right',
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: '50%',
        height: '1.43em', // from MUI
        background: `linear-gradient(to right, ${fade(
          theme.palette.background.paper,
          0
        )}, ${theme.palette.background.paper})`,
      },
    },
  })
);

export interface CardDescriptionProps {
  description: React.ReactNode;
}

/**
 * Displays card description string as plain text. Strips HTML tags.
 *
 * Fixed height: 80
 */
const CardDescription: React.FC<CardDescriptionProps> = ({ description }) => {
  const classes = useStyles();

  return (
    <Typography
      variant="body2"
      color="textSecondary"
      component="p"
      classes={classes}
    >
      {cleanTextForDisplay(description).substr(0, 200)}
    </Typography>
  );
};

export default CardDescription;
