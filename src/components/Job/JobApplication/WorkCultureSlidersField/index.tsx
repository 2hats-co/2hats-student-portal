import React, { useState, useEffect } from 'react';
import { FieldProps, ErrorMessage } from 'formik';

import {
  makeStyles,
  createStyles,
  FormLabel,
  Typography,
  FormHelperText,
} from '@material-ui/core';

import {
  WORK_CULTURE_SLIDER_LABELS,
  WorkCultureSliderField,
} from '@bit/twohats.common.constants';
import WorkCultureSlider from './WorkCultureSlider';

/**
 * Flips the left/right arrangement of certain sliders randomly.
 * Happens every time this JS file is evaluated by the browser,
 * i.e. for every user session.
 */
const flipped: boolean[] = [];
Object.keys(WORK_CULTURE_SLIDER_LABELS).forEach((x, i) => {
  flipped[i] = Math.random() >= 0.5;
});

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      border: 'none',
      margin: 0,
      padding: 0,
    },
  })
);

const getDefaultSliderValues = (initialValues?: WorkCultureSliderField) => {
  const output: WorkCultureSliderField = {};
  Object.keys(WORK_CULTURE_SLIDER_LABELS).forEach(x => {
    if (initialValues && initialValues[x]) output[x] = initialValues[x];
  });
  return output;
};

interface IWorkCultureSlidersFieldProps extends FieldProps {}

const WorkCultureSlidersField: React.FunctionComponent<
  IWorkCultureSlidersFieldProps
> = ({ field, form }) => {
  const classes = useStyles();

  const [sliderValues, setSliderValues] = useState<WorkCultureSliderField>(
    getDefaultSliderValues(field.value)
  );
  const updateValue = (valueName: string) => (newValue: number) => {
    let castedNewValue: WorkCultureSliderField['key'];
    if (newValue < 0) castedNewValue = 0;
    else if (newValue > 3) castedNewValue = 3;
    else castedNewValue = newValue as WorkCultureSliderField['key'];

    if (newValue !== sliderValues[valueName])
      setSliderValues((oldValues: WorkCultureSliderField) => ({
        ...oldValues,
        [valueName]: castedNewValue,
      }));
  };

  useEffect(() => {
    form.setFieldValue(field.name, sliderValues);
  }, [sliderValues]);

  return (
    <div>
      <FormLabel htmlFor="field-workCultureSliders">
        <Typography variant="overline" color="textSecondary">
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
        {msg => <FormHelperText error>Required</FormHelperText>}
      </ErrorMessage>
    </div>
  );
};

export default WorkCultureSlidersField;
