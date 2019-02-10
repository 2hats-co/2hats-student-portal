import React from 'react';
import PropTypes from 'prop-types';

import { WHATS_NEXT_STATES } from '@bit/sidney2hats.2hats.global.common-constants';

const WhatsNextDescription = props => {
  const { state, data } = props;

  switch (state) {
    case WHATS_NEXT_STATES.booking:
      return 'You have an upcoming booking';
    case WHATS_NEXT_STATES.uploadResume:
      return 'It looks like you haven’t uploaded your resume yet. Uploading a resume will make applying for jobs faster and make it easier for us to see what best suits you.';

    // course flow
    case WHATS_NEXT_STATES.completeCourse:
      return (
        <>
          You haven’t finished <b>{data.title}</b>.<br />
          Complete the course to learn new skills to make you job ready.
        </>
      );
    case WHATS_NEXT_STATES.startNewCourse:
      return 'Our courses teach you real skills used in the workplace to make you job ready.';

    // assessments flow
    case WHATS_NEXT_STATES.completeAssessment:
      return (
        <>
          You haven’t completed your submission for <b>{data.title}</b>. Passing
          assessments…
        </>
      );
    case WHATS_NEXT_STATES.awaitAssessmentOutcome:
      return (
        <>
          You can attempt another assessment and get more of your{' '}
          <b>{data.category}</b> skills recognised.
        </>
      );
    case WHATS_NEXT_STATES.startNewAssessment:
      return 'Get your skills recognised and be ready to apply for jobs.';

    // jobs flow
    case WHATS_NEXT_STATES.completeProfile:
      return 'Complete your profile to get ready to apply for jobs.';
    case WHATS_NEXT_STATES.awaitJobApplicationOutcome:
      return 'Sit tight!';
    case WHATS_NEXT_STATES.startNewJobApplication:
      return 'Kickstart your career with 2hats.';

    default:
      return null;
  }
};

WhatsNextDescription.propTypes = {
  state: PropTypes.string,
  data: PropTypes.object,
};

export default WhatsNextDescription;
