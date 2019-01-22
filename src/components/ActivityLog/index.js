import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';

import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';

import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Slide from '@material-ui/core/Slide';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ActivityLogIcon from '@material-ui/icons/HistoryRounded';

import ActivityIcon from './ActivityIcon';

// import ScrollyRolly from './ScrollyRolly';
// import useCollection from '../hooks/useCollection';
// import { COLLECTIONS } from '../constants/firestore';
import * as ROUTES from '../../constants/routes';
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
    width: 360,
    outline: 'none',
    maxHeight: `calc(100vh - ${theme.spacing.unit * 3}px)`,
    position: 'absolute',
    bottom: theme.spacing.unit * 1.5,
    left: theme.spacing.unit * 9,
    overflowY: 'auto',
  },

  title: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit,
    fontWeight: 500,

    userSelect: 'none',
    cursor: 'default',
  },
  titleIcon: {
    verticalAlign: 'middle',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit / 2 + 1,
  },

  timeline: {
    width: theme.spacing.unit / 4 + 1,
    height: `calc(100% - ${theme.spacing.unit * 4.5}px)`,
    backgroundColor: theme.palette.primary.light,

    position: 'absolute',
    left: theme.spacing.unit * 4.5 - 1,
    top: theme.spacing.unit * 4.5,
  },

  listItemRoot: { alignItems: 'flex-start' },
  listItemTextRoot: { paddingRight: 0 },
  activityTitle: {
    lineHeight: '1.25',
    marginBottom: theme.spacing.unit / 2,
  },
  timestamp: {
    color: theme.palette.text.secondary,
  },
  listItemSecondary: {
    lineClamp: 2,
    display: 'box',
    boxOrient: 'vertical',
    overflow: 'hidden',
  },
  unread: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.main,
  },
});

const DUMMY_ACTIVITIES = [
  {
    body: 'Assessment passed',
    createdAt: {
      seconds: 1547983171,
      nanoseconds: 149000000,
    },
    data: {
      conversationId: 'BDp49hSTMVAjWvo9IfQV',
      type: 'assessment-passed',
    },
    title: 'Mailchimp and EDM composition',
    id: 'nI0cphLPlwAMqK5lGNl6z',
  },
  {
    body: 'Assessment started',
    createdAt: {
      seconds: 1547983161,
      nanoseconds: 149000000,
    },
    data: {
      conversationId: 'BDp49hSTMVAjWvo9IfQV',
      type: 'assessment-started',
    },
    title: 'Mailchimp and EDM composition',
    id: 'nI0cphLPlwAMqK5lGNl6y',
  },
  {
    body: 'Assessment started',
    createdAt: {
      seconds: 1547983061,
      nanoseconds: 149000000,
    },
    data: {
      conversationId: 'BDp49hSTMVAjWvo9IfQV',
      type: 'assessment-started',
    },
    title: 'Social media managemer',
    id: 'nI0cphLPlwAMqK5lGNl6x',
  },
  {
    body: 'Course started',
    createdAt: {
      seconds: 1547983061,
      nanoseconds: 149000000,
    },
    data: {
      conversationId: 'BDp49hSTMVAjWvo9IfQV',
      type: 'course-started',
    },
    title: 'LearnWorld it',
    id: 'nI0cphLPlwAMqK5lGNl6xa',
  },
  {
    body: 'Course completed',
    createdAt: {
      seconds: 1547983061,
      nanoseconds: 149000000,
    },
    data: {
      conversationId: 'BDp49hSTMVAjWvo9IfQV',
      type: 'course-completed',
    },
    title: 'LearnWorld beginners',
    id: 'nI0cphLPlwAMqK5lGNl6xb',
  },
  {
    body: 'Assessment submitted',
    createdAt: {
      seconds: 1547983061,
      nanoseconds: 149000000,
    },
    data: {
      conversationId: 'BDp49hSTMVAjWvo9IfQV',
      type: 'assessment-submitted',
    },
    title: 'LearnWorld it',
    id: 'nI0cphLPlwAMqK5lGNl6xc',
  },
  {
    body: 'Assessment failed',
    createdAt: {
      seconds: 1547983061,
      nanoseconds: 149000000,
    },
    data: {
      conversationId: 'BDp49hSTMVAjWvo9IfQV',
      type: 'assessment-failed',
    },
    title: 'LearnWorld it',
    id: 'nI0cphLPlwAMqK5lGNl6xd',
  },
  {
    body: 'Job applied',
    createdAt: {
      seconds: 1547983061,
      nanoseconds: 149000000,
    },
    data: {
      conversationId: 'BDp49hSTMVAjWvo9IfQV',
      type: 'job-applied',
    },
    title: 'LearnWorld it',
    id: 'nI0cphLPlwAMqK5lGNl6xe',
  },
  {
    body: 'Event booked',
    createdAt: {
      seconds: 1547983061,
      nanoseconds: 149000000,
    },
    data: {
      conversationId: 'BDp49hSTMVAjWvo9IfQV',
      type: 'event-booked',
    },
    title: 'LearnWorld it',
    id: 'nI0cphLPlwAMqK5lGNl6xf',
  },
  {
    body: 'Assessment centre booked',
    createdAt: {
      seconds: 1547983061,
      nanoseconds: 149000000,
    },
    data: {
      conversationId: 'BDp49hSTMVAjWvo9IfQV',
      type: 'ac-booked',
    },
    title: 'LearnWorld it',
    id: 'nI0cphLPlwAMqK5lGNl6xg',
  },
  {
    body: 'Assessment centre completed',
    createdAt: {
      seconds: 1547983061,
      nanoseconds: 149000000,
    },
    data: {
      conversationId: 'BDp49hSTMVAjWvo9IfQV',
      type: 'ac-completed',
    },
    title: 'LearnWorld it',
    id: 'nI0cphLPlwAMqK5lGNl6xh',
  },
  {
    body: 'Book AC',
    createdAt: {
      seconds: 1547983061,
      nanoseconds: 149000000,
    },
    data: {
      conversationId: 'BDp49hSTMVAjWvo9IfQV',
      type: 'book-ac',
    },
    title: 'LearnWorld it',
    id: 'nI0cphLPlwAMqK5lGNl6xi',
  },
];

