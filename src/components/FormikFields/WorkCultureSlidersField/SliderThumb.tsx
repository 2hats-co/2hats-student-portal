import React, { useContext, useRef, useEffect } from 'react';
import clsx from 'clsx';

import {
  makeStyles,
  createStyles,
  useTheme,
  useMediaQuery,
  IconButton,
  Typography,
} from '@material-ui/core';
import { SliderProps } from '@material-ui/core/Slider';
import { fade } from '@material-ui/core/styles';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { SliderContext } from './WorkCultureSlider';
import { DEFAULT_VALUE, POINTS, MAX_VALUE } from 'utilities/workCultureSliders';

// Calculate the percentages of the previous and next points for the animation
const PREV_POINT =
  (POINTS[Math.ceil((POINTS.length - 1) / 2 - 1)] / MAX_VALUE) * 100;
const NEXT_POINT =
  (POINTS[Math.floor((POINTS.length - 1) / 2 + 1)] / MAX_VALUE) * 100;
const DEFAULT_POINT = (DEFAULT_VALUE / MAX_VALUE) * 100;

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      color: theme.palette.primary.main,
      width: 24,
      height: 24,
      margin: 0,
      transform: 'translate(-12px, -11px)',
      borderRadius: 500,

      transition: theme.transitions.create(
        ['box-shadow', 'left', 'width', 'transform'],
        { duration: theme.transitions.duration.shortest }
      ),
    },
    // Show arrows when thumb in middle
    defaultValue: {
      width: 48,
      transform: 'translate(-24px, -11px)',
      color: fade(theme.palette.primary.main, 0.8),

      '$activeAnimation&': { animationName: '$thumb-animation' },
      '$activeAnimation$finishAnimation&': { animationName: '' },
      animationDuration: '3.5s',
      animationFillMode: 'both',
      animationTimingFunction: 'ease',
    },
    activeAnimation: {},
    finishAnimation: {},

    '@keyframes thumb-animation': {
      '0%': {
        opacity: 0,
        width: 24,
        transform: 'translate(-12px, -11px)',
        color: theme.palette.primary.main,
      },
      '7%': { opacity: 0 },
      '14%': { opacity: 1 },
      '28%': { left: `${PREV_POINT}%` },
      '42%': { left: `${NEXT_POINT}%` },
      '56%': {
        left: `${PREV_POINT}%`,
        width: 24,
        transform: 'translate(-12px, -11px)',
      },
      '70%': {
        left: `${DEFAULT_POINT}%`,
        width: 48,
        transform: 'translate(-24px, -11px)',
      },
      '84%': { color: theme.palette.primary.main },
      '100%': { color: fade(theme.palette.primary.main, 0.8) },
    },

    button: {
      color: theme.palette.primary.contrastText,
      '&:hover': { backgroundColor: 'transparent' },

      '$activeAnimation &': { animationName: '$fade-in' },
      animationDuration: '0.5s',
      animationFillMode: 'backwards',
      animationTimingFunction: 'ease-out',
    },

    leftButton: { animationDelay: '2.5s' },
    rightButton: { animationDelay: '2.75s' },

    '@keyframes fade-in': {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },

    pickYourSide: {
      position: 'absolute',
      width: 200,
      top: -29,
      textAlign: 'center',

      '$activeAnimation &': { animationName: '$text-pulse' },
      animationDuration: '1s',
      animationFillMode: 'both',
      animationTimingFunction: 'ease-in-out',
      animationDelay: '3s',
      animationIterationCount: 'infinite',
    },

    '@keyframes text-pulse': {
      '0%': { opacity: 0 },
      '50%': { opacity: 1 },
      '100%': { opacity: 0 },
    },
  })
);

/**
 * A component for MUI Slider that shows left/right arrows next to it.
 * Also shows an animation when in the default position.
 */
const SliderThumb: SliderProps['ThumbComponent'] = props => {
  const classes = useStyles();
  const theme = useTheme();

  const { value } = useContext(SliderContext);
  const isDefaultValue = value === DEFAULT_VALUE;

  const isXs = useMediaQuery(theme.breakpoints.down('xs'));

  const thumbRef = useRef<HTMLElement>(null);
  useEffect(() => {
    // On animation end, remove the animation so the transition on `left` works
    if (thumbRef && thumbRef.current)
      thumbRef.current.addEventListener('animationend', function(event) {
        if (event.target !== this) return;
        this.classList.add(classes.finishAnimation);
      });
  }, [thumbRef]);

  return (
    <span
      {...props}
      className={clsx(
        props.className,
        classes.root,
        isDefaultValue && classes.defaultValue,
        classes.activeAnimation
      )}
      ref={thumbRef}
    >
      {isDefaultValue && (
        <>
          <IconButton
            size="small"
            color="inherit"
            className={clsx(classes.button, classes.leftButton)}
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            size="small"
            color="inherit"
            className={clsx(classes.button, classes.rightButton)}
          >
            <ChevronRightIcon />
          </IconButton>

          <Typography
            variant="overline"
            color="primary"
            className={classes.pickYourSide}
            component="div"
          >
            Pick{!isXs && ' Your Side'}
          </Typography>
        </>
      )}
    </span>
  );
};

export default SliderThumb;
