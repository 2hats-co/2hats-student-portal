import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';

// import CircularProgress from '@material-ui/core/CircularProgress';
// import Fade from '@material-ui/core/Fade';
// import Tooltip from '@material-ui/core/Tooltip';
// import IconButton from '@material-ui/core/IconButton';
// import Badge from '@material-ui/core/Badge';

import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Grow from '@material-ui/core/Grow';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';

import ActivityLogIcon from '@material-ui/icons/HistoryRounded';
import CloseIcon from '@material-ui/icons/CloseRounded';

import ActivityItem from './ActivityItem';

// import ScrollyRolly from './ScrollyRolly';
// import useCollection from '../hooks/useCollection';
// import { COLLECTIONS } from '../constants/firestore';
// import * as ROUTES from '../../constants/routes';
// import { markAsRead } from '../utilities/notifications';

import moment from 'moment';
import { momentLocales } from '../../constants/momentLocales';

const styles = theme => ({
  loader: {
    color: 'rgba(255,255,255,.87)',
    padding: theme.spacing.unit * 1.5,
  },

  paperRoot: {
    borderRadius: theme.shape.roundBorderRadius,
    width: `calc(100% - ${theme.spacing.unit * 3}px)`,
    maxWidth: 360,
    outline: 'none',
    maxHeight: `calc(100% - ${theme.spacing.unit * 3}px)`,
    overflowY: 'hidden',

    position: 'absolute',
    top: theme.spacing.unit * 1.5,
    bottom: 'auto',
    left: theme.spacing.unit * 20.5,
    transformOrigin: `${theme.spacing.unit * 4.5}px 0`,
  },
  paperRootMobile: {
    left: theme.spacing.unit * 1.5,
    transformOrigin: `${theme.spacing.unit * 27}px 0%`,
  },
  paperRootBottom: {
    top: 'auto',
    bottom: theme.spacing.unit * 1.5,
    transformOrigin: `${theme.spacing.unit * 15}px 100%`,
  },

  header: {
    boxSizing: 'content-box',
    height: theme.spacing.unit * 5,
    padding: `${theme.spacing.unit * 2}px 0`,
  },
  title: {
    fontWeight: 500,
    userSelect: 'none',
    cursor: 'default',
  },
  titleIcon: {
    verticalAlign: 'middle',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit / 2 + 1,

    padding: theme.spacing.unit,
    borderRadius: '50%',
    backgroundColor: theme.palette.divider,
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing.unit * 1.5,
    right: theme.spacing.unit * 0.75,
  },
  headerDivider: {
    margin: `0 ${theme.spacing.unit * 2}px`,
    position: 'relative',
    top: theme.spacing.unit + 2,
  },

  listWrapper: {
    overflowY: 'auto',
    '-webkit-overflow-scrolling': 'touch',
    maxHeight: `calc(100vh - ${theme.spacing.unit * 3}px - ${theme.spacing
      .unit * 9}px)`,
  },
  timeline: {
    width: theme.spacing.unit / 4 + 1,
    height: `calc(100% - ${theme.spacing.unit * (4.5 * 2 + 13)}px)`,
    backgroundColor: theme.palette.primary.light,

    position: 'absolute',
    left: theme.spacing.unit * 4.5 - 1,
    top: theme.spacing.unit * 4.5,
  },

  endOfList: { height: theme.spacing.unit * 13 },
});

const DUMMY_ACTIVITIES = [
  {
    body: 'Assessment passed',
    createdAt: {
      seconds: 1547983171,
      nanoseconds: 149000000,
    },
    type: 'assessment-passed',
    title: 'Mailchimp and EDM composition',
    id: 'nI0cphLPlwAMqK5lGNl6z',
  },
  {
    body: 'Assessment started',
    createdAt: {
      seconds: 1547983161,
      nanoseconds: 149000000,
    },
    type: 'assessment-started',
    title: 'Mailchimp and EDM composition',
    id: 'nI0cphLPlwAMqK5lGNl6y',
  },
  {
    body: 'Assessment started',
    createdAt: {
      seconds: 1547983061,
      nanoseconds: 149000000,
    },
    type: 'assessment-started',
    title: 'Social media managemer',
    id: 'nI0cphLPlwAMqK5lGNl6x',
  },
  {
    body: 'Course started',
    createdAt: {
      seconds: 1547983061,
      nanoseconds: 149000000,
    },
    type: 'course-started',
    title: 'LearnWorld it',
    id: 'nI0cphLPlwAMqK5lGNl6xa',
  },
  {
    body: 'Book AC',
    cta: { label: 'Book now', route: '#' },
    createdAt: {
      seconds: 1547983061,
      nanoseconds: 149000000,
    },
    type: 'book-ac',
    title: 'LearnWorld it',
    id: 'nI0cphLPlwAMqK5lGNl6xi',
  },
  {
    body: 'Course completed',
    createdAt: {
      seconds: 1547983061,
      nanoseconds: 149000000,
    },
    type: 'course-completed',
    title: 'LearnWorld beginners',
    id: 'nI0cphLPlwAMqK5lGNl6xb',
  },
  {
    body: 'Assessment submitted',
    createdAt: {
      seconds: 1547983061,
      nanoseconds: 149000000,
    },
    type: 'assessment-submitted',
    title: 'LearnWorld it',
    id: 'nI0cphLPlwAMqK5lGNl6xc',
  },
  {
    body: 'Assessment failed',
    createdAt: {
      seconds: 1547983061,
      nanoseconds: 149000000,
    },
    type: 'assessment-failed',
    title: 'LearnWorld it',
    id: 'nI0cphLPlwAMqK5lGNl6xd',
  },
  {
    body: 'Job applied',
    createdAt: {
      seconds: 1547983061,
      nanoseconds: 149000000,
    },
    type: 'job-applied',
    title: 'LearnWorld it',
    id: 'nI0cphLPlwAMqK5lGNl6xe',
  },
  {
    body: 'Event booked',
    createdAt: {
      seconds: 1547983061,
      nanoseconds: 149000000,
    },
    type: 'event-booked',
    title: 'LearnWorld it',
    id: 'nI0cphLPlwAMqK5lGNl6xf',
  },
  {
    body: 'Assessment centre booked',
    createdAt: {
      seconds: 1547983061,
      nanoseconds: 149000000,
    },
    type: 'ac-booked',
    title: 'LearnWorld it',
    id: 'nI0cphLPlwAMqK5lGNl6xg',
  },
  {
    body: 'Assessment centre completed',
    createdAt: {
      seconds: 1547983061,
      nanoseconds: 149000000,
    },
    type: 'ac-completed',
    title: 'LearnWorld it',
    id: 'nI0cphLPlwAMqK5lGNl6xh',
  },
];

