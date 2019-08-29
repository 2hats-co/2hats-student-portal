import { useLayoutEffect } from 'react';
import { Location } from 'history';

/**
 * Scrolls a specific element with ID into view when the page loads
 *
 * @param elemId The ID of the element to scroll into view
 * @param location From `react-router-dom`, used to match hashes
 * @param extraDeps Any extra dependencies used to trigger `useLayoutEffect`
 */
export const useScrollIntoView = (
  elemId: string,
  location: Location,
  extraDeps: any[] = []
) => {
  useLayoutEffect(() => {
    const elem = document.getElementById(elemId);
    if (location.hash === '#' + elemId && elem !== null) elem.scrollIntoView();
  }, [location, ...extraDeps]);
};

export default useScrollIntoView;
