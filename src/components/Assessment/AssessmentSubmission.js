import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import withStyles from '@material-ui/core/styles/withStyles';
import Slide from '@material-ui/core/Slide';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

import CheckIcon from '@material-ui/icons/CheckRounded';
import SubmittedIcon from '@material-ui/icons/SendRounded';

import Question from './Question';
import UserContext from '../../contexts/UserContext';
import * as ROUTES from '../../constants/routes';
import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';
import { removeHtmlTags } from '../../utilities';
import { createDoc, updateProperties } from '../../utilities/firestore';
import { renderedHtml, padding } from '../../constants/commonStyles';

const styles = theme => ({
  root: {},
  section: { marginTop: theme.spacing.unit * 3 },

  paper: { ...padding(theme, true) },

  ...renderedHtml(theme),

  loading: {
    marginTop: theme.spacing.unit * 3,
    backgroundColor: 'transparent',
  },

  submitButton: {
    fontSize: theme.spacing.unit * 2,
    boxShadow: theme.shadows[3],
    borderRadius: 60,
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
    if (typeof x === 'object' && !x.url) {
      disableSubmission = true;
      return;
    }
  });

  // read-only if submitted or passed
  const readOnly = data.submitted && data.outcome !== 'fail';

  const userContext = useContext(UserContext);
  const user = userContext.user;

  useEffect(() => {
    // Make a copy if not copied or failed (resubmission)
    if (!data.assessmentId || data.outcome === 'fail') {
      // separate assessment ID so new doc doesn't have assessment ID
      const { id, ...rest } = data;
      // copy assessment data
      const copiedAssessment = {
        ...rest,
        UID: user.id,
        outcome: '',
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
      // create copy in user's assessment subcollection
      createDoc(
        `${COLLECTIONS.users}/${user.id}/${COLLECTIONS.assessments}`,
        copiedAssessment
      ).then(docRef => {
        console.log('Created submission doc', docRef.id);

        // set first submission to resubmitted to disable
        if (data.outcome === 'fail') {
          updateProperties(
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
        updateProperties(COLLECTIONS.users, user.id, {
          touchedAssessments: newTouchedAssessments,
        });

        history.push(`${ROUTES.ASSESSMENTS}?id=${docRef.id}&yours=true`);
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

  if (!submissionId) return <LinearProgress className={classes.loading} />;

  return (
    <Slide in direction="up">
      <>
        <Paper className={classes.paper}>
          <Typography variant="h6">Instructions</Typography>
          <div
            className={classes.renderedHtml}
            dangerouslySetInnerHTML={{ __html: data.taskInstructions }}
          />
        </Paper>

        {data.copiedQuestions &&
          data.copiedQuestions.map((x, i) => (
            <Question
              key={i}
              questionNum={i + 1}
              questionText={x}
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
            submissionType={data.submissionType}
            answer={answers[0]}
            setAnswer={updateAnswers(0)}
            user={user}
            readOnly={readOnly}
          />
        )}

        <div className={classes.section}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            size="large"
            className={classes.submitButton}
            disabled={disableSubmission || readOnly}
          >
            {readOnly ? 'Submitted' : 'Submit'}
            {readOnly ? <CheckIcon /> : <SubmittedIcon />}
          </Button>
        </div>
      </>
    </Slide>
  );
};

AssessmentSubmission.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(AssessmentSubmission));
