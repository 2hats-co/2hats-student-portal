import React, { Component } from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import Avatar from '@material-ui/core/Avatar';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';

import EditIcon from '@material-ui/icons/EditOutlined';

import Dropzone from 'react-dropzone';
import { db } from '../store';
import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';
import { blobAvatarUploader } from '../utilities/Uploader';

const styles = theme => ({
  dropZone: {
    border: 'none !important',
  },
  avatarButton: {
    padding: 0,
    marginBottom: theme.spacing.unit,
    overflow: 'hidden',

    '&:hover $editIcon': { opacity: 1 },
  },
  avatar: {
    cursor: 'pointer',
    textTransform: 'uppercase',
    width: theme.spacing.unit * 8,
    height: theme.spacing.unit * 8,
    fontSize: theme.spacing.unit * 4,
  },
  editIcon: {
    opacity: 0,
    position: 'absolute',
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shortest,
    }),

    color: '#fff',
    backgroundColor: 'rgba(0,0,0,.25)',
    boxShadow: `0 0 0 ${theme.spacing.unit * 2.5}px rgba(0,0,0,.25)`,
  },
  bigEditIcon: {
    fontSize: theme.spacing.unit * (96 / 8),
    boxShadow: `0 0 0 ${theme.spacing.unit * 5.25}px rgba(0,0,0,.25)`,
  },

  bigAvatar: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 180,
    height: 180,
    fontSize: 96,
  },
  uploadButton: {
    marginTop: 10,
    width: 230,
  },
  link: {
    display: 'block',
    width: '100%',
    textAlign: 'center',
    marginTop: 20,
  },

  spinner: {
    position: 'absolute',
    zIndex: 1,
  },
});

class SuperAvatarPlus extends Component {
  state = {
    open: false,
    isUploading: false,
    avatarURL: '',
    hasChanged: false,
  };
  constructor(props) {
    super(props);
    this.openDialog = this.openDialog.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.cancelHandler = this.cancelHandler.bind(this);
    this.saveHandler = this.saveHandler.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }
  componentWillMount() {
    if (this.props.avatarURL) {
      this.setState({ avatarURL: this.props.avatarURL });
    }
  }
  openDialog() {
    this.setState({ open: true });
  }
  closeDialog() {
    this.setState({ open: false });
  }
  cancelHandler() {
    if (this.props.avatarURL) {
      this.setState({ avatarURL: this.props.avatarURL, hasChanged: false });
    }
    this.closeDialog();
  }
  saveHandler() {
    db.collection(COLLECTIONS.users)
      .doc(this.props.uid)
      .update({ avatarURL: this.state.avatarURL });
    this.closeDialog();
  }
  handleUpload(url) {
    this.setState({ avatarURL: url });
    this.setState({ isUploading: false });
  }

  onDrop(files) {
    this.setState({ isUploading: true, hasChanged: true });
    this.setState({ avatarURL: files[0].preview });
    blobAvatarUploader(files[0], this.handleUpload);
  }

  render() {
    const { avatarURL, firstName, lastName, classes } = this.props;
    const { isUploading, open } = this.state;
    let avatar = (
      <IconButton
        id="profile-button"
        className={classes.avatarButton}
        onClick={this.openDialog}
      >
        <Avatar src={avatarURL} className={classNames(classes.avatar)}>
          {firstName[0]}
          {lastName[0]}
        </Avatar>
        <EditIcon className={classes.editIcon} />
      </IconButton>
    );
    let bigAvatar = (
      <IconButton id="big-profile-button" className={classes.avatarButton}>
        <Avatar
          src={avatarURL}
          className={classNames(classes.avatar, classes.bigAvatar)}
        >
          {firstName[0]}
          {lastName[0]}
        </Avatar>
        <EditIcon
          className={classNames(classes.editIcon, classes.bigEditIcon)}
        />
      </IconButton>
    );
    if (avatarURL || this.state.avatarURL) {
      avatar = (
        <IconButton
          id="profile-button"
          className={classes.avatarButton}
          onClick={this.openDialog}
        >
          <Avatar
            alt={`${firstName} ${lastName}`}
            src={avatarURL}
            className={classes.avatar}
          />
          <EditIcon className={classes.editIcon} />
        </IconButton>
      );

      bigAvatar = (
        <IconButton id="big-profile-button" className={classes.avatarButton}>
          <Avatar
            alt={`${firstName} ${lastName}`}
            src={this.state.avatarURL}
            className={classNames(classes.avatar, classes.bigAvatar)}
          />
          <EditIcon
            className={classNames(classes.editIcon, classes.bigEditIcon)}
          />
        </IconButton>
      );
    }

    return (
      <div>
        {avatar}
        <Dialog open={open}>
          <DialogTitle>Profile Photo</DialogTitle>
          <DialogContent>
            <Grid
              container
              direction="column"
              alignItems="center"
              style={{ width: '100%' }}
            >
              {isUploading && (
                <CircularProgress className={classes.spinner} size={180} />
              )}
              <Dropzone
                onDrop={this.onDrop.bind(this)}
                className={classes.dropZone}
                accept="image/jpeg, image/png, image/jpg"
              >
                {bigAvatar}
                <Link
                  component="button"
                  className={classes.link}
                  variant="body1"
                >
                  Select a file
                </Link>
              </Dropzone>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={this.cancelHandler}>
              Cancel
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={this.saveHandler}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

SuperAvatarPlus.propTypes = {
  classes: PropTypes.object.isRequired,
  avatarURL: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
};
export default withStyles(styles)(SuperAvatarPlus);
