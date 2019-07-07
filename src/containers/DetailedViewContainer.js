import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import withNavigation from '../components/withNavigation';
import LoadingScreen from '../components/LoadingScreen';
import Job from '../components/Job';
import Assessment from '../components/Assessment';
import FourOhFour from '../components/FourOhFour';

// import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';
import useDocumentFromUrl from '../hooks/useDocumentFromUrl';
import { capitalise } from '../utilities';

const DetailedViewContainer = props => {
  const { location, user, history, match } = props;

  const docType = location.pathname.split('/')[1];
  const [docState] = useDocumentFromUrl(location, match, `${docType}s`);

  useEffect(() => {
    document.title = `2hats – ${capitalise(docType)}s`;

    if (!match.params || !match.params.id) {
      const parsedQuery = queryString.parse(location.search);
      if (parsedQuery.id) {
        const docId = parsedQuery.id;
        delete parsedQuery.id;
        history.replace(
          `${location.pathname}/${docId}?${queryString.stringify(parsedQuery)}`
        );
      } else history.replace(`/${docType}s${location.search}`);
    }
  }, [location, match]);

  useEffect(() => {
    // window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    if (docState.doc)
      document.title = `2hats – ${capitalise(docType)}s – ${
        docState.doc.title
      }`;
  }, [docState.doc]);

  if (docState.doc) {
    switch (docType) {
      case 'job':
        return <Job data={docState.doc} user={user} />;
      case 'assessment':
        return <Assessment data={docState.doc} user={user} />;
      default:
        return <FourOhFour />;
    }
  }

  if (docState.loading) return <LoadingScreen showNav />;

  return <FourOhFour />;
};

DetailedViewContainer.propTypes = {
  location: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withNavigation(DetailedViewContainer);
