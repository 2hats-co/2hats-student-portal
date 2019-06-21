import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import BadgeIcon from '../../assets/icons/SkillAchieved';
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardOutlined';

import { getSkillLabel } from '@bit/sidney2hats.2hats.global.common-constants';
import * as ROUTES from '../../constants/routes';

const WhatsNextBadge = props => {
  const { classes, badge, isMobile, history } = props;

  if (!badge) return null;

  return (
    <>
      <Grid container alignItems="flex-end" spacing={3}>
        <Grid item xs>
          <Grid container direction={isMobile ? 'column' : 'row'}>
            <Grid item className={classes.iconWrapper}>
              <BadgeIcon
                className={clsx(classes.whatsNextIcon, classes.green)}
              />
            </Grid>
            <Grid item xs>
              <Typography
                variant="h6"
                className={clsx(classes.title, classes.green)}
                gutterBottom
              >
                Congratulations!
              </Typography>
              <Typography variant="body1" className={classes.description}>
                You passed the <b>{badge.title}</b>{' '}
                {badge.type.replace('assessment', 'task')}
                {/* No longer needed + whatsNextAI callable still uses hardcoded skills */}
                {/* {badge.skillAssociated && (
              <>
                {' '}
                and earned the <b>
                  {getSkillLabel(badge.skillAssociated)}
                </b>{' '}
                badge
              </>
            )} */}
                .
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        {badge.type === 'assessment' && (
          <Grid item xs={12} sm="auto">
            <Button
              color="primary"
              variant="outlined"
              onClick={() => {
                history.push(`${ROUTES.ASSESSMENT}?id=${badge.id}&yours=true`);
              }}
            >
              View Feedback
              <ArrowForwardIcon />
            </Button>
          </Grid>
        )}
      </Grid>
      <Divider className={classes.divider} />
    </>
  );
};

WhatsNextBadge.propTypes = {
  classes: PropTypes.object.isRequired,
  badge: PropTypes.object,
  isMobile: PropTypes.bool,
  history: PropTypes.object.isRequired,
};

export default withRouter(WhatsNextBadge);
