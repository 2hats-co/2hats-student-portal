import React, { useState } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import MilestonesIcon from '@material-ui/icons/FlagOutlined';
import ActivityLogIcon from '@material-ui/icons/HistoryOutlined';
import JobsIcon from '@material-ui/icons/BusinessCenterOutlined';
import SkillIcon from '../../assets/icons/SkillAchieved';
import CoursesIcon from '@material-ui/icons/SchoolOutlined';

import MilestoneItem from './MilestoneItem';
import ActivityLog from '../ActivityLog';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';
import * as ROUTES from '../../constants/routes';
import useAnalytics from '../../hooks/useAnalytics';

const styles = theme => ({
  root: {
    margin: '0 auto',
    marginTop: -theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit,
    boxSizing: 'border-box',

    [theme.breakpoints.down('sm')]: {
      width: `calc(100% - ${theme.spacing.unit * 2}px) !important`,
      maxWidth: 660,
    },
  },

  milestonesIcon: {
    fontSize: 32,
    opacity: 0.87,
    marginRight: theme.spacing.unit * 1.5,
  },
  title: { fontWeight: 500 },
  iconButton: { marginRight: -theme.spacing.unit },

  milestonesGrid: {
    marginTop: theme.spacing.unit,
    padding: theme.spacing.unit / 2,
  },
});

const Milestones = props => {
  const { classes, theme, width, user, isMobile } = props;

  const [activityLogOpen, setActivityLogOpen] = useState(false);

  const isXs = useMediaQuery(theme.breakpoints.down('xs'));

  const coursesCount = useAnalytics({
    collection: `${COLLECTIONS.users}/${user.id}/${COLLECTIONS.courses}`,
    filters: [{ property: 'completed', operation: '==', value: true }],
  });

  return (
    <div className={classes.root} style={{ width }}>
      <Grid container alignItems="center">
        <MilestonesIcon className={classes.milestonesIcon} />
        <Grid item xs>
          <Typography variant="h5" className={classes.title}>
            Your Milestones
          </Typography>
        </Grid>

        {isXs ? (
          <IconButton
            color="primary"
            onClick={() => {
              setActivityLogOpen(true);
            }}
            className={classes.iconButton}
          >
            <ActivityLogIcon />
          </IconButton>
        ) : (
          <Button
            color="primary"
            variant="outlined"
            onClick={() => {
              setActivityLogOpen(true);
            }}
          >
            Activity Log
            <ActivityLogIcon />
          </Button>
        )}
      </Grid>

      <Grid container spacing={8} className={classes.milestonesGrid}>
        <Grid item xs={4} sm={3}>
          <MilestoneItem
            val={Array.isArray(user.touchedJobs) ? user.touchedJobs.length : 0}
            Icon={JobsIcon}
            title={'Jobs\napplied'}
            route={ROUTES.JOBS}
            isXs={isXs}
          />
        </Grid>

        <Grid item xs={4} sm={3}>
          <MilestoneItem
            val={Array.isArray(user.skills) ? user.skills.length : 0}
            Icon={SkillIcon}
            title={'Skills\nachieved'}
            route={ROUTES.ASSESSMENTS}
            isXs={isXs}
          />
        </Grid>

        <Grid item xs={4} sm={3}>
          <MilestoneItem
            val={isNaN(coursesCount) ? 0 : coursesCount}
            Icon={CoursesIcon}
            title={'Courses\ncompleted'}
            route={ROUTES.COURSES}
            isXs={isXs}
          />
        </Grid>
      </Grid>

      {activityLogOpen && user && (
        <ActivityLog
          showDialog={activityLogOpen}
          setShowDialog={setActivityLogOpen}
          user={user}
          isMobile={isMobile}
        />
      )}
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(Milestones);
