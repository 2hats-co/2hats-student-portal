import React, { useEffect, useState, useContext } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import queryString from 'query-string';

import LoadingScreen from 'components/LoadingScreen';
import Job from 'components/Job';
import Assessment from 'components/Assessment';
import FourOhFour from 'components/routing/FourOhFour';

import useDocumentFromUrl from 'hooks/useDocumentFromUrl';
import { capitalise } from 'utilities';
import UserContext from 'contexts/UserContext';
import { getFirstIdOfQuery } from 'utilities/firestore';

export interface DetailedViewContainerProps
  extends RouteComponentProps<{ id: string }> {}

const DetailedViewContainer: React.FC<DetailedViewContainerProps> = ({
  match,
  location,
  history,
}) => {
  const { user } = useContext(UserContext);
  const docType = location.pathname.split('/')[1];

  const [docState] = useDocumentFromUrl(location, match, `${docType}s`);

  // Show generic title on location change, before document loads
  useEffect(() => {
    document.title = `2hats – ${capitalise(docType)}s`;
  }, [location.pathname]);

  // Handle redirects to the correct routes
  useEffect(() => {
    // If not in the /type/:id format, check if it's
    // in the old /type?id=<id> format first
    if (!match.params || !match.params.id) {
      const parsedQuery = queryString.parse(location.search);
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
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // But only if in the new URL format
    if (!match.params || !match.params.id) return;
    // And only if we're not in a user submission document
    const parsedQuery = queryString.parse(location.search);
    if (parsedQuery.yours) return;

    setLoading(true);

    // Get first ID of matching submissions from user subcollections
    getFirstIdOfQuery(
      `users/${user.id}/${docType.toLowerCase()}s`,
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

          history.replace(`/${docType}/${lastSubmission}?${newQuery}`);
        }
        setLoading(false);
      })
      .catch(error =>
        console.error(
          'Could not get last submission for this assessment/job',
          error
        )
      );
  }, [match, location]);

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
  if (docState.loading || loading)
    return <LoadingScreen contained message={`Loading ${docType}…`} />;

  // Render the corresponding components
  if (docState.doc) {
    switch (docType) {
      case 'job':
        return <Job data={docState.doc} user={user} />;
      case 'assessment':
        return <Assessment assessmentData={docState.doc} />;
      default:
        return <FourOhFour />;
    }
  }

  // Render 404
  return <FourOhFour />;
};

export default DetailedViewContainer;
