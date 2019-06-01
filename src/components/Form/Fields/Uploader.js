import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormHelperText from '@material-ui/core/FormHelperText';
import Chip from '@material-ui/core/Chip';

import CloudUploadIcon from '@material-ui/icons/CloudUploadOutlined';
import FileIcon from '@material-ui/icons/AttachmentOutlined';

import { uploader } from '../../../utilities/Uploader';
import Dropzone from 'react-dropzone';

import { STYLES } from '@bit/sidney2hats.2hats.global.common-constants';

import isEmpty from 'ramda/es/isEmpty';

const styles = theme => ({
  sectionTitle: {
    marginLeft: theme.spacing(1.5),
  },
  ...STYLES.DROPZONE(theme),
});

const Uploader = props => {
  const { label, name, mimeTypes, path, formikProps, classes } = props;
  const { setValues, values, errors, touched } = formikProps;

  const [uploadUrl, setUploadUrl] = useState(null);
  useEffect(() => {
    if (uploadUrl) {
      setValues({
        ...values,
        [name]: { name: values[name].name, url: uploadUrl },
      });
    }
  }, [uploadUrl]);

  const [rejectedFile, setRejectedFile] = useState('');

  return (
    <Grid item xs={12}>
      <Typography
        variant="caption"
        className={classes.sectionTitle}
        color={errors[name] && touched[name] ? 'error' : 'textSecondary'}
      >
        {label}
      </Typography>
      <Dropzone
        onDrop={(acceptedFiles, rejectedFiles) => {
          console.log('dropzone', acceptedFiles, rejectedFiles);

          if (rejectedFiles.length > 0) setRejectedFile(rejectedFiles[0].name);

          if (acceptedFiles.length > 0) {
            setValues({
              ...values,
              [name]: { name: acceptedFiles[0].name },
            });
            uploader(path, acceptedFiles[0], (url, blob) => {
              setUploadUrl(url);
            });
          }
        }}
        accept={mimeTypes || ''}
      >
        {({ getRootProps, getInputProps, isDragActive }) => (
          <div
            {...getRootProps()}
            className={classNames(
              classes.dropzone,
              isDragActive && classes.dropzoneDragActive
            )}
          >
            <input {...getInputProps()} />
            <CloudUploadIcon className={classes.uploadIcon} />
            <Typography variant="body1">
              {isDragActive ? 'Drop your file here!' : 'Drag a file here or'}
            </Typography>
            <Button
              color="primary"
              variant="outlined"
              className={classes.dropzoneButton}
              size="small"
            >
              Click to upload a {label.toLowerCase()}
            </Button>
            {rejectedFile && (
              <Typography variant="body2" color="error">
                {rejectedFile} is invalid
              </Typography>
            )}
          </div>
        )}
      </Dropzone>
      {!isEmpty(values[name]) && (
        <div className={classes.fileChipWrapper}>
          <Chip
            component="a"
            href={values[name]['url']}
            target="_blank"
            rel="noopener noreferrer"
            label={values[name]['name']}
            onDelete={
              values[name].url
                ? e => {
                    e.preventDefault();
                    setValues({
                      ...values,
                      [name]: null,
                    });
                  }
                : null
            }
            className={classes.fileChip}
            icon={
              !values[name].url ? (
                <CircularProgress size={32} />
              ) : (
                <FileIcon className={classes.fileIcon} />
              )
            }
          />
        </div>
      )}
      {touched[name] && errors[name] && (
        <FormHelperText error className={classes.sectionTitle}>
          Required
        </FormHelperText>
      )}
    </Grid>
  );
};
export default withStyles(styles)(Uploader);
