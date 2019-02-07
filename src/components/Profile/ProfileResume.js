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
import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';
import { updateDoc } from '../../utilities/firestore';

const styles = theme => ({
  ...profileStyles(theme),

  uploader: { marginTop: theme.spacing.unit * 2 },

  fileChip: {
    marginLeft: -theme.spacing.unit / 2,
    cursor: 'pointer',
  },
  fileIcon: { transform: 'rotate(-45deg)' },
});

const ProfileResume = props => {
  const { classes, data, user, isMobile } = props;

  const [popperAnchor, setPopperAnchor] = useState(null);

  const handleDelete = e => {
    e.preventDefault();
    updateDoc(COLLECTIONS.profiles, user.id, { resume: {} });
  };

  return (
    <Grid
      container
      direction={isMobile ? 'column' : 'row'}
      className={classes.root}
      spacing={isMobile ? 8 : 24}
    >
      <Grid item>
        <PaddedIcon className={classes.paddedIcon}>
          <ResumeIcon />
        </PaddedIcon>
      </Grid>
      <Grid item xs>
        <Grid container alignItems="flex-end">
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
          <>
            <Typography variant="body1" color="textSecondary">
              It looks like you haven’t uploaded your resume yet. Uploading a
              resume will make applying for jobs faster and make it easier for
              us to see what best suits you.
            </Typography>
            <ResumeUploader className={classes.uploader} />
          </>
        ) : (
          <Chip
            id="resume-chip"
            component="a"
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            label={data.name}
            onDelete={handleDelete}
            className={classes.fileChip}
            icon={<FileIcon className={classes.fileIcon} />}
          />
        )}
      </Grid>
    </Grid>
  );
};

ProfileResume.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object,
  user: PropTypes.object.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

export default withStyles(styles)(ProfileResume);
