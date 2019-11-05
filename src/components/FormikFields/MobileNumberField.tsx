import React from 'react';
import { FieldProps } from 'formik';
import MaskedInput from 'react-text-mask';
import * as Yup from 'yup';

import { FormLabel } from '@material-ui/core';
import { TextField, TextFieldProps } from 'formik-material-ui';
import HeadingCaps from '@bit/twohats.common.components.heading-caps';

export const MobileNumberFieldSchema = Yup.string()
  .matches(/^\+61\s[1-9]\d{2}\s\d{3}\s\d{3}$/, {
    message: 'Please enter an Australian mobile number',
    excludeEmptyString: true,
  })
  .required('Please enter an Australian mobile number');

interface ITextMaskCustomProps {
  inputRef: (ref: HTMLInputElement | null) => void;
}

export const TextMaskCustom: React.FunctionComponent<ITextMaskCustomProps> = ({
  inputRef,
  ...other
}) => (
  <MaskedInput
    {...other}
    ref={(ref: any) => {
      inputRef(ref ? ref.inputElement : null);
    }}
    mask={[
      '+',
      '6',
      '1',
      ' ',
      /[1-9]/,
      /\d/,
      /\d/,
      ' ',
      /\d/,
      /\d/,
      /\d/,
      ' ',
      /\d/,
      /\d/,
      /\d/,
    ]}
    placeholderChar={'\u2000'}
    showMask
    guide={false}
  />
);

interface IMobileNumberFieldProps extends FieldProps, TextFieldProps {}

/**
 * A styled MUI TextField component for international mobile numbers.
 * Contains input masking
 */
const MobileNumberField: React.FunctionComponent<
  IMobileNumberFieldProps
> = props => {
  const { form, field, label } = props;

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
      </FormLabel>

      <TextField
        variant="filled"
        fullWidth
        hiddenLabel
        margin="none"
        {...props}
        label=""
        inputProps={{
          ...props.inputProps,
          id: `field-${field.name}`,
          type: 'tel',
          autocomplete: 'tel',
        }}
        InputProps={{
          ...props.InputProps,
          inputComponent: TextMaskCustom as any,
        }}
      />
    </div>
  );
};

export default MobileNumberField;
