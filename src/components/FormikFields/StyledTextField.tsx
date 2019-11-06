import React from 'react';
import { FieldProps } from 'formik';

import { FormLabel, Typography } from '@material-ui/core';
import { TextField, TextFieldProps } from 'formik-material-ui';
import HeadingCaps from '@bit/twohats.common.components.heading-caps';

export interface IStyledTextFieldProps extends FieldProps, TextFieldProps {}

/**
 * A styled MUI TextField component
 */
const StyledTextField: React.FunctionComponent<
  IStyledTextFieldProps & { description?: React.ReactNode }
> = props => {
  const { form, field, label, description } = props;

  return (
    <div className="field-wrapper">
      <FormLabel htmlFor={`field-${field.name}`}>
        <HeadingCaps
          component="span"
          color={
            form.errors[field.name] && form.touched[field.name]
              ? 'error'
              : 'textSecondary'
          }
        >
          {label}
        </HeadingCaps>

        {description && (
          <Typography variant="body1" color="textSecondary" paragraph>
            {description}
          </Typography>
        )}
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
