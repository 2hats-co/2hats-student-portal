import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles, createStyles, Button } from '@material-ui/core';
import HeadingCaps from '@bit/twohats.common.components.heading-caps';
import TextWithGraphic from '@bit/twohats.common.components.text-with-graphic';
import MissingDetailsForm from './MissingDetailsForm';
import LoadingScreen from 'components/LoadingScreen';

import SkillsPlantGraphic from 'assets/images/graphics/SkillsPlant.svg';
import GoIcon from '@bit/twohats.common.icons.go';

import { DASHBOARD } from 'constants/routes';
import { useUser } from 'contexts/UserContext';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      '& section': { marginBottom: theme.spacing(4) },
    },

    loadingScreenWrapper: { marginBottom: theme.spacing(8) },

    buttonWrapper: {
      textAlign: 'center',
      'section&': { marginBottom: theme.spacing(7) },
    },
  })
);

/**
 * Component that displays when the user has completed an assessment, but has
 * not received feedback for it yet.
 */
const CompletionDelight: React.FunctionComponent = () => {
  const classes = useStyles();
  const { profile } = useUser();

  if (!profile)
    return (
      <section className={classes.loadingScreenWrapper}>
        <LoadingScreen message="Getting your data…" contained />
      </section>
    );

  return (
    <div className={classes.root}>
      <section>
        <HeadingCaps>You’re going places!</HeadingCaps>
        <TextWithGraphic
          graphic={SkillsPlantGraphic}
          graphicWidth={109}
          graphicHeight={120}
          message={
            <>
              We knew it. This was a piece of cake for you!
              <br />
              <br />
              Now is the time to take a little break and relax. It generally
              takes us around 2 weeks to assess your task and provide you with
              insightful feedback.
              <br />
              <br />
              Have we mentioned, doing multiple tasks in your field increases
              your chances of scoring an interview?
            </>
          }
        />
      </section>

      <section>
        <MissingDetailsForm />
      </section>

      <section className={classes.buttonWrapper}>
        <Button
          color="primary"
          variant="contained"
          size="large"
          component={Link}
          to={DASHBOARD}
          endIcon={<GoIcon />}
        >
          Go to Dashboard
        </Button>
      </section>
    </div>
  );
};

export default CompletionDelight;
