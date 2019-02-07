import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import withNavigation from '../components/withNavigation';
import ContainerHeader from '../components/ContainerHeader';
import LoadingScreen from '../components/LoadingScreen';
import Assessment from '../components/Assessment';

import AssessmentsIcon from '@material-ui/icons/AssignmentOutlined';

import useWindowSize from '../hooks/useWindowSize';
import Cards, { getNumCards, getCardsWidth } from '../components/Cards';
import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';
import useDocumentFromUrl from '../hooks/useDocumentFromUrl';

const AssessmentsContainer = props => {
  const { isMobile, location, user } = props;

  const windowSize = useWindowSize();
  const cardsCols = getNumCards(windowSize.width, isMobile);

  const [docState] = useDocumentFromUrl(location, COLLECTIONS.assessments);

  useEffect(() => {
    document.title = '2hats – Assessments';
  }, []);

  useEffect(
    () => {
      if (docState.doc)
        document.title = `2hats – Assessments – ${docState.doc.title}`;
      else document.title = '2hats – Assessments';
    },
    [docState.doc]
  );

  if (location.search && docState.doc) {
    if (docState.doc) return <Assessment data={docState.doc} />;
    return <LoadingScreen showNav />;
  }

  return (
    <div>
      <ContainerHeader
        title="Assessments"
        isMobile={isMobile}
        maxWidth={getCardsWidth(cardsCols)}
        icon={<AssessmentsIcon />}
      />
      <Cards
        title="Your Assessments"
        mapping="assessment"
        cols={cardsCols}
        useCollectionInit={{
          path: `${COLLECTIONS.users}/${user.id}/${COLLECTIONS.assessments}`,
          limit: cardsCols,
        }}
      />
      <Cards
        title="Available Assessments"
        mapping="assessment"
        cols={cardsCols}
        useCollectionInit={{
          path: COLLECTIONS.assessments,
          limit: cardsCols,
        }}
        filterIds={user.touchedAssessments}
        NoneLeftIcon={AssessmentsIcon}
        noneLeftMsg="There are no more courses available at the moment"
      />
    </div>
  );
};

AssessmentsContainer.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default withNavigation(AssessmentsContainer);
