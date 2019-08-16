import React, { useContext } from 'react';
import { FieldProps, ErrorMessage } from 'formik';
import { DropFilesEventHandler } from 'react-dropzone';

import {
  makeStyles,
  createStyles,
  FormLabel,
  Typography,
  FormHelperText,
} from '@material-ui/core';

import StyledDropzone, {
  IStyledDropzoneProps,
} from '@bit/twohats.common.components.styled-dropzone';

import { uploader } from 'utilities/Uploader';
import UserContext from 'contexts/UserContext';

const useStyles = makeStyles(theme =>
  createStyles({
    dropzone: { marginBottom: theme.spacing(3) },
    overline: { display: 'block' },
  })
);

interface IPortfolioFileFieldProps extends FieldProps {}

const PortfolioFileField: React.FunctionComponent<IPortfolioFileFieldProps> = ({
  field,
  form,
}) => {
  const classes = useStyles();

  const { user } = useContext(UserContext);

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
    <div>
      <FormLabel htmlFor="field-portfolio-upload">
        <Typography
          variant="overline"
          color="textSecondary"
          gutterBottom
          className={classes.overline}
        >
          Additional Work (Portfolio)
        </Typography>

        <Typography variant="body1" color="textSecondary" gutterBottom>
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
        id="field-portfolio-upload"
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
