import React from 'react';
import clsx from 'clsx';

import { makeStyles, createStyles } from '@material-ui/core';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const useStyles = makeStyles(theme =>
  createStyles({
    root: { opacity: 0.5 },

    icon: {
      position: 'absolute',
      transition: theme.transitions.create('box-shadow', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    iconLeft: { left: theme.spacing(-3) },
    iconRight: { right: theme.spacing(-3) },
  })
);

interface ISliderThumbProps {}

/**
 * A component for MUI Slider that shows left/right arrows next to it.
 */
const SliderThumb: React.FunctionComponent<ISliderThumbProps> = props => {
  const classes = useStyles();

  return (
    <span {...props}>
      <ChevronLeftIcon
        color="primary"
        className={clsx(classes.icon, classes.iconLeft)}
      />
      <ChevronRightIcon
        color="primary"
        className={clsx(classes.icon, classes.iconRight)}
      />
    </span>
  );
};

export default SliderThumb;
