import React, { useState } from 'react';
import clsx from 'clsx';

import {
  makeStyles,
  createStyles,
  IconButton,
  Popover,
  Typography,
} from '@material-ui/core';
import { PopoverProps as MuiPopoverProps } from '@material-ui/core/Popover';

import HelpIcon from '@material-ui/icons/HelpOutline';

const useStyles = makeStyles(theme =>
  createStyles({
    besideOverline: {
      margin: theme.spacing(-1.5),
      marginLeft: 0,
    },

    paper: {
      padding: theme.spacing(2, 2.5),
      maxWidth: 300,
    },
  })
);

interface IHelpPopupProps {
  /** The message to show in the popup. Either a node (with Typography) or a string */
  message: React.ReactNode;
  /** Style override for the IconButton */
  variant?: 'besideOverline';
  /** Class override for the IconButton */
  className?: string;
  /** Popover element props overrides */
  PopoverProps?: Partial<MuiPopoverProps>;
}

const HelpPopup: React.FunctionComponent<IHelpPopupProps> = ({
  message,
  variant,
  className,
  PopoverProps,
}) => {
  const classes = useStyles();

  /** Either null or the element (IconButton) to anchor the popper */
  const [popperAnchor, setPopperAnchor] = useState<Element | null>(null);

  return (
    <>
      <IconButton
        className={clsx(
          className,
          variant === 'besideOverline' && classes.besideOverline
        )}
        onClick={e => setPopperAnchor(e.currentTarget)}
        color="primary"
      >
        <HelpIcon fontSize="small" />
      </IconButton>

      <Popover
        open={!!popperAnchor}
        anchorEl={popperAnchor}
        onClose={() => setPopperAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        classes={{ paper: classes.paper }}
        {...PopoverProps}
      >
        {typeof message === 'string' ? (
          <Typography variant="body2">{message}</Typography>
        ) : (
          message
        )}
      </Popover>
    </>
  );
};

export default HelpPopup;
