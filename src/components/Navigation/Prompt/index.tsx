import React, { useState, useLayoutEffect } from 'react';

import {
  makeStyles,
  createStyles,
  useMediaQuery,
  Portal,
  IconButton,
} from '@material-ui/core';
import PromptIcon from '@material-ui/icons/RadioButtonChecked';

import PromptSnackbar, { IPromptSnackbarProps } from './PromptSnackbar';

import { IS_MOBILE_QUERY } from 'constants/layout';

export const PROMPT_CIRCLE_SIZE = 24;

interface IPromptStylesProps {
  coords: ClientRect | DOMRect | null;
}

const useStyles = makeStyles(theme =>
  createStyles({
    // These styles are only used on desktop
    desktopRoot: ({ coords }: IPromptStylesProps) => ({
      position: 'fixed' as 'fixed',
      top: coords ? coords.top + (coords.height - PROMPT_CIRCLE_SIZE) / 2 : 0,
      left: coords
        ? coords.left +
          coords.width -
          PROMPT_CIRCLE_SIZE -
          (coords.height - PROMPT_CIRCLE_SIZE) / 2
        : 0,

      zIndex: theme.zIndex.snackbar,
    }),

    promptCircle: {
      width: PROMPT_CIRCLE_SIZE,
      height: PROMPT_CIRCLE_SIZE,
      padding: 0,
    },
  })
);

interface IPromptProps
  extends Omit<IPromptSnackbarProps, 'open' | 'handleClose' | 'coords'> {
  /** The ID of the element to position against */
  elementId: string;
}

/**
 * Displays a prompt that positions itself next to a sidebar item on desktop,
 * or shows just a snackbar on mobile.
 *
 * Note that on desktop, there is an IconButton that users can click to show
 * the Snackbar again if it is hidden by the user. This is not present on
 * mobile as there is no suitable place to put it.
 */
const Prompt: React.FunctionComponent<IPromptProps> = ({
  elementId,
  ...snackbarProps
}) => {
  // Store coords of the sidebar item here
  const [coords, setCoords] = useState<ClientRect | DOMRect | null>(null);

  // Use media query to check if we’re showing desktop or mobile nav
  const isMobile = useMediaQuery(IS_MOBILE_QUERY);

  // On first mount, get the position of the sidebar item. Since it is always
  // in a fixed position, we don’t need to have a window resize listener
  useLayoutEffect(() => {
    if (isMobile) return; // Bail out on mobile
    const element = document.getElementById('sidebar-' + elementId);
    if (element) setCoords(element.getBoundingClientRect());
  }, [isMobile]);

  // Pass the coords as props to the `useStyles` hook
  const classes = useStyles({ coords: coords });

  // Store snackbar open/close state
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);

  // If mobile, only show snackbar
  if (isMobile)
    return (
      <PromptSnackbar
        open={open}
        handleClose={handleClose}
        {...snackbarProps}
      />
    );

  // If not mobile and no coords, don’t show anything yet
  if (!coords) return null;

  // If not mobile and coords available, display it in a `Portal`
  return (
    <Portal>
      <div className={classes.desktopRoot}>
        <IconButton
          className={classes.promptCircle}
          onClick={e => {
            // Stop clicking onto the associated tab
            e.preventDefault();
            e.stopPropagation();
            setOpen(true);
          }}
          color="primary"
          size="small"
        >
          <PromptIcon />
        </IconButton>

        <PromptSnackbar
          open={open}
          handleClose={handleClose}
          coords={coords}
          {...snackbarProps}
        />
      </div>
    </Portal>
  );
};

export default Prompt;
