import React from 'react';

import { makeStyles, createStyles, MenuItem, Divider } from '@material-ui/core';

import StyledTextField, { IStyledTextFieldProps } from '../StyledTextField';

import { CITIES_OPTIONS, CITIES_OTHER } from '@bit/twohats.common.constants';

const useStyles = makeStyles(theme =>
  createStyles({
    divider: {
      margin: theme.spacing(1, 0),
    },
  })
);

export interface ISingleLocationFieldProps extends IStyledTextFieldProps {
  /** Display Other city in country option */
  showOther?: boolean;
}

const SingleLocationField: React.FunctionComponent<
  ISingleLocationFieldProps
> = ({ field, form, showOther = true, ...restProps }) => {
  const classes = useStyles();

  const { name } = field;
  const value = form.values[name];

  // Convert into JSON string if not already a string.
  // `value` can be an object or empty string ''
  const valueProp = typeof value === 'string' ? value : JSON.stringify(value);

  // On change, convert the MUI Select value from JSON string
  // and store object in Formik state
  const onChange = (e: React.ChangeEvent<any>) =>
    form.setFieldValue(name, JSON.parse(e.target.value));

  return (
    <StyledTextField
      {...restProps}
      select
      field={{ ...field, onChange, value: valueProp }}
      form={form}
    >
      {CITIES_OPTIONS.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}

      {// MUI Menu component does not accept Fragment as child, so had to separate
      showOther && <Divider className={classes.divider} />}

      {showOther && (
        <MenuItem
          key={CITIES_OTHER}
          value={JSON.stringify({ city: CITIES_OTHER, country: 'AU' })}
        >
          Other city in Australia
        </MenuItem>
      )}
    </StyledTextField>
  );
};

export default SingleLocationField;
