import React from 'react';

import { makeStyles, createStyles, Typography } from '@material-ui/core';

import PersonArmsOnHips from 'assets/images/graphics/PersonArmsOnHips.svg';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      padding: theme.spacing(0, 3, 3),
      textAlign: 'center',
      userSelect: 'none',
    },

    graphic: {
      userDrag: 'none',
      width: ({ graphicWidth }: { graphicWidth: number }) => graphicWidth,
      marginBottom: theme.spacing(1),
    },

    message: {
      maxWidth: 300,
      margin: '0 auto',
    },
  })
);

export interface IEmptyStateProps {
  /** URL to graphic image */
  graphic?: string;
  /** Optionally, change the width */
  graphicWidth?: number;
  /** Set the message to display underneath the graphic */
  message?: React.ReactNode;
}

const EmptyState: React.FunctionComponent<IEmptyStateProps> = ({
  graphic = PersonArmsOnHips,
  graphicWidth = 30,
  message = 'Hmm… there seems to be nothing here',
}) => {
  const classes = useStyles({ graphicWidth });

  return (
    <div className={classes.root}>
      <img src={graphic} alt="2hats" className={classes.graphic} />
      <Typography
        variant="body1"
        className={classes.message}
        color="textSecondary"
      >
        {message}
      </Typography>
    </div>
  );
};

export default EmptyState;
