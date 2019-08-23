import React, { useState, useEffect } from 'react';
import { FieldProps, ErrorMessage } from 'formik';

import {
  makeStyles,
  createStyles,
  FormLabel,
  Typography,
  FormHelperText,
} from '@material-ui/core';

import WorkCultureSlider from './WorkCultureSlider';

import {
  WORK_CULTURE_SLIDER_LABELS,
  WorkCultureSliderField,
} from '@bit/twohats.common.constants';
import {
  sanitiseValue,
  getDefaultSliderValues,
} from 'utilities/workCultureSliders';

/**
 * Flips the left/right arrangement of certain sliders randomly.
 * Happens every time this JS file is evaluated by the browser,
 * i.e. for every user session.
 */
const flipped: boolean[] = [];
Object.keys(WORK_CULTURE_SLIDER_LABELS).forEach((x, i) => {
  flipped[i] = Math.random() >= 0.5;
});

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      border: 'none',
      margin: 0,
      padding: 0,
    },
  })
);

interface IWorkCultureSlidersFieldProps extends FieldProps {}

/**
 * A Formik field to handle Work Culture sliders
 */
const WorkCultureSlidersField: React.FunctionComponent<
  IWorkCultureSlidersFieldProps
> = ({ field, form }) => {
  const classes = useStyles();

  // Store values in this local state
  const [sliderValues, setSliderValues] = useState<WorkCultureSliderField>(
    // Get default values from default values in Formik state
    getDefaultSliderValues(field.value)
  );
  // Updater helper function to update the state. Prevents multiple state
  // updates if values are the same
  const updateValue = (valueName: string) => (newValue: number) => {
    if (newValue !== sliderValues[valueName])
      setSliderValues((oldValues: WorkCultureSliderField) => ({
        ...oldValues,
        [valueName]: sanitiseValue(newValue),
      }));
  };

  // Sync local state with Formik form state for this field
  useEffect(() => {
    form.setFieldValue(field.name, sliderValues);
  }, [sliderValues]);

  return (
    <div id={`field-${field.name}`}>
      <FormLabel htmlFor={`field-${field.name}`}>
        <Typography
          variant="overline"
          color={
            form.errors[field.name] && form.touched[field.name]
              ? 'error'
              : 'textSecondary'
          }
        >
          My Workplace Culture
        </Typography>
      </FormLabel>

      <fieldset className={classes.root}>
        {Object.keys(WORK_CULTURE_SLIDER_LABELS).map((x, i) => {
          const name = x as keyof typeof WORK_CULTURE_SLIDER_LABELS;
          return (
            <WorkCultureSlider
              key={x}
              minLabel={WORK_CULTURE_SLIDER_LABELS[name][0]}
              maxLabel={WORK_CULTURE_SLIDER_LABELS[name][1]}
              flipped={flipped[i]}
              value={sliderValues[x]}
              onChange={updateValue(x)}
            />
          );
        })}
      </fieldset>

      <ErrorMessage name={field.name}>
        {() => <FormHelperText error>Required</FormHelperText>}
      </ErrorMessage>
    </div>
  );
};

export default WorkCultureSlidersField;
