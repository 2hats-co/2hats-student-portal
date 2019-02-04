import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import withStyles from '@material-ui/core/styles/withStyles';
import Slide from '@material-ui/core/Slide';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

import CheckIcon from '@material-ui/icons/CheckRounded';
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

  subtitle: { fontWeight: 700 },

  loading: {
    marginTop: theme.spacing.unit * 3,
    backgroundColor: 'transparent',
  },

  submitButton: {
    fontSize: theme.spacing.unit * 2,
    borderRadius: 60,
    margin: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 6}px`,
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
    if (data.submissionType === 'pdf' && typeof x === 'object' && !x.url) {
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

  console.log(data, answers);

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
    });
  };

  if (!submissionId) return <LinearProgress className={classes.loading} />;

  return (
    <Slide in direction="up">
      <>
        <div className={classes.section}>
          <Divider />
        </div>
        <div className={classes.section}>
          <Typography
            variant="subtitle1"
            gutterBottom
            className={classes.subtitle}
          >
            Instructions
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
