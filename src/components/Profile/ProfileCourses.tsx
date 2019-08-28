import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import {
  makeStyles,
  createStyles,
  LinearProgress,
  Grid,
} from '@material-ui/core';
import RightButtonLayout from './RightButtonLayout';
import TextWithGraphic from '@bit/twohats.common.components.text-with-graphic';
import ChipList from './ChipList';

import Instructor from 'assets/images/graphics/Instructor.svg';

import * as ROUTES from 'constants/routes';
import { useUser } from 'contexts/UserContext';
import { INDUSTRIES, COLLECTIONS } from '@bit/twohats.common.constants';
import useCollection from 'hooks/useCollection';
import { getDocsFromQuery } from 'utilities/firestore';
import {
  DocWithId,
  CoursesDoc,
  UsersCoursesDoc,
} from '@bit/twohats.common.db-types';
import { getIndustryDisplayName } from 'utilities/cards';

const useStyles = makeStyles(theme =>
  createStyles({
    root: { marginBottom: theme.spacing(1) },
  })
);

/**
 * A standalone component that displays a list of SkillChips
 * using [`ChipList`](#chiplist).
 *
 * This is baed on [`ProfileAssessments`](#profileassessments)
 *
 * ### Queries
 *
 * - users/courses subcollection to get completed courses (listener)
 * - entire courses collection (one-off) to get a count + list of all courses
 */
const ProfileCourses: React.FunctionComponent = () => {
  const classes = useStyles();
  const { user } = useUser();

  // useCollection call for user’s skills
  const [usersCoursesState] = useCollection({
    path: `${COLLECTIONS.users}/${user.id}/${COLLECTIONS.courses}`,
    filters: [{ field: 'completed', operator: '==', value: true }],
  });
  const usersCourses: DocWithId<UsersCoursesDoc>[] =
    usersCoursesState.documents;
  // Get a non-repeating Set of the industries in which the user has courses
  const industries = new Set<INDUSTRIES>(usersCourses.map(x => x.category));

  // Store a list of all courses in state – `null` value means it’s still loading
  const [allCourses, setAllCourses] = useState<
    DocWithId<CoursesDoc>[] | null
  >();

  // Query the entire courses collection if the user has any completed courses
  // — note the query is a one-off and is **not a listener**
  useEffect(() => {
    if (usersCourses.length === 0) return;

    // `undefined` means we haven’t made the following query call yet
    if (allCourses === undefined) {
      // Set all courses to `null` for now to say it’s loading
      setAllCourses(null);
      // Query, then store in `allCourses` state
      getDocsFromQuery(COLLECTIONS.courses, [
        { field: 'published', operator: '==', value: true },
      ]).then((courses: DocWithId<CoursesDoc>[]) => setAllCourses(courses));
    }
  }, [usersCourses]);

  // Display empty state
  if (!usersCoursesState.loading && usersCourses.length === 0)
    return (
      <section className={classes.root}>
        <RightButtonLayout
          title="My Courses"
          buttonLabel="Courses"
          ButtonProps={{ component: Link, to: ROUTES.COURSES }}
        />
        <TextWithGraphic
          graphic={Instructor}
          graphicWidth={60}
          message="Get help from from bite-sized courses designed to give you the guidance and support to complete our assessments."
        />
      </section>
    );

  // Assume still loading
  let contents: React.ReactNode = <LinearProgress />;

  // Otherwise, display `ChipList` components
  if (!usersCoursesState.loading && Array.isArray(allCourses)) {
    const cardLists: React.ReactNodeArray = [];

    industries.forEach(industry =>
      cardLists.push(
        <Grid item xs={12} sm={6} key={industry}>
          <ChipList
            title={getIndustryDisplayName(industry)}
            achieved={usersCourses.filter(skill => skill.category === industry)}
            allDocs={allCourses.filter(skill => skill.category === industry)}
            routeFormatter={(id: string) =>
              `${ROUTES.COURSE_REDIRECT}/?id=${id}`
            }
          />
        </Grid>
      )
    );

    contents = (
      <Grid container alignItems="flex-start" spacing={3}>
        {cardLists}
      </Grid>
    );
  }

  return (
    <section className={classes.root}>
      <RightButtonLayout
        title={`My Courses ${
          Array.isArray(usersCourses) && usersCourses.length > 0
            ? `(${usersCourses.length}${
                Array.isArray(allCourses) ? ` / ${allCourses.length}` : ''
              })`
            : ''
        }`}
        buttonLabel="Courses"
        ButtonProps={{ component: Link, to: ROUTES.COURSES }}
        description="Get help from from bite-sized courses designed to give you the guidance and support to complete our assessments."
      />
      {contents}
    </section>
  );
};

export default ProfileCourses;
