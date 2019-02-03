import React from 'react';
import PropTypes from 'prop-types';

import CloudUploadIcon from '@material-ui/icons/CloudUploadOutlined';
import ProfileIcon from '@material-ui/icons/PersonOutlined';
import JobsIcon from '@material-ui/icons/BusinessCenterOutlined';
import AssessmentsIcon from '@material-ui/icons/AssignmentOutlined';
import CoursesIcon from '@material-ui/icons/SchoolOutlined';

import { WHATS_NEXT_STATES } from '@bit/sidney2hats.2hats.global.common-constants';

const WhatsNextIcon = props => {
  const { state } = props;

  switch (state) {
    case WHATS_NEXT_STATES.uploadResume:
      return <CloudUploadIcon />;

    case WHATS_NEXT_STATES.completeCourse:
    case WHATS_NEXT_STATES.startNewCourse:
      return <CoursesIcon />;

    case WHATS_NEXT_STATES.completeAssessment:
    case WHATS_NEXT_STATES.awaitAssessmentOutcome:
    case WHATS_NEXT_STATES.startNewAssessment:
      return <AssessmentsIcon />;

    case WHATS_NEXT_STATES.awaitJobApplicationOutcome:
    case WHATS_NEXT_STATES.startNewJobApplication:
      return <JobsIcon />;

    case WHATS_NEXT_STATES.completeProfile:
      return <ProfileIcon />;

    default:
      return null;
  }
};

WhatsNextIcon.propTypes = {
  state: PropTypes.string,
};

export default WhatsNextIcon;
