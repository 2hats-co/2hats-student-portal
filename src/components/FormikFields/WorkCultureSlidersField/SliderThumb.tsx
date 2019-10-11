import React, { useContext, useRef, useEffect, useState } from 'react';
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
    // The 3 animation states used to trigger animations
    initialAnimation: {},
    restingAnimation: {},
    noneAnimation: {},

    root: {
      color: theme.palette.primary.main,
      width: 24,
      height: 24,
      margin: 0,
      transform: 'translate(-12px, -11px)',
      borderRadius: 500,

      transition: theme.transitions.create(
        ['box-shadow', 'left', 'width', 'transform', 'color'],
        { duration: theme.transitions.duration.shortest }
      ),
    },

    // Show arrows when thumb in middle
    defaultValue: {
      width: 48,
      transform: 'translate(-24px, -11px)',
      color: fade(theme.palette.primary.main, 0.8),

      // Initial animation
      '$initialAnimation&': {
        animationName: '$thumb-initial-animation',
        animationDuration: '3.5s',
        animationFillMode: 'both',
        animationTimingFunction: 'ease',
      },
    },

    // Fade on hover so user knows to click (hopefully)
    hoverState: { color: fade(theme.palette.primary.main, 0.6) },

    '@keyframes thumb-initial-animation': {
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

    // Left/right arrow buttons
    arrowButton: {
      color: theme.palette.primary.contrastText,
      '&:hover': { backgroundColor: 'transparent' },

      // Fade arrow buttons in whenever they are re-mounted
      // i.e. when we switch to `restingAnimation` state and
      //      when we go from hover state back to `restingAnimation`
      animationName: '$arrowButtons-initial-animation',
      animationDuration: '0.5s',
      animationFillMode: 'backwards',
      animationTimingFunction: 'ease-out',
    },
    // Staggered fade-in
    leftButton: {
      animationDelay: '0.1s',
      // Increased delay for `initialAnimation`
      '$initialAnimation &': { animationDelay: '2.5s' },
    },
    rightButton: {
      animationDelay: '0.35s',
      '$initialAnimation &': { animationDelay: '2.75s' },
    },

    '@keyframes arrowButtons-initial-animation': {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },

    // Pick your side text + animation
    pickYourSide: {
      position: 'absolute',
      width: 200,
      top: -29,
      textAlign: 'center',

      '$restingAnimation &': {
        animationName: '$text-pulse',
        animationDuration: '1s',
        animationFillMode: 'both',
        animationTimingFunction: 'ease-in-out',
        animationIterationCount: 'infinite',
      },
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

  const { value, hoverValue, showInitialThumbAnimation } = useContext(
    SliderContext
  );
  const isDefaultValue = value === DEFAULT_VALUE;

  // Get the current animation state
  const [animationState, setAnimationState] = useState<
    'initialAnimation' | 'restingAnimation' | 'noneAnimation'
  >(
    value !== DEFAULT_VALUE // If not in default value, no animation
      ? 'noneAnimation'
      : showInitialThumbAnimation
      ? 'initialAnimation'
      : 'restingAnimation'
  );

  const isXs = useMediaQuery(theme.breakpoints.down('xs'));

  const thumbRef = useRef<HTMLElement>(null);
  useEffect(() => {
    // On `initialAnimation` end, remove the animation
    // so the transition on `left` works
    // and we can move on to the next animation state, `restingAnimation`
    if (thumbRef && thumbRef.current)
      thumbRef.current.addEventListener('animationend', function(event) {
        if (event.target !== this) return;
        if (animationState === 'initialAnimation')
          setAnimationState('restingAnimation');
      });
  }, [thumbRef]);

  // Whether or not the user is currently hovering
  const hoverState = value !== hoverValue && hoverValue >= 0;

  useEffect(() => {
    if (hoverState && animationState === 'initialAnimation')
      setAnimationState('restingAnimation');
  }, [hoverState, animationState]);

  return (
    <span
      {...props}
      className={clsx(
        props.className,
        classes.root,
        // Show arrows when thumb in middle
        isDefaultValue && !hoverState && classes.defaultValue,
        // Show correct animation state when not hovering
        !hoverState && classes[animationState],
        // Hover state
        hoverState && classes.hoverState
      )}
      ref={thumbRef}
      // Put in the proper position, based on current value or `hoverValue`
      style={{ left: hoverValue >= 0 ? `${hoverValue}%` : `${value}%` }}
    >
      {isDefaultValue && !hoverState && (
        // Display arrows wehn thumb in middle
        <>
          <IconButton
            size="small"
            color="inherit"
            className={clsx(classes.arrowButton, classes.leftButton)}
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            size="small"
            color="inherit"
            className={clsx(classes.arrowButton, classes.rightButton)}
          >
            <ChevronRightIcon />
          </IconButton>
        </>
      )}
      {isDefaultValue && !hoverState && animationState === 'restingAnimation' && (
        // Display Pick text when thumb in middle and in correct animation state
        <Typography
          variant="overline"
          color="primary"
          className={classes.pickYourSide}
          component="div"
        >
          Pick{!isXs && ' Your Side'}
        </Typography>
      )}
    </span>
  );
};

export default SliderThumb;
