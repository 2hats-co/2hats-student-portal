import React, { useEffect, useContext, useState } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import Dropzone from 'react-dropzone';

import CloudUploadIcon from '@material-ui/icons/CloudUploadOutlined';
import CloudDoneIcon from '@material-ui/icons/CloudDoneOutlined';
import FileIcon from '@material-ui/icons/AttachmentRounded';

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
  },

  fileName: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',

    marginLeft: -theme.spacing.unit,
    width: '100%',

    textDecoration: 'none',
    cursor: 'pointer',
  },
  fileIcon: {
    ...STYLES.DROPZONE(theme).fileIcon,
    marginRight: theme.spacing.unit / 2,
    verticalAlign: 'bottom',
  },

  circularProgress: {
    color: theme.palette.text.secondary,
    margin: theme.spacing.unit,
  },
});

const ResumeUploader = props => {
  const { classes } = props;

  const [file, setFile] = useState({});

  useEffect(
    () => {
      if (file.name && file.url) {
        updateDoc(COLLECTIONS.profiles, uid, { resume: file }).then(() => {
          cloudFunction(
            CLOUD_FUNCTIONS.WHATS_NEXT_AI,
            {},
            o => console.log(o),
            o => console.log(o)
          );
        });
      }
    },
    [file]
  );

  const userContext = useContext(UserContext);
  const uid = userContext.user.id;

  return (
    <Dropzone
      onDrop={files => {
        setFile({
          name: files[0].name,
        });
        uploader(
          `candidates/${uid}/resumes/${new Date().getTime()}/${files[0].name}`,
          files[0],
          (url, blob) => {
            setFile({ name: blob.name, url });
          }
        );
      }}
      accept="application/pdf"
      className={classes.dropzone}
      style={file.url || file.name ? { cursor: 'default' } : {}}
      disabled={file.url && file.name}
    >
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
        <Typography variant="body1">Drag a PDF here or click here</Typography>
      )}
    </Dropzone>
  );
};

export default withStyles(styles)(ResumeUploader);
