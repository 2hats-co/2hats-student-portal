import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Slide from '@material-ui/core/Slide';

import withNavigation from '../components/withNavigation';
import ContainerHeader from '../components/ContainerHeader';

import useWindowSize from '../hooks/useWindowSize';
import Cards, { getNumCards } from '../components/Cards';
import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';

const CoursesContainer = props => {
  const { className, isMobile, user } = props;

  const windowSize = useWindowSize();
  const cardsCols = getNumCards(windowSize.width, isMobile);

  useEffect(() => {
    document.title = '2hats – Courses';
  }, []);

  return (
    <Slide direction="up" in>
      <div className={className}>
        <ContainerHeader title="Courses" isMobile={isMobile} />
        <Cards
          title="Your courses"
          mapping="course"
          cols={cardsCols}
          useCollectionInit={{
            path: `${COLLECTIONS.users}/${user.id}/${COLLECTIONS.courses}`,
            limit: cardsCols,
          }}
        />
        <Cards
          title="Available courses"
          mapping="course"
          cols={cardsCols}
          useCollectionInit={{
            path: COLLECTIONS.courses,
            limit: cardsCols + 1,
          }}
          filterIds={user.touchedCourses}
        />
      </div>
    </Slide>
  );
};

CoursesContainer.propTypes = {
  className: PropTypes.string,
  isMobile: PropTypes.bool.isRequired,
};

export default withNavigation(CoursesContainer);
