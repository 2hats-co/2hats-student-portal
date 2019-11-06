import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import isEmpty from 'ramda/es/isEmpty';

import Autosave from 'components/Form/Autosave';
import ResumeField from 'components/FormikFields/ResumeField';
import MobileNumberField, {
  MobileNumberFieldSchema,
} from 'components/FormikFields/MobileNumberField';

import { useUser } from 'contexts/UserContext';
import { updateDoc } from 'utilities/firestore';
import { COLLECTIONS } from '@bit/twohats.common.constants';

/**
 * Displays a Formik form for the user’s missing details from their Profile:
 * - résumé
 * - mobile number
 *
 * - Autosaves every second, displaying a snackbar
 * - Only saves fields that aren’t blank
 * - Initially hides fields if they’re already filled in their Profile
 */
const MissingDetailsForm: React.FunctionComponent = () => {
  const { UID, profile } = useUser();

  // Save handler passed to Autosave
  const handleSave = async (debouncedValue: string) => {
    const { values, errors } = JSON.parse(debouncedValue);

    // Updates to be sent to the Profile document
    const updates: { [key: string]: any } = {};

    // Only update if field is not blank and there are no errors
    // and if the value is different from the profile
    if (
      values.mobileNumber &&
      !errors.mobileNumber &&
      profile!.mobileNumber !== values.mobileNumber
    )
      updates.mobileNumber = values.mobileNumber;

    const isResumeDifferent =
      !profile ||
      !profile.resume ||
      !profile.resume.name ||
      !profile.resume.url ||
      profile.resume.name !== values.resume.name ||
      profile.resume.url !== values.resume.url;
    if (values.resume && !errors.resume && isResumeDifferent)
      updates.resume = values.resume;

    // Update document if there is something to update
    if (!isEmpty(updates)) {
      await updateDoc(COLLECTIONS.profiles, UID!, updates);
      return { success: true };
    }

    // Otherwise, don’t show any snackbar when this function is called
    return null;
  };

  return (
    <Formik
      onSubmit={(values, actions) => {
        // does nothing, just sets submitting to false again
        actions.setSubmitting(false);
      }}
      initialValues={{
        resume: profile!.resume,
        mobileNumber: profile!.mobileNumber,
      }}
      validationSchema={Yup.object().shape({
        resume: Yup.object()
          .shape({
            name: Yup.string().required(),
            url: Yup.string().required(),
          })
          .required(),
        mobileNumber: MobileNumberFieldSchema,
      })}
      render={({ values, errors }) => (
        <Form>
          <Autosave
            valueToDebounce={JSON.stringify({ values, errors })}
            callback={handleSave}
          />

          {(!profile!.resume ||
            !profile!.resume.name ||
            !profile!.resume.url) && (
            <Field
              name="resume"
              component={ResumeField}
              description="You’re on our radar! Uploading a résumé makes it easier for us to contact you about jobs and uni events such as hackathons and workshops."
            />
          )}

          {!profile!.mobileNumber && (
            <Field
              name="mobileNumber"
              component={MobileNumberField}
              description="Let us know your mobile number so we can contact you for job opportunities as soon as possible, after passing assessments."
            />
          )}
        </Form>
      )}
    />
  );
};

export default MissingDetailsForm;