function ActivityLog(props) {
  const { classes, showDialog, setShowDialog, history, uid } = props;

  moment.updateLocale('en', momentLocales);

  const [slideIn, setSlideIn] = useState(true);

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
    setSlideIn(false);
    setTimeout(() => {
      setShowDialog(false);
    }, 100);
  };

  // useEffect(
  //   () => {
  //     if (!showDialog) setSlideIn(true);
  //     else markAsRead(uid, notifications);
  //   },
  //   [showDialog]
  // );

  const handleClick = data => {
    if (data.conversationId) {
      // history.push(`${ROUTES.conversations}?id=${data.conversationId}`);
      handleClose();
    }
  };

  const x = DUMMY_ACTIVITIES;

  // if (notificationsState.loading)
  //   return <CircularProgress className={classes.loader} size={24} />;

  if (showDialog)
    return (
      <Modal open={showDialog} onClose={handleClose} disableAutoFocus>
        <Slide in={slideIn} direction="up">
          <Paper elevation={24} classes={{ root: classes.paperRoot }}>
            <Typography variant="h5" className={classes.title}>
              <ActivityLogIcon className={classes.titleIcon} />
              Activity Log
            </Typography>
            {/* <ScrollyRolly
                dataState={notificationsState}
                dataDispatch={notificationsDispatch}
              > */}
            <List>
              <div className={classes.timeline} />
              {x.map(x => (
                <ListItem
                  key={x.id}
                  button
                  onClick={() => {
                    handleClick(x.data);
                  }}
                  classes={{ root: classes.listItemRoot }}
                >
                  <Avatar>
                    <ActivityIcon type={x.data.type} />
                  </Avatar>
                  <ListItemText
                    primary={
                      <Grid
                        container
                        justify="space-between"
                        alignItems="baseline"
                      >
                        <Grid item xs>
                          <Typography
                            variant="subtitle1"
                            className={classes.activityTitle}
                          >
                            {x.title}
                          </Typography>
                        </Grid>
                        <Grid>
                          <Typography
                            variant="body2"
                            className={classes.timestamp}
                          >
                            {moment.unix(x.createdAt.seconds).fromNow()}
                          </Typography>
                        </Grid>
                      </Grid>
                    }
                    secondary={x.body}
                    classes={{
                      root: classes.listItemTextRoot,
                      secondary: classes.listItemSecondary,
                    }}
                  />
                </ListItem>
              ))}
            </List>
            {/* </ScrollyRolly> */}
          </Paper>
        </Slide>
      </Modal>
    );
}

ActivityLog.propTypes = {
  classes: PropTypes.object.isRequired,
  showDialog: PropTypes.bool.isRequired,
  setShowDialog: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  uid: PropTypes.string.isRequired,
};

export default withRouter(withStyles(styles)(ActivityLog));
