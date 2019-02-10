import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';

import PaddedIcon from '../PaddedIcon';
import SkillIcon from '../../assets/icons/SkillAchieved';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import InfoIcon from '@material-ui/icons/InfoOutlined';

import { profileStyles } from '../../containers/ProfileContainer';
import * as ROUTES from '../../constants/routes';
import { getSkillLabel } from '@bit/sidney2hats.2hats.global.common-constants';

const styles = theme => ({
  ...profileStyles(theme),
});

const ProfileAssessments = props => {
  const { classes, data, isMobile, history } = props;

  const [popperAnchor, setPopperAnchor] = useState(null);

  return (
    <Grid
      container
      direction={isMobile ? 'column' : 'row'}
      className={classes.root}
      spacing={isMobile ? 8 : 24}
    >
      <Grid item>
        <PaddedIcon className={classes.paddedIcon}>
          <SkillIcon />
        </PaddedIcon>
      </Grid>
      <Grid item xs>
        <Grid container alignItems="center" className={classes.titleWrapper}>
          <Grid item xs>
            <Typography variant="h5" className={classes.title}>
              Your Skills
            </Typography>
          </Grid>
          <Grid item className={classes.infoPopper}>
            <IconButton
              id="info-button-assessments"
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
                Your assessment submissions will be seen by potential employers
                when you apply for jobs.
              </Typography>
            </Popover>
          </Grid>
        </Grid>

        {data.length === 0 && (
          <>
            <Typography variant="body1" color="textSecondary">
              Your verified skills will appear here after you complete and pass
              assessments.
            </Typography>
            <Button
              color="primary"
              className={classes.browseButton}
              onClick={() => {
                history.push(ROUTES.ASSESSMENTS);
              }}
            >
              Browse Assessments
              <ArrowForwardIcon />
            </Button>
          </>
        )}
        {data.map(x => (
          <Grid container key={x.id} className={classes.item}>
            <Grid item>
              <SkillIcon className={classes.itemIcon} />
            </Grid>
            <Grid item xs>
              <Typography variant="subtitle1" className={classes.itemTitle}>
                {getSkillLabel(x.skillAssociated)}
              </Typography>
              <Button
                color="primary"
                size="small"
                className={classes.itemButton}
                onClick={() => {
                  history.push(`${ROUTES.ASSESSMENTS}?id=${x.id}&yours=true`);
                }}
              >
                View submission
                <ArrowForwardIcon />
              </Button>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

ProfileAssessments.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array,
  isMobile: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(ProfileAssessments));
