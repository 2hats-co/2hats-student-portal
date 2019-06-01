import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';

import DefaultIcon from '@material-ui/icons/HistoryOutlined';
import JobIcon from '@material-ui/icons/BusinessCenterOutlined';
import AssessmentIcon from '@material-ui/icons/AssignmentOutlined';
import CourseIcon from '@material-ui/icons/SchoolOutlined';
import EventIcon from '@material-ui/icons/EventOutlined';
import AssessmentCentreIcon from '@material-ui/icons/AssignmentIndOutlined';

import AddIcon from '@material-ui/icons/Add';
import SendIcon from '@material-ui/icons/SendRounded';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/ErrorOutline';

const styles = theme => ({
  badgeIcon: {
    fontSize: theme.spacing(2.25),
    backgroundColor: 'inherit',
    borderRadius: '50%',

    position: 'absolute',
    bottom: theme.spacing(0.5),
    right: theme.spacing(0.5),
  },
  badgeIconExtraPadding: {
    fontSize: theme.spacing(2),
    boxShadow: `0 0 0 ${theme.spacing(0.5) - 1}px ${
      theme.palette.primary.light
    }`,
  },
});

const ActivityIcon = props => {
  const { classes, type } = props;

  switch (type) {
    case 'course-started':
      return (
        <>
          <CourseIcon />
          <AddIcon className={classes.badgeIcon} />
        </>
      );
    case 'learn-world-certificate':
    case 'course-completed':
      return (
        <>
          <CourseIcon />
          <CheckIcon className={classes.badgeIcon} />
        </>
      );

    case 'assessment-started':
      return (
        <>
          <AssessmentIcon />
          <AddIcon className={classes.badgeIcon} />
        </>
      );
    case 'assessment-submitted':
      return (
        <>
          <AssessmentIcon />
          <SendIcon
            className={classNames(
              classes.badgeIcon,
              classes.badgeIconExtraPadding
            )}
          />
        </>
      );
    case 'assessment-pass':
      return (
        <>
          <AssessmentIcon />
          <CheckIcon className={classes.badgeIcon} />
        </>
      );
    case 'assessment-fail':
      return (
        <>
          <AssessmentIcon />
          <CloseIcon className={classes.badgeIcon} />
        </>
      );

    case 'job-applied':
      return (
        <>
          <JobIcon />
          <SendIcon
            className={classNames(
              classes.badgeIcon,
              classes.badgeIconExtraPadding
            )}
          />
        </>
      );
    case 'job-pass':
      return (
        <>
          <JobIcon />
          <CheckIcon className={classes.badgeIcon} />
        </>
      );
    case 'job-fail':
      return (
        <>
          <JobIcon />
          <CloseIcon className={classes.badgeIcon} />
        </>
      );

    case 'event-booked':
      return (
        <>
          <EventIcon />
          <SendIcon
            className={classNames(
              classes.badgeIcon,
              classes.badgeIconExtraPadding
            )}
          />
        </>
      );

    case 'ac-booked':
      return (
        <>
          <AssessmentCentreIcon />
          <SendIcon
            className={classNames(
              classes.badgeIcon,
              classes.badgeIconExtraPadding
            )}
          />
        </>
      );
    case 'ac-completed':
      return (
        <>
          <AssessmentCentreIcon />
          <CheckIcon className={classes.badgeIcon} />
        </>
      );

    case 'book-ac':
      return (
        <>
          <AssessmentCentreIcon />
          <ErrorIcon className={classes.badgeIcon} />
        </>
      );

    case 'system':
    default:
      return <DefaultIcon />;
  }
};

ActivityIcon.propTypes = {
  classes: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

export default withStyles(styles)(ActivityIcon);
