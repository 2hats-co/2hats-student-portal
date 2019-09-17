import React, { useState } from 'react';

import {
  makeStyles,
  createStyles,
  useTheme,
  useMediaQuery,
  Button,
  Slide,
  Dialog,
} from '@material-ui/core';
import { fade } from '@material-ui/core/styles';
import { TransitionProps } from '@material-ui/core/transitions';
import HelpIcon from '@material-ui/icons/HelpOutline';

import PopupContents from './PopupContents';

import { CURIOUS_PURPLE } from 'constants/curiousThing';

const useStyles = makeStyles(theme =>
  createStyles({
    button: {
      marginTop: theme.spacing(3),
      color: CURIOUS_PURPLE,

      '&:hover': {
        backgroundColor: fade(
          CURIOUS_PURPLE,
          theme.palette.action.hoverOpacity
        ),
      },

      '& svg$helpIcon': {
        margin: theme.spacing(0, 1, 0, 0),
      },
    },

    helpIcon: {},

    dialogPaper: { overflow: 'hidden' },
  })
);

const Transition = React.forwardRef<unknown, TransitionProps>(
  function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  }
);

/**
 * Shows a popup for sample result data. Renders a button that displays a
 * popup to show sample data, which is contained in `PopupContents`
 */
const CTSamplePopup: React.FunctionComponent = () => {
  const classes = useStyles();
  const theme = useTheme();

  const [showDialog, setShowDialog] = useState(false);
  const handleClose = () => setShowDialog(false);

  // Show full screen iOS 13-style popup on smaller screens
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Button
        color="inherit"
        className={classes.button}
        onClick={() => setShowDialog(true)}
      >
        <HelpIcon className={classes.helpIcon} />
        What to Expect
      </Button>

      <Dialog
        onClose={handleClose}
        aria-labelledby="simple-dialog-title"
        open={showDialog}
        TransitionComponent={Transition}
        fullScreen={fullScreen}
        classes={{ paper: classes.dialogPaper }}
      >
        <PopupContents handleClose={handleClose} />
      </Dialog>
    </>
  );
};

export default CTSamplePopup;
