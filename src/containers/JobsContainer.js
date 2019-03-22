import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import withNavigation from '../components/withNavigation';
import ContainerHeader from '../components/ContainerHeader';

import JobsIcon from '@material-ui/icons/BusinessCenterOutlined';
import YourIcon from '@material-ui/icons/AccountCircleOutlined';

import useWindowSize from '../hooks/useWindowSize';
import Cards, { getNumCards, getCardsWidth } from '../components/Cards';
import Announcement from '../components/Announcement';
import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';

const JobsContainer = props => {
  const { isMobile, user } = props;

  const windowSize = useWindowSize();
  const cardsCols = getNumCards(windowSize.width, isMobile);

  useEffect(() => {
    document.title = '2hats – Jobs';
  }, []);

  return (
    <div>
      <ContainerHeader
        title="Jobs"
        isMobile={isMobile}
        maxWidth={getCardsWidth(cardsCols)}
        icon={<JobsIcon />}
      />
      <Announcement width={getCardsWidth(cardsCols)} />
      <Cards
        title="Your Jobs"
        mapping="job"
        cols={cardsCols}
        useCollectionInit={{
          path: `${COLLECTIONS.users}/${user.id}/${COLLECTIONS.jobs}`,
          limit: cardsCols + 1,
          sort: { field: 'updatedAt', direction: 'desc' },
        }}
        extra
        icon={<YourIcon />}
      />
      <Cards
        title="Marketing Jobs"
        mapping="job"
        cols={cardsCols}
        useCollectionInit={{
          path: COLLECTIONS.jobs,
          limit: cardsCols + 1,
          filters: [
            { field: 'industry', operator: '==', value: 'marketing' },
            { field: 'published', operator: '==', value: true },
          ],
          sort: { field: 'createdAt', direction: 'desc' },
        }}
        filterIds={user.touchedJobs}
        NoneLeftIcon={JobsIcon}
        noneLeftMsg="There are no marketing jobs available at the moment"
        extra
      />
      <Cards
        title="Sales Jobs"
        mapping="job"
        cols={cardsCols}
        useCollectionInit={{
          path: COLLECTIONS.jobs,
          limit: cardsCols + 1,
          filters: [
            { field: 'industry', operator: '==', value: 'sales' },
            { field: 'published', operator: '==', value: true },
          ],
          sort: { field: 'createdAt', direction: 'desc' },
        }}
        filterIds={user.touchedJobs}
        NoneLeftIcon={JobsIcon}
        noneLeftMsg="There are no sales jobs available at the moment"
        extra
      />
      <Cards
        title="Tech Jobs"
        mapping="job"
        cols={cardsCols}
        useCollectionInit={{
          path: COLLECTIONS.jobs,
          limit: cardsCols + 1,
          filters: [
            { field: 'industry', operator: '==', value: 'tech' },
            { field: 'published', operator: '==', value: true },
          ],
          sort: { field: 'createdAt', direction: 'desc' },
        }}
        filterIds={user.touchedJobs}
        NoneLeftIcon={JobsIcon}
        noneLeftMsg="There are no tech jobs available at the moment"
        extra
      />
    </div>
  );
};

JobsContainer.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default withNavigation(JobsContainer);
