import React from 'react';
import clsx from 'clsx';
import { Link, LinkProps } from 'react-router-dom';

import {
  makeStyles,
  createStyles,
  useMediaQuery,
  useScrollTrigger,
  Snackbar,
  Button,
} from '@material-ui/core';

import { DESKTOP_WIDTH, IS_MOBILE_QUERY } from 'constants/layout';

interface IPromptSnackbarStylesProps {
  coords: IPromptSnackbarProps['coords'];
}

const useStyles = makeStyles(theme =>
  createStyles({
    root: ({ coords }: IPromptSnackbarStylesProps) =>
      // Coords are only passed on desktop
      coords
        ? {
            [`@media (min-width: ${DESKTOP_WIDTH}px)`]: {
              top: coords.top - (coords.height - 48) / 2,
              left: coords.left + coords.width,
            },
          }
        : {
            transition: theme.transitions.create('bottom'),
            bottom: 56 + theme.spacing(1),
            width: `calc(100% - ${theme.spacing(2)}px)`,
          },

    mobilePushDown: {
      '$root&': { bottom: theme.spacing(1) },
    },

    contentRoot: {
      transformOrigin: '0 50%',
      [IS_MOBILE_QUERY]: { transformOrigin: '50% 100%' },
    },
  })
);

export interface IPromptSnackbarProps {
  /** Passed to the Snackbar */
  open: boolean;
  /** Passed to the Snackbar */
  handleClose: () => void;
  /**
   * Coords of where to position the snackbar on desktop. If this is not
   * present, then we can assume it’s desktop
   */
  coords?: ClientRect | DOMRect;
  /** The message to show in the Snackbar */
  message: React.ReactNode;
  /** The route for the CTA button */
  route: LinkProps['to'];
  /** The label for the CTA button */
  routeLabel: React.ReactNode;
}

/**
 * The snackbar that displays with the prompt. Also has a `useScrollTrigger`
 * call to push it down to the bottom of the screen when the bottom nav bar
 * hides on scroll.
 */
const PromptSnackbar: React.FunctionComponent<IPromptSnackbarProps> = ({
  open,
  handleClose,
  coords,
  message,
  route,
  routeLabel,
}) => {
  const classes = useStyles({ coords: coords });
  const isMobile = useMediaQuery(IS_MOBILE_QUERY);

  const triggerHide = useScrollTrigger();

  return (
    <Snackbar
      classes={{
        root: clsx(
          classes.root,
          isMobile && triggerHide && classes.mobilePushDown
        ),
      }}
      anchorOrigin={{
        horizontal: isMobile ? 'center' : 'left',
        vertical: isMobile ? 'bottom' : 'top',
      }}
      open={open}
      onClose={handleClose}
      onClick={e => {
        // Stop clicking onto the associated tab
        e.preventDefault();
        e.stopPropagation();
      }}
      ContentProps={{
        'aria-describedby': 'message-id',
        classes: { root: classes.contentRoot },
      }}
      message={<span id="message-id">{message}</span>}
      action={
        <Button
          color="primary"
          onClick={handleClose}
          component={Link}
          to={route}
        >
          {routeLabel}
        </Button>
      }
    />
  );
};

export default PromptSnackbar;
