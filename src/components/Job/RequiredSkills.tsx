import React, { useContext, useReducer, useEffect } from 'react';

import { makeStyles, createStyles, Grid, Typography } from '@material-ui/core';

import SkillChip from '@bit/twohats.common.components.skill-chip';

import UserContext from 'contexts/UserContext';
import { ASSESSMENT } from 'constants/routes';
import {
  DocWithId,
  JobsDoc,
  AssessmentsDoc,
} from '@bit/twohats.common.db-types';
import { COLLECTIONS } from '@bit/twohats.common.constants';
import { getDoc } from 'utilities/firestore';

const useStyles = makeStyles(theme =>
  createStyles({
    root: { marginBottom: theme.spacing(4) },
    skillsHeader: { marginBottom: theme.spacing(1) },

    skillChipWrapper: { marginLeft: theme.spacing(-0.375) },

    disabledText: { color: theme.palette.text.disabled },
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

interface IRequiredSkillsProps {
  /** A list of the skills required, from the JobsDoc */
  skillsRequired: JobsDoc['skillsRequired'];
  /** State to pass to the assessment page when the user clicks on a chip */
  routeState?: { [key: string]: any };
}

/**
 * Displays a list of required skills for the job, which skills the user has
 * achieved, and the duration of each assessment (which is a one-time get call
 * to Firestore)
 */
const RequiredSkills: React.FunctionComponent<IRequiredSkillsProps> = ({
  skillsRequired = [],
  routeState,
}) => {
  const classes = useStyles();
  const { user } = useContext(UserContext);

  // Store the data for each asseessment document here, to get the approx time
  const [relatedAssessmentData, relatedAssessmentDataDispatch] = useReducer(
    relatedAsseessmentDataReducer,
    {}
  );

  // Calculate no. unattained skills
  const numUnattainedSkills = skillsRequired.filter(
    (x: any) => !user.skills || !user.skills.includes(x.id)
  ).length;

  // Sort skills to show unattained assessments first
  const sortedSkills: JobsDoc['skillsRequired'] = [...skillsRequired];
  sortedSkills.sort((a, b) =>
    !user.skills || !user.skills.includes(b.id) ? 1 : -1
  );

  // Get assessment document data
  useEffect(() => {
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
  }, [skillsRequired]);

  return (
    <section className={classes.root}>
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
              route={{ pathname: `${ASSESSMENT}/${x.id}`, state: routeState }}
            />
          </Grid>
          <Grid item xs={3}>
            <Typography
              variant="body2"
              component="p"
              color="textSecondary"
              align="right"
              className={user.skills.includes(x.id) ? classes.disabledText : ''}
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
  );
};

export default RequiredSkills;
