import {
  WORK_CULTURE_SLIDER_MIN,
  WORK_CULTURE_SLIDER_MAX,
  WORK_CULTURE_SLIDER_LABELS,
  WorkCultureSliderField,
} from '@bit/twohats.common.constants';

export const MIN_VALUE = WORK_CULTURE_SLIDER_MIN;
export const MAX_VALUE = WORK_CULTURE_SLIDER_MAX;
export const DEFAULT_VALUE = (MIN_VALUE + MAX_VALUE) / 2;
export const STEP = (MAX_VALUE - MIN_VALUE) / 4;

export const fixValueToSteps = (value: number) =>
  Math.round(value) % STEP === 0 ? value : Math.round(value) - STEP;

export const sanitiseValue = (value: number) => {
  const output = fixValueToSteps(value);
  if (output < WORK_CULTURE_SLIDER_MIN) return WORK_CULTURE_SLIDER_MIN;
  else if (output > WORK_CULTURE_SLIDER_MAX) return WORK_CULTURE_SLIDER_MAX;
  return output;
};

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

export const SLIDER_COLOR = '#2979b7';
export const SLIDER_LIGHT_COLOR = '#90b2cc';
