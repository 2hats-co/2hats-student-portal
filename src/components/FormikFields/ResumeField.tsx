import React from 'react';
import { FieldProps, ErrorMessage } from 'formik';
import { DropFilesEventHandler } from 'react-dropzone';

import {
  makeStyles,
  createStyles,
  FormLabel,
  FormHelperText,
  Typography,
} from '@material-ui/core';
import HeadingCaps from '@bit/twohats.common.components.heading-caps';

import StyledDropzone, {
  IStyledDropzoneProps,
} from '@bit/twohats.common.components.styled-dropzone';

import { uploader } from 'utilities/Uploader';
import { useUser } from 'contexts/UserContext';

const useStyles = makeStyles(theme =>
  createStyles({
    dropzone: { marginBottom: theme.spacing(3) },
  })
);

interface IResumeFieldProps extends FieldProps {
  /** Override the label for the field */
  label: React.ReactNode;
  /** Override the description for the field */
  description: React.ReactNode;
  /** Disable the bottom margin on the dropzone */
  disableBottomMargin: boolean;
}

/**
 * This is a copy of PortfolioField. This should be generalised into an
 * uploader component for a **Form.ts** in the future
 */
const ResumeField: React.FunctionComponent<IResumeFieldProps> = ({
  field,
  form,
  label = 'My Résumé',
  description = 'Your potential and abilities count at 2hats – not your background. The résumé only makes it easy for us to see your interests and reach out.',
  disableBottomMargin = false,
}) => {
  const classes = useStyles();

  const { UID } = useUser();

  const setFile: IStyledDropzoneProps['setFile'] = val =>
    form.setFieldValue(field.name, val);

  const handleDrop: DropFilesEventHandler = (acceptedFiles, rejectedFiles) => {
    // Upload file
    if (acceptedFiles.length > 0) {
      // Set file name for display
      setFile({ name: acceptedFiles[0].name || 'submission' });
      uploader(
        `candidates/${UID!}/resumes/${new Date().getTime()}/${
          acceptedFiles[0].name
        }`,
        acceptedFiles[0],
        // Store in state
        (url: string, blob: File) => setFile({ name: blob.name, url })
      );
    }
  };

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

      <StyledDropzone
        accept="application/pdf"
        file={field.value}
        setFile={setFile}
        dropHandler={handleDrop}
        fileLabel="PDF résumé"
        className={!disableBottomMargin ? classes.dropzone : ''}
        id={`field-${field.name}`}
      />

      <ErrorMessage name={field.name}>
        {(msg: string | any) => (
          <FormHelperText error>
            {msg.name ? 'Required' : 'Waiting for upload to finish…'}
          </FormHelperText>
        )}
      </ErrorMessage>
    </div>
  );
};

export default ResumeField;
