import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';

import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

import ArrowForwardIcon from '@material-ui/icons/ArrowForwardOutlined';

import BackButton from '../ContainerHeader/BackButton';
import AssessmentMetadata from './AssessmentMetadata';
import AssessmentSubmission from './AssessmentSubmission';
import { STYLES } from '@bit/sidney2hats.2hats.global.common-constants';
import StatusMsg from './StatusMsg';

import * as ROUTES from '../../constants/routes';

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 2,
  },
  backButton: {
    display: 'flex',
    marginBottom: theme.spacing.unit,
  },
  content: {
    maxWidth: 640,
    margin: '0 auto',
  },

  title: {
    fontWeight: 400,
    textAlign: 'center',
  },

  coverImage: {
    borderRadius: theme.shape.borderRadius * 0.75,
    width: '100%',
    height: '100%',

    maxWidth: 480,
    minHeight: 160,

    margin: '0 auto',
    marginBottom: theme.spacing.unit * 3,

    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundImage: `linear-gradient(-15deg, #fa0, ${
      theme.palette.primary.main
    })`,
  },

  section: {
    marginTop: theme.spacing.unit * 3,
  },

  subtitle: { fontWeight: 700 },

  description: { whiteSpace: 'pre-line' },

  ...STYLES.RENDERED_HTML(theme),

  meta: {
    marginTop: theme.spacing.unit * 3,
  },

  getStarted: {
    fontSize: theme.spacing.unit * 2,
    borderRadius: 200,
    transition: theme.transitions.create(['transform', 'box-shadow']),
    margin: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 6}px`,
  },
  getStartedSection: {
    transition: theme.transitions.create(['transform', 'margin-top']),
    transformOrigin: '0 100%',
  },
  gotStarted: {
    transform: 'scale(0)',
    marginTop: -104,
  },

  resubmitted: {
    marginTop: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
  },
  resubmittedLink: { verticalAlign: 'baseline' },
});

const Assessment = props => {
  const { classes, theme, data, history } = props;

  const gotStartedCondition =
    data && data.assessmentId && data.outcome !== 'fail';
  const [gotStarted, setGotStarted] = useState(gotStartedCondition);

  const isXs = useMediaQuery(theme.breakpoints.down('xs'));

  useEffect(
    () => {
      if (gotStartedCondition) setGotStarted(true);
      else setGotStarted(false);
    },
    [data]
  );

  return (
    <div className={classes.root}>
      <BackButton className={classes.backButton} />

      <main className={classes.content}>
        <div
          style={
            data.image && data.image.url
              ? { backgroundImage: `url(${data.image.url})` }
              : {}
          }
          className={classes.coverImage}
        />

        <Typography variant={isXs ? 'h5' : 'h4'} className={classes.title}>
          {data.title}
        </Typography>

        <AssessmentMetadata data={data} className={classes.meta} />

        <StatusMsg data={data} isXs={isXs} />

        <div className={classes.section}>
          <Typography
            variant="subtitle1"
            gutterBottom
            className={classes.subtitle}
          >
            The company
          </Typography>
          <div
            className={classes.renderedHtml}
            dangerouslySetInnerHTML={{ __html: data.companyDescription }}
          />
        </div>

        <div className={classes.section}>
          <Typography
            variant="subtitle1"
            gutterBottom
            className={classes.subtitle}
          >
            Your job
          </Typography>
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
            disabled={!!data.resubmitted}
          >
            {data.outcome === 'fail' ? 'Resubmit' : 'Get started'}
            <ArrowForwardIcon />
          </Button>
          {!!data.resubmitted && (
            <Typography variant="body2" className={classes.resubmitted}>
              You have already created a{' '}
              <Link
                component="button"
                variant="body2"
                className={classes.resubmittedLink}
                onClick={() => {
                  history.push(
                    `${ROUTES.ASSESSMENTS}?id=${data.resubmitted}&yours=true`
                  );
                }}
              >
                new submission
              </Link>
              .
            </Typography>
          )}
        </div>

        {gotStarted && <AssessmentSubmission data={data} />}
      </main>
    </div>
  );
};

Assessment.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles, { withTheme: true })(Assessment));
