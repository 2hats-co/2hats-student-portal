import React from 'react';
import PropTypes from 'prop-types';

import Slide from '@material-ui/core/Slide';

import withNavigation from '../components/withNavigation';
import ContainerHeader from '../components/ContainerHeader';
import useWindowSize from '../hooks/useWindowSize';
import Cards, { getNumCards } from '../components/Cards';
import { COLLECTIONS } from '../constants/firestore';

const AssessmentsContainer = props => {
  const { className, isMobile } = props;

  const windowSize = useWindowSize();
  const cardsCols = getNumCards(windowSize.width, isMobile);

  return (
    <Slide direction="up" in>
      <div className={className}>
        <ContainerHeader
          title="Assessments"
          //subtitle="Get yourself certified with these assessments"
          isMobile={isMobile}
        />
        <Cards
          title="All assessments"
          mapping="assessment"
          cols={cardsCols}
          useCollectionInit={{
            path: COLLECTIONS.assessments,
            limit: cardsCols + 1,
          }}
        />
      </div>
    </Slide>
  );
};

AssessmentsContainer.propTypes = {
  className: PropTypes.string,
  isMobile: PropTypes.bool.isRequired,
};

export default withNavigation(AssessmentsContainer);
