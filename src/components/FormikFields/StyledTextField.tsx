import React from 'react';
import { FieldProps } from 'formik';

import { FormLabel, Typography } from '@material-ui/core';
import { TextField, TextFieldProps } from 'formik-material-ui';

interface IStyledTextFieldProps extends FieldProps, TextFieldProps {}

/**
 * A styled MUI TextField component
 */
const StyledTextField: React.FunctionComponent<
  IStyledTextFieldProps
> = props => {
  const { form, field, label } = props;

  return (
    <div>
      <FormLabel htmlFor={`field-${field.name}`}>
        <Typography
          variant="overline"
          color={
            form.errors[field.name] && form.touched[field.name]
              ? 'error'
              : 'textSecondary'
          }
        >
          {label}
        </Typography>
      </FormLabel>

      <TextField
        variant="filled"
        fullWidth
        hiddenLabel
        margin="none"
        {...props}
        label=""
        inputProps={{ ...props.inputProps, id: `field-${field.name}` }}
      />
    </div>
  );
};

export default StyledTextField;
