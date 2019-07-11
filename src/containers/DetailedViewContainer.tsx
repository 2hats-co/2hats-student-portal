import React, { useEffect, useContext } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import queryString from 'query-string';

import LoadingScreen from '../components/LoadingScreen';
import Job from '../components/Job';
import Assessment from '../components/Assessment';
import FourOhFour from '../components/routing/FourOhFour';

import useDocumentFromUrl from '../hooks/useDocumentFromUrl';
import { capitalise } from '../utilities';
import UserContext from 'contexts/UserContext';

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

  useEffect(() => {
    document.title = `2hats – ${capitalise(docType)}s`;

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

  // Scroll to top and change window title on load
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    if (docState.doc)
      document.title = `${docState.doc.title} – ${capitalise(
        docType
      )}s – 2hats`;
  }, [docState.doc]);

  // Render the corresponding components
  if (docState.doc) {
    switch (docType) {
      case 'job':
        return <Job data={docState.doc} user={user} />;
      case 'assessment':
        return <Assessment data={docState.doc} />;
      default:
        return <FourOhFour />;
    }
  }

  if (docState.loading)
    return <LoadingScreen contained message={`Loading ${docType}…`} />;

  return <FourOhFour />;
};

export default DetailedViewContainer;
