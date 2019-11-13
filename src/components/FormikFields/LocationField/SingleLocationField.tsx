import React from 'react';

import { MenuItem, Divider } from '@material-ui/core';

import { useLocationFieldStyles } from './index';
import StyledTextField, { IStyledTextFieldProps } from '../StyledTextField';

import {
  CITIES_OPTIONS,
  CITIES_ALL_AU,
  CITIES_OTHER_AU,
} from '@bit/twohats.common.constants';

export interface ISingleLocationFieldProps extends IStyledTextFieldProps {
  /** Display All cities in country option */
  showAll?: boolean;
  /** Display Other city in country option */
  showOther?: boolean;
}

/**
 * Displays an MUI Select field for the user to choose **one** city.
 * Gets the field value from Formik, which is stored as an object.
 * It will JSON-stringify this object and then pass it into the MUI component.
 */
const SingleLocationField: React.FunctionComponent<
  ISingleLocationFieldProps
> = ({
  field,
  form,
  showAll = false,
  showOther = true,
  placeholder = 'Select a city…',
  ...restProps
}) => {
  const classes = useLocationFieldStyles();
  const fieldValue = form.values[field.name];

  // Convert into JSON string if not already a string.
  // `value` can be an object or empty string ''
  const inputValue =
    typeof fieldValue === 'string' ? fieldValue : JSON.stringify(fieldValue);

  // On change, convert the MUI Select value from JSON string
  // and store object in Formik state
  const onChange = (e: React.ChangeEvent<any>) =>
    form.setFieldValue(field.name, JSON.parse(e.target.value));

  return (
    <StyledTextField
      SelectProps={{
        // Must be enabled to show placeholder
        displayEmpty: true,
        // Display different styles when placeholder is shown
        classes: fieldValue === '' ? { root: classes.placeholderDisplay } : {},
      }}
      {...restProps}
      select
      field={{ ...field, onChange, value: inputValue }}
      form={form}
    >
      <MenuItem value="" disabled className={classes.hiddenPlaceholder}>
        {placeholder}
      </MenuItem>

      {CITIES_OPTIONS.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}

      {
        // MUI Menu component does not accept Fragment as child, so had to separate
      }
      {(showAll || showOther) && <Divider className={classes.divider} />}

      {showAll && (
        <MenuItem value={CITIES_ALL_AU}>All cities in Australia</MenuItem>
      )}

      {showOther && (
        <MenuItem value={CITIES_OTHER_AU}>Other city in Australia</MenuItem>
      )}
    </StyledTextField>
  );
};

export default SingleLocationField;
