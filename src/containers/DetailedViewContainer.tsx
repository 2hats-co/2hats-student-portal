import React, { lazy, Suspense, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import queryString from 'query-string';

import LoadingScreen from 'components/LoadingScreen';
import FourOhFour from 'components/routing/FourOhFour';

import useDocument from 'hooks/useDocument';
import { COLLECTIONS } from '@bit/twohats.common.constants';
import { capitalise } from 'utilities';
import { useUser } from 'contexts/UserContext';
import { getFirstIdOfQuery } from 'utilities/firestore';
import { DocWithId, JobsDoc, UsersJobsDoc } from '@bit/twohats.common.db-types';

const Assessment = lazy(() =>
  import('components/Assessment' /* webpackChunkName: "Assessment" */)
);
const Job = lazy(() => import('components/Job' /* webpackChunkName: "Job" */));

export interface JobComponentProps {
  jobData: DocWithId<JobsDoc> | DocWithId<UsersJobsDoc>;
}

export interface DetailedViewContainerProps
  extends RouteComponentProps<{ id: string }> {}

const DetailedViewContainer: React.FC<DetailedViewContainerProps> = ({
  match,
  location,
  history,
}) => {
  const { UID } = useUser();
  const docType = location.pathname.split('/')[1];

  const [docState, docDispatch] = useDocument();
  const [loading, setLoading] = useState(false);

  // Find out if this is a submission document from location.search
  const parsedQuery = queryString.parse(location.search);
  const isYours = parsedQuery.yours && parsedQuery.yours === 'true';
  // Get corresponding docPath from URL
  const docPath = isYours
    ? `${COLLECTIONS.users}/${UID!}/${docType}s/${match.params.id}`
    : `${docType}s/${match.params.id}`;

  // Show generic title on location change, before document loads
  useEffect(() => {
    document.title = `2hats – ${capitalise(docType)}s`;
  }, [location.pathname]);

  // Handle redirects to the correct routes
  useEffect(() => {
    // If not in the /type/:id format, check if it's
    // in the old /type?id=<id> format first
    if (!match.params || !match.params.id) {
      // Redirect to new URL format
      if (parsedQuery.id) {
        const newParsedQuery = { ...parsedQuery };
        const docId = parsedQuery.id;
        delete newParsedQuery.id;
        history.replace(
          `${location.pathname}/${docId}?${queryString.stringify(
            newParsedQuery
          )}`
        );
      } // Otherwise, go to the base cards route
      else history.replace(`/${docType}s${location.search}`);
    }
  }, [location, match]);

  // Check if the user has a submission open so they don't make multiple
  // submissions (ugh)
  // The most common use case of this is when the user opens an email with a
  // smartlink to a particular job/assessment **multiple times** (ugh)
  // and they'll always see the original and not their submission
  useEffect(() => {
    // But only if in the new URL format
    if (!match.params || !match.params.id) return;
    // And only if we're not in a user submission document
    if (isYours) return;
    // And as long as we haven't set the flag in location.state to prevent this
    if (location.state && location.state.preventDoubleSubmissionCheck) return;

    setLoading(true);

    // Get first ID of matching submissions from user subcollections
    getFirstIdOfQuery(
      `users/${UID!}/${docType.toLowerCase()}s`,
      [
        {
          field: `${docType.toLowerCase()}Id`,
          operator: '==',
          value: match.params.id,
        },
      ],
      [{ field: 'updatedAt', direction: 'desc' }]
    )
      .then(lastSubmission => {
        // If there is a submission, redirect to that
        if (lastSubmission !== false) {
          const parsedQuery = { ...queryString.parse(location.search) };
          parsedQuery.yours = 'true';
          const newQuery = queryString.stringify({
            yours: 'true',
            ...parsedQuery,
          });

          history.replace(
            `/${docType}/${lastSubmission}?${newQuery}`,
            location.state
          );
        }
        setLoading(false);
      })
      .catch(error =>
        console.error(
          'Could not get last submission for this assessment/job',
          error
        )
      );
  }, [match]);

  // Get the document
  useEffect(() => {
    if (!match.params || !match.params.id) return;

    if (docState.path !== docPath)
      docDispatch({ path: docPath, loading: true });
  }, [match.params]);

  // Scroll to top and change window title on load
  // of new assessment/submission/document
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [docState.path]);

  // Update window title when document loads
  useEffect(() => {
    if (docState.doc)
      document.title = `${docState.doc.title} – ${capitalise(
        docType
      )}s – 2hats`;
  }, [docState.doc]);

  // Render a loading state
  if (
    docState.loading ||
    loading ||
    (docState.path && !docState.path.includes(match.params.id))
  )
    return <LoadingScreen contained message={`Loading ${docType}…`} />;

  // Render the corresponding components
  if (docState.doc !== null) {
    switch (docType) {
      case 'job':
        return (
          <Suspense
            fallback={
              <LoadingScreen message="Reticulating splines…" contained />
            }
          >
            <Job jobData={docState.doc} />
          </Suspense>
        );
      case 'assessment':
        return (
          <Suspense
            fallback={
              <LoadingScreen message="Reticulating splines…" contained />
            }
          >
            <Assessment assessmentData={docState.doc} />
          </Suspense>
        );
      default:
        return <FourOhFour />;
    }
  }

  // Render 404
  return <FourOhFour />;
};

export default DetailedViewContainer;
