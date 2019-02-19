import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import withNavigation from '../components/withNavigation';
import LoadingScreen from '../components/LoadingScreen';
import Job from '../components/Job';
import Assessment from '../components/Assessment';

import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';
import useDocumentFromUrl from '../hooks/useDocumentFromUrl';

const DetailedViewContainer = props => {
  const { location, user } = props;
  const type = location.pathname.replace('/', '');
  const [docState] = useDocumentFromUrl(location, `${type}s`);

  useEffect(
    () => {
      document.title = `2hats – ${type}s`;
    },
    [location]
  );

  useEffect(
    () => {
      // window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      if (docState.doc)
        document.title = `2hats – ${type}s – ${docState.doc.title}`;
    },
    [docState.doc]
  );

  if (docState.doc)
    return type === 'job' ? (
      <Job data={docState.doc} user={user} />
    ) : (
      <Assessment data={docState.doc} user={user} />
    );
  return <LoadingScreen showNav />;
};

DetailedViewContainer.propTypes = {
  location: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default withNavigation(DetailedViewContainer);
