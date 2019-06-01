import React, { useState } from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import Chip from '@material-ui/core/Chip';

import PaddedIcon from '../PaddedIcon';
import ResumeIcon from '@material-ui/icons/DescriptionOutlined';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import FileIcon from '@material-ui/icons/AttachmentOutlined';

import { profileStyles } from '../../containers/ProfileContainer';
import ResumeUploader from '../WhatsNext/ResumeUploader';

const styles = theme => ({
  ...profileStyles(theme),

  newResumeMsg: {
    marginTop: theme.spacing(2),
    marginBottom: -theme.spacing(1),
  },

  uploader: { marginTop: theme.spacing(2) },

  fileChip: {
    marginLeft: -theme.spacing(1) / 2,
    cursor: 'pointer',
  },
  fileIcon: { transform: 'rotate(-45deg)' },
});

const ProfileResume = props => {
  const { classes, data, isMobile } = props;

  const [popperAnchor, setPopperAnchor] = useState(null);

  return (
    <Grid
      container
      direction={isMobile ? 'column' : 'row'}
      className={classes.root}
      spacing={isMobile ? 1 : 3}
    >
      <Grid item>
        <PaddedIcon className={classes.paddedIcon}>
          <ResumeIcon />
        </PaddedIcon>
      </Grid>
      <Grid item xs>
        <Grid container alignItems="center" className={classes.titleWrapper}>
          <Grid item xs>
            <Typography variant="h5" className={classes.title}>
              Your Resume
            </Typography>
          </Grid>
          <Grid item className={classes.infoPopper}>
            <IconButton
              id="info-button-resume"
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
                Your resume, excluding personal information, can be seen by
                potential employers, if approved by 2hats.
              </Typography>
            </Popover>
          </Grid>
        </Grid>

        {!data || !data.url ? (
          <Typography variant="body1" color="textSecondary">
            It looks like you haven’t uploaded your resume yet. Uploading a
            resume will make applying for jobs faster and make it easier for us
            to see what best suits you.
          </Typography>
        ) : (
          <>
            <Chip
              id="resume-chip"
              component="a"
              href={data.url}
              target="_blank"
              rel="noopener noreferrer"
              label={data.name}
              className={classes.fileChip}
              icon={<FileIcon className={classes.fileIcon} />}
            />
            <Typography
              variant="body1"
              color="textSecondary"
              className={classes.newResumeMsg}
            >
              You can upload a new resume below.
            </Typography>
          </>
        )}

        <ResumeUploader className={classes.uploader} resetOnUpload />
      </Grid>
    </Grid>
  );
};

ProfileResume.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object,
  isMobile: PropTypes.bool.isRequired,
};

export default withStyles(styles)(ProfileResume);
