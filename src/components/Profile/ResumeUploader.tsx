import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import {
  makeStyles,
  createStyles,
  Typography,
  Chip,
  CircularProgress,
} from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import FileIcon from '@material-ui/icons/Attachment';

import Dropzone, { DropFilesEventHandler } from 'react-dropzone';

import { useUser } from 'contexts/UserContext';
import { COLLECTIONS } from '@bit/twohats.common.constants';
import { uploader } from 'utilities/Uploader';
import { CLOUD_FUNCTIONS, cloudFunction } from 'utilities/CloudFunctions';
import { updateDoc } from 'utilities/firestore';
import useDocument from 'hooks/useDocument';

export const DROPZONE_HEIGHT = 140;

const useDropzoneStyles = makeStyles(theme =>
  createStyles({
    dropzone: {
      borderRadius: theme.shape.borderRadius * 2,
      borderColor: theme.palette.divider,
      borderStyle: 'dashed',
      borderWidth: theme.spacing(0.5),

      backgroundColor: theme.palette.action.hover,

      padding: theme.spacing(2),

      height: DROPZONE_HEIGHT,
      boxSizing: 'border-box',

      textAlign: 'center',
      cursor: 'pointer',
      userSelect: 'none',
      outline: 'none',

      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',

      // Orange on drop
      '&:not($dropzoneDisabled):focus': {
        outline: 'none',
        borderColor: theme.palette.primary.main,
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.light,

        '& *': { color: theme.palette.primary.main },
      },

      '@media print': { display: 'none' },
    },
    dropzoneDragActive: {
      borderColor: theme.palette.primary.main,
      color: theme.palette.primary.main,

      '& *': { color: theme.palette.primary.main },
    },
    dropzoneDisabled: { cursor: 'default' },

    uploadIcon: {
      fontSize: 48,
      color: theme.palette.text.secondary,
    },
    circularProgress: {
      color: theme.palette.text.secondary,
      margin: theme.spacing(0.5),
    },

    uploadText: {
      width: 180,
      lineHeight: 1.3,
      margin: theme.spacing(0.5, 0),
    },

    fileChip: {
      cursor: 'pointer',
      marginTop: theme.spacing(0.5),
    },
    fileIcon: { transform: 'rotate(-45deg)' },
    fileChipLabel: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      paddingRight: 0,
      marginRight: theme.spacing(1.5),
    },
  })
);

export interface ResumeUploaderProps {
  /** Optional style overrides */
  className?: string;
  /** Optionally, reset the file picker after upload */
  resetOnUpload?: boolean;
  /** Optionally, pass a callback to be fired after upload */
  onUpload?: (name?: string, url?: string) => void;
}

/**
 * Uploads resume to Firebase Storage + sets it in the user’s profile doc.
 *
 * ## Must already have user document
 * This component should only be rendered when the user document is in
 * `UserContext`
 *
 * ## CloudFunctions
 * On upload, calls Resume Scraper functions.
 */
const ResumeUploader: React.FC<ResumeUploaderProps> = ({
  className,
  resetOnUpload = false,
  onUpload,
}) => {
  const classes = useDropzoneStyles();

  const { user, profile } = useUser();
  const uid = user.id;

  // If name exists, a file has been selected and is uploading
  // If url also exists, the file has been uploaded
  const [file, setFile] = useState<{ name?: string; url?: string }>({});

  // Once the profile loads, set the resume file if it exists
  useEffect(() => {
    if (profile && profile.resume && profile.resume.name && profile.resume.url)
      setFile(profile.resume);
  }, [profile]);

  // If rejectedFile exists, show an error message
  const [rejectedFile, setRejectedFile] = useState('');

  // On drop (or click), upload file
  const handleDrop: DropFilesEventHandler = (acceptedFiles, rejectedFiles) => {
    // Show file rejection message
    if (rejectedFiles.length > 0) setRejectedFile(rejectedFiles[0].name);

    // Upload file
    if (acceptedFiles.length > 0) {
      // Set file name for display
      setFile({ name: acceptedFiles[0].name });
      // Reset rejected file
      setRejectedFile('');
      uploader(
        `candidates/${uid}/resumes/${new Date().getTime()}/${
          acceptedFiles[0].name
        }`,
        acceptedFiles[0],
        // Store in state
        (url: string, blob: File) => setFile({ name: blob.name, url })
      );
    }
  };

  // After the file has been uploaded, calls Resume Scraper Cloud Function
  useEffect(() => {
    if (file.name && file.url) {
      updateDoc(COLLECTIONS.profiles, uid, { resume: file }).then(() => {
        cloudFunction(
          CLOUD_FUNCTIONS.RESUME_SCRAPER,
          { uid, url: file.url },
          (o: any) => console.log('resume scraper cloud function', o),
          (o: any) => console.error('resume scraper cloud function error', o)
        );
        // Optionally reset file picker on upload
        if (resetOnUpload) setFile({});
        // Call the callback if it exists
        if (onUpload) onUpload(file.name, file.url);
      });
    }
  }, [file.url]);

  return (
    <Dropzone
      onDrop={handleDrop}
      accept="application/pdf"
      disabled={!!(file.url && file.name)}
    >
      {({ getRootProps, getInputProps, isDragActive }) => {
        // Display different icons based off the state
        let icon: React.ReactNode = null;
        // We have a URL, so the file has been uploaded
        if (file.url) icon = <CloudDoneIcon className={classes.uploadIcon} />;
        // If file is uploading or we’re waiting on profile to load
        else if (file.name || !profile)
          icon = (
            <CircularProgress className={classes.circularProgress} size={40} />
          );
        // Otherwise, static state
        else icon = <CloudUploadIcon className={classes.uploadIcon} />;

        // Display different prompt text based on state
        let uploadText = null;
        if (isDragActive) uploadText = 'Drop your PDF here!';
        else if (file.name && file.url) uploadText = 'We’ve got it!';
        // Profile listener loading
        else if (!profile) uploadText = 'Loading…';
        else if (file.name) uploadText = 'Uploading…';
        else uploadText = 'Drag and drop or click to upload your PDF résumé';

        return (
          <div
            {...getRootProps()}
            className={clsx(
              classes.dropzone,
              isDragActive && classes.dropzoneDragActive,
              !!(file.url && file.name) && classes.dropzoneDisabled,
              className
            )}
          >
            <input {...getInputProps()} />

            {icon}

            <Typography
              variant="overline"
              color="textSecondary"
              className={classes.uploadText}
            >
              {uploadText}
            </Typography>

            {rejectedFile && (
              <Typography variant="body2" color="error">
                {rejectedFile} is invalid
              </Typography>
            )}

            {file.name && (
              <Chip
                icon={<FileIcon className={classes.fileIcon} />}
                label={file.name}
                onDelete={e => {
                  e.preventDefault();
                  setFile({});
                }}
                variant="outlined"
                classes={{
                  root: classes.fileChip,
                  label: classes.fileChipLabel,
                }}
                component="a"
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
              />
            )}
          </div>
        );
      }}
    </Dropzone>
  );
};

export default ResumeUploader;
