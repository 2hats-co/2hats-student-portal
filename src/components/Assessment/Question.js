import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

import CloudUploadIcon from '@material-ui/icons/CloudUploadOutlined';
import FileIcon from '@material-ui/icons/AttachmentRounded';
import CopyIcon from '@material-ui/icons/FileCopyOutlined';

import Dropzone from 'react-dropzone';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  QUILL_STYLES,
  DROPZONE_STYLES,
} from '@bit/sidney2hats.2hats.global.common-constants';

import { uploader } from '../../utilities/Uploader';
import { globalReplace, copyToClipboard } from '../../utilities';
import { padding, renderedHtml } from '../../constants/commonStyles';

const styles = theme => ({
  root: { ...padding(theme, true) },
  ...renderedHtml(theme),
  answerInputWrapper: { marginTop: theme.spacing.unit * 2 },
  quillEditor: { ...QUILL_STYLES(theme) },
  ...DROPZONE_STYLES(theme),

  mcEmailButton: {
    verticalAlign: 'baseline',
    marginLeft: theme.spacing.unit,
  },
  previewSubtitle: { marginTop: theme.spacing.unit * 2 },
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
  } = props;

  let answerInput = null;
  switch (submissionType) {
    case 'pdf':
      answerInput = (
        <>
          {!readOnly && (
            <Dropzone
              onDrop={files => {
                setAnswer({ name: files[0].name });
                uploader(
                  `submissions/${user.id}/${files[0].name}`,
                  files[0],
                  (url, blob) => {
                    setAnswer({ name: blob.name, url });
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
                  : () => {
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

    default:
      answerInput = null;
  }

  return (
    <Paper classes={{ root: classes.root }}>
      <Typography variant="h6">
        {questionNum > 0 ? `Question ${questionNum}` : 'Submission'}
      </Typography>
      <div
        className={classes.renderedHtml}
        dangerouslySetInnerHTML={{
          __html: globalReplace(questionText, '{{firstName}}', user.firstName),
        }}
      />
      <div className={classes.answerInputWrapper}>{answerInput}</div>
    </Paper>
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
