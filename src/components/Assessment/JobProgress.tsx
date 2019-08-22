import React, { useReducer, useEffect, Reducer } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import {
  makeStyles,
  createStyles,
  Paper,
  Typography,
  Slider,
} from '@material-ui/core';

import RequiredSkills from 'components/Job/RequiredSkills';

import { useUser } from 'contexts/UserContext';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      marginBottom: theme.spacing(4),
      padding: theme.spacing(4, 6),

      /** Make it wider than the rest of content when the browser size permits */
      '@media (min-width: 680px)': { margin: theme.spacing(0, -6, 4) },
      [theme.breakpoints.down('xs')]: { padding: theme.spacing(2.5, 3) },
    },

    slider: {
      width: 190,
      margin: `${theme.spacing(2)}px auto`,
      display: 'block',
    },
  })
);

const useSliderStyles = makeStyles(theme =>
  createStyles({
    root: { height: 4 },
    rail: { height: 4 },
    track: {
      height: 4,
      backgroundColor: theme.palette.primary.main,
    },
    mark: {
      width: 12,
      height: 12,
      marginTop: -4,
      marginLeft: -6,
      borderRadius: '50%',
    },
    markActive: { backgroundColor: theme.palette.primary[200] },
    thumb: { display: 'none' },
  })
);

interface IJobProgressProps extends RouteComponentProps {}

/**
 * Displays a card at the top of the assessments page to display the user’s
 * progress towards becoming allowed to apply for a job.
 *
 * Only triggered if there are `skillsRequired` in `location.state`, which is
 * from the job page (or other instances of
 * [`RequiredSkills`](#required-skills), usually)
 */
const JobProgress: React.FunctionComponent<IJobProgressProps> = ({
  location,
}) => {
  const classes = useStyles();
  const sliderClasses = useSliderStyles();

  const invalidData =
    !location.state ||
    !location.state.skillsRequired ||
    location.state.skillsRequired.length === 0 ||
    !location.state.title ||
    !location.state.companyName;

  const { user } = useUser();

  // Don't render if location.state is missing some stuff
  if (invalidData) return null;

  // Get data from location state
  const { skillsRequired, title: jobTitle, companyName } = location.state;
  // Calculate no. unattained skills
  const numUnattainedSkills = skillsRequired.filter(
    (x: any) => !user.skills || !user.skills.includes(x.id)
  ).length;

  // Don't show if the user has all the skills
  if (numUnattainedSkills === 0) return null;

  return (
    <Paper className={classes.root} elevation={3}>
      <Typography variant="overline" component="h1" color="textSecondary">
        My Progress: {jobTitle} ({companyName})
      </Typography>

      <Slider
        value={skillsRequired.length - numUnattainedSkills}
        step={1}
        min={0}
        max={skillsRequired.length}
        marks
        aria-label="Assessment progress"
        aria-valuetext={`${skillsRequired.length - numUnattainedSkills} of ${
          skillsRequired.length
        } assessments completed`}
        disabled
        classes={sliderClasses}
        className={classes.slider}
      />

      <RequiredSkills
        skillsRequired={skillsRequired}
        routeState={{ title: jobTitle, companyName, skillsRequired }}
      />

      <Typography
        variant="h6"
        component="p"
        color="primary"
        align="center"
        gutterBottom
      >
        You need {numUnattainedSkills} more skill
        {numUnattainedSkills !== 1 && 's'} to apply to {jobTitle} ({companyName}
        ).
      </Typography>

      <Typography variant="h6" component="p" color="primary" align="center">
        This is a great time to complete this assessment!
      </Typography>
    </Paper>
  );
};

export default withRouter(JobProgress);
