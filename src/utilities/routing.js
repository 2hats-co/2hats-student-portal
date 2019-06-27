import * as ROUTES from 'constants/routes';

export const getBaseRoute = route => {
  if (route === ROUTES.COURSE_REDIRECT) return ROUTES.COURSES;
  if (route === ROUTES.ASSESSMENT) return ROUTES.ASSESSMENTS;
  if (route === ROUTES.JOB) return ROUTES.JOBS;
  return route;
};

export const getDisplayName = route => {
  if (!route) return '';

  switch (route) {
    case ROUTES.JOB:
      return 'Job Description';

    case ROUTES.COURSE_REDIRECT:
      return 'Course';

    default:
      return route.replace('/', '');
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
    if (pathname === ROUTES.ASSESSMENT) return ROUTES.ASSESSMENTS;
    if (pathname === ROUTES.JOB) return ROUTES.JOBS;
    if (pathname === ROUTES.COURSE_REDIRECT) return ROUTES.COURSES;
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
