import React, { useEffect, useState, useContext } from 'react';

import { makeStyles, useTheme } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';

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
import UserContext from 'contexts/UserContext';

export const profileStyles = theme => ({
  infoPopper: { marginRight: -theme.spacing(1) * 2 },
  infoPopperText: {
    margin: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    width: 240,
  },

  paddedIcon: {
    marginLeft: theme.spacing(2),

    [theme.breakpoints.down('xs')]: { marginLeft: -theme.spacing(1) / 2 },
  },

  titleWrapper: {
    marginBottom: theme.spacing(2),
    minHeight: theme.spacing(6),
    lineHeight: `${theme.spacing(6)}px`,
  },
  title: {
    fontWeight: 500,
    [theme.breakpoints.down('xs')]: { marginTop: 0 },
  },

  browseButton: {
    marginTop: theme.spacing(0.5),
    marginLeft: -theme.spacing(1),
  },

  item: {
    '& + &': { marginTop: theme.spacing(2) },
  },
  itemIcon: {
    height: 28,
    marginRight: theme.spacing(1),
  },
  itemTitle: {
    lineHeight: '28px',
  },
  itemButton: {
    verticalAlign: 'baseline',
    marginLeft: -theme.spacing(1),

    '& svg': {
      fontSize: 18,
      marginLeft: theme.spacing(0.25),
      marginRight: 0,
      marginBottom: -1,
    },
  },
});

const useStyles = makeStyles(theme => ({
  ...STYLES.DETAIL_VIEW(theme),

  root: {
    ...STYLES.DETAIL_VIEW(theme).root,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(5),

    '& h6': { fontWeight: 700 },
  },

  title: {
    ...STYLES.DETAIL_VIEW(theme).title,
    textAlign: 'left',
  },

  infoPopper: { marginRight: -theme.spacing(1) * 2 },
  infoPopperText: {
    margin: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
    width: 240,
  },
}));

const ProfileContainer = props => {
  const { user } = useContext(UserContext);
  const classes = useStyles();
  const theme = useTheme();

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

export default ProfileContainer;
