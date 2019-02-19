import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import PaddedIcon from '../PaddedIcon';
import AlertIcon from '@material-ui/icons/NewReleasesOutlined';
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardOutlined';
import TimeIcon from '@material-ui/icons/AccessTimeOutlined';

import SpecialLabel from './SpecialLabel';

import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';
import UserContext from '../../contexts/UserContext';
import useCollection from '../../hooks/useCollection';
import useDocument from '../../hooks/useDocument';
import {
  COLLECTIONS,
  STYLES,
} from '@bit/sidney2hats.2hats.global.common-constants';
import * as ROUTES from '../../constants/routes';
import moment from 'moment';

const styles = theme => ({
  ...STYLES.RENDERED_HTML(theme),

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

    boxShadow: theme.shadowsLight[24],

    [theme.breakpoints.down('sm')]: {
      width: `calc(100% - ${theme.spacing.unit * 2}px) !important`,
      maxWidth: 660,
    },
  },

  iconWrapper: {
    marginRight: theme.spacing.unit * 2,
    marginLeft: -theme.spacing.unit,
  },
  title: {
    fontWeight: 500,
    marginTop: theme.spacing.unit * 1.125,
    color: theme.palette.primary.main,
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

  specialLabelWrapper: {
    marginLeft: -theme.spacing.unit / 2,
    marginTop: theme.spacing.unit * 2,
  },

  fullHeight: { height: '100%' },
  jobWrapper: {
    cursor: 'pointer',

    '&:hover $jobTitle': { color: theme.palette.primary.main },
    '&:hover $media': { opacity: 0.9 },
  },
  jobTitle: {
    transition: theme.transitions.create('color', {
      duration: theme.transitions.duration.short,
    }),
    marginTop: theme.spacing.unit * 1.125,
  },
  titleArrow: {
    verticalAlign: 'text-bottom',
    opacity: 0.87,
    marginLeft: theme.spacing.unit / 2,
  },
  media: {
    width: 100,
    height: 100,
    float: 'right',
    borderRadius: theme.shape.borderRadius * 0.75,
    transition: theme.transitions.create('opacity'),

    marginLeft: theme.spacing.unit,
    marginBottom: theme.spacing.unit,

    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',

    [theme.breakpoints.down('sm')]: {
      width: 75,
      height: 75,
    },
  },
  daysRemaining: {
    fontWeight: 500,
    marginTop: theme.spacing.unit * 2,
  },

  timeLabel: {
    marginTop: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    color: theme.palette.text.secondary,
  },
  timeIcon: {
    marginRight: theme.spacing.unit,
    opacity: 0.67,
    verticalAlign: 'bottom',
  },

  buttonWrapper: { textAlign: 'right' },
});

const Announcement = props => {
  const { classes, theme, width, history } = props;

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const userContext = useContext(UserContext);

  const [announcementsState] = useCollection({
    path: COLLECTIONS.announcements,
    filters: [{ field: 'published', operator: '==', value: true }],
    sort: { field: 'createdAt', direction: 'desc' },
  });
  const data = announcementsState.documents[0];

  const [yourAssessmentState, yourAssessmentDispatch] = useCollection();
  const yourAssessmentDoc = yourAssessmentState.documents[0];

  const [jobState, jobDispatch] = useDocument();
  const jobDoc = jobState.doc;

  const [assessmentState, assessmentDispatch] = useDocument();
  const assessmentDoc = assessmentState.doc;

  useEffect(
    () => {
      if (!data) return;
      if (data.jobId && !jobState.path)
        jobDispatch({ path: `${COLLECTIONS.jobs}/${data.jobId}` });
      if (data.assessmentId && !assessmentState.path) {
        yourAssessmentDispatch({
          path: `${COLLECTIONS.users}/${userContext.user.id}/${
            COLLECTIONS.assessments
          }`,
          filters: [
            { field: 'assessmentId', operator: '==', value: data.assessmentId },
          ],
          sort: { field: 'createdAt', direction: 'desc' },
        });
        assessmentDispatch({
          path: `${COLLECTIONS.assessments}/${data.assessmentId}`,
        });
      }
    },
    [data]
  );

  if (!data || !jobDoc || !assessmentDoc) return null;

  return (
    <div className={classes.root} style={{ width: width - 16 }}>
      <Grid container alignItems="stretch" spacing={24}>
        <Grid item xs={12} sm={7}>
          <Grid
            container
            direction={isMobile ? 'column' : 'row'}
            className={classes.fullHeight}
          >
            <Grid item className={classes.iconWrapper}>
              <PaddedIcon color="primary">
                <AlertIcon />
              </PaddedIcon>
            </Grid>
            <Grid item xs>
              <Grid item xs>
                <Typography variant="h6" className={classes.title} gutterBottom>
                  {data.title}
                </Typography>
                <div
                  className={classes.renderedHtml}
                  dangerouslySetInnerHTML={{ __html: data.description }}
                />
              </Grid>
              <Grid item>
                <div className={classes.specialLabelWrapper}>
                  {data.specialLabel.map(x => (
                    <SpecialLabel key={x} color="primary" label={x} />
                  ))}
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={5} className={classes.ctaWrapper}>
          <Grid
            container
            direction="column"
            wrap="nowrap"
            className={classes.fullHeight}
          >
            <Grid item xs>
              <div
                onClick={() => {
                  history.push(`${ROUTES.JOBS}?id=${data.jobId}`);
                }}
                className={classes.jobWrapper}
              >
                <div
                  className={classes.media}
                  style={{
                    backgroundImage: `url(${jobDoc.image && jobDoc.image.url})`,
                  }}
                />
                <Typography
                  variant="h6"
                  gutterBottom
                  className={classes.jobTitle}
                >
                  {jobDoc.title}
                  <ArrowForwardIcon className={classes.titleArrow} />
                </Typography>

                <Typography variant="h5" className={classes.daysRemaining}>
                  {moment(jobDoc.closingDate, 'DD/MM/YYYY').fromNow(true)}
                </Typography>
                <Typography variant="body2">left to apply</Typography>
              </div>
            </Grid>

            <Grid item className={classes.buttonWrapper}>
              <Typography variant="body2" className={classes.timeLabel}>
                <TimeIcon className={classes.timeIcon} />
                {assessmentDoc.duration} to complete
              </Typography>

              <Button
                color="primary"
                variant="contained"
                size="large"
                onClick={() => {
                  if (yourAssessmentDoc)
                    history.push(
                      `${ROUTES.ASSESSMENTS}?id=${
                        yourAssessmentDoc.id
                      }&yours=true`
                    );
                  else
                    history.push(
                      `${ROUTES.ASSESSMENTS}?id=${data.assessmentId}`
                    );
                }}
              >
                Get Started
                <ArrowForwardIcon />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

Announcement.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  width: PropTypes.number,
  history: PropTypes.object.isRequired,
};

export default withRouter(
  withStyles(styles, { withTheme: true })(Announcement)
);
