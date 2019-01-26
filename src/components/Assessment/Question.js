import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

import CloudUploadIcon from '@material-ui/icons/CloudUploadOutlined';
import FileIcon from '@material-ui/icons/AttachmentRounded';

import Dropzone from 'react-dropzone';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import UserContext from '../../contexts/UserContext';
import { uploader } from '../../utilities/Uploader';
import { globalReplace } from '../../utilities';

const Question = props => {
  const {
    classes,
    questionNum,
    questionText,
    submissionType,
    answer,
    setAnswer,
    user,
  } = props;

  let answerInput = null;
  switch (submissionType) {
    case 'pdf':
      answerInput = (
        <>
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

          {answer && (
            <Chip
              component="a"
              href={answer.url}
              target="_blank"
              rel="noopener noreferrer"
              label={answer.name}
              onDelete={() => {
                setAnswer(null);
              }}
              className={classes.fileChip}
              icon={answer.url ? <FileIcon /> : <CircularProgress size={24} />}
            />
          )}
        </>
      );
      break;

    case 'richText':
      answerInput = (
        <ReactQuill
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

    default:
      answerInput = null;
  }

  return (
    <div className={classes.section}>
      <Typography variant="h6">Question {questionNum}</Typography>
      <div
        className={classes.renderedHtml}
        dangerouslySetInnerHTML={{
          __html: globalReplace(questionText, '{{firstName}}', user.firstName),
        }}
      />
      {answerInput}
    </div>
  );
};

export default Question;
