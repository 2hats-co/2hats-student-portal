import React from 'react';

import { MenuItem, Divider } from '@material-ui/core';

import { useLocationFieldStyles } from './index';
import StyledTextField, { IStyledTextFieldProps } from '../StyledTextField';
import ListItemCheckBox from './ListItemCheckBox';

import {
  CITIES,
  CITIES_OPTIONS,
  CITIES_ALL,
  CITIES_OTHER,
  CITIES_ALL_AU,
  CITIES_OTHER_AU,
} from '@bit/twohats.common.constants';

export interface IMultiLocationFieldProps extends IStyledTextFieldProps {
  /** Display All cities in country option */
  showAll?: boolean;
  /** Display Other city in country option */
  showOther?: boolean;
}

/**
 * Displays an MUI Select field for the user to choose **multiple** cities.
 * Gets the field value from Formik, which is stored as an array of objects.
 * It will JSON-stringify the objects and then pass it into the MUI component.
 */
const MultiLocationField: React.FunctionComponent<IMultiLocationFieldProps> = ({
  field,
  form,
  showAll = true,
  showOther = false,
  placeholder = 'Select cities…',
  ...restProps
}) => {
  const classes = useLocationFieldStyles();
  const fieldValue = form.values[field.name];

  // Compute the text to be rendered when items have been selected
  const renderValue = (selected: any) => {
    // If none selected, display the placeholder
    if (selected.length === 0) return placeholder;
    // Otherwise, get the city name of each and join with `, `
    return selected
      .map((option: string) =>
        JSON.parse(option)
          .city // Replace sentinel values below:
          .replace(CITIES_ALL, 'All cities in Australia')
          .replace(CITIES_OTHER, 'Other city in Australia')
      )
      .join(', ');
  };

  // Convert Formik’s value (array of objects) into an array of JSON strings
  const inputValue = fieldValue.map((option: {}) => JSON.stringify(option));

  // On change, convert the MUI Select value from array of JSON strings
  // and store array of objects in Formik state
  const onChange = (e: React.ChangeEvent<any>) => {
    // If the user selected All cities in Australia, ensure that all
    // current cities are actually selected.
    // NOTE: This will also push cities from other countries in the future.
    if (e.target.value.includes(CITIES_ALL_AU)) {
      form.setFieldValue(field.name, [...CITIES, JSON.parse(CITIES_ALL_AU)]);
    } else {
      // Otherwise, do the normal mapping
      form.setFieldValue(
        field.name,
        e.target.value.map((option: string) => JSON.parse(option))
      );
    }
  };

  return (
    <StyledTextField
      {...restProps}
      select
      SelectProps={{
        multiple: true,
        // Must be enabled to show placeholder
        displayEmpty: true,
        // Display different styles when placeholder is shown
        classes:
          fieldValue.length === 0 ? { root: classes.placeholderDisplay } : {},
        renderValue,
      }}
      field={{ ...field, onChange, value: inputValue }}
      form={form}
    >
      {CITIES_OPTIONS.map(option => (
        <MenuItem key={option.value} value={option.value}>
          <ListItemCheckBox fieldValue={fieldValue} option={option.value} />
          {option.label}
        </MenuItem>
      ))}

      {(showAll || showOther) && <Divider className={classes.divider} />}

      {showAll && (
        <MenuItem value={CITIES_ALL_AU}>
          <ListItemCheckBox fieldValue={fieldValue} option={CITIES_ALL_AU} />
          All cities in Australia
        </MenuItem>
      )}

      {showOther && (
        <MenuItem value={CITIES_OTHER_AU}>
          <ListItemCheckBox fieldValue={fieldValue} option={CITIES_OTHER_AU} />
          Other city in Australia
        </MenuItem>
      )}
    </StyledTextField>
  );
};

export default MultiLocationField;
