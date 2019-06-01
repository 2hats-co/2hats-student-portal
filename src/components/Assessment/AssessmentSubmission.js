import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';

import PaddedIcon from '../PaddedIcon';
import InstructionsIcon from '@material-ui/icons/AssignmentOutlined';
import CheckIcon from '@material-ui/icons/Check';
import SubmittedIcon from '@material-ui/icons/SendRounded';

import Question from './Question';
import {
  COLLECTIONS,
  STYLES,
} from '@bit/sidney2hats.2hats.global.common-constants';
import { removeHtmlTags } from '../../utilities';
import { updateDoc } from '../../utilities/firestore';
import {
  checkSmartLink,
  //createIdeoSmartLink,
} from '../../utilities/assessments';

const styles = theme => ({
  root: {},
  section: { marginTop: theme.spacing(3) },

  ...STYLES.RENDERED_HTML(theme),

  loading: {
    marginTop: theme.spacing(3),
    backgroundColor: 'transparent',
  },

  submitButton: {
    fontSize: theme.spacing(2),
    borderRadius: 60,
    margin: `${theme.spacing(3)}px 0 ${theme.spacing(6)}px`,
    '@media print': { display: 'none' },
  },
  saveButton: {
    fontSize: theme.spacing(2),
    borderRadius: 60,
    marginLeft: theme.spacing(1),
    '@media print': { display: 'none' },
  },

  paddedIcon: {
    marginLeft: -theme.spacing(1) / 2,
    marginRight: theme.spacing(1.5),

    [theme.breakpoints.up('lg')]: { marginLeft: -48 - 12 },
  },

  snackbar: {
    [theme.breakpoints.down('sm')]: { bottom: theme.spacing(8) },
    [theme.breakpoints.down('xs')]: { bottom: theme.spacing(7) },
  },
  savedTick: {
    verticalAlign: 'bottom',
    marginRight: theme.spacing(1),
  },
});

const AssessmentSubmission = props => {
  const { classes, data, user } = props;

  const [submissionId, setSubmissionId] = useState('');
  const [answers, setAnswers] = useState(
    // data.outcome !== 'fail' &&
    Array.isArray(data.submissionContent) ? data.submissionContent : []
  );
  const [showSnackbar, setShowSnackbar] = useState(false);

  const updateAnswers = i => val => {
    const newAnswers = [...answers];
    newAnswers[i] = val;
    setAnswers(newAnswers);
  };

  // non-empty submission validation
  let disableSubmission =
    answers.length === 0 ||
    answers.includes(undefined) ||
    (data.copiedQuestions && answers.length < data.copiedQuestions.length);
  answers.forEach(x => {
    if (!x) {
      disableSubmission = true;
      return;
    }
    if (typeof x === 'string' && removeHtmlTags(x).length === 0) {
      disableSubmission = true;
      return;
    }
    if (
      (data.submissionType === 'pdf' || data.submissionType === 'zip') &&
      !x.url
    ) {
      disableSubmission = true;
      return;
    }
    if (
      data.submissionType === 'mailchimp' &&
      typeof x === 'object' &&
      !x.body
    ) {
      disableSubmission = true;
      return;
    }
  });

  // read-only if submitted
  const readOnly = data.submitted;

  // on first mount only
  useEffect(() => {
    if (data.assessmentId) {
      setSubmissionId(data.id);
      checkSmartLink(data, user);
    }
  }, []);

  useEffect(() => {
    if (
      data.assessmentId &&
      (data.copiedQuestions || data.questionsDisplayed === 0)
    )
      setSubmissionId(data.id);
  }, [data.id]);

  useEffect(() => {
    if (data.submissionContent && Array.isArray(data.submissionContent))
      setAnswers(data.submissionContent);
    if (
      (data.submissionType === 'ideo' && !data.smartLink) ||
      data.smartLink === {}
    ) {
      //createIdeoSmartLink(data, user);
    }
  }, [data.submissionContent]);

  const handleSave = () => {
    updateDoc(
      `${COLLECTIONS.users}/${user.id}/${COLLECTIONS.assessments}`,
      submissionId,
      {
        outcome: 'pending',
        screened: false,
        submissionContent: answers,
        submitted: false,
      }
    ).then(() => {
      console.log('Saved');
      setShowSnackbar(true);
    });
  };

  const handleSubmit = () => {
    updateDoc(
      `${COLLECTIONS.users}/${user.id}/${COLLECTIONS.assessments}`,
      submissionId,
      {
        outcome: 'pending',
        screened: false,
        submissionContent: answers,
        submitted: true,
      }
    ).then(() => {
      console.log('Submitted');
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    });
  };

  if (!submissionId) return <LinearProgress className={classes.loading} />;

  return (
    <>
      <div className={classes.section}>
        <Typography variant="h6" gutterBottom>
          <Grid container alignItems="center">
            <PaddedIcon className={classes.paddedIcon}>
              <InstructionsIcon />
            </PaddedIcon>
            Instructions
          </Grid>
        </Typography>
        <div
          className={classes.renderedHtml}
          dangerouslySetInnerHTML={{ __html: data.taskInstructions }}
        />
      </div>

      {data.copiedQuestions &&
        data.copiedQuestions.map((x, i) => (
          <Question
            key={i}
            questionNum={i + 1}
            questionText={x}
            mcEmail={data.mcEmail}
            submissionType={data.submissionType}
            answer={answers[i]}
            setAnswer={updateAnswers(i)}
            user={user}
            readOnly={readOnly}
          />
        ))}

      {!data.copiedQuestions && (
        <Question
          questionNum={-1}
          questionText=""
          mcEmail={data.mcEmail}
          smartLink={data.smartLink}
          submissionType={data.submissionType}
          answer={answers[0]}
          setAnswer={updateAnswers(0)}
          user={user}
          readOnly={readOnly}
        />
      )}

      {data.submissionType !== 'ideo' && (
        <Grid container alignItems="baseline" className={classes.section}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            size="large"
            id={`submit-${!disableSubmission}`}
            className={classes.submitButton}
            disabled={disableSubmission || readOnly}
          >
            {readOnly ? 'Submitted' : 'Submit'}
            {readOnly ? <CheckIcon /> : <SubmittedIcon />}
          </Button>
          {!readOnly && (
            <Button
              variant="outlined"
              color="primary"
              onClick={handleSave}
              size="large"
              className={classes.saveButton}
            >
              Save
              <CheckIcon />
            </Button>
          )}
        </Grid>
      )}

      <Snackbar
        className={classes.snackbar}
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => {
          setShowSnackbar(false);
        }}
        message={
          <>
            <CheckIcon className={classes.savedTick} />
            Saved
          </>
        }
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      />
    </>
  );
};

AssessmentSubmission.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(AssessmentSubmission));
