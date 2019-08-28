import React from 'react';

import {
  makeStyles,
  createStyles,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  LinearProgress,
} from '@material-ui/core';
import { DialogProps } from '@material-ui/core/Dialog';
import { TransitionProps } from '@material-ui/core/transitions';

const useStyles = makeStyles(theme =>
  createStyles({
    paper: { maxWidth: 365 },

    linearProgress: { margin: '42px 0' },
  })
);

const Transition = React.forwardRef<unknown, TransitionProps>(
  function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  }
);

interface IChangePasswordDialogProps {
  open: DialogProps['open'];
  handleClose: () => void;
  loading: boolean;
  errorMessage?: string;
}

const ChangePasswordDialog: React.FunctionComponent<
  IChangePasswordDialogProps
> = ({ open, handleClose, loading, errorMessage }) => {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      onClose={handleClose}
      maxWidth={false}
      classes={{ paper: classes.paper }}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      disableBackdropClick
      disableEscapeKeyDown
    >
      <DialogTitle id="alert-dialog-slide-title">
        {loading
          ? 'Sending password reset email…'
          : errorMessage
          ? 'Something went wrong'
          : 'Password reset email sent'}
      </DialogTitle>

      <DialogContent>
        {loading ? (
          <LinearProgress className={classes.linearProgress} />
        ) : (
          <DialogContentText id="alert-dialog-slide-description">
            {errorMessage ||
              'We sent you an email to reset your password. Don’t forget to check your spam folder!'}
          </DialogContentText>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="primary" disabled={loading}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordDialog;
