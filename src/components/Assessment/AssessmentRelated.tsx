import React, { useContext } from 'react';

import { makeStyles, createStyles } from '@material-ui/core';

import CardGrid from 'components/CardGrid';
import CardGridHeader from 'components/CardGrid/CardGridHeader';
import SuggestedCourseDialog from './SuggestedCourseDialog';

import UserContext from 'contexts/UserContext';
import {
  DocWithId,
  AssessmentsDoc,
  UsersAssessmentsDoc,
  JobsDoc,
  CoursesDoc,
} from '@bit/twohats.common.db-types';
import useCollection from 'hooks/useCollection';
import { generateJobCard, generateAssessmentCard } from 'utilities/cards';
import { COLLECTIONS } from '@bit/twohats.common.constants';
import { CARD_COLS_WIDTHS, CARD_COLS_MEDIA_QUERIES } from 'constants/cards';
import * as ROUTES from 'constants/routes';

const useStyles = makeStyles(theme =>
  createStyles({
    relatedCards: {
      // Fix width to width of card columns
      maxWidth: 'none',
      [CARD_COLS_MEDIA_QUERIES[1]]: { maxWidth: CARD_COLS_WIDTHS[1] },
      [CARD_COLS_MEDIA_QUERIES[2]]: { maxWidth: CARD_COLS_WIDTHS[2] },
      [CARD_COLS_MEDIA_QUERIES[3]]: { maxWidth: CARD_COLS_WIDTHS[3] },
      [CARD_COLS_MEDIA_QUERIES[4]]: { maxWidth: CARD_COLS_WIDTHS[4] },
      [CARD_COLS_MEDIA_QUERIES[5]]: { maxWidth: CARD_COLS_WIDTHS[5] },

      margin: '0 auto',
      marginTop: theme.spacing(7),
    },
    relatedCourseWrapper: { marginBottom: theme.spacing(4) },
  })
);

interface IAssessmentRelatedProps {
  assessmentData: DocWithId<AssessmentsDoc> | DocWithId<UsersAssessmentsDoc>;
  showDelight: boolean;
}

/**
 * Displays the related course, jobs, and assessments via useCollection +
 * CardGrid components.
 *
 * Also renders the SuggestedCourseDialog when the user backs out of their
 * submission and a course is available for them. This is here because the
 * relevant useCollection call is in this component.
 */
const AssessmentRelated: React.FunctionComponent<IAssessmentRelatedProps> = ({
  assessmentData,
  showDelight = false,
}) => {
  const classes = useStyles();
  const { user } = useContext(UserContext);

  // Get real assessment ID
  let assessmentId = assessmentData.id;
  if ('assessmentId' in assessmentData)
    assessmentId = assessmentData.assessmentId;

  // Get the first related course (usually there is only one)
  const [relatedCourseState] = useCollection({
    path: COLLECTIONS.courses,
    filters: [
      { field: 'published', operator: '==', value: true },
      {
        field: 'skillsAssociated',
        operator: 'array-contains',
        value: { id: assessmentId, title: assessmentData.title },
      },
    ],
  });
  const relatedCourse: DocWithId<CoursesDoc> = relatedCourseState.documents[0];

  // Get related open jobs, in ascending order of closingDate
  const [relatedJobsState] = useCollection({
    path: COLLECTIONS.jobs,
    filters: [
      { field: 'published', operator: '==', value: true },
      {
        field: 'skillsRequired',
        operator: 'array-contains',
        value: { id: assessmentId, title: assessmentData.title },
      },
      { field: 'closingDate', operator: '>=', value: new Date() },
    ],
    sort: { field: 'closingDate', direction: 'asc' },
    limit: 10,
  });

  // Get related assessments from the same industry
  const [relatedAssessmentsState] = useCollection({
    path: COLLECTIONS.assessments,
    filters: [
      { field: 'published', operator: '==', value: true },
      { field: 'category', operator: '==', value: assessmentData.category },
    ],
    sort: { field: 'updatedAt', direction: 'desc' },
    limit: 5,
  });

  return (
    <section className={classes.relatedCards}>
      {/* Related courses — but don't show if passed or user just completed */}
      {relatedCourse &&
        (!showDelight ||
          ('outcome' in assessmentData &&
            assessmentData.outcome === 'pass')) && (
          <div className={classes.relatedCourseWrapper}>
            <CardGridHeader
              header="Prepare with a quick 2hats course for this assessment."
              route={`${ROUTES.COURSE_REDIRECT}?id=${relatedCourse.id}`}
              routeLabel={`Course: ${relatedCourse.title}`}
              // Needed to appease the TypeScript gods and actually show the link
              showPreviewOnly
              length={1}
              hideCount
            />
          </div>
        )}

      {/* Related jobs, if available */}
      <CardGrid
        header="Jobs for this skill"
        route={ROUTES.JOBS}
        routeLabel="All Jobs"
        cardProps={relatedJobsState.documents}
        cardGenerator={(x: DocWithId<JobsDoc>) => generateJobCard(x, { user })}
        loading={relatedJobsState.loading}
        animationOffset={0}
        LoadingCardProps={{ maxSkills: 0 }}
        hideIfEmpty
      />

      {/* Related assessments from the same industry */}
      <CardGrid
        header="Related assessments"
        route={ROUTES.ASSESSMENTS}
        routeLabel="All Assessments"
        cardProps={relatedAssessmentsState.documents}
        cardGenerator={(
          x: DocWithId<UsersAssessmentsDoc> | DocWithId<AssessmentsDoc>
        ) => generateAssessmentCard(x, { user })}
        loading={relatedJobsState.loading}
        animationOffset={0}
        hideIfEmpty
        // Filter out same submission or assessmentId
        filterIds={
          'assessmentId' in assessmentData
            ? [assessmentData.assessmentId]
            : undefined
        }
      />

      {/* Suggest a course when the user tries to exit, if submission */}
      {'submitted' in assessmentData &&
        !assessmentData.submitted &&
        relatedCourse && (
          <SuggestedCourseDialog relatedCourse={relatedCourse} />
        )}
    </section>
  );
};

export default AssessmentRelated;
