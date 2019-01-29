import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';

import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Grow from '@material-ui/core/Grow';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';

import ActivityLogIcon from '@material-ui/icons/HistoryRounded';
import CloseIcon from '@material-ui/icons/CloseRounded';

import ActivityItem from './ActivityItem';

import ScrollyRolly from '../ScrollyRolly';
import useCollection from '../../hooks/useCollection';
import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';

import moment from 'moment';
import { MOMENT_LOCALES } from '@bit/sidney2hats.2hats.global.common-constants';

const styles = theme => ({
  spinner: {
    display: 'block',
    margin: `${theme.spacing.unit * 2}px auto`,
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
    maxHeight: `calc(${window.innerHeight}px - ${theme.spacing.unit *
      3}px - ${theme.spacing.unit * 9}px)`,
  },
  scrollyRollyList: {
    '&::before': {
      content: '""',
      width: theme.spacing.unit / 4 + 1,
      height: '100%',
      backgroundColor: theme.palette.primary.light,

      position: 'absolute',
      left: theme.spacing.unit * 4.5 - 1,
      top: theme.spacing.unit * 4,
    },
  },
});

function ActivityLog(props) {
  const {
    classes,
    theme,
    showDialog,
    setShowDialog,
    isMobile,
    history,
    user,
  } = props;
  moment.updateLocale('en', MOMENT_LOCALES);

  const [grow, setGrow] = useState(true);
  const [height, setHeight] = useState(window.innerHeight);

  const updateWindowDimensions = () => {
    if (height !== window.innerHeight) setHeight(window.innerHeight);
  };
  useEffect(() => {
    window.addEventListener('resize', updateWindowDimensions);
    return () => {
      window.removeEventListener('resize', updateWindowDimensions);
    };
  }, []);

  const [activityLogState, activityLogDispatch] = useCollection({
    path: `${COLLECTIONS.users}/${user.id}/${COLLECTIONS.activityLog}`,
    sort: { field: 'createdAt', direction: 'desc' },
  });

  const handleClose = () => {
    setGrow(false);
    setTimeout(() => {
      setShowDialog(false);
    }, 400);
  };

  const handleClick = route => {
    if (route) {
      history.push(route);
      handleClose();
    }
  };

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
                <div
                  className={classes.listWrapper}
                  style={{
                    maxHeight: `calc(${window.innerHeight}px - ${theme.spacing
                      .unit * 3}px - ${theme.spacing.unit * 9}px)`,
                  }}
                >
                  {activityLogState.loading ? (
                    <CircularProgress className={classes.spinner} />
                  ) : (
                    <>
                      <div className={classes.timeline} />
                      <ScrollyRolly
                        dataState={activityLogState}
                        dataDispatch={activityLogDispatch}
                        classes={{ list: classes.scrollyRollyList }}
                      >
                        {x => (
                          <ActivityItem
                            key={x.id}
                            data={x}
                            handleClick={handleClick}
                          />
                        )}
                      </ScrollyRolly>
                      <ActivityItem
                        data={{
                          type: 'system',
                          createdAt: user.createdAt,
                          title: 'Signed up',
                          body: 'Welcome to 2hats!',
                        }}
                      />
                    </>
                  )}
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
  theme: PropTypes.object.isRequired,
  showDialog: PropTypes.bool.isRequired,
  setShowDialog: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles, { withTheme: true })(ActivityLog));