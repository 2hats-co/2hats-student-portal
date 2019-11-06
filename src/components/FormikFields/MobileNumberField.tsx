import React from 'react';
import MaskedInput from 'react-text-mask';
import * as Yup from 'yup';

import StyledTextField, { IStyledTextFieldProps } from './StyledTextField';

export const MobileNumberFieldSchema = Yup.string()
  .matches(/^\+61\s[1-9]\d{2}\s\d{3}\s\d{3}$/, {
    message: 'Please enter an Australian mobile number',
    excludeEmptyString: true,
  })
  .required('Please enter an Australian mobile number');

interface ITextMaskCustomProps {
  inputRef: (ref: HTMLInputElement | null) => void;
}

/**
 * TextField mask so user’s input is sanitised
 */
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

/**
 * A styled MUI TextField component for international mobile numbers.
 * Contains input masking
 */
const MobileNumberField: React.FunctionComponent<
  IStyledTextFieldProps
> = props => (
  <StyledTextField
    label="My Mobile Number"
    {...props}
    placeholder="+61 123 456 789 or 0123 456 789"
    inputProps={{
      id: `field-${props.field.name}`,
      type: 'tel',
      autoComplete: 'tel',
    }}
    InputProps={{
      inputComponent: TextMaskCustom as any,
    }}
  />
);

export default MobileNumberField;
