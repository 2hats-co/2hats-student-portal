import React from 'react';

import { useScrollTrigger } from '@material-ui/core';

import MobileTopBar from './MobileTopBar';
import NavigationTabs from './NavigationTabs';

/**
 * Consists of two bars: `MobileTopBar` and `NavigationTabs`
 * (MUI `BottomNavigation`).
 *
 * Uses 2 hooks that is passed down to its children:
 * - `triggerHide` to hide both bars when scrolling down and show when
 *   scrolling up
 * - `triggerElevation` to show/hide shadow of `MobileTopBar` whenever scrolled
 *   down
 */
const MobileNavigation = () => {
  const triggerHide = useScrollTrigger();
  const triggerElevation = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return (
    <>
      <MobileTopBar
        triggerHide={triggerHide}
        triggerElevation={triggerElevation}
      />
      <NavigationTabs triggerHide={triggerHide} />
    </>
  );
};

export default MobileNavigation;
