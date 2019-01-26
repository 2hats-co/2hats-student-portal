import React from 'react';
import PropTypes from 'prop-types';

import Slide from '@material-ui/core/Slide';

import withNavigation from '../components/withNavigation';
import ContainerHeader from '../components/ContainerHeader';
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

  return (
    <Slide direction="up" in>
      <div className={className}>
        {location.search && docState.doc ? (
          <Assessment data={docState.doc} />
        ) : (
          <>
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
              setFilter
              useCollectionInit={{
                path: `${COLLECTIONS.users}/${user.id}/${
                  COLLECTIONS.assessments
                }`,
                limit: cardsCols,
              }}
            />
            <Cards
              title="All assessments"
              mapping="assessment"
              cols={cardsCols}
              useCollectionInit={{
                path: COLLECTIONS.assessments,
                limit: cardsCols,
              }}
              filterIds={user.touchedAssessments}
            />
          </>
        )}
      </div>
    </Slide>
  );
};

AssessmentsContainer.propTypes = {
  className: PropTypes.string,
  isMobile: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default withNavigation(AssessmentsContainer);
