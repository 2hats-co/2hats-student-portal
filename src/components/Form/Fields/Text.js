import React from 'react';
import FIELDS from '../../../constants/forms/fields';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Multiline from './Multiline';
const Text = props => {
  const {
    label,
    name,
    type,
    placeholder,
    formikProps,
    width,
    autoFocus,
    disallowSpace,
  } = props;
  const { handleChange, values, errors, touched, setValues } = formikProps;

  let textFieldType = 'text';
  switch (type) {
    case FIELDS.textFieldNumber:
      textFieldType = 'number';
      break;
    case FIELDS.textFieldPassword:
      textFieldType = 'password';
      break;
    case FIELDS.textFieldEmail:
      textFieldType = 'email';
      break;
    case FIELDS.textFieldTel:
      textFieldType = 'tel';
      break;

    default:
      break;
  }

  return (
    <Grid item xs={width || 12}>
      {type === FIELDS.textFieldMultiline ? (
        <Multiline
          type={type}
          formikProps={formikProps}
          label={label}
          name={name}
          placeholder={placeholder}
          autoFocus={autoFocus}
        />
      ) : (
        <TextField
          label={label}
          id={name}
          type={textFieldType}
          onChange={
            disallowSpace
              ? e => {
                  setValues({
                    ...values,
                    [name]: e.target.value.replace(' ', ''),
                  });
                }
              : handleChange
          }
          variant="filled"
          fullWidth
          value={values[name]}
          placeholder={placeholder}
          error={!!(errors[name] && touched[name])}
          helperText={touched[name] && errors[name]}
          autoFocus={autoFocus}
        />
      )}
    </Grid>
  );
};

export default Text;
