import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import clsx from 'clsx';
import withStyles from '@material-ui/core/styles/withStyles';

import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Grow from '@material-ui/core/Grow';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';

import ActivityLogIcon from '@material-ui/icons/HistoryOutlined';
import CloseIcon from '@material-ui/icons/CloseOutlined';

import ActivityItem from './ActivityItem';

import ScrollyRolly from '../ScrollyRolly';
import useCollection from '../../hooks/useCollection';
import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';

import moment from 'moment';
import { MOMENT_LOCALES } from '@bit/sidney2hats.2hats.global.common-constants';

const styles = theme => ({
  spinner: {
    display: 'block',
    margin: `${theme.spacing(2)}px auto`,
  },

  paperRoot: {
    borderRadius: theme.shape.roundBorderRadius,
    width: `calc(100% - ${theme.spacing(3)}px)`,
    maxWidth: 360,
    outline: 'none',
    maxHeight: `calc(100% - ${theme.spacing(3)}px)`,
    overflowY: 'hidden',

    position: 'absolute',
    top: theme.spacing(1.5),
    bottom: 'auto',
    right: theme.spacing(1.5),
    // transformOrigin: `${theme.spacing.unit * 4.5}px 0`,
    transformOrigin: '100% 0',
  },
  // paperRootMobile: {
  //   left: theme.spacing.unit * 1.5,
  //   transformOrigin: `${theme.spacing.unit * 27}px 0%`,
  // },
  // paperRootBottom: {
  //   top: 'auto',
  //   left: 'auto',
  //   bottom: theme.spacing.unit * 1.5,
  //   right: theme.spacing.unit * 1.5,
  //   transformOrigin: '100% 100%',
  // },

  header: {
    boxSizing: 'content-box',
    height: theme.spacing(5),
    padding: `${theme.spacing(2)}px 0`,
  },
  title: {
    fontWeight: 500,
    userSelect: 'none',
    cursor: 'default',
  },
  titleIcon: {
    verticalAlign: 'middle',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(0.5) + 1,

    padding: theme.spacing(1),
    borderRadius: '50%',
    backgroundColor: theme.palette.divider,
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing(1.5),
    right: theme.spacing(0.75),
  },
  headerDivider: {
    margin: `0 ${theme.spacing(2)}px`,
    position: 'relative',
    top: theme.spacing(1) + 2,
  },

  listWrapper: {
    overflowY: 'auto',
    '-webkit-overflow-scrolling': 'touch',
    maxHeight: `calc(${window.innerHeight}px - ${theme.spacing(
      3
    )}px - ${theme.spacing(9)}px)`,
  },
  scrollyRollyList: {
    '&::before': {
      content: '""',
      width: theme.spacing(0.25) + 1,
      height: '100%',
      backgroundColor: theme.palette.primary.light,

      position: 'absolute',
      left: theme.spacing(4.5) - 1,
      top: theme.spacing(4),
    },
  },
  scrollyRollyEmptyList: {
    height: 0,
    paddingBottom: 0,
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
              root: clsx(
                classes.paperRoot,
                isMobile && classes.paperRootMobile
                //showDialog === 'bottom' && classes.paperRootBottom
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
                  id={'activitylogclose'}
                >
                  <CloseIcon />
                </IconButton>
                <Divider className={classes.headerDivider} />
              </Grid>

              <Grid item xs>
                <div
                  className={classes.listWrapper}
                  style={{
                    maxHeight: `calc(${window.innerHeight}px - ${theme.spacing(
                      3
                    )}px - ${theme.spacing(9)}px)`,
                  }}
                >
                  {activityLogState.loading &&
                  (!activityLogState.documents ||
                    activityLogState.documents.length <= 0) ? (
                    <CircularProgress className={classes.spinner} />
                  ) : (
                    <>
                      <ScrollyRolly
                        dataState={activityLogState}
                        dataDispatch={activityLogDispatch}
                        classes={{
                          list: classes.scrollyRollyList,
                          emptyList: classes.scrollyRollyEmptyList,
                        }}
                        noneText=" "
                      >
                        {x => (
                          <ActivityItem
                            key={x.id}
                            data={x}
                            handleClick={handleClick}
                          />
                        )}
                      </ScrollyRolly>
                      {!activityLogState.loading && (
                        <ActivityItem
                          data={{
                            type: 'system',
                            createdAt: user.createdAt,
                            title: 'Signed up',
                            body: 'Welcome to 2hats!',
                          }}
                        />
                      )}
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
