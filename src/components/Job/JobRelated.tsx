import React, { useReducer, useEffect } from 'react';

import { makeStyles, createStyles } from '@material-ui/core';
import CardGrid from 'components/CardGrid';

import * as ROUTES from 'constants/routes';
import { useUser } from 'contexts/UserContext';
import {
  DocWithId,
  JobsDoc,
  UsersJobsDoc,
  AssessmentsDoc,
} from '@bit/twohats.common.db-types';
import { generateAssessmentCard, generateJobCard } from 'utilities/cards';
import { CARD_COLS_WIDTHS, CARD_COLS_MEDIA_QUERIES } from 'constants/cards';

import { COLLECTIONS } from '@bit/twohats.common.constants';
import useDocumentsOnce from 'hooks/useDocumentsOnce';
import useCollection from 'hooks/useCollection';

const useStyles = makeStyles(theme =>
  createStyles({
    root: ({ numCards }: { numCards: number }) => ({
      // Fix width to width of card columns
      maxWidth: 'none',
      [CARD_COLS_MEDIA_QUERIES[1]]: { maxWidth: CARD_COLS_WIDTHS[1] },
      [CARD_COLS_MEDIA_QUERIES[2]]: { maxWidth: CARD_COLS_WIDTHS[2] },
      // Don't show empty space for extra cards if they're not needed
      // Set the minimum size to 2 card widths though
      [CARD_COLS_MEDIA_QUERIES[3]]:
        numCards >= 3 ? { maxWidth: CARD_COLS_WIDTHS[3] } : undefined,
      [CARD_COLS_MEDIA_QUERIES[4]]:
        numCards >= 4 ? { maxWidth: CARD_COLS_WIDTHS[4] } : undefined,
      [CARD_COLS_MEDIA_QUERIES[5]]:
        numCards >= 5 ? { maxWidth: CARD_COLS_WIDTHS[5] } : undefined,

      margin: '0 auto',
      marginTop: theme.spacing(7),
    }),
  })
);

interface IJobRelatedProps {
  jobData: DocWithId<JobsDoc> | DocWithId<UsersJobsDoc>;
}

/**
 * Shows cards for the related (required) assessments
 * and similar jobs (same industry),
 * given a job document.
 */
const JobRelated: React.FunctionComponent<IJobRelatedProps> = ({ jobData }) => {
  const classes = useStyles({ numCards: jobData.skillsRequired.length });
  const { user } = useUser();

  // Get related open jobs, in ascending order of closingDate
  const [relatedJobsState] = useCollection({
    path: COLLECTIONS.jobs,
    filters: [
      { field: 'published', operator: '==', value: true },
      { field: 'industry', operator: '==', value: jobData.industry },
      { field: 'closingDate', operator: '>=', value: new Date() },
    ],
    sort: { field: 'closingDate', direction: 'asc' },
    limit: 6,
  });

  const [relatedAssessmentData, relatedAssessmentsLoading] = useDocumentsOnce<
    DocWithId<AssessmentsDoc>
  >(COLLECTIONS.assessments, jobData.skillsRequired.map(x => x.id));

  return (
    <div className={classes.root}>
      <CardGrid
        header="Related Assessments"
        route={ROUTES.ASSESSMENTS}
        routeLabel="All Assessments"
        cardProps={Object.values(relatedAssessmentData)}
        cardGenerator={(x: DocWithId<AssessmentsDoc>) =>
          generateAssessmentCard(x, {
            user,
            routeState: {
              title: jobData.title,
              companyName: jobData.companyName,
              skillsRequired: jobData.skillsRequired,
            },
          })
        }
        loading={relatedAssessmentsLoading}
      />
      <CardGrid
        header="Similar Jobs"
        route={ROUTES.JOBS_NEW}
        routeLabel="All Jobs"
        cardProps={relatedJobsState.documents}
        cardGenerator={(x: DocWithId<JobsDoc>) => generateJobCard(x, { user })}
        loading={relatedJobsState.loading}
        hideIfEmpty
        filterIds={[jobData.id]}
        maxCount={6}
      />
    </div>
  );
};

export default JobRelated;
