import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import ContainerHeader from '../components/ContainerHeader';

import CoursesIcon from '@material-ui/icons/SchoolOutlined';
import YourIcon from '@material-ui/icons/AccountCircleOutlined';

import useWindowSize from '../hooks/useWindowSize';
import UserContext from 'contexts/UserContext';
import Cards, { getNumCards, getCardsWidth } from '../components/Cards';
import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';

const CoursesContainer = props => {
  const { isMobile } = props;

  const { user } = useContext(UserContext);

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
          sort: { field: 'ranking', direction: 'asc' },
        }}
        extra
        Icon={YourIcon}
      />
      <Cards
        title="Marketing Courses"
        mapping="course"
        cols={cardsCols}
        useCollectionInit={{
          path: COLLECTIONS.courses,
          limit: cardsCols + 1,
          filters: [
            { field: 'category', operator: '==', value: 'marketing' },
            { field: 'published', operator: '==', value: true },
          ],
          sort: { field: 'ranking', direction: 'asc' },
        }}
        filterIds={user.touchedCourses}
        NoneLeftIcon={CoursesIcon}
        noneLeftMsg="There are no more marketing courses available at the moment"
        extra
      />
      <Cards
        title="Sales Courses"
        mapping="course"
        cols={cardsCols}
        useCollectionInit={{
          path: COLLECTIONS.courses,
          limit: cardsCols + 1,
          filters: [
            { field: 'category', operator: '==', value: 'sales' },
            { field: 'published', operator: '==', value: true },
          ],
          sort: { field: 'ranking', direction: 'asc' },
        }}
        filterIds={user.touchedCourses}
        NoneLeftIcon={CoursesIcon}
        noneLeftMsg="There are no more sales courses available at the moment"
        extra
      />
    </div>
  );
};

CoursesContainer.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

export default CoursesContainer;
