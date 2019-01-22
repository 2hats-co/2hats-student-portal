import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import withNavigation from '../components/withNavigation';
import LoadingScreen from '../components/LoadingScreen';
import SuperAvatarPlus from '../components/SuperAvatarPlus';

import { COLLECTIONS } from '../constants/firestore';
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

  const [profileState] = useDocument({
    path: `${COLLECTIONS.profiles}/${user.id}`,
  });
  const profile = profileState.doc;
  console.log(profile);

  if (!profile) return <LoadingScreen showNav />;
  return (
    <Slide direction="up" in>
      <div className={className}>
        <Grid container className={classes.root} spacing={24}>
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
      </div>
    </Slide>
  );
};

ProfileContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  user: PropTypes.object.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

export default withNavigation(withStyles(styles)(ProfileContainer));
