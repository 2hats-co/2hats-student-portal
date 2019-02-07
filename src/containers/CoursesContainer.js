import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import withNavigation from '../components/withNavigation';
import ContainerHeader from '../components/ContainerHeader';

import CoursesIcon from '@material-ui/icons/SchoolOutlined';

import useWindowSize from '../hooks/useWindowSize';
import Cards, { getNumCards, getCardsWidth } from '../components/Cards';
import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';

const CoursesContainer = props => {
  const { isMobile, user } = props;

  const windowSize = useWindowSize();
  const cardsCols = getNumCards(windowSize.width, isMobile);

  useEffect(() => {
    document.title = '2hats – Courses';
  }, []);

  return (
    <div>
      <ContainerHeader
        title="Courses"
        isMobile={isMobile}
        maxWidth={getCardsWidth(cardsCols)}
        icon={<CoursesIcon />}
      />
      <Cards
        title="Your Courses"
        mapping="course"
        cols={cardsCols}
        useCollectionInit={{
          path: `${COLLECTIONS.users}/${user.id}/${COLLECTIONS.courses}`,
          limit: cardsCols,
        }}
      />
      <Cards
        title="Available Courses"
        mapping="course"
        cols={cardsCols}
        useCollectionInit={{
          path: COLLECTIONS.courses,
          limit: cardsCols + 1,
        }}
        filterIds={user.touchedCourses}
        NoneLeftIcon={CoursesIcon}
        noneLeftMsg="There are no more courses available at the moment"
      />
    </div>
  );
};

CoursesContainer.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

export default withNavigation(CoursesContainer);
