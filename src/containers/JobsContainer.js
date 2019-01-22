import React from 'react';
import PropTypes from 'prop-types';

import Slide from '@material-ui/core/Slide';

import withNavigation from '../components/withNavigation';
import ContainerHeader from '../components/ContainerHeader';
import LoadingScreen from '../components/LoadingScreen';
import Job from '../components/Job';

import useWindowSize from '../hooks/useWindowSize';
import Cards, { getNumCards } from '../components/Cards';
import { COLLECTIONS } from '../constants/firestore';
import useDocumentFromUrl from '../hooks/useDocumentFromUrl';

const JobsContainer = props => {
  const { className, isMobile, location, user } = props;

  const windowSize = useWindowSize();
  const cardsCols = getNumCards(windowSize.width, isMobile);

  const [docState] = useDocumentFromUrl(location, COLLECTIONS.jobs);

  return (
    <Slide direction="up" in>
      <div className={className}>
        {location.search && docState.valid ? (
          docState.doc ? (
            <Job data={docState.doc} user={user} />
          ) : (
            <LoadingScreen showNav />
          )
        ) : (
          <>
            <ContainerHeader
              title="Jobs"
              //subtitle="Here are our currently available jobs"
              isMobile={isMobile}
            />
            <Cards
              title="All jobs"
              mapping="job"
              cols={cardsCols}
              useCollectionInit={{
                path: COLLECTIONS.jobs,
                limit: cardsCols + 1,
              }}
            />
          </>
        )}
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
