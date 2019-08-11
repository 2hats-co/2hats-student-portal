import * as ROUTES from 'constants/routes';

export const getBaseRoute = route => {
  if (route.includes(ROUTES.COURSE)) return ROUTES.COURSES;
  if (route.includes(ROUTES.ASSESSMENT)) return ROUTES.ASSESSMENTS;
  if (route.includes(ROUTES.JOB)) return ROUTES.JOBS;

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

    default:
      return route.split('/')[1];
  }
};

/**
 * Returns the correct back button route. It can be either a proper "back"
 * button or an "up" button
 * @param {str[]} historyStack
 */
export const getBackButtonRoute = (historyStack, location) => {
  // If there *is* a route to go back to, then use normal behaviour
  if (historyStack.length >= 2) {
    const last = historyStack[historyStack.length - 2];
    // If previous route is the same for some reason, don't show the button
    if (
      last.pathname === location.pathname &&
      last.search === location.search &&
      last.hash === location.hash
    )
      return null;

    // Normal behaviour
    return 'back';
  }

  // Otherwise, if we are "one level deep", show an "up" button
  if (historyStack.length === 1) {
    const { pathname } = historyStack[0];
    const baseRoute = getBaseRoute(pathname);
    if (baseRoute !== pathname) return baseRoute;
  }

  // Otherwise, don't show the back button
  return null;
};

export const hideBackButton = (historyStack, location) =>
  !getBackButtonRoute(historyStack, location) ||
  ROUTES.ROUTES_HIDE_BACK.includes(location.pathname) ||
  (historyStack.length >= 2 &&
    ROUTES.ROUTES_PREVENT_BACK.includes(
      historyStack[historyStack.length - 2].pathname
    ));
