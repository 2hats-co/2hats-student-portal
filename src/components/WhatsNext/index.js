import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

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
    paddingTop: theme.spacing.unit * 3,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,

    userSelect: 'none',

    boxShadow: `0  0    0    1px rgba(0, 0, 0, .025),
                0 11px 15px -7px rgba(0, 0, 0, .1),
                0 24px 38px  3px rgba(0, 0, 0, .07),
                0  9px 46px  8px rgba(0, 0, 0, .06)`,

    [theme.breakpoints.down('sm')]: {
      width: `calc(100% - ${theme.spacing.unit * 4}px) !important`,
      maxWidth: 660,
    },
  },

  iconWrapper: {
    width: 48,
    height: 48,
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.light,

    marginRight: theme.spacing.unit * 2,
    marginLeft: -theme.spacing.unit,

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '& svg': {
      color: theme.palette.primary.main,
      fontSize: 28,
    },
  },
  title: {
    fontWeight: 500,
    color: theme.palette.primary.main,

    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 1.5,
  },
  description: {
    // maxWidth: 500,
    fontWeight: 400,
    '& b': { fontWeight: 500 },
  },

  divider: {
    margin: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 7,
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

  useEffect(
    () => {
      if (!profile) return null;
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
    },
    [profile]
  );

  if (!profile || !profile.whatsNext || !profile.whatsNext.state) return null;

  return (
    <div className={classes.root} style={{ width }}>
      <WhatsNextBadge
        badge={profile.whatsNext.badge}
        classes={classes}
        isMobile={isMobile}
      />

      <Grid container alignItems="flex-end" spacing={24}>
        <Grid item xs>
          <Grid container direction={isMobile ? 'column' : 'row'}>
            <Grid item className={classes.iconWrapper}>
              <WhatsNextIcon state={profile.whatsNext.state} />
            </Grid>
            <Grid item xs>
              <Typography variant="h5" className={classes.title}>
                <WhatsNextTitle state={profile.whatsNext.state} />
              </Typography>
              <Typography variant="h6" className={classes.description}>
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
