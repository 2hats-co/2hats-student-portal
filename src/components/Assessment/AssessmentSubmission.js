import React, { useState, useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

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

import Question from './Question';
import UserContext from '../../contexts/UserContext';
import { uploader } from '../../utilities/Uploader';
import * as ROUTES from '../../constants/routes';
import { COLLECTIONS } from '../../constants/firestore';
import { createDoc, updateProperties } from '../../utilities/firestore';

const styles = theme => ({
  root: {},
  section: { marginTop: theme.spacing.unit * 3 },

  renderedHtml: {
    ...theme.typography.body2,

    '& p': { margin: 0 },
    '& li': {
      counterIncrement: 'list-0',
      counterReset:
        'list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9',
      listStyleType: 'none',
      '&::before': { content: "counter(list-0, decimal) '. '" },
    },
    '& li.ql-indent-1': {
      counterIncrement: 'list-1',
      counterReset: 'list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9',
      listStyleType: 'none',
      paddingLeft: '1em',
      '&::before': { content: "counter(list-1, lower-alpha) '. '" },
    },
    '& li.ql-indent-2': {
      counterIncrement: 'list-2',
      counterReset: 'list-3 list-4 list-5 list-6 list-7 list-8 list-9',
      listStyleType: 'none',
      paddingLeft: '2em',
      '&::before': { content: "counter(list-2, lower-roman) '. '" },
    },
  },

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
  const { classes, data, history } = props;

  const [file, setFile] = useState(null);
  const [submissionId, setSubmissionId] = useState('');
  const [answers, setAnswers] = useState([]);
  console.log(answers);

  const updateAnswers = i => val => {
    const newAnswers = [...answers];
    newAnswers[i] = val;
    setAnswers(newAnswers);
  };

  const userContext = useContext(UserContext);
  const user = userContext.user;

  useEffect(() => {
    if (!data.assessmentId) {
      const { id, ...rest } = data;

      const copiedAssessment = {
        ...rest,
        UID: user.id,
        outcome: '',
        screened: false,
        submissionContent: {},
        assessmentId: id,
        submitted: false,
      };

      if (
        data.questionsDisplayed > 0 &&
        data.questions &&
        data.questions.length > 0
      ) {
        const copiedQuestions = [];
        const copiedQuestionsIndices = [];

        while (copiedQuestions.length < data.questionsDisplayed) {
          const index = Math.floor(Math.random() * data.questions.length);
          if (!copiedQuestionsIndices.includes(index)) {
            copiedQuestionsIndices.push(index);
            copiedQuestions.push(data.questions[index]);
          }
        }

        copiedAssessment.questions = copiedQuestions;
        copiedAssessment.copiedQuestionsIndices = copiedQuestionsIndices;
      }

      createDoc(
        `${COLLECTIONS.users}/${user.id}/${COLLECTIONS.assessments}`,
        copiedAssessment
      ).then(docRef => {
        console.log('Created submission doc', docRef.id);
        setSubmissionId(docRef.id);

        const newTouchedAssessments = user.touchedAssessments || [];
        newTouchedAssessments.push(data.id);
        updateProperties(COLLECTIONS.users, user.id, {
          touchedAssessments: newTouchedAssessments,
        });

        history.push(`${ROUTES.ASSESSMENTS}?id=${docRef.id}&yours=true`);
      });
    } else {
      setSubmissionId(data.id);
    }
  }, []);

  const handleSubmit = () => {
    updateProperties(
      `${COLLECTIONS.users}/${user.id}/${COLLECTIONS.assessments}`,
      submissionId,
      {
        outcome: '',
        screened: false,
        submissionContent: answers,
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
            <div
              className={classes.renderedHtml}
              dangerouslySetInnerHTML={{ __html: data.taskInstructions }}
            />
          </div>

          {/* <div className={classes.section}>
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
          </div> */}

          {data.questions.map((x, i) => (
            <Question
              key={i}
              classes={classes}
              questionNum={i + 1}
              questionText={x}
              submissionType={data.submissionType}
              answer={answers[i]}
              setAnswer={updateAnswers(i)}
              user={user}
            />
          ))}

          <div className={classes.section}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </>
      </Collapse>
    </>
  );
};

export default withRouter(withStyles(styles)(AssessmentSubmission));
