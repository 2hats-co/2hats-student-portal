import React from 'react';
import clsx from 'clsx';

import {
  makeStyles,
  createStyles,
  Grid,
  Typography,
  Slider,
  IconButton,
} from '@material-ui/core';
import { fade } from '@material-ui/core/styles';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SliderThumb from './SliderThumb';

import {
  MIN_VALUE,
  MAX_VALUE,
  DEFAULT_VALUE,
  STEP,
  SLIDER_COLOR,
  SLIDER_LIGHT_COLOR,
  incrementSlider,
  decrementSlider,
  useSliderHover,
} from 'utilities/workCultureSliders';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      color: SLIDER_COLOR,
      marginTop: theme.spacing(2),
      transition: theme.transitions.create('opacity'),
    },
    disabled: {
      opacity: 0.5,
      userSelect: 'none',
    },

    labelWrapper: { overflow: 'hidden' },

    sliderWrapper: {
      margin: theme.spacing(0, -1.5),
      width: 'auto',
    },

    sliderRoot: {
      color: 'inherit',
      height: 20,
      boxSizing: 'border-box',
      padding: '11px 0 9px',

      '&$sliderDisabled': { color: 'inherit' },
    },
    sliderRail: { backgroundColor: 'currentColor', opacity: 1 },
    sliderMark: {
      backgroundColor: SLIDER_LIGHT_COLOR,
      borderRadius: '50%',
      width: 6,
      height: 6,
      marginLeft: -3,
      marginTop: -2,
    },

    chevronButton: {
      '&:hover': {
        backgroundColor: fade(SLIDER_COLOR, theme.palette.action.hoverOpacity),
      },
    },

    sliderDisabled: {
      '& $sliderThumb': { display: 'none' },
    },
    sliderThumb: {},
  })
);

/**
 * A context to pass down the current Slider:
 * - `displayValue` to trigger whether to show the middle animation or not,
 *   and where to display the thumb
 * - `hoverValue` to move the thumb on hover
 * - `showInitialThumbAnimation` from props
 */
export const SliderContext = React.createContext({
  value: DEFAULT_VALUE,
  hoverValue: -1,
  showInitialThumbAnimation: false,
});

interface IWorkCultureSliderProps {
  /** Label for the "min value" — should be opposite of `sliderName` */
  minLabel: string;
  /**
   * Label for the "max value" — should be the same as `sliderName`
   * (but in display format)
   */
  maxLabel: string;
  /**
   * Whether or not to flip the left/right arrangement of the slider + labels
   *
   * If true, min = right & max = left; otherwise, min = left & max = right
   */
  flipped: boolean;
  /** The value from Formik */
  value: number | undefined;
  /** Called by MUI Slider’s onChange callback */
  onChange: (value: number) => void;
  /** Disable the slider if it’s not the next one for the user to input */
  disabled?: boolean;
  /** Whether or not to show the initial animation for `SliderThumb` */
  showInitialThumbAnimation?: boolean;
}

/**
 * An individual slider, using a styled MUI Slider. Has its own context
 * to make `SliderThumb` work.
 */
const WorkCultureSlider: React.FunctionComponent<IWorkCultureSliderProps> = ({
  minLabel,
  maxLabel,
  flipped = false,
  value,
  onChange,
  disabled = true,
  showInitialThumbAnimation = false,
}) => {
  const classes = useStyles();

  // Get the current hover value using this hook, which was broken out
  // of this component’s main logic
  const [sliderRef, hoverValue] = useSliderHover(disabled);

  // Show the DEFAULT_VALUE (in the middle) if value is initially undefined
  // Otherwise, show the flipped value or the original value
  const displayValue =
    value === undefined ? DEFAULT_VALUE : flipped ? MAX_VALUE - value : value;

  // Gets the actual value, accounting for flip
  const getFlipCorrectedValue = (val: number) =>
    flipped ? MAX_VALUE - val : val;

  // Move increment/decrement logic to utilities
  const increment = () =>
    onChange(
      incrementSlider(value === undefined ? Math.floor(DEFAULT_VALUE) : value)
    );
  const decrement = () =>
    onChange(
      decrementSlider(value === undefined ? Math.ceil(DEFAULT_VALUE) : value)
    );

  return (
    <div className={clsx(classes.root, disabled && classes.disabled)}>
      <div
        className={classes.labelWrapper} // Wrapper to prevent horizontal scrolling on mobile
      >
        <Grid
          container
          spacing={7} // Add spacing for "Pick" text
          alignItems="flex-end"
          direction={flipped ? 'row-reverse' : 'row'}
        >
          <Grid item xs={6}>
            <Typography
              variant="overline"
              color="inherit"
              component="p"
              align={flipped ? 'right' : 'left'}
            >
              {minLabel}
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography
              variant="overline"
              color="inherit"
              component="p"
              align={flipped ? 'left' : 'right'}
            >
              {maxLabel}
            </Typography>
          </Grid>
        </Grid>
      </div>

      <Grid
        container
        alignItems="center"
        className={classes.sliderWrapper}
        spacing={2}
      >
        <Grid item>
          <IconButton
            color="inherit"
            onClick={flipped ? increment : decrement}
            size="small"
            className={classes.chevronButton}
            disabled={disabled || displayValue === MIN_VALUE}
          >
            <ChevronLeftIcon />
          </IconButton>
        </Grid>

        <Grid item xs>
          <SliderContext.Provider
            value={{
              value: displayValue,
              hoverValue,
              showInitialThumbAnimation,
            }}
          >
            <Slider
              value={displayValue}
              onChange={(e, v) => {
                // Only call the onChange method if the values are not the same
                if (v !== displayValue)
                  onChange(getFlipCorrectedValue(Array.isArray(v) ? v[0] : v));
              }}
              min={MIN_VALUE}
              max={MAX_VALUE}
              step={STEP}
              valueLabelDisplay="off"
              marks
              classes={{
                root: classes.sliderRoot,
                rail: classes.sliderRail,
                mark: classes.sliderMark,
                markActive: classes.sliderMark,
                disabled: classes.sliderDisabled,
                thumb: classes.sliderThumb,
              }}
              ThumbComponent={disabled ? 'span' : SliderThumb}
              disabled={disabled}
              ref={sliderRef}
            />
          </SliderContext.Provider>
        </Grid>

        <Grid item>
          <IconButton
            color="inherit"
            onClick={flipped ? decrement : increment}
            size="small"
            className={classes.chevronButton}
            disabled={disabled || displayValue === MAX_VALUE}
          >
            <ChevronRightIcon />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};

export default WorkCultureSlider;
