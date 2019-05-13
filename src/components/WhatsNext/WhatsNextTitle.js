import PropTypes from 'prop-types';

import { WHATS_NEXT_STATES } from '@bit/sidney2hats.2hats.global.common-constants';

const WhatsNextTitle = props => {
  const { state } = props;

  switch (state) {
    case WHATS_NEXT_STATES.booking:
      return 'You have an upcoming booking';
    case WHATS_NEXT_STATES.uploadResume:
      return 'Next step: upload your resume';

    // course flow
    case WHATS_NEXT_STATES.completeCourse:
      return 'You have an unfinished course';
    case WHATS_NEXT_STATES.startNewCourse:
      return 'Get started with one of our courses';

    // assessments flow
    case WHATS_NEXT_STATES.completeAssessment:
      return 'You have an incomplete task';
    case WHATS_NEXT_STATES.awaitAssessmentOutcome:
      return 'While you wait for your task outcome…';
    case WHATS_NEXT_STATES.startNewAssessment:
      return 'Get started with one of our tasks';

    // jobs flow
    case WHATS_NEXT_STATES.completeProfile:
      return 'Complete your profile';
    case WHATS_NEXT_STATES.awaitJobApplicationOutcome:
      return 'We’re reviewing your job application';
    case WHATS_NEXT_STATES.startNewJobApplication:
      return 'Apply for one of our jobs';

    default:
      return null;
  }
};

WhatsNextTitle.propTypes = {
  state: PropTypes.string,
};

export default WhatsNextTitle;
