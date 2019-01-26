import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import IndustryIcon from '@material-ui/icons/BusinessRounded';
import TimeIcon from '@material-ui/icons/AccessTimeRounded';
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardRounded';

import BackButton from '../ContainerHeader/BackButton';
import AssessmentSubmission from './AssessmentSubmission';
import SkillItem from '../SkillItem';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit,
    maxWidth: 720,
    margin: '0 auto',

    '& ol, & ul': {
      margin: 0,
      paddingLeft: '1em',
      '& li': { marginTop: theme.spacing.unit },
    },

    '& h6': {
      marginBottom: theme.spacing.unit / 2,
    },
  },
  backButton: {
    display: 'flex',
    marginBottom: theme.spacing.unit,
  },

  title: { fontWeight: 700 },

  section: {
    marginTop: theme.spacing.unit * 3,
  },

  coverImage: {
    borderRadius: theme.shape.borderRadius,
    maxWidth: '100%',
    marginBottom: theme.spacing.unit * 3,
    height: 0,
    paddingTop: '33%',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundImage: `linear-gradient(-15deg, #fa0, ${
      theme.palette.primary.main
    })`,
  },

  renderedHtml: {
    ...theme.typography.body2,

    '& p': { margin: 0 },
  },

  getStarted: {
    fontSize: theme.spacing.unit * 2,
    borderRadius: 200,
    marginLeft: -theme.spacing.unit / 2,
    transition: theme.transitions.create('transform'),

    '& svg': {
      marginLeft: theme.spacing.unit / 2,
      marginRight: 0,
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
});

const Assessment = props => {
  const { classes, data } = props;

  const [gotStarted, setGotStarted] = useState(false);

  useEffect(
    () => {
      if (data && data.assessmentId) setGotStarted(true);
      else setGotStarted(false);
    },
    [data]
  );

  return (
    <Grid container wrap="nowrap" className={classes.root}>
      <Grid item>
        <BackButton className={classes.backButton} />

        <div
          style={
            data.image && data.image.url
              ? { backgroundImage: `url(${data.image.url})` }
              : {}
          }
          className={classes.coverImage}
        />

        <Typography variant="h5" className={classes.title}>
          {data.title}
        </Typography>

        <SkillItem value={data.skillAssociated} />
        <Grid container alignItems="flex-end" style={{ marginTop: 8 }}>
          <IndustryIcon
            style={{ marginLeft: 12, marginRight: 20, opacity: 0.67 }}
          />
          <Typography variant="body1">{data.category}</Typography>
        </Grid>
        <Grid container alignItems="flex-end" style={{ marginTop: 4 }}>
          <TimeIcon
            style={{ marginLeft: 12, marginRight: 20, opacity: 0.67 }}
          />
          <Typography variant="body1">{data.duration}</Typography>
        </Grid>

        <div className={classes.section}>
          <Typography variant="h6">Company information</Typography>
          <div
            className={classes.renderedHtml}
            dangerouslySetInnerHTML={{ __html: data.companyDescription }}
          />
        </div>

        <div className={classes.section}>
          <Typography variant="h6">Your job</Typography>
          <div
            className={classes.renderedHtml}
            dangerouslySetInnerHTML={{ __html: data.jobDescription }}
          />
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
            className={classes.getStarted}
            onClick={e => {
              setGotStarted(true);
            }}
          >
            Get started
            <ArrowForwardIcon />
          </Button>
        </div>

        {gotStarted && <AssessmentSubmission data={data} />}
      </Grid>
    </Grid>
  );
};

Assessment.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
};

export default withStyles(styles)(Assessment);
