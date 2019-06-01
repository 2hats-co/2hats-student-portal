import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import green from '@material-ui/core/colors/green';

// import PaddedIcon from '../PaddedIcon';
import WhatsNextBadge from './WhatsNextBadge';
import WhatsNextIcon from './WhatsNextIcon';
import WhatsNextTitle from './WhatsNextTitle';
import WhatsNextDescription from './WhatsNextDescription';
import WhatsNextCta from './WhatsNextCta';

import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';
import useDocument from '../../hooks/useDocument';
import {
  COLLECTIONS,
  WHATS_NEXT_STATES,
} from '@bit/sidney2hats.2hats.global.common-constants';
import { CLOUD_FUNCTIONS, cloudFunction } from '../../utilities/CloudFunctions';
import moment from 'moment';

const styles = theme => ({
  root: {
    position: 'relative',
    boxSizing: 'border-box',

    margin: '0 auto',
    marginBottom: theme.spacing.unit * 6,

    padding: theme.spacing.unit * 4,
    // paddingTop: theme.spacing.unit * 3,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,

    userSelect: 'none',

    boxShadow: theme.shadowsLight[24],

    [theme.breakpoints.down('sm')]: {
      width: `calc(100% - ${theme.spacing.unit * 2}px) !important`,
      maxWidth: 660,
    },
  },

  iconWrapper: {
    marginRight: theme.spacing.unit * 2,
    marginLeft: -theme.spacing.unit / 2,
  },
  whatsNextIcon: {
    fontSize: 32,
    color: theme.palette.text.primary,
  },
  title: {
    fontWeight: 500,
    marginTop: 2,
    color: theme.palette.text.primary,
  },
  green: { color: green[500] },
  description: { fontWeight: 400 },

  divider: {
    margin: theme.spacing.unit * 4,
    marginLeft: theme.spacing.unit * 5.5,
    marginRight: theme.spacing.unit,

    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      marginRight: 0,
    },
  },
});

const WhatsNext = props => {
  const { classes, theme, user, width } = props;

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [profileState] = useDocument({
    path: `${COLLECTIONS.profiles}/${user.id}`,
  });
  const profile = profileState.doc;

  useEffect(() => {
    if (!profile) return;
    // call cloud function if user doesn't have whatsNext or hasn't been
    // updated in 30 mins
    if (
      !profile.whatsNext ||
      moment().diff(
        moment.unix(profile.whatsNext.updatedAt.seconds),
        'minutes'
      ) > 30
    ) {
      console.log('called whatsNextAI');
      cloudFunction(
        CLOUD_FUNCTIONS.WHATS_NEXT_AI,
        {},
        o => console.log(o),
        o => console.log(o)
      );
    }
  }, [profile]);

  if (!profile || !profile.whatsNext || !profile.whatsNext.state) return null;

  return (
    <div className={classes.root} style={{ width: width - 16 }}>
      <WhatsNextBadge
        badge={profile.whatsNext.badge}
        classes={classes}
        isMobile={isMobile}
      />

      <Grid
        container
        alignItems={
          profile.whatsNext.state === WHATS_NEXT_STATES.uploadResume
            ? 'flex-start'
            : 'flex-end'
        }
        spacing={24}
      >
        <Grid item xs>
          <Grid container direction={isMobile ? 'column' : 'row'}>
            <Grid item className={classes.iconWrapper}>
              <WhatsNextIcon
                className={classes.whatsNextIcon}
                state={profile.whatsNext.state}
              />
            </Grid>
            <Grid item xs>
              <Typography variant="h6" className={classes.title} gutterBottom>
                <WhatsNextTitle state={profile.whatsNext.state} />
              </Typography>
              <Typography variant="body1" className={classes.description}>
                <WhatsNextDescription
                  state={profile.whatsNext.state}
                  data={profile.whatsNext.data}
                />
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          sm={
            profile.whatsNext.state === WHATS_NEXT_STATES.uploadResume
              ? 4
              : 'auto'
          }
        >
          <WhatsNextCta
            state={profile.whatsNext.state}
            data={profile.whatsNext.data}
          />
        </Grid>
      </Grid>
    </div>
  );
};

WhatsNext.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  width: PropTypes.number,
};

export default withStyles(styles, { withTheme: true })(WhatsNext);
