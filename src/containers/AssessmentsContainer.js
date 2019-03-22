import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import withNavigation from '../components/withNavigation';
import ContainerHeader from '../components/ContainerHeader';
//import Assessment from '../components/Assessment';

import AssessmentsIcon from '@material-ui/icons/AssignmentOutlined';
import YourIcon from '@material-ui/icons/AccountCircleOutlined';

import useWindowSize from '../hooks/useWindowSize';
import Cards, { getNumCards, getCardsWidth } from '../components/Cards';
// import Announcement from '../components/Announcement';
import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';

const AssessmentsContainer = props => {
  const { isMobile, user } = props;

  const windowSize = useWindowSize();
  const cardsCols = getNumCards(windowSize.width, isMobile);

  useEffect(() => {
    document.title = '2hats – Assessments';
  }, []);

  return (
    <div>
      <ContainerHeader
        title="Assessments"
        isMobile={isMobile}
        maxWidth={getCardsWidth(cardsCols)}
        icon={<AssessmentsIcon />}
      />
      {/* <Announcement width={getCardsWidth(cardsCols)} /> */}
      <Cards
        title="Your Submissions"
        mapping="assessment"
        cols={cardsCols}
        useCollectionInit={{
          path: `${COLLECTIONS.users}/${user.id}/${COLLECTIONS.assessments}`,
          limit: cardsCols,
          sort: { field: 'updatedAt', direction: 'desc' },
        }}
        extra
        Icon={YourIcon}
      />
      <Cards
        title="Marketing Assessments"
        mapping="assessment"
        cols={cardsCols}
        useCollectionInit={{
          path: COLLECTIONS.assessments,
          limit: cardsCols,
          filters: [
            { field: 'category', operator: '==', value: 'marketing' },
            { field: 'published', operator: '==', value: true },
          ],
          sort: { field: 'createdAt', direction: 'desc' },
        }}
        filterIds={user.touchedAssessments}
        NoneLeftIcon={AssessmentsIcon}
        noneLeftMsg="There are no more marketing assessements available at the moment"
        extra
      />
      <Cards
        title="Sales Assessments"
        mapping="assessment"
        cols={cardsCols}
        useCollectionInit={{
          path: COLLECTIONS.assessments,
          limit: cardsCols,
          filters: [
            { field: 'category', operator: '==', value: 'sales' },
            { field: 'published', operator: '==', value: true },
          ],
          sort: { field: 'createdAt', direction: 'desc' },
        }}
        filterIds={user.touchedAssessments}
        NoneLeftIcon={AssessmentsIcon}
        noneLeftMsg="There are no more sales assessments available at the moment"
        extra
      />
      <Cards
        title="Tech Assessments"
        mapping="assessment"
        cols={cardsCols}
        useCollectionInit={{
          path: COLLECTIONS.assessments,
          limit: cardsCols,
          filters: [
            { field: 'category', operator: '==', value: 'tech' },
            { field: 'published', operator: '==', value: true },
          ],
          sort: { field: 'createdAt', direction: 'desc' },
        }}
        filterIds={user.touchedAssessments}
        NoneLeftIcon={AssessmentsIcon}
        noneLeftMsg="There are no more tech assessments available at the moment"
        extra
      />
    </div>
  );
};

AssessmentsContainer.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default withNavigation(AssessmentsContainer);
