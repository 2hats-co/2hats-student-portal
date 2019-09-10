import React, { useState, useEffect } from 'react';

import { Typography, TextField } from '@material-ui/core';
import HeadingCaps from '@bit/twohats.common.components.heading-caps';
import {
  TextMaskCustom,
  MobileNumberFieldSchema,
} from 'components/FormikFields/MobileNumberField';

import { updateDoc } from 'utilities/firestore';
import useDebounce from '@bit/twohats.common.use-debounce';
import { COLLECTIONS } from '@bit/twohats.common.constants';

interface IMobileNumberFieldProps {
  UID: string;
}

/**
 * Displays text field that every 500ms after the user types:
 * - does validation
 * - saves to the user’s profile document
 * - displays error messages
 */
const MobileNumberField: React.FunctionComponent<IMobileNumberFieldProps> = ({
  UID,
}) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const debouncedMobileNumber = useDebounce(mobileNumber, 500);
  const [mobileNumberState, setMobileNumberState] = useState<{
    type: 'loading' | 'error' | 'success' | 'untouched';
    message?: string;
  }>({ type: 'untouched' });

  useEffect(() => {
    MobileNumberFieldSchema.isValid(debouncedMobileNumber).then(
      async (isValid: boolean) => {
        setMobileNumberState({
          type: isValid ? 'loading' : 'error',
          message: isValid
            ? 'Submitting…'
            : 'Please enter an Australian mobile number',
        });

        if (isValid) {
          await updateDoc(COLLECTIONS.profiles, UID, {
            mobileNumber: debouncedMobileNumber,
          });
          setMobileNumberState({ type: 'success', message: 'We’ve got it!' });
        }
      }
    );
  }, [debouncedMobileNumber]);

  return (
    <section>
      <label htmlFor="field-mobileNumber">
        <HeadingCaps>My Mobile Number</HeadingCaps>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          Let us know your mobile number so we can contact you for job
          opportunities as soon as possible, after passing assessments.
        </Typography>
      </label>

      <TextField
        variant="filled"
        fullWidth
        hiddenLabel
        margin="none"
        label=""
        inputProps={{ id: `field-mobileNumber` }}
        InputProps={{ inputComponent: TextMaskCustom as any }}
        value={mobileNumber}
        onChange={e => setMobileNumber(e.target.value)}
        error={mobileNumberState.type === 'error'}
        helperText={mobileNumberState.message}
        disabled={mobileNumberState.type === 'loading'}
      />
    </section>
  );
};

export default MobileNumberField;
