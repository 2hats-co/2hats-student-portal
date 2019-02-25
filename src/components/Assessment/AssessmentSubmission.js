import React, { useState, useContext, useEffect } from 'react';
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
import UserContext from '../../contexts/UserContext';
import * as ROUTES from '../../constants/routes';
import {
  COLLECTIONS,
  STYLES,
} from '@bit/sidney2hats.2hats.global.common-constants';
import { removeHtmlTags, getRandomId } from '../../utilities';
import { createDoc, updateDoc } from '../../utilities/firestore';

const styles = theme => ({
  root: {},
  section: { marginTop: theme.spacing.unit * 3 },

  ...STYLES.RENDERED_HTML(theme),

  loading: {
    marginTop: theme.spacing.unit * 3,
    backgroundColor: 'transparent',
  },

  submitButton: {
    fontSize: theme.spacing.unit * 2,
    borderRadius: 60,
    margin: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 6}px`,
  },
  saveButton: {
    fontSize: theme.spacing.unit * 2,
    borderRadius: 60,
    marginLeft: theme.spacing.unit,
  },

  paddedIcon: {
    marginLeft: -theme.spacing.unit / 2,
    marginRight: theme.spacing.unit * 1.5,

    [theme.breakpoints.up('lg')]: { marginLeft: -48 - 12 },
  },

  snackbar: {
    [theme.breakpoints.down('sm')]: { bottom: theme.spacing.unit * 8 },
    [theme.breakpoints.down('xs')]: { bottom: theme.spacing.unit * 7 },
  },
  savedTick: {
    verticalAlign: 'bottom',
    marginRight: theme.spacing.unit,
  },
});

const AssessmentSubmission = props => {
  const { classes, data, history } = props;

  const [submissionId, setSubmissionId] = useState('');
  const [answers, setAnswers] = useState(
    data.outcome !== 'fail' && Array.isArray(data.submissionContent)
      ? data.submissionContent
      : []
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

  // read-only if submitted or passed
  const readOnly = data.submitted && data.outcome !== 'fail';

  const userContext = useContext(UserContext);
  const user = userContext.user;

  // on first mount only
  useEffect(() => {
    // Make a copy if not copied or failed (resubmission)
    if (!data.assessmentId || data.outcome === 'fail') {
      // separate assessment ID so new doc doesn't have assessment ID
      const { id, ...rest } = data;
      // copy assessment data
      const copiedAssessment = {
        ...rest,
        UID: user.id,
        outcome: 'pending',
        screened: false,
        submissionContent: [],
        assessmentId: data.assessmentId || id,
        submitted: false,
      };
      // randomiser
      if (
        data.questionsDisplayed > 0 &&
        data.questions &&
        data.questions.length > 0
      ) {
        const cq = [];
        const cqi = [];

        while (cq.length < data.questionsDisplayed) {
          const index = Math.floor(Math.random() * data.questions.length);
          if (!cqi.includes(index)) {
            cqi.push(index);
            cq.push(data.questions[index]);
          }
        }

        copiedAssessment.copiedQuestions = cq;
        copiedAssessment.copiedQuestionsIndices = cqi;
      }
      // create random email
      if (data.submissionType === 'mailchimp')
        copiedAssessment.mcEmail = `mc+${getRandomId()}@2hats.com`;

      // create copy in user's assessment subcollection
      createDoc(
        `${COLLECTIONS.users}/${user.id}/${COLLECTIONS.assessments}`,
        copiedAssessment
      ).then(docRef => {
        console.log('Created submission doc', docRef.id);

        // set first submission to resubmitted to disable
        if (data.outcome === 'fail') {
          updateDoc(
            `${COLLECTIONS.users}/${user.id}/${COLLECTIONS.assessments}`,
            data.id,
            { resubmitted: docRef.id }
          ).then(docRef => {
            console.log('resubmitted set to true for', docRef);
          });
        }

        // touch assessment
        const newTouchedAssessments = user.touchedAssessments || [];
        newTouchedAssessments.push(data.assessmentId || data.id);
        updateDoc(COLLECTIONS.users, user.id, {
          touchedAssessments: newTouchedAssessments,
        }).then(() => {
          history.push(`${ROUTES.ASSESSMENTS}?id=${docRef.id}&yours=true`);
        });
      });
    } else {
      setSubmissionId(data.id);
    }
  }, []);

  useEffect(
    () => {
      if (
        data.assessmentId &&
        (data.copiedQuestions || data.questionsDisplayed === 0)
      )
        setSubmissionId(data.id);
    },
    [data.id]
  );

  useEffect(
    () => {
      if (
        data.submissionContent &&
        Array.isArray(data.submissionContent) &&
        data.outcome !== 'fail'
      ) {
        setAnswers(data.submissionContent);
      }
    },
    [data.submissionContent]
  );

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
          submissionType={data.submissionType}
          answer={answers[0]}
          setAnswer={updateAnswers(0)}
          user={user}
          readOnly={readOnly}
        />
      )}

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
  history: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(AssessmentSubmission));
