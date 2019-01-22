import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';

import DefaultIcon from '@material-ui/icons/HistoryRounded';
import JobIcon from '@material-ui/icons/BusinessCenterRounded';
import AssessmentIcon from '@material-ui/icons/AssignmentRounded';
import CourseIcon from '@material-ui/icons/SchoolRounded';
import EventIcon from '@material-ui/icons/EventRounded';
import AssessmentCentreIcon from '@material-ui/icons/AssignmentIndRounded';

import AddIcon from '@material-ui/icons/AddRounded';
import SendIcon from '@material-ui/icons/SendRounded';
import CheckIcon from '@material-ui/icons/CheckRounded';
import CloseIcon from '@material-ui/icons/CloseRounded';
import ErrorIcon from '@material-ui/icons/ErrorOutlineRounded';

const styles = theme => ({
  badgeIcon: {
    fontSize: theme.spacing.unit * 2.25,
    backgroundColor: 'inherit',
    borderRadius: '50%',

    position: 'absolute',
    bottom: theme.spacing.unit / 2,
    right: theme.spacing.unit / 2,
  },
  badgeIconExtraPadding: {
    fontSize: theme.spacing.unit * 2,
    boxShadow: `0 0 0 ${theme.spacing.unit / 2 - 1}px ${
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
    case 'assessment-passed':
      return (
        <>
          <AssessmentIcon />
          <CheckIcon className={classes.badgeIcon} />
        </>
      );
    case 'assessment-failed':
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
