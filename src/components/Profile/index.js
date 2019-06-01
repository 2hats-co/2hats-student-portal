import React, { useState } from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import EditIcon from '@material-ui/icons/EditOutlined';
import SaveIcon from '@material-ui/icons/CheckCircle';

import SuperAvatarPlus from '../SuperAvatarPlus';

import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';
import { updateDoc } from '../../utilities/firestore';

const BIO_MAX_LENGTH = 1000;

const styles = theme => ({
  avatar: {
    marginBottom: 0,

    [theme.breakpoints.down('xs')]: { marginLeft: -theme.spacing(1) / 2 },
  },

  name: {
    fontWeight: 500,
    marginTop: 16,
    marginBottom: theme.spacing(1.5),

    [theme.breakpoints.down('xs')]: { marginTop: 0 },
  },

  editBar: { marginBottom: theme.spacing(0.5) },
  editIcon: { marginRight: -theme.spacing(1) },
  bioLength: { display: 'inline-block', marginRight: theme.spacing(1) },
  textFieldRoot: {
    margin: '-10px -12px',
    paddingTop: 10,
    width: 'calc(100% + 24px)',
    ...theme.typography.body2,
  },
  bio: { whiteSpace: 'pre-line' },
});

const Profile = props => {
  const { classes, data, user, isMobile } = props;

  const [edit, setEdit] = useState(false);
  const [newBio, setNewBio] = useState(
    data.bio ? data.bio.substr(0, BIO_MAX_LENGTH) : ''
  );

  return (
    <Grid
      container
      direction={isMobile ? 'column' : 'row'}
      className={classes.root}
      spacing={isMobile ? 8 : 24}
    >
      <Grid item>
        <SuperAvatarPlus
          avatarURL={user.avatarURL}
          firstName={user.firstName}
          lastName={user.lastName}
          classes={{ avatarButton: classes.avatar }}
        />
      </Grid>
      <Grid item xs>
        <Typography variant="h5" className={classes.name}>
          {user.firstName} {user.lastName}
        </Typography>

        <Grid container alignItems="center" className={classes.editBar}>
          <Grid item xs>
            <Typography variant="subtitle1">Your Bio</Typography>
          </Grid>
          <Grid item>
            {edit && (
              <Typography variant="caption" className={classes.bioLength}>
                {newBio.length}/{BIO_MAX_LENGTH}
              </Typography>
            )}
            {edit ? (
              <Button
                className={classes.editIcon}
                color="primary"
                id="bio-submit"
                onClick={() => {
                  setEdit(false);
                  if (newBio !== data.bio)
                    updateDoc(COLLECTIONS.profiles, user.id, { bio: newBio });
                }}
              >
                Save
                <SaveIcon />
              </Button>
            ) : (
              <Button
                color="primary"
                id="bio-edit"
                className={classes.editIcon}
                onClick={() => {
                  setEdit(true);
                }}
              >
                Edit
                <EditIcon />
              </Button>
            )}
          </Grid>
        </Grid>
        {edit ? (
          <TextField
            id="bio-input"
            autoFocus
            fullWidth
            multiline
            variant="filled"
            margin="none"
            InputProps={{
              disableUnderline: true,
              classes: { root: classes.textFieldRoot },
            }}
            value={newBio}
            onChange={e => {
              setNewBio(e.target.value.substr(0, BIO_MAX_LENGTH));
            }}
          />
        ) : (
          <Typography
            variant="body2"
            className={classes.bio}
            color={data.bio ? 'textPrimary' : 'textSecondary'}
          >
            {data.bio ||
              'You don’t have a bio yet. Click the edit button above to get started.'}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object,
  user: PropTypes.object,
  isMobile: PropTypes.bool.isRequired,
};

export default withStyles(styles)(Profile);
