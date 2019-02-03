import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import withNavigation from '../components/withNavigation';
import LoadingScreen from '../components/LoadingScreen';
import SuperAvatarPlus from '../components/SuperAvatarPlus';

import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';
import useDocument from '../hooks/useDocument';

const styles = theme => ({
  root: {
    maxWidth: 1000,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: theme.spacing.unit * 3,
  },
});

const ProfileContainer = props => {
  const { classes, className, user } = props;

  useEffect(() => {
    document.title = '2hats – Profile';
  }, []);

  const [profileState] = useDocument({
    path: `${COLLECTIONS.profiles}/${user.id}`,
  });
  const profile = profileState.doc;
  console.log(profile);

  if (!profile) return <LoadingScreen showNav />;
  return (
    <div className={className}>
      <Paper className={classes.root}>
        <Grid container spacing={24}>
          <Grid item>
            <SuperAvatarPlus
              uid={user && user.id}
              firstName={user ? user.firstName : ''}
              lastName={user ? user.lastName : ''}
              avatarURL={user ? user.avatarURL : ''}
            />
            <Typography variant="subtitle1">Available</Typography>
            <Typography variant="body2" className={classes.title}>
              {profile.availableDays}
            </Typography>
          </Grid>

          <Grid item xs>
            <Typography variant="h4" className={classes.title}>
              {user.firstName} {user.lastName}
            </Typography>

            <Typography variant="body2" className={classes.title}>
              {profile.bio}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

ProfileContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  user: PropTypes.object.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

export default withNavigation(withStyles(styles)(ProfileContainer));
