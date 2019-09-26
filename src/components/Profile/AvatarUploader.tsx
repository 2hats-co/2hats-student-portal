import React, { useState } from 'react';
import Dropzone, { DropFilesEventHandler } from 'react-dropzone';

import {
  makeStyles,
  createStyles,
  IconButton,
  Avatar,
  CircularProgress,
} from '@material-ui/core';
import ProfileImageUploadIcon from 'assets/icons/ProfileImageUpload';

import { useUser } from 'contexts/UserContext';
import { blobAvatarUploader } from 'utilities/Uploader';
import { COLLECTIONS } from '@bit/twohats.common.constants';
import { updateDoc } from 'utilities/firestore';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      position: 'relative',
      outline: 'none',
    },

    button: {
      padding: 0,
      overflow: 'hidden',
      '&:hover $uploadIconOverlay': { opacity: 1 },
    },

    avatar: {
      width: 80,
      height: 80,
    },

    uploadIconOverlay: {
      transition: theme.transitions.create('opacity', {
        duration: theme.transitions.duration.shortest,
      }),
      opacity: 0,

      position: 'absolute',
      color: '#fff',
      backgroundColor: 'rgba(0, 0, 0, 0.33)',
      boxShadow: '0 0 0 24px rgba(0, 0, 0, 0.33)',
    },

    spinner: {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 1,
    },
  })
);

/**
 * Displays the user’s current avatar and uploads a new one with Dropzone.
 */
const AvatarUploader: React.FunctionComponent = () => {
  const classes = useStyles();
  const { user } = useUser();

  const [loading, setLoading] = useState(false);

  const handleDrop: DropFilesEventHandler = (acceptedFiles, rejectedFiles) => {
    if (acceptedFiles.length >= 0 && !!acceptedFiles[0]) {
      setLoading(true);
      blobAvatarUploader(acceptedFiles[0], async (url: string) => {
        await updateDoc(COLLECTIONS.users, user.id, { avatarURL: url });
        setLoading(false);
      });
    } else {
      alert('This file is invalid');
      setLoading(false);
    }
  };

  return (
    <Dropzone onDrop={handleDrop} accept="image/*" disabled={loading}>
      {({ getRootProps, getInputProps }) => (
        <div {...getRootProps()} className={classes.root}>
          <input {...getInputProps()} />
          <IconButton className={classes.button}>
            <Avatar
              src={loading ? undefined : user.avatarURL}
              className={classes.avatar}
            >
              <ProfileImageUploadIcon fontSize="large" />
            </Avatar>
            <ProfileImageUploadIcon
              fontSize="large"
              className={classes.uploadIconOverlay}
            />
          </IconButton>

          {loading && (
            <CircularProgress
              className={classes.spinner}
              size={80}
              thickness={2.5}
            />
          )}
        </div>
      )}
    </Dropzone>
  );
};

export default AvatarUploader;
