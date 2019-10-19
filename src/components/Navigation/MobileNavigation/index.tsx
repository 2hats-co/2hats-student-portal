import React, { useEffect } from 'react';

import { useScrollTrigger } from '@material-ui/core';

import MobileTopBar from './MobileTopBar';
import NavigationTabs from './NavigationTabs';

interface IMobileNavigationProps {
  /** The `limited` prop passed down from [`Navigation`](#navigation) */
  limited: boolean;
}

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
const MobileNavigation: React.FunctionComponent<IMobileNavigationProps> = ({
  limited,
}) => {
  const triggerHide = useScrollTrigger();
  const triggerElevation = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  useEffect(() => {
    document.body.classList.toggle('mobilenav-show', !triggerHide);
    document.body.classList.toggle('mobilenav-hide', triggerHide);
    document.body.classList.toggle('fb_up', !triggerHide);

    return () => {
      document.body.classList.remove(
        'mobilenav-show',
        'mobilenav-hide',
        'fb_up'
      );
    };
  }, [triggerHide]);

  return (
    <>
      <MobileTopBar
        triggerHide={triggerHide}
        triggerElevation={triggerElevation}
      />
      {!limited && <NavigationTabs triggerHide={triggerHide} />}
    </>
  );
};

export default MobileNavigation;
