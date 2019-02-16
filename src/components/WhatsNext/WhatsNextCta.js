import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardOutlined';

import ResumeUploader from './ResumeUploader';
import { WHATS_NEXT_STATES } from '@bit/sidney2hats.2hats.global.common-constants';
import * as ROUTES from '../../constants/routes';

const WhatsNextCta = props => {
  const { state, data, history } = props;

  switch (state) {
    case WHATS_NEXT_STATES.booking:
      return 'Booking CTA';

    case WHATS_NEXT_STATES.uploadResume:
      return <ResumeUploader />;

    // course flow
    case WHATS_NEXT_STATES.completeCourse:
      return (
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={() => {
            history.push(`${ROUTES.COURSE_REDIRECT}?id=${data.id}`);
          }}
        >
          Complete Course
          <ArrowForwardIcon />
        </Button>
      );
    case WHATS_NEXT_STATES.startNewCourse:
      return (
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={() => {
            history.push(ROUTES.COURSES);
          }}
        >
          Browse Courses
          <ArrowForwardIcon />
        </Button>
      );

    // assessments flow
    case WHATS_NEXT_STATES.completeAssessment:
      return (
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={() => {
            history.push(`${ROUTES.ASSESSMENTS}?id=${data.id}&yours=true`);
          }}
        >
          Complete Assessment
          <ArrowForwardIcon />
        </Button>
      );
    case WHATS_NEXT_STATES.awaitAssessmentOutcome:
    case WHATS_NEXT_STATES.startNewAssessment:
      return (
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={() => {
            history.push(ROUTES.ASSESSMENTS);
          }}
        >
          Browse Assessments
          <ArrowForwardIcon />
        </Button>
      );

    // jobs flow
    case WHATS_NEXT_STATES.completeProfile:
      return (
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={() => {
            history.push(ROUTES.PROFILE);
          }}
        >
          Complete Profile
          <ArrowForwardIcon />
        </Button>
      );
    case WHATS_NEXT_STATES.awaitJobApplicationOutcome:
      return null;
    case WHATS_NEXT_STATES.startNewJobApplication:
      return (
        <Button
          color="primary"
          variant="contained"
          size="large"
          onClick={() => {
            history.push(ROUTES.JOBS);
          }}
        >
          Browse Jobs
          <ArrowForwardIcon />
        </Button>
      );

    default:
      return null;
  }
};

WhatsNextCta.propTypes = {
  state: PropTypes.string,
  data: PropTypes.object,
  history: PropTypes.object,
};

export default withRouter(WhatsNextCta);
