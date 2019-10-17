import React from 'react';
import { FieldProps, ErrorMessage } from 'formik';
import { DropFilesEventHandler } from 'react-dropzone';

import {
  makeStyles,
  createStyles,
  FormLabel,
  Typography,
  FormHelperText,
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

interface IPortfolioFileFieldProps extends FieldProps {}

/**
 * Uploads any file the user selects to our G Cloud Storage bucket.
 * In the future, this should probably only happen on submit.
 */
const PortfolioFileField: React.FunctionComponent<IPortfolioFileFieldProps> = ({
  field,
  form,
}) => {
  const classes = useStyles();

  const { user } = useUser();

  const setFile: IStyledDropzoneProps['setFile'] = val =>
    form.setFieldValue(field.name, val);

  const handleDrop: DropFilesEventHandler = (acceptedFiles, rejectedFiles) => {
    // Upload file
    if (acceptedFiles.length > 0) {
      // Set file name for display
      setFile({ name: acceptedFiles[0].name || 'submission' });
      uploader(
        `candidates/${user.id}/portfolios/${new Date().getTime()}/${
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
          Additional Work (Portfolio)
        </HeadingCaps>

        <Typography variant="body1" color="textSecondary" paragraph>
          Show us what you are proud of! If you have a portfolio, details of
          your work, or a cool school project, now is the time to show off.
        </Typography>
      </FormLabel>

      <StyledDropzone
        accept="application/pdf"
        file={field.value}
        setFile={setFile}
        dropHandler={handleDrop}
        fileLabel="PDF portfolio"
        className={classes.dropzone}
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

export default PortfolioFileField;
