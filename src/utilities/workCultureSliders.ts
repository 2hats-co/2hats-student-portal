import { useRef, useCallback, useEffect, useState } from 'react';

import {
  WORK_CULTURE_SLIDER_MIN,
  WORK_CULTURE_SLIDER_MAX,
  WORK_CULTURE_SLIDER_LABELS,
  WorkCultureSliderField,
} from '@bit/twohats.common.constants';

export const MIN_VALUE = WORK_CULTURE_SLIDER_MIN;
export const MAX_VALUE = WORK_CULTURE_SLIDER_MAX;
export const DEFAULT_VALUE = (MIN_VALUE + MAX_VALUE) / 2;
export const STEP = (MAX_VALUE - MIN_VALUE) / 3;

// Gets an array of all valid points
export const POINTS = [MIN_VALUE];
let current = MIN_VALUE;
while (current < MAX_VALUE) POINTS.push((current += STEP));

/**
 * Returns the closest valid step to the current value.
 * Returns default value if that’s the current value.
 *
 * See https://stackoverflow.com/questions/26289829/closest-pair-of-points-linear-1-d-case-algorithm
 */
export const fixValueToSteps = (value: number) => {
  // If default value, return that
  if (value === DEFAULT_VALUE) return DEFAULT_VALUE;

  // Finds the point with the minimum distance
  let minDistance = MAX_VALUE;
  let minDistanceIndex = -1;
  POINTS.forEach((x, i) => {
    const distance = Math.abs(value - x);
    if (distance < minDistance) {
      minDistance = distance;
      minDistanceIndex = i;
    }
  });

  // Returns that point
  return POINTS[minDistanceIndex];
};

/**
 * Sanitises the value whenever the slider value changes.
 * Ensures it’s within bounds and is fixed to one of the steps.
 */
export const sanitiseValue = (value: number) => {
  const output = fixValueToSteps(value);
  if (output < WORK_CULTURE_SLIDER_MIN) return WORK_CULTURE_SLIDER_MIN;
  else if (output > WORK_CULTURE_SLIDER_MAX) return WORK_CULTURE_SLIDER_MAX;
  return output;
};

/**
 * Sanitises the inputs to the sliders, making sure values are `DEFAULT_VALUE`
 * if they are `undefined` and that all `WORK_CULTURE_SLIDER_LABELS` have
 * a value
 * @param initialValues The initial values from Firestore, via Formik
 */
export const getDefaultSliderValues = (
  initialValues?: WorkCultureSliderField
) => {
  const output: WorkCultureSliderField = {};
  Object.keys(WORK_CULTURE_SLIDER_LABELS).forEach(x => {
    if (initialValues)
      output[x] =
        initialValues[x] !== undefined
          ? sanitiseValue(initialValues[x])
          : DEFAULT_VALUE;
  });
  return output;
};

/**
 * Increments the slider, making sure it’s still within bounds and
 * goes to the next closest valid point that’s greater than the current value.
 */
export const incrementSlider = (value: number) => {
  const index = POINTS.indexOf(value);
  // If not a valid point, find next closest valid point that’s greater
  // Use + 1 to make it go to the next greater (if it’s in the middle)
  if (index === -1) return fixValueToSteps(value + 1);
  // Otherwise, go to the next highest valid point
  if (index < POINTS.length - 1) return POINTS[index + 1];
  // Otherwise, `value === MAX_VALUE`, so we can just return it
  return value;
};

/**
 * Decrement the slider, making sure it’s still within bounds and
 * goes to the next closest valid point that’s less than the current value.
 */
export const decrementSlider = (value: number) => {
  const index = POINTS.indexOf(value);
  // If not a valid point, find next closest valid point that’s lower
  // Use - 1 to make it go to the next greater (if it’s in the middle)
  if (index === -1) return fixValueToSteps(value - 1);
  // Otherwise, go to the next lowest valid point
  if (index > 0) return POINTS[index - 1];
  // Otherwise, `value === MIN_VALUE`, so we can just return it
  return value;
};

export const SLIDER_COLOR = '#2979b7';
export const SLIDER_LIGHT_COLOR = '#90b2cc';

export const HOVER_SENTINEL_VALUE = -1;

/**
 * A hook that attaches listeners to mouse movement to get the current hover
 * value to “preview” the thumb position.
 *
 * Requires `sliderRef` to point to the actual Slider component.
 *
 * @param disabled If the whole field is disabled, no listeners will be added
 */
export const useSliderHover = (disabled: boolean) => {
  // Ref to the slider component
  const sliderRef = useRef<HTMLElement>(null);
  // Hover value that will be returned later
  const [hoverValue, setHoverValue] = useState(HOVER_SENTINEL_VALUE);

  // Get the current hover value
  const sliderHoverHandler = useCallback(function(
    this: HTMLElement,
    event: MouseEvent
  ) {
    const dimensions = this.getBoundingClientRect();
    const pctValue =
      ((event.clientX - dimensions.left) / dimensions.width) * 100;

    const distanceToDefault = Math.abs(pctValue - DEFAULT_VALUE);

    // If too close to `DEFAULT_VALUE`, don’t change the `hoverValue` so that
    // the thumb won’t bounce around when the user hovers near the thumb in
    // the `DEFAULT_VALUE`
    if (distanceToDefault > STEP / 4) {
      const nearestPoint = fixValueToSteps(pctValue);
      setHoverValue(current =>
        nearestPoint !== current ? nearestPoint : current
      );
    }
  },
  []);

  // On leave, reset the `hoverValue`
  const sliderLeaveHandler = useCallback(
    () => setHoverValue(HOVER_SENTINEL_VALUE),
    []
  );

  // Attaches event listeners
  useEffect(() => {
    if (sliderRef && sliderRef.current) {
      if (!disabled) {
        sliderRef.current.addEventListener('mousemove', sliderHoverHandler);
        sliderRef.current.addEventListener('mouseleave', sliderLeaveHandler);

        // Removes event listeners on unmount
        return () => {
          if (sliderRef && sliderRef.current) {
            sliderRef.current.removeEventListener(
              'mousemove',
              sliderHoverHandler
            );
            sliderRef.current.removeEventListener(
              'mouseleave',
              sliderLeaveHandler
            );
          }
        };
      } else {
        // Removes event listeners when `disabled`
        sliderRef.current.removeEventListener('mousemove', sliderHoverHandler);
        sliderRef.current.removeEventListener('mouseleave', sliderLeaveHandler);
      }
    }
  }, [sliderRef, disabled]);

  // Return to be used by main component. Must have `as const` to prevent
  // type widening issues
  return [sliderRef, hoverValue] as const;
};
