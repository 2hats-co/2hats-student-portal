import React, { useState, SyntheticEvent } from 'react';
import clsx from 'clsx';

import {
  makeStyles,
  createStyles,
  Typography,
  CircularProgress,
  Chip,
} from '@material-ui/core';
import Dropzone, { DropFilesEventHandler } from 'react-dropzone';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import FileIcon from '@material-ui/icons/Attachment';

export const DROPZONE_HEIGHT = 160;
export const DropzoneStyles = makeStyles(theme =>
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
      maxWidth: '100%',
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

export interface IStyledDropzoneProps {
  /** Handles the files on drop. Will be responsible for uploading files */
  dropHandler: DropFilesEventHandler;
  /** Store the file in a useState in this format */
  file: { url?: string; name?: string };
  /** Function to update the file in state */
  setFile: (file: { url?: string; name?: string }) => void;
  /** Comma-separated MIME types to accept in the input type file field */
  accept: string;
  /** Optional override for the rendered component */
  className?: string;
  /** Override the loading state */
  loading?: boolean;
  /** Override the disabled state */
  disabled?: boolean;
  /** Optionally, provide text to show in prompts for the file type, e.g. "PDF resume" */
  fileLabel?: string;
}

/**
 * A styled Dropzone component. Need to provide a way to upload files using
 * dropHandler and store file in local state via file, setFile props.
 */
const StyledDropzone: React.FunctionComponent<IStyledDropzoneProps> = ({
  dropHandler,
  file = {},
  setFile,
  accept,
  className,
  loading = false,
  disabled = false,
  fileLabel = 'file',
}) => {
  const classes = DropzoneStyles();
  // Store rejected file name here
  const [rejectedFile, setRejectedFile] = useState('');

  // Render the dropzone
  return (
    <Dropzone
      onDrop={(acceptedFiles, rejectedFiles, event) => {
        // Store rejected files here
        if (rejectedFiles.length > 0) setRejectedFile(rejectedFiles[0].name);
        // Call the drop handler from props
        dropHandler(acceptedFiles, rejectedFiles, event);
      }}
      accept={accept}
      disabled={disabled}
    >
      {({ getRootProps, getInputProps, isDragActive }) => {
        // Display different icons based off the state
        let icon: React.ReactNode = null;
        // Show loading if we have the loading prop true
        if (loading)
          icon = (
            <CircularProgress className={classes.circularProgress} size={40} />
          );
        // We have a URL, so the file has been uploaded
        if (file.url) icon = <CloudDoneIcon className={classes.uploadIcon} />;
        // If file is uploading, show loading
        else if (file.name)
          icon = (
            <CircularProgress className={classes.circularProgress} size={40} />
          );
        // Otherwise, static state
        else icon = <CloudUploadIcon className={classes.uploadIcon} />;

        // Display different prompt text based on state
        let uploadText = null;
        if (loading) uploadText = 'Loading…';
        else if (isDragActive) uploadText = `Drop your ${fileLabel} here!`;
        else if (file.name && file.url) uploadText = 'We’ve got it!';
        else if (file.name) uploadText = 'Uploading…';
        else uploadText = `Drag and drop or click to upload your ${fileLabel}`;

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
                onDelete={(e: SyntheticEvent) => {
                  // Stop the file picker showing or opening the file in a new tab
                  e.preventDefault();
                  setFile({});
                }}
                // Needed to stop the file picker showing again
                onClick={(e: SyntheticEvent) => e.stopPropagation()}
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

export default StyledDropzone;
