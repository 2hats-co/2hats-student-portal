import React, { useContext, useReducer, useEffect, Reducer } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import {
  makeStyles,
  createStyles,
  Paper,
  Typography,
  Slider,
  Grid,
} from '@material-ui/core';

import SkillChip from '@bit/twohats.common.components.skill-chip';
import UserContext from 'contexts/UserContext';
import {
  DocWithId,
  JobsDoc,
  AssessmentsDoc,
} from '@bit/twohats.common.db-types';
import { ASSESSMENT } from 'constants/routes';
import { getDoc } from 'utilities/firestore';
import { COLLECTIONS } from '@bit/twohats.common.constants';

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
    skillsSection: { marginBottom: theme.spacing(4) },
    skillsHeader: { marginBottom: theme.spacing(1) },

    disabledText: { color: theme.palette.text.disabled },
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

type RelatdAssessmentDataState = { [id: string]: AssessmentsDoc };
type RelatedAssessmentDataAction = {
  type: 'UPDATE';
  id: string;
  data: DocWithId<AssessmentsDoc>;
};

const relatedAsseessmentDataReducer = (
  state: RelatdAssessmentDataState,
  action: RelatedAssessmentDataAction
): RelatdAssessmentDataState => {
  if (action.type === 'UPDATE' && !!action.id)
    return { ...state, [action.id]: action.data };

  return state;
};

interface IJobProgressProps extends RouteComponentProps {}

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

  const { user } = useContext(UserContext);
  // Store the data for each asseessment document here, to get the approx time
  const [relatedAssessmentData, relatedAssessmentDataDispatch] = useReducer(
    relatedAsseessmentDataReducer,
    {}
  );

  // Get assessment document data
  useEffect(() => {
    if (invalidData) return;

    sortedSkills.forEach(x => {
      if (
        !relatedAssessmentData[x.id] &&
        user.skills &&
        !user.skills.includes(x.id)
      )
        getDoc(COLLECTIONS.assessments, x.id).then(docData =>
          relatedAssessmentDataDispatch({
            type: 'UPDATE',
            id: x.id,
            data: docData,
          })
        );
    });
  }, [location.state]);

  // Don't render if location.state is missing some stuff
  if (invalidData) return null;

  // Get data from location state
  const { skillsRequired, title: jobTitle, companyName } = location.state;
  // Calculate no. unattained skills
  const numUnattainedSkills = skillsRequired.filter(
    (x: any) => !user.skills || !user.skills.includes(x.id)
  ).length;
  // Sort skills to show unattained assessments first
  const sortedSkills: JobsDoc['skillsRequired'] = [...skillsRequired];
  sortedSkills.sort((a, b) =>
    !user.skills || !user.skills.includes(b.id) ? 1 : -1
  );

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

      <section className={classes.skillsSection}>
        <Grid container className={classes.skillsHeader}>
          <Grid item xs={9}>
            <Typography variant="overline" component="p" color="textSecondary">
              Required&nbsp;Skills: {numUnattainedSkills}&nbsp;/&nbsp;
              {skillsRequired.length}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography
              variant="overline"
              component="p"
              color="textSecondary"
              align="right"
            >
              Approx. time
            </Typography>
          </Grid>
        </Grid>

        {sortedSkills.map(x => (
          <Grid key={x.id} container alignItems="baseline">
            <Grid item xs={9}>
              <SkillChip
                id={x.id}
                title={x.title}
                user={user}
                clickable
                route={`${ASSESSMENT}/${x.id}`}
              />
            </Grid>
            <Grid item xs={3}>
              <Typography
                variant="body2"
                component="p"
                color="textSecondary"
                align="right"
                className={
                  user.skills.includes(x.id) ? classes.disabledText : ''
                }
              >
                {user.skills.includes(x.id)
                  ? 'Done'
                  : relatedAssessmentData[x.id]
                  ? relatedAssessmentData[x.id].duration
                  : 'Loading…'}
              </Typography>
            </Grid>
          </Grid>
        ))}
      </section>

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
