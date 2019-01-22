import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';

import IndustryIcon from '@material-ui/icons/BusinessRounded';
import PayIcon from '@material-ui/icons/AttachMoneyRounded';
import TimeIcon from '@material-ui/icons/AccessTimeRounded';
import EventIcon from '@material-ui/icons/EventRounded';
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardRounded';
import ErrorIcon from '@material-ui/icons/ErrorOutlineRounded';

import BackButton from '../ContainerHeader/BackButton';
import SkillItem from './SkillItem';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit,
    maxWidth: 720,
    margin: '0 auto',
  },
  backButton: {
    display: 'flex',
    marginBottom: theme.spacing.unit,
  },
  paper: {
    padding: theme.spacing.unit * 3,
  },

  coverImage: {
    borderRadius: theme.shape.borderRadius / 2,
    maxWidth: '100%',
    height: '100%',
    minHeight: theme.spacing.unit * 15,

    marginBottom: theme.spacing.unit * 3,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundImage: `linear-gradient(-15deg, #fa0, ${
      theme.palette.primary.main
    })`,
  },

  title: { fontWeight: 500 },
  subtitle: {
    textTransform: 'capitalize',
    color: theme.palette.primary.main,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 1.5,

    '& $adornmentIcon': {
      verticalAlign: 'sub',
      color: theme.palette.primary.main,
    },
  },
  meta: {
    marginBottom: theme.spacing.unit,
    display: 'flex',
  },
  adornmentIcon: {
    verticalAlign: 'bottom',
    marginRight: theme.spacing.unit,
    color: theme.palette.text.secondary,
  },

  section: {
    marginTop: theme.spacing.unit * 3,
  },

  skillsWrapper: {
    marginTop: theme.spacing.unit / 2,
    marginBottom: -theme.spacing.unit * 2,
  },
  skillWrapper: {
    paddingRight: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },

  apply: {
    marginTop: theme.spacing.unit * 2,
    '& svg': {
      marginLeft: theme.spacing.unit / 2,
      marginRight: -theme.spacing.unit / 2,
    },
  },
  applyBig: {
    width: '100%',
    display: 'flex',
    // padding: theme.spacing.unit * 1.5,

    fontSize: theme.spacing.unit * 3,
    fontWeight: 500,
    borderRadius: 200,
    transition: theme.transitions.create('transform'),

    '& svg': {
      fontSize: theme.spacing.unit * 3.75,
      marginLeft: theme.spacing.unit,
      marginRight: -theme.spacing.unit,
      position: 'relative',
      top: theme.spacing.unit / 4,
    },
  },
  getStartedSection: {
    transition: theme.transitions.create(['transform', 'margin-top']),
    transformOrigin: '0 100%',
  },
  gotStarted: {
    transform: 'scale(0)',
    marginTop: -theme.spacing.unit * 5.5,
  },

  skillsWarning: {
    marginTop: theme.spacing.unit,
    color: theme.palette.error.main,

    '& svg': {
      verticalAlign: 'bottom',
      marginRight: theme.spacing.unit / 2,
    },
    '$applyBig + &': { textAlign: 'center' },
  },
});

const Job = props => {
  const { classes, data, user } = props;

  const [gotStarted, setGotStarted] = useState(false);

  useEffect(
    () => {
      if (data && data.submitted) setGotStarted(true);
      else setGotStarted(false);
    },
    [data]
  );

  const skillsNotAchieved = user.skills ? [] : [...data.skillsRequired];
  data.skillsRequired.forEach(x => {
    if (user.skills && !user.skills.includes(x)) skillsNotAchieved.push(x);
  });

  return (
    <div className={classes.root}>
      <BackButton className={classes.backButton} />

      <Paper className={classes.paper}>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={5}>
            <div
              style={{ backgroundImage: `url(${data.image.url})` }}
              className={classes.coverImage}
            />
          </Grid>

          <Grid item xs={12} sm={7}>
            <Typography variant="h5" className={classes.title}>
              {data.title}
            </Typography>

            <Typography variant="subtitle1" className={classes.subtitle}>
              <IndustryIcon className={classes.adornmentIcon} />
              {data.industry}
            </Typography>

            <Typography variant="body1" className={classes.meta}>
              <TimeIcon className={classes.adornmentIcon} />
              {data.commitment}
            </Typography>
            <Typography variant="body1" className={classes.meta}>
              <PayIcon className={classes.adornmentIcon} />
              {data.pay}
            </Typography>
            <Typography variant="body1" className={classes.meta}>
              <EventIcon className={classes.adornmentIcon} />
              Applications close {data.closingDate}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              className={classNames(
                classes.apply,
                classes.getStartedSection,
                gotStarted && classes.gotStarted
              )}
              onClick={e => {
                setGotStarted(true);
              }}
              disabled={skillsNotAchieved.length > 0}
            >
              Apply
              <ArrowForwardIcon />
            </Button>
            {skillsNotAchieved.length > 0 && (
              <Typography variant="body2" className={classes.skillsWarning}>
                <ErrorIcon />
                You need {skillsNotAchieved.length} more of the required skills
                to apply
              </Typography>
            )}
          </Grid>
        </Grid>

        <div className={classes.section}>
          <Typography variant="subtitle1">Skills required</Typography>
          <Grid container className={classes.skillsWrapper}>
            {data.skillsRequired.map((x, i) => (
              <Grid
                key={`${i}-${x}`}
                item
                xs={12}
                sm={4}
                className={classes.skillWrapper}
              >
                <SkillItem
                  value={x}
                  achieved={user.skills && user.skills.includes(x)}
                />
              </Grid>
            ))}
          </Grid>
        </div>

        <div className={classes.section}>
          <Typography variant="subtitle1">About the company</Typography>
          <Typography variant="body2">{data.companyDescription}</Typography>
        </div>

        <div className={classes.section}>
          <Typography variant="subtitle1">The role</Typography>
          <Typography variant="body2">{data.roleDescription}</Typography>
        </div>

        <div
          className={classNames(
            classes.section,
            classes.getStartedSection,
            gotStarted && classes.gotStarted
          )}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.applyBig}
            onClick={e => {
              setGotStarted(true);
            }}
            disabled={skillsNotAchieved.length > 0}
          >
            Apply
            <ArrowForwardIcon />
          </Button>
          {skillsNotAchieved.length > 0 && (
            <Typography variant="body2" className={classes.skillsWarning}>
              <ErrorIcon />
              You need {skillsNotAchieved.length} more of the required skills to
              apply
            </Typography>
          )}
        </div>
      </Paper>
    </div>
  );
};

Job.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default withStyles(styles)(Job);
