import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {
  makeStyles,
  createStyles,
  LinearProgress,
  Grid,
} from '@material-ui/core';
import RightButtonLayout from './RightButtonLayout';
import TextWithGraphic from '@bit/twohats.common.components.text-with-graphic';
import ChipList from './ChipList';

import LightbulbBrain from 'assets/images/graphics/LightbulbBrain.svg';

import * as ROUTES from 'constants/routes';
import { useUser } from 'contexts/UserContext';
import { INDUSTRIES, COLLECTIONS } from '@bit/twohats.common.constants';
import useCollection from 'hooks/useCollection';
import { getDocsFromQuery } from 'utilities/firestore';
import {
  DocWithId,
  AssessmentsDoc,
  UsersAssessmentsDoc,
} from '@bit/twohats.common.db-types';
import { getIndustryDisplayName } from 'utilities/cards';

const useStyles = makeStyles(theme =>
  createStyles({
    root: { marginBottom: theme.spacing(1) },
  })
);

/**
 * A standalone component that displays a list of SkillChips
 * using [`ChipList`](#chiplist).
 *
 * ### Queries
 *
 * - users/assessments subcollection to get achieved skills (listener)
 * - assessments collection for each industry present in the user’s skills
 *     e.g. if the user has a skill in marketing and tech, it will query
 *          twice, filtering by each industry
 */
const ProfileAssessments: React.FunctionComponent = () => {
  const classes = useStyles();
  const { user } = useUser();

  const noSkills =
    !user.skills || !Array.isArray(user.skills) || user.skills.length === 0;

  // useCollection call for user’s skills
  const [skillsState] = useCollection(
    noSkills
      ? {}
      : {
          path: `${COLLECTIONS.users}/${user.id}/${COLLECTIONS.assessments}`,
          filters: [
            { field: 'submitted', operator: '==', value: true },
            { field: 'screened', operator: '==', value: true },
            { field: 'outcome', operator: '==', value: 'pass' },
          ],
        }
  );
  // Need to set `id` to original AssessmentsDoc ID since this is what
  // `ChipList` uses to filter out completed assessments
  const skills: DocWithId<UsersAssessmentsDoc>[] = skillsState.documents.map(
    (doc: DocWithId<UsersAssessmentsDoc>) => ({ ...doc, id: doc.assessmentId })
  );
  // Get a non-repeating Set of the industries in which the user has skills
  const industries = new Set<INDUSTRIES>(skills.map(x => x.category));

  // Store a list of all assessments for each industry in this object
  // `null` value means it’s still loading
  const [otherAssessments, setOtherAssessments] = useState<{
    [industry: string]: DocWithId<AssessmentsDoc>[] | null;
  }>({});

  // Query the assessments collection, for each industry present in the user’s
  // skills — note the query is a one-off and is **not a listener**
  useEffect(() => {
    if (skills.length === 0) return;

    industries.forEach(industry => {
      if (industry in otherAssessments) return;
      // Set current industry to `null` for now to say it’s loading
      setOtherAssessments(prev => ({ ...prev, [industry]: null }));
      // Query, then store in `otherAssessments` state
      getDocsFromQuery(COLLECTIONS.assessments, [
        { field: 'category', operator: '==', value: industry },
        { field: 'published', operator: '==', value: true },
      ]).then((assessments: DocWithId<AssessmentsDoc>[]) => {
        setOtherAssessments(prev => ({ ...prev, [industry]: assessments }));
      });
    });
  }, [skills]);

  // Display empty state
  if (noSkills)
    return (
      <section className={classes.root}>
        <RightButtonLayout
          title={`My Skills ${
            Array.isArray(user.skills) && user.skills.length > 0
              ? `(${user.skills.length})`
              : ''
          }`}
          buttonLabel="Assessments"
          ButtonProps={{ component: Link, to: ROUTES.ASSESSMENTS }}
        />
        <TextWithGraphic
          graphic={LightbulbBrain}
          graphicWidth={100}
          message="Show off your super skills by completing assessments and shine like an enabled Apply button."
        />
      </section>
    );

  // Assume still loading
  let contents: React.ReactNode = <LinearProgress />;

  // Otherwise, display `ChipList`s
  if (!noSkills) {
    const cardLists: React.ReactNodeArray = [];

    industries.forEach(industry =>
      cardLists.push(
        <Grid item xs={12} sm={6} key={industry}>
          <ChipList
            title={getIndustryDisplayName(industry)}
            achieved={skills.filter(skill => skill.category === industry)}
            allDocs={otherAssessments[industry]}
            routeFormatter={(id: string) => `${ROUTES.ASSESSMENT}/${id}`}
          />
        </Grid>
      )
    );

    contents = (
      <Grid container alignItems="flex-start" spacing={3}>
        {cardLists}
      </Grid>
    );
  }

  return (
    <section className={classes.root}>
      <RightButtonLayout
        title={`My Skills ${
          Array.isArray(user.skills) && user.skills.length > 0
            ? `(${user.skills.length})`
            : ''
        }`}
        buttonLabel="Assessments"
        ButtonProps={{ component: Link, to: ROUTES.ASSESSMENTS }}
        description="Show off your super skills by completing assessments and shine like an enabled Apply button."
      />
      {contents}
    </section>
  );
};

export default ProfileAssessments;
