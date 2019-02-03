import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import withNavigation from '../components/withNavigation';
import ContainerHeader from '../components/ContainerHeader';
import LoadingScreen from '../components/LoadingScreen';
import Assessment from '../components/Assessment';

import useWindowSize from '../hooks/useWindowSize';
import Cards, { getNumCards, getCardsWidth } from '../components/Cards';
import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';
import useDocumentFromUrl from '../hooks/useDocumentFromUrl';

const AssessmentsContainer = props => {
  const { className, isMobile, location, user } = props;

  const windowSize = useWindowSize();
  const cardsCols = getNumCards(windowSize.width, isMobile);

  const [docState] = useDocumentFromUrl(location, COLLECTIONS.assessments);

  useEffect(() => {
    document.title = '2hats – Assessments';
  }, []);

  useEffect(
    () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      if (docState.doc)
        document.title = `2hats – Assessments – ${docState.doc.title}`;
      else document.title = '2hats – Assessments';
    },
    [docState.doc]
  );

  if (location.search && docState.doc) {
    if (docState.doc)
      return (
        <div className={className}>
          <Assessment data={docState.doc} />
        </div>
      );
    return <LoadingScreen showNav />;
  }

  return (
    <div className={className}>
      <ContainerHeader
        title="Assessments"
        //subtitle="Get yourself certified with these assessments"
        isMobile={isMobile}
        maxWidth={getCardsWidth(cardsCols)}
      />
      <Cards
        title="Your assessments"
        mapping="assessment"
        cols={cardsCols}
        useCollectionInit={{
          path: `${COLLECTIONS.users}/${user.id}/${COLLECTIONS.assessments}`,
          limit: cardsCols,
        }}
      />
      <Cards
        title="Available assessments"
        mapping="assessment"
        cols={cardsCols}
        useCollectionInit={{
          path: COLLECTIONS.assessments,
          limit: cardsCols,
        }}
        filterIds={user.touchedAssessments}
      />
    </div>
  );
};

AssessmentsContainer.propTypes = {
  className: PropTypes.string,
  isMobile: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default withNavigation(AssessmentsContainer);
