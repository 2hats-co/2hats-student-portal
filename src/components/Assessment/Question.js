import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';

import CloudUploadIcon from '@material-ui/icons/CloudUploadOutlined';
import FileIcon from '@material-ui/icons/AttachmentOutlined';
import CopyIcon from '@material-ui/icons/FileCopyOutlined';
// import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import LaunchIcon from '@material-ui/icons/Launch';

import Dropzone from 'react-dropzone';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { STYLES } from '@bit/sidney2hats.2hats.global.common-constants';

import { uploader } from '../../utilities/Uploader';
import { globalReplace, copyToClipboard } from '../../utilities';

const styles = theme => ({
  root: { margin: `${theme.spacing(4)}px 0` },

  ...STYLES.RENDERED_HTML(theme),

  answerInputWrapper: { marginTop: theme.spacing(2) },

  quillEditor: { ...STYLES.QUILL(theme) },

  ...STYLES.DROPZONE(theme),

  mcEmailButton: {
    verticalAlign: 'baseline',
    marginLeft: theme.spacing(1),
  },
  previewSubtitle: { marginTop: theme.spacing(2) },

  linearProgress: { marginTop: theme.spacing(1) },

  paddedIcon: {
    marginLeft: -theme.spacing(1) / 2,
    marginRight: theme.spacing(1.5),

    [theme.breakpoints.up('lg')]: { marginLeft: -48 - 12 },
  },
});

const Question = props => {
  const {
    classes,
    questionNum,
    questionText,
    submissionType,
    mcEmail,
    answer,
    setAnswer,
    user,
    readOnly,
    smartLink,
  } = props;

  const [rejectedFile, setRejectedFile] = useState('');

  let answerInput = null;
  switch (submissionType) {
    case 'pdf':
    case 'zip':
      answerInput = (
        <>
          {!readOnly && (
            <Dropzone
              onDrop={(acceptedFiles, rejectedFiles) => {
                console.log('dropzone', acceptedFiles, rejectedFiles);

                if (rejectedFiles.length > 0)
                  setRejectedFile(rejectedFiles[0].name);

                if (acceptedFiles.length > 0) {
                  setAnswer({ name: acceptedFiles[0].name || 'submission' });
                  uploader(
                    `submissions/${user.id}/${new Date()}/${
                      acceptedFiles[0].name
                    }`,
                    acceptedFiles[0],
                    (url, blob) => {
                      setAnswer({ name: blob.name, url });
                    }
                  );
                }
              }}
              accept={
                submissionType === 'pdf'
                  ? 'application/pdf'
                  : ['application/zip', 'application/x-zip-compressed']
              }
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
                    {isDragActive
                      ? `Drop your ${submissionType.toUpperCase()} here!`
                      : `Drag a ${submissionType.toUpperCase()} file here or`}
                  </Typography>
                  <Button
                    color="primary"
                    variant="outlined"
                    className={classes.dropzoneButton}
                    size="small"
                  >
                    Click to select a {submissionType.toUpperCase()} file
                  </Button>
                  {rejectedFile && (
                    <Typography variant="body2" color="error">
                      {rejectedFile} is invalid
                    </Typography>
                  )}
                </div>
              )}
            </Dropzone>
          )}

          {answer && (
            <Chip
              component="a"
              href={answer.url}
              target="_blank"
              rel="noopener noreferrer"
              label={answer.name}
              onDelete={
                readOnly
                  ? null
                  : e => {
                      e.preventDefault();
                      setAnswer(null);
                    }
              }
              className={classes.fileChip}
              icon={
                answer.url ? (
                  <FileIcon className={classes.fileIcon} />
                ) : (
                  <CircularProgress size={24} />
                )
              }
            />
          )}
        </>
      );
      break;

    case 'richText':
      answerInput = (
        <ReactQuill
          readOnly={readOnly}
          placeholder="Type your answer here…"
          value={answer || ''}
          onChange={val => {
            setAnswer(val);
          }}
          theme="snow"
          className={classes.quillEditor}
          preserveWhiteSpace
          modules={{
            toolbar: [
              ['bold', 'italic', 'underline'],

              [{ header: 1 }, { header: 2 }],
              [{ list: 'bullet' }, { list: 'ordered' }],
              [{ indent: '-1' }, { indent: '+1' }],

              ['link'],
            ],
          }}
        />
      );
      break;

    case 'mailchimp':
      answerInput = (
        <>
          <Typography variant="body1">
            Send your email to <strong>{mcEmail}</strong>
            <Button
              variant="outlined"
              color="primary"
              className={classes.mcEmailButton}
              onClick={() => {
                copyToClipboard(mcEmail);
                alert(`Copied to ${mcEmail} clipboard`);
              }}
            >
              Copy
              <CopyIcon />
            </Button>
          </Typography>
          <Typography variant="subtitle1" className={classes.previewSubtitle}>
            Email preview
          </Typography>
          {answer ? (
            <div
              className={classes.renderedHtmlOriginal}
              dangerouslySetInnerHTML={{ __html: answer.body }}
            />
          ) : (
            <Typography variant="body1">
              Your email will appear here when we receive it.
            </Typography>
          )}
        </>
      );
      break;

    case 'ideo':
      answerInput =
        smartLink && smartLink.key && smartLink.secret ? (
          <>
            <Typography variant="body1" style={{ marginBottom: '1em' }}>
              Write your code using our <b>code editor</b>, where you can make
              changes in real time and submit with one click. No need for
              uploading ZIPs or creating GitHub repositories.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              component="a"
              href={`https://${
                process.env.REACT_APP_ENV === 'STAGING'
                  ? 'ideo-2hata.firebaseapp.com'
                  : 'ide.2hats.com'
              }/?slKey=${smartLink.key}&slSecret=${smartLink.secret}`}
              target="_blank"
              rel="noopener noreferrer"
              size="large"
              className={classes.getStartedButton}
            >
              Open in new tab
              <LaunchIcon />
            </Button>
          </>
        ) : (
          <>
            <Typography variant="body1">Generating link…</Typography>
            <LinearProgress className={classes.linearProgress} />
          </>
        );
      break;

    default:
      answerInput = null;
  }

  return (
    <div className={classes.root}>
      <Typography variant="h6" gutterBottom>
        {questionNum > 0 ? `Question ${questionNum}` : 'Submission'}
      </Typography>
      <div
        className={classes.renderedHtml}
        dangerouslySetInnerHTML={{
          __html: globalReplace(questionText, '{{firstName}}', user.firstName),
        }}
      />
      <div className={classes.answerInputWrapper}>{answerInput}</div>
    </div>
  );
};

Question.propTypes = {
  classes: PropTypes.object.isRequired,
  questionNum: PropTypes.number.isRequired,
  questionText: PropTypes.string,
  submissionType: PropTypes.string.isRequired,
  mcEmail: PropTypes.string,
  answer: PropTypes.any,
  setAnswer: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  readOnly: PropTypes.bool,
};

export default withStyles(styles)(Question);
