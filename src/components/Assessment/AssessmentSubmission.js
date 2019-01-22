import React, { useState, useContext, useEffect } from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';

import CloudUploadIcon from '@material-ui/icons/CloudUploadOutlined';
import FileIcon from '@material-ui/icons/AttachmentRounded';

import Dropzone from 'react-dropzone';

import UserContext from '../../contexts/UserContext';
import { uploader } from '../../utilities/Uploader';
import { COLLECTIONS } from '../../constants/firestore';
import { createDoc, updateProperties } from '../../utilities/firestore';

const styles = theme => ({
  root: {},
  section: { marginTop: theme.spacing.unit * 3 },

  dropzone: {
    borderRadius: theme.shape.borderRadius,
    borderColor: theme.palette.divider,
    borderStyle: 'dashed',
    borderWidth: theme.spacing.unit / 2,
    padding: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 3,
    textAlign: 'center',
    minHeight: theme.spacing.unit * 12,
    cursor: 'pointer',

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  uploadIcon: {
    fontSize: theme.spacing.unit * 8,
    color: theme.palette.text.secondary,
  },
  dropzoneButton: { marginTop: theme.spacing.unit / 2 },
  fileChip: {
    cursor: 'pointer',
    marginTop: theme.spacing.unit,
  },
});

const AssessmentSubmission = props => {
  const { classes, data } = props;

  const [file, setFile] = useState(null);
  const [submissionId, setSubmissionId] = useState('');

  const userContext = useContext(UserContext);
  const user = userContext.user;

  useEffect(() => {
    if (!data.assessmentId) {
      const { id, ...rest } = data;
      createDoc(`${COLLECTIONS.users}/${user.id}/${COLLECTIONS.assessments}`, {
        ...rest,
        UID: user.id,
        outcome: '',
        screened: false,
        submissionContent: {},
        assessmentId: id,
        submitted: false,
      }).then(docRef => {
        console.log('Created submission doc', docRef.id);
        setSubmissionId(docRef.id);
      });
    } else {
      setSubmissionId(data.id);
    }
  }, []);

  const handleSubmit = () => {
    if (file && file.url)
      updateProperties(
        `${COLLECTIONS.users}/${user.id}/${COLLECTIONS.assessments}`,
        submissionId,
        {
          submissionContent: {
            fileUrl: file.url,
            fileType: 'pdf',
            fileName: file.name,
          },
          submitted: true,
        }
      ).then(() => {
        console.log('Submitted');
      });
  };

  return (
    <>
      {!submissionId && (
        <div className={classes.section}>
          <LinearProgress />
        </div>
      )}
      <Collapse in={!!submissionId}>
        <>
          <div className={classes.section}>
            <Typography variant="h6">Instructions</Typography>
            <ol>
              {data.taskInstructions.map((x, i) => (
                <li key={i}>
                  <Typography variant="body1">{x}</Typography>
                </li>
              ))}
            </ol>
          </div>

          <div className={classes.section}>
            <Dropzone
              onDrop={files => {
                setFile({ name: files[0].name });
                uploader(
                  `submissions/${user.id}/${files[0].name}`,
                  files[0],
                  (url, blob) => {
                    setFile({ name: blob.name, url });
                  }
                );
              }}
              accept="application/pdf"
              className={classes.dropzone}
            >
              <CloudUploadIcon className={classes.uploadIcon} />
              <Typography variant="body1">Drag a file here or</Typography>
              <Button
                color="primary"
                variant="outlined"
                className={classes.dropzoneButton}
                size="small"
              >
                Click to select a PDF
              </Button>
            </Dropzone>

            {file && (
              <Chip
                component="a"
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                label={file.name}
                onDelete={() => {
                  setFile(null);
                }}
                className={classes.fileChip}
                icon={file.url ? <FileIcon /> : <CircularProgress size={24} />}
              />
            )}
          </div>

          <div className={classes.section}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={!file || !file.url}
            >
              Submit
            </Button>
          </div>
        </>
      </Collapse>
    </>
  );
};

export default withStyles(styles)(AssessmentSubmission);
