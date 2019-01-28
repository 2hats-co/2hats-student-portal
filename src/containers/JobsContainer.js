import React from 'react';
import PropTypes from 'prop-types';

import Slide from '@material-ui/core/Slide';

import withNavigation from '../components/withNavigation';
import ContainerHeader from '../components/ContainerHeader';
import LoadingScreen from '../components/LoadingScreen';
import Job from '../components/Job';

import useWindowSize from '../hooks/useWindowSize';
import Cards, { getNumCards } from '../components/Cards';
import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';
import useDocumentFromUrl from '../hooks/useDocumentFromUrl';

const JobsContainer = props => {
  const { className, isMobile, location, user } = props;

  const windowSize = useWindowSize();
  const cardsCols = getNumCards(windowSize.width, isMobile);

  const [docState] = useDocumentFromUrl(location, COLLECTIONS.jobs);

  if (location.search && docState.valid) {
    if (docState.doc)
      return (
        <div className={className}>
          <Job data={docState.doc} user={user} />
        </div>
      );
    return <LoadingScreen showNav />;
  }

  return (
    <Slide direction="up" in>
      <div className={className}>
        <ContainerHeader
          title="Jobs"
          //subtitle="Here are our currently available jobs"
          isMobile={isMobile}
        />
        <Cards
          title="Your jobs"
          mapping="job"
          cols={cardsCols}
          useCollectionInit={{
            path: `${COLLECTIONS.users}/${user.id}/${COLLECTIONS.jobs}`,
            limit: cardsCols + 1,
          }}
        />
        <Cards
          title="All jobs"
          mapping="job"
          cols={cardsCols}
          useCollectionInit={{
            path: COLLECTIONS.jobs,
            limit: cardsCols + 1,
          }}
          filterIds={user.touchedJobs}
        />
      </div>
    </Slide>
  );
};

JobsContainer.propTypes = {
  className: PropTypes.string,
  isMobile: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default withNavigation(JobsContainer);
