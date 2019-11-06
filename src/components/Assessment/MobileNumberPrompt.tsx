import React from 'react';
import { Formik, Field, Form } from 'formik';

import Autosave from 'components/Form/Autosave';
import MobileNumberField, {
  MobileNumberFieldSchema,
} from 'components/FormikFields/MobileNumberField';

import { useUser } from 'contexts/UserContext';
import { updateDoc } from 'utilities/firestore';
import { COLLECTIONS } from '@bit/twohats.common.constants';

/**
 * Displays text field that every 500ms after the user types:
 * - does validation
 * - saves to the user’s profile document
 * - displays error messages
 */
const MobileNumberPrompt: React.FunctionComponent = () => {
  const { UID } = useUser();

  const handleSave = async (debouncedValue: { mobileNumber: string }) => {
    const { mobileNumber } = debouncedValue;

    const isValid = await MobileNumberFieldSchema.isValid(mobileNumber);
    if (isValid) {
      await updateDoc(COLLECTIONS.profiles, UID!, {
        mobileNumber: mobileNumber,
      });
      return { success: true };
    }

    return {
      success: false,
      message: 'Please enter an Australian mobile number',
    };
  };

  return (
    <Formik
      onSubmit={(values, actions) => {
        // does nothing, just sets submitting to false again
        actions.setSubmitting(false);
      }}
      initialValues={{ mobileNumber: '' }}
      render={({ values }) => (
        <Form>
          <Autosave
            valueToDebounce={JSON.stringify(values)}
            callback={handleSave}
          />

          <Field
            name="mobileNumber"
            component={MobileNumberField}
            label="My Mobile Number"
            description="Let us know your mobile number so we can contact you for job opportunities as soon as possible, after passing assessments."
          />
        </Form>
      )}
    />
  );
};

export default MobileNumberPrompt;
