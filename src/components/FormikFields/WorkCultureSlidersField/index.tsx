import React, { useState, useEffect } from 'react';
import { FieldProps, ErrorMessage } from 'formik';
import VisibilitySensor from 'react-visibility-sensor';

import {
  makeStyles,
  createStyles,
  FormLabel,
  FormHelperText,
} from '@material-ui/core';
import HeadingCaps from '@bit/twohats.common.components.heading-caps';

import WorkCultureSlider from './WorkCultureSlider';

import {
  WORK_CULTURE_SLIDER_LABELS,
  WorkCultureSliderField,
} from '@bit/twohats.common.constants';
import {
  sanitiseValue,
  getDefaultSliderValues,
  DEFAULT_VALUE,
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

    heading: { marginBottom: 0 },
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

  // Store in state whether the animation should be enabled or not.
  // Will be set to `true` when this component is first visible in viewport.
  // Currently **disables** the entire field, which may produce undesirable
  // effects in the future, so this might need to be changed to its own prop.
  const [animationEnabled, setAnimationEnabled] = useState(false);

  // Render the actual sliders
  let firstUnsetSliderIndex = -1; // Store the first unset slider
  const sliders = Object.keys(WORK_CULTURE_SLIDER_LABELS).map((label, i) => {
    const name = label as keyof typeof WORK_CULTURE_SLIDER_LABELS;

    // Define unset as being `undefined` or `DEFAULT_VALUE`
    const valueUnset =
      sliderValues[label] === undefined ||
      sliderValues[label] === DEFAULT_VALUE;

    // Update `firstUnsetSliderIndex` if necessary
    if (firstUnsetSliderIndex === -1 && valueUnset) firstUnsetSliderIndex = i;

    return (
      <WorkCultureSlider
        key={label}
        minLabel={WORK_CULTURE_SLIDER_LABELS[name][0]}
        maxLabel={WORK_CULTURE_SLIDER_LABELS[name][1]}
        flipped={flipped[i]}
        value={sliderValues[label]}
        onChange={updateValue(label)}
        // Disable if unset **and** not `firstUnsetSliderIndex`.
        // Also disable so we can enable the animation later.
        disabled={
          !animationEnabled || (valueUnset && i !== firstUnsetSliderIndex)
        }
        showInitialThumbAnimation={i === 0}
      />
    );
  });

  return (
    <div className="field-wrapper" id={`field-${field.name}`}>
      <FormLabel htmlFor={`field-${field.name}`}>
        <HeadingCaps
          component="span"
          color={
            form.errors[field.name] && form.touched[field.name]
              ? 'error'
              : 'textSecondary'
          }
          className={classes.heading}
        >
          My Workplace Culture
        </HeadingCaps>
      </FormLabel>

      {/**
       * Use `react-visibility-sensor` to find out when the component is first
       * visible in the viewport. After that, disable the listener entirely
       */}
      <VisibilitySensor
        onChange={isVisible => setAnimationEnabled(isVisible)}
        partialVisibility
        minTopValue={
          50 // Must have at least 50px of the component visible to trigger
        }
        active={!animationEnabled}
      >
        <fieldset className={classes.root}>{sliders}</fieldset>
      </VisibilitySensor>

      <ErrorMessage name={field.name}>
        {() => <FormHelperText error>Required</FormHelperText>}
      </ErrorMessage>
    </div>
  );
};

export default WorkCultureSlidersField;
