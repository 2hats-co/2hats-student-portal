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
import { SliderProps } from '@material-ui/core/Slider';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { WORK_CULTURE_SLIDER_VALUES } from '@bit/twohats.common.constants';

export const SLIDER_COLOR = '#2979b7';
export const SLIDER_LIGHT_COLOR = '#90b2cc';

const minValue = WORK_CULTURE_SLIDER_VALUES[0];
const maxValue =
  WORK_CULTURE_SLIDER_VALUES[WORK_CULTURE_SLIDER_VALUES.length - 1];
const defaultValue = (minValue + maxValue) / 2;

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      color: SLIDER_COLOR,
      marginTop: theme.spacing(2),
    },

    sliderWrapper: {
      margin: theme.spacing(0, -1.5),
      width: 'auto',
    },

    sliderRoot: {
      color: 'inherit',
      height: 20,
      boxSizing: 'border-box',
      padding: '11px 0 9px',
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
    sliderThumb: {
      color: theme.palette.primary.main,
      width: 20,
      height: 20,
      marginTop: -9,
      marginLeft: -10,
    },
    sliderThumbUndefined: { opacity: 0.5 },
  })
);

interface IWorkCultureSliderProps {
  // /**
  //  * Canonical name for the slider value, with a higher score indicating a
  //  * preference for the label that matches `sliderName`
  //  */
  // sliderName: string;
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
  value: number | undefined;
  onChange: (value: number) => void;
}

const WorkCultureSlider: React.FunctionComponent<IWorkCultureSliderProps> = ({
  minLabel,
  maxLabel,
  flipped = false,
  value,
  onChange,
}) => {
  const classes = useStyles();

  // Show the defaultValue (in the middle) if value is initially undefined
  // Otherwise, show the flipped value or the original value
  const displayValue =
    value === undefined ? defaultValue : flipped ? maxValue - value : value;

  const getCorrectValue = (val: number) => (flipped ? maxValue - val : val);

  const increment = () =>
    onChange(Math.min((value || Math.floor(defaultValue)) + 1, maxValue));
  const decrement = () =>
    onChange(Math.max((value || Math.ceil(defaultValue)) - 1, minValue));

  return (
    <div className={classes.root}>
      <Grid
        container
        justify="space-between"
        direction={flipped ? 'row-reverse' : 'row'}
      >
        <Typography variant="overline" color="inherit">
          {minLabel}
        </Typography>
        <Typography variant="overline" color="inherit">
          {maxLabel}
        </Typography>
      </Grid>

      <Grid container alignItems="center" className={classes.sliderWrapper}>
        <Grid item>
          <IconButton color="inherit" onClick={flipped ? increment : decrement}>
            <ChevronLeftIcon />
          </IconButton>
        </Grid>

        <Grid item xs>
          <Slider
            value={displayValue}
            onChange={(e, v) => {
              if (v !== displayValue)
                onChange(getCorrectValue(Array.isArray(v) ? v[0] : v));
            }}
            min={minValue}
            max={maxValue}
            step={1}
            valueLabelDisplay="off"
            marks
            classes={{
              root: classes.sliderRoot,
              rail: classes.sliderRail,
              mark: classes.sliderMark,
              markActive: classes.sliderMark,
              thumb: clsx(
                classes.sliderThumb,
                value === undefined && classes.sliderThumbUndefined
              ),
            }}
          />
        </Grid>

        <Grid item>
          <IconButton color="inherit" onClick={flipped ? decrement : increment}>
            <ChevronRightIcon />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
};

export default WorkCultureSlider;
