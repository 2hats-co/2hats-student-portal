import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPause from '@allpro/react-router-pause';

import { makeStyles } from '@material-ui/styles';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grow,
  Button,
} from '@material-ui/core';
import { fade } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  backdrop: { backgroundColor: fade(theme.palette.background.paper, 0.9) },
  scrollPaper: { alignItems: 'flex-start' },
  dialogPaper: { marginTop: 0 },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Grow ref={ref} style={{ transformOrigin: '50% 0 0' }} {...props} />;
});

const DialogPrompt = () => {
  const classes = useStyles();

  const [dialogProps, setDialogProps] = useState({});

  const handleNavigationAttempt = (navigation, location) => {
    console.log('navigation attempt');

    const close = () =>
      new Promise((resolve, reject) => {
        setDialogProps({});
        resolve();
      });

    // If form is not dirty, then ALLOW navigation
    // return true // allow navigation

    setDialogProps({
      open: true,
      cancel: () => close().then(() => navigation.cancel()),
      resume: () => close().then(() => navigation.resume()),
      redirect: () => close().then(() => navigation.push('/page4')),
      onClose: () => close(),
    });
    return null; // null = PAUSE navigation
    // navigation.pause() - Can also use method to signal pause
  };

  return (
    <>
      <ReactRouterPause handler={handleNavigationAttempt} when={true} />

      <Dialog
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        BackdropProps={{ classes: { root: classes.backdrop } }}
        classes={{
          scrollPaper: classes.scrollPaper,
          paper: classes.dialogPaper,
        }}
        {...dialogProps}
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={dialogProps.cancel} color="primary">
            Cancel
          </Button>
          <Button onClick={dialogProps.resume} color="primary">
            Continue
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DialogPrompt;
