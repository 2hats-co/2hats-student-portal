import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import PaddedIcon from '../PaddedIcon';
import BadgeIcon from '@material-ui/icons/NewReleasesOutlined';

import { getSkillLabel } from '@bit/sidney2hats.2hats.global.common-constants';

const WhatsNextBadge = props => {
  const { classes, badge, isMobile } = props;

  if (!badge) return null;

  return (
    <>
      <Grid container direction={isMobile ? 'column' : 'row'}>
        <Grid item className={classes.iconWrapper}>
          <PaddedIcon color="primary">
            <BadgeIcon />
          </PaddedIcon>
        </Grid>
        <Grid item xs>
          <Typography variant="h6" className={classes.title} gutterBottom>
            Congratulations!
          </Typography>
          <Typography variant="body1" className={classes.description}>
            You passed the {badge.type} <b>{badge.title}</b>
            {badge.skillAssociated && (
              <>
                {' '}
                and earned the <b>
                  {getSkillLabel(badge.skillAssociated)}
                </b>{' '}
                badge
              </>
            )}
            .
          </Typography>
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
    </>
  );
};

WhatsNextBadge.propTypes = {
  classes: PropTypes.object.isRequired,
  badge: PropTypes.object,
  isMobile: PropTypes.bool,
};

export default WhatsNextBadge;
