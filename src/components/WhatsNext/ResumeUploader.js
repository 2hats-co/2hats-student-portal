import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import Dropzone from 'react-dropzone';

import CloudUploadIcon from '@material-ui/icons/CloudUploadOutlined';
import CloudDoneIcon from '@material-ui/icons/CloudDoneOutlined';
import FileIcon from '@material-ui/icons/AttachmentOutlined';

import UserContext from '../../contexts/UserContext';
import {
  STYLES,
  COLLECTIONS,
} from '@bit/sidney2hats.2hats.global.common-constants';
import { uploader } from '../../utilities/Uploader';
import { CLOUD_FUNCTIONS, cloudFunction } from '../../utilities/CloudFunctions';
import { updateDoc } from '../../utilities/firestore';

const styles = theme => ({
  ...STYLES.DROPZONE(theme),

  dropzone: {
    ...STYLES.DROPZONE(theme).dropzone,
    width: '100%',
    boxSizing: 'border-box',

    [theme.breakpoints.up('sm')]: { marginTop: theme.spacing(1) },
  },

  fileName: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',

    marginLeft: -theme.spacing(1),
    width: '100%',

    textDecoration: 'none',
    cursor: 'pointer',
  },
  fileIcon: {
    ...STYLES.DROPZONE(theme).fileIcon,
    marginRight: theme.spacing(0.5),
    verticalAlign: 'bottom',
  },

  circularProgress: {
    color: theme.palette.text.secondary,
    margin: theme.spacing(1),
  },
});

const ResumeUploader = props => {
  const { classes, className, resetOnUpload } = props;

  const [file, setFile] = useState({});
  const [rejectedFile, setRejectedFile] = useState('');

  useEffect(() => {
    if (file.name && file.url) {
      updateDoc(COLLECTIONS.profiles, uid, { resume: file }).then(() => {
        cloudFunction(
          CLOUD_FUNCTIONS.WHATS_NEXT_AI,
          {},
          o => console.log(o),
          o => console.log(o)
        );
        cloudFunction(
          CLOUD_FUNCTIONS.RESUME_SCRAPER,
          { uid, url: file.url },
          o => {
            console.log(o);
          },
          o => {
            console.log(o);
          }
        );
        if (resetOnUpload) setFile({});
      });
    }
  }, [file]);

  const userContext = useContext(UserContext);
  const uid = userContext.user.id;

  return (
    <Dropzone
      onDrop={(acceptedFiles, rejectedFiles) => {
        console.log('dropzone', acceptedFiles, rejectedFiles);

        if (rejectedFiles.length > 0) setRejectedFile(rejectedFiles[0].name);

        if (acceptedFiles.length > 0) {
          setFile({
            name: acceptedFiles[0].name,
          });
          uploader(
            `candidates/${uid}/resumes/${new Date().getTime()}/${
              acceptedFiles[0].name
            }`,
            acceptedFiles[0],
            (url, blob) => {
              setFile({ name: blob.name, url });
              cloudFunction(
                CLOUD_FUNCTIONS.RESUME_SCRAPER,
                { uid, url },
                o => {
                  console.log(o);
                },
                o => {
                  console.log(o);
                }
              );
            }
          );
        }
      }}
      accept="application/pdf"
      disabled={!!(file.url && file.name)}
    >
      {({ getRootProps, getInputProps, isDragActive }) => (
        <div
          {...getRootProps()}
          className={classNames(
            classes.dropzone,
            isDragActive && classes.dropzoneDragActive,
            !!(file.url && file.name) && classes.dropzoneDisabled,
            className
          )}
        >
          <input {...getInputProps()} />
          {file.url ? (
            <CloudDoneIcon className={classes.uploadIcon} />
          ) : file.name ? (
            <CircularProgress className={classes.circularProgress} size={48} />
          ) : (
            <CloudUploadIcon className={classes.uploadIcon} />
          )}
          {file.name ? (
            <Typography
              variant="body1"
              className={classes.fileName}
              component="a"
              href={file.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FileIcon className={classes.fileIcon} />
              {file.name}
            </Typography>
          ) : (
            <>
              <Typography variant="body1">
                {isDragActive
                  ? 'Drop your PDF here!'
                  : 'Drag and drop a PDF or click here'}
              </Typography>
              {rejectedFile && (
                <Typography variant="body2" color="error">
                  {rejectedFile} is invalid
                </Typography>
              )}
            </>
          )}
        </div>
      )}
    </Dropzone>
  );
};

ResumeUploader.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  resetOnUpload: PropTypes.bool,
};

export default withStyles(styles)(ResumeUploader);
