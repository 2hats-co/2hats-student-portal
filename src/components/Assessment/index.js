import React, { useState } from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import ArrowForwardIcon from '@material-ui/icons/ArrowForwardRounded';

import BackButton from '../ContainerHeader/BackButton';
import AssessmentSubmission from './AssessmentSubmission';

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

  getStarted: {
    fontSize: theme.spacing.unit * 2,
    borderRadius: 200,
    marginLeft: -theme.spacing.unit / 2,

    '& svg': {
      marginLeft: theme.spacing.unit / 2,
      marginRight: 0,
    },
  },
});

const Assessment = props => {
  const { classes, data } = props;
  console.log(data);

  const [gotStarted, setGotStarted] = useState(false);

  return (
    <Grid container wrap="nowrap" className={classes.root}>
      <Grid item>
        <BackButton className={classes.backButton} />

        <div
          style={{ backgroundImage: `url(${data.image.url})` }}
          className={classes.coverImage}
        />

        <Typography variant="h5" className={classes.title}>
          {data.title}
        </Typography>

        <div className={classes.section}>
          <Typography variant="h6">Company information</Typography>
          <Typography variant="body2">{data.companyDescription}</Typography>
        </div>

        <div className={classes.section}>
          <Typography variant="h6">Your job</Typography>
          <Typography variant="body2">{data.jobDescription}</Typography>
        </div>

        {!gotStarted && (
          <div className={classes.section}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.getStarted}
              onClick={() => {
                setGotStarted(true);
              }}
            >
              Get started
              <ArrowForwardIcon />
            </Button>
          </div>
        )}

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
