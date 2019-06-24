import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Prompt } from 'react-router-dom';

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

const DialogPrompt = ({ shouldBlockNavigation, when, navigate }) => {
  const classes = useStyles();

  const [modalVisible, setModalVisible] = useState(false);
  const [lastLocation, setLastLoaction] = useState(null);
  const [confirmedNavigation, setConfirmedNavigation] = useState(false);

  const showModal = location => {
    setModalVisible(true);
    setLastLoaction(location);
  };

  const handleBlockedNavigation = nextLocation => {
    if (!confirmedNavigation && shouldBlockNavigation) {
      showModal(nextLocation);
      return false;
    }
    return true;
  };

  const handleClose = () => {
    setModalVisible(false);
  };

  const handleConfirm = () => {
    handleClose();
    if (lastLocation) {
      setConfirmedNavigation(true);
      // TODO navigate should have aritficial in state
      navigate(lastLocation);
    }
  };

  return (
    <>
      <Prompt when={when} message={handleBlockedNavigation} />
      <Dialog
        open={modalVisible}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        BackdropProps={{ classes: { root: classes.backdrop } }}
        classes={{
          scrollPaper: classes.scrollPaper,
          paper: classes.dialogPaper,
        }}
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
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DialogPrompt;
