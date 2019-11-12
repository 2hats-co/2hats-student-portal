import React from 'react';

import { makeStyles, createStyles } from '@material-ui/core';

import { IStyledTextFieldProps } from '../StyledTextField';
import MultiLocationField from './MultiLocationField';
import SingleLocationField from './SingleLocationField';

/**
 * Styles common to `SingleLocationField` and `MultiLocationField`
 */
export const useLocationFieldStyles = makeStyles(theme =>
  createStyles({
    // Add vertical spacing to Divider
    divider: { margin: theme.spacing(1, 0) },
    // Dim text shown in the main Select component when nothing is selected
    placeholderDisplay: { color: theme.palette.text.secondary },
    // Hide the `MenuItem` that had to be created to enable placeholder
    hiddenPlaceholder: { display: 'none' },
  })
);

export interface ILocationFieldProps extends IStyledTextFieldProps {
  /** Whether or not multiple locations can be selected in the field */
  multiple: boolean;
  /** Multiple field: display All cities in country option */
  showAll?: boolean;
  /** Display Other city in country option */
  showOther?: boolean;
}

/**
 * Formik field to get the user to select a location.
 *
 * Returns an object of type
 * ```
 * { city: string, country: string }
 * ```
 * Will transform to JSON string when passing the value into Material-UI
 * components and back to object when storing in Formik’s state.
 *
 * Displays either [`SingleLocationField`](#singlelocationfield) or
 * [`MultiLocationField`](#multilocationfield) based on `multiple` prop.
 *
 * They had to be separated into individual components because of the size
 * of `MultiLocationField` and all the extra logic associated with it.
 */
const LocationField: React.FunctionComponent<ILocationFieldProps> = ({
  multiple = false,
  showAll,
  showOther,
  ...restProps
}) =>
  multiple ? (
    <MultiLocationField
      showAll={showAll}
      showOther={showOther}
      {...restProps}
    />
  ) : (
    <SingleLocationField showOther={showOther} {...restProps} />
  );

export default LocationField;