function ActivityLog(props) {
  const { classes, showDialog, setShowDialog, isMobile, history, user } = props;
  // const uid = user.id
  moment.updateLocale('en', momentLocales);

  const [grow, setGrow] = useState(true);

  // const [unreadActivityLogsState] = useCollection({
  //   path: COLLECTIONS.notifications,
  //   sort: { field: 'createdAt', direction: 'desc' },
  //   filters: [
  //     {
  //       field: 'unreadSubscribers',
  //       operator: 'array-contains',
  //       value: uid,
  //     },
  //   ],
  // });
  // const unreadActivityLogs = unreadActivityLogsState.documents
  //   ? unreadActivityLogsState.documents.length
  //   : 0;

  // const [notificationsState, notificationsDispatch] = useCollection({
  //   path: COLLECTIONS.notifications,
  //   sort: { field: 'createdAt', direction: 'desc' },
  //   filters: [
  //     {
  //       field: 'subscribers',
  //       operator: 'array-contains',
  //       value: uid,
  //     },
  //   ],
  // });
  // const notifications = notificationsState.documents;

  const handleClose = () => {
    setGrow(false);
    setTimeout(() => {
      setShowDialog(false);
    }, 400);
  };

  // useEffect(
  //   () => {
  //     if (!showDialog) setGrow(true);
  //     else markAsRead(uid, notifications);
  //   },
  //   [showDialog]
  // );

  const handleClick = route => {
    if (route) {
      history.push(route);
      handleClose();
    }
  };

  const x = DUMMY_ACTIVITIES;

  // if (notificationsState.loading)
  //   return <CircularProgress className={classes.loader} size={24} />;

  if (!!showDialog)
    return (
      <Modal open={!!showDialog} onClose={handleClose} disableAutoFocus>
        <Grow in={grow}>
          <Paper
            elevation={24}
            classes={{
              root: classNames(
                classes.paperRoot,
                isMobile && classes.paperRootMobile,
                showDialog === 'bottom' && classes.paperRootBottom
              ),
            }}
          >
            <Grid container direction="column" wrap="nowrap">
              <Grid item className={classes.header}>
                <Typography variant="h5" className={classes.title}>
                  <ActivityLogIcon className={classes.titleIcon} />
                  Activity Log
                </Typography>
                <IconButton
                  onClick={handleClose}
                  className={classes.closeButton}
                >
                  <CloseIcon />
                </IconButton>
                <Divider className={classes.headerDivider} />
              </Grid>

              <Grid item xs>
                <div className={classes.listWrapper}>
                  {/* <ScrollyRolly
                dataState={notificationsState}
                dataDispatch={notificationsDispatch}
              > */}
                  <List>
                    <div className={classes.timeline} />
                    {x.map(x => (
                      <ActivityItem
                        key={x.id}
                        data={x}
                        handleClick={handleClick}
                      />
                    ))}
                    <ActivityItem
                      data={{
                        type: 'system',
                        createdAt: user.createdAt,
                        title: 'Signed up',
                      }}
                    />
                    <div className={classes.endOfList} />
                  </List>
                  {/* </ScrollyRolly> */}
                </div>
              </Grid>
            </Grid>
          </Paper>
        </Grow>
      </Modal>
    );
}

ActivityLog.propTypes = {
  classes: PropTypes.object.isRequired,
  showDialog: PropTypes.bool.isRequired,
  setShowDialog: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(ActivityLog));
