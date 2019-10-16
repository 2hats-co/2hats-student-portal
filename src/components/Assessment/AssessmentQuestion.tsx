import React from 'react';

import {
  makeStyles,
  createStyles,
  Typography,
  Button,
  Chip,
  LinearProgress,
} from '@material-ui/core';

import CopyIcon from '@material-ui/icons/FileCopyOutlined';
import LaunchIcon from '@material-ui/icons/Launch';
import FileIcon from '@material-ui/icons/Attachment';

import HeadingCaps from '@bit/twohats.common.components.heading-caps';
import StyledDropzone from '@bit/twohats.common.components.styled-dropzone';
import { DropFilesEventHandler } from 'react-dropzone';
import { uploader } from '../../utilities/Uploader';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { DocWithId, UsersDoc } from '@bit/twohats.common.db-types';
import { RenderedHtmlStyles, QuillStyles } from '@bit/twohats.common.styles';
import { copyToClipboard, sanitiseHtml } from '../../utilities';

const useStyles = makeStyles(theme =>
  createStyles({
    ...RenderedHtmlStyles(theme),
    ...QuillStyles(theme),

    root: { margin: theme.spacing(0, 0, 4) },
    section: { marginTop: theme.spacing(4) },

    answerInputWrapper: { marginTop: theme.spacing(2) },

    fileChip: { maxWidth: '100%' },
    fileIcon: { transform: 'rotate(-45deg)' },
    fileChipLabel: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      paddingRight: 0,
      marginRight: theme.spacing(1.5),
    },

    mcEmailButton: {
      verticalAlign: 'baseline',
      marginLeft: theme.spacing(1),
    },
    previewSubtitle: { marginTop: theme.spacing(2) },

    linearProgress: { marginTop: theme.spacing(1) },
  })
);

interface IAssessmentQuestionProps {
  /** Question number. Set to -1 to hide */
  questionNum: -1 | number;
  /** HTML string to display as question text */
  questionText?: string;
  /** Type of submission */
  submissionType: 'pdf' | 'richText' | 'mailchimp' | 'zip' | 'ideo';
  /** Answer stored in state from above */
  answer?: any;
  /** Update answer in state */
  setAnswer: (answer: any) => void;
  /** Generated Mailchimp email to which users to send Mailchimp campaigns */
  mcEmail?: string;
  /** SmartLink to IDEO submissions */
  smartLink?: {
    key: string;
    secret: string;
  };
  /** Users doc so we can udpate the submission doc */
  user: DocWithId<UsersDoc>;
  /** Prevent updates to the user’s answers (e.g. user has submitted) */
  readOnly?: boolean;
}

/**
 * Displays the corresponding submission entry components for each question in
 * the submission. If there are no questions, set `questionNum` prop to -1.
 */
const AssessmentQuestion: React.FunctionComponent<IAssessmentQuestionProps> = ({
  questionNum,
  questionText,
  submissionType,
  answer,
  setAnswer,
  mcEmail,
  smartLink,
  user,
  readOnly,
}) => {
  const classes = useStyles();

  const handleDrop: DropFilesEventHandler = (acceptedFiles, rejectedFiles) => {
    // Upload file
    if (acceptedFiles.length > 0) {
      // Set file name for display
      setAnswer({ name: acceptedFiles[0].name || 'submission' });
      uploader(
        `submissions/${user.id}/${new Date().getTime()}/${
          acceptedFiles[0].name
        }`,
        acceptedFiles[0],
        // Store in state
        (url: string, blob: File) => setAnswer({ name: blob.name, url })
      );
    }
  };

  let answerInput = null;
  switch (submissionType) {
    case 'pdf':
    case 'zip':
      answerInput = (
        <>
          {readOnly ? (
            <Chip
              icon={<FileIcon className={classes.fileIcon} />}
              label={answer ? answer.name : ''}
              clickable
              classes={{
                root: classes.fileChip,
                label: classes.fileChipLabel,
              }}
              component="a"
              href={answer ? answer.url : ''}
              target="_blank"
              rel="noopener noreferrer"
            />
          ) : (
            <StyledDropzone
              dropHandler={handleDrop}
              file={answer}
              setFile={setAnswer}
              accept={
                submissionType === 'pdf'
                  ? 'application/pdf'
                  : 'application/zip, application/x-zip-compressed'
              }
              fileLabel={submissionType === 'pdf' ? 'PDF file' : 'ZIP file'}
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
          onChange={val => setAnswer(val)}
          theme="snow"
          className={classes.quillEditor}
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
              endIcon={<CopyIcon />}
            >
              Copy
            </Button>
          </Typography>
          <HeadingCaps className={classes.section}>Email preview</HeadingCaps>
          {answer ? (
            <div
              className={classes.renderedHtmlOriginal}
              dangerouslySetInnerHTML={{ __html: sanitiseHtml(answer.body) }}
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
            <Typography variant="body1" gutterBottom>
              Write your code using our <b>code editor</b>, where you can make
              changes in real time and submit with one click.
            </Typography>
            <Typography variant="body1" paragraph>
              Note: You <b>must</b> submit in the code editor, not on this page.
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
              endIcon={<LaunchIcon />}
            >
              Open in new tab
            </Button>

            <div className={classes.section}>
              <HeadingCaps>Having issues?</HeadingCaps>
              <Typography variant="body1">
                Alternatively, upload your code to GitHub and submit a link to
                your repo through our code editor.
              </Typography>
            </div>
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
      {/* Render the heading */}
      <HeadingCaps>
        {questionNum > 0 ? `Question ${questionNum}` : 'Submission'}
      </HeadingCaps>

      <div
        className={classes.renderedHtml}
        dangerouslySetInnerHTML={{
          __html: questionText
            ? sanitiseHtml(questionText).replace(
                /{{firstName}}/gm,
                user.firstName
              )
            : '',
        }}
      />

      <div className={classes.answerInputWrapper}>{answerInput}</div>
    </div>
  );
};

export default AssessmentQuestion;
