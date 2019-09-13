import * as ROUTES from 'constants/routes';

export const getBaseRoute = route => {
  if (route.includes(ROUTES.COURSE)) return ROUTES.COURSES;
  if (route.includes(ROUTES.ASSESSMENT)) return ROUTES.ASSESSMENTS;
  if (route.includes(ROUTES.JOB)) return ROUTES.JOBS;
  if (route.includes(ROUTES.PROFILE)) return ROUTES.PROFILE;

  return route;
};

export const getDisplayName = route => {
  if (!route) return '';

  if (!route.startsWith(ROUTES.JOBS) && route.startsWith(ROUTES.JOB))
    return 'Job Description';

  switch (route) {
    case ROUTES.COURSE_REDIRECT:
      return 'Course';

    case ROUTES.ASSESSMENTS_ONGOING:
      return 'Ongoing Assessments';
    case ROUTES.ASSESSMENTS_ALL:
      return 'All Assessments';
    case ROUTES.ASSESSMENTS_COMPLETED:
      return 'Completed Assessments';

    case ROUTES.JOBS_NEW:
      return 'New Jobs';
    case ROUTES.JOBS_PAST:
      return 'Past Jobs';
    case ROUTES.JOBS_YOURS:
      return 'Your Job Applications';

    case ROUTES.COURSES_ONGOING:
      return 'Ongoing Courses';
    case ROUTES.COURSES_ALL:
      return 'All Courses';
    case ROUTES.COURSES_COMPLETED:
      return 'Completed Courses';

    case ROUTES.PROFILE_SETTINGS:
      return 'Settings';

    default:
      return route.split('/')[1];
  }
};

/**
 * Returns the up button route. If same as current route, then returns `null`
 * @param {string} pathname
 */
const getUpButtonRoute = pathname => {
  const baseRoute = getBaseRoute(`/${pathname.split('/')[1]}`);

  if (baseRoute !== pathname) return baseRoute;
  return null;
};

/**
 * Returns the correct back button route. It can be either a proper "back"
 * button or an "up" button
 * @param {str[]} historyStack
 */
export const getBackButtonRoute = (historyStack, location) => {
  // If there is nothing in the history stack for some reason,
  // don't show the button at all
  if (historyStack.length < 1) return null;

  // If there *is* a route to go back to, then use normal behaviour
  if (historyStack.length >= 2) {
    const last = historyStack[historyStack.length - 2];
    const { pathname } = historyStack[historyStack.length - 1];

    // If previous route is the same for some reason,
    // try and see if we're "one level deep" and show an "up" button
    if (
      last.pathname === location.pathname &&
      last.search === location.search &&
      last.hash === location.hash
    )
      return getUpButtonRoute(pathname);

    // If the previous route is something we should not display a back button
    // for, check if we have an alt route (up button)
    if (ROUTES.ROUTES_PREVENT_BACK.includes(`/${last.pathname.split('/')[1]}`))
      return getUpButtonRoute(pathname);

    // Normal behaviour
    return 'back';
  }

  // Otherwise, if we are "one level deep", show an "up" button
  if (historyStack.length === 1)
    return getUpButtonRoute(historyStack[historyStack.length - 1].pathname);

  // Otherwise, don't show the back button
  return null;
};

export const hideBackButton = (historyStack, location) => {
  const a = !getBackButtonRoute(historyStack, location);
  const b = ROUTES.ROUTES_HIDE_BACK.includes(location.pathname);
  //   `/${location.pathname.split('/')[1]}`
  // );

  return a || b;
};
