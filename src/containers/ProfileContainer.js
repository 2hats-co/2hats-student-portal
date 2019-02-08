import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';

import withNavigation from '../components/withNavigation';
import Profile from '../components/Profile';
import ProfileAssessments from '../components/Profile/ProfileAssessments';
import ProfileCourses from '../components/Profile/ProfileCourses';
import ProfileResume from '../components/Profile/ProfileResume';

import InfoIcon from '@material-ui/icons/InfoOutlined';

import {
  STYLES,
  COLLECTIONS,
} from '@bit/sidney2hats.2hats.global.common-constants';
import useDocument from '../hooks/useDocument';
import useCollection from '../hooks/useCollection';

export const profileStyles = theme => ({
  infoPopper: { marginRight: -theme.spacing.unit * 2 },
  infoPopperText: {
    margin: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    width: 240,
  },

  paddedIcon: {
    marginLeft: theme.spacing.unit * 2,

    [theme.breakpoints.down('xs')]: { marginLeft: -theme.spacing.unit / 2 },
  },

  title: {
    fontWeight: 500,
    margin: `8px 0 ${theme.spacing.unit * 2}px`,

    [theme.breakpoints.down('xs')]: { marginTop: 0 },
  },

  browseButton: {
    marginTop: theme.spacing.unit / 2,
    marginLeft: -theme.spacing.unit,
  },

  item: {
    '& + &': { marginTop: theme.spacing.unit * 2 },
  },
  itemIcon: {
    height: 28,
    marginRight: theme.spacing.unit,
  },
  itemTitle: {
    lineHeight: '28px',
  },
  itemButton: {
    verticalAlign: 'baseline',
    marginLeft: theme.spacing.unit / 2,

    '& svg': {
      fontSize: 18,
      marginLeft: theme.spacing.unit / 4,
      marginRight: 0,
      marginBottom: -1,
    },
  },
});

const styles = theme => ({
  ...STYLES.DETAIL_VIEW(theme),

  root: {
    ...STYLES.DETAIL_VIEW(theme).root,
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 5,

    '& h6': { fontWeight: 700 },
  },

  title: {
    ...STYLES.DETAIL_VIEW(theme).title,
    textAlign: 'left',
  },

  infoPopper: { marginRight: -theme.spacing.unit * 2 },
  infoPopperText: {
    margin: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    width: 240,
  },
});

const ProfileContainer = props => {
  const { classes, theme, user } = props;

  const [popperAnchor, setPopperAnchor] = useState(null);

  useEffect(() => {
    document.title = '2hats – Profile';
  }, []);

  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const [profileState] = useDocument({
    path: `${COLLECTIONS.profiles}/${user.id}`,
  });
  const profile = profileState.doc;

  const [assessmentsState] = useCollection({
    path: `${COLLECTIONS.users}/${user.id}/${COLLECTIONS.assessments}`,
    filters: [{ field: 'outcome', operator: '==', value: 'pass' }],
    sort: { field: 'updatedAt', direction: 'desc' },
  });
  const assessments = assessmentsState.documents;

  const [coursesState] = useCollection({
    path: `${COLLECTIONS.users}/${user.id}/${COLLECTIONS.courses}`,
    filters: [{ field: 'completed', operator: '==', value: true }],
    sort: { field: 'createdAt', direction: 'desc' },
  });
  const courses = coursesState.documents;

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <Grid container>
          <Grid item xs>
            <Typography variant="h4" className={classes.title}>
              Your Work Profile
            </Typography>
          </Grid>
          <Grid item className={classes.infoPopper}>
            <IconButton
              id="work-info-button"
              onClick={e => {
                setPopperAnchor(e.currentTarget);
              }}
            >
              <InfoIcon />
            </IconButton>
            <Popover
              open={!!popperAnchor}
              anchorEl={popperAnchor}
              onClose={() => {
                setPopperAnchor(null);
              }}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <Typography className={classes.infoPopperText}>
                Your Work Profile, excluding personal information, will be seen
                by potential employers when you apply for jobs.
              </Typography>
            </Popover>
          </Grid>
        </Grid>
        {profile && (
          <>
            <div className={classes.section}>
              <Profile data={profile} user={user} isMobile={isMobile} />
            </div>
            <div className={classes.section}>
              <ProfileAssessments data={assessments} isMobile={isMobile} />
            </div>
            <div className={classes.section}>
              <ProfileCourses data={courses} isMobile={isMobile} />
            </div>
            <div className={classes.section}>
              <ProfileResume data={profile.resume} isMobile={isMobile} />
            </div>
          </>
        )}

        {(profileState.loading ||
          assessmentsState.loading ||
          coursesState.loading) && (
          <div className={classes.section}>
            <LinearProgress />
          </div>
        )}
      </main>
    </div>
  );
};

ProfileContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

export default withNavigation(withStyles(styles)(ProfileContainer));
