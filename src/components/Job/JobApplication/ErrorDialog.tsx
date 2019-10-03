import React from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Grow,
} from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';

const Transition = React.forwardRef<unknown, TransitionProps>(
  function Transition(props, ref) {
    return <Grow ref={ref} {...props} />;
  }
);

interface IErrorDialogProps {
  /** Shows/hides the dialog */
  open: boolean;
  /** Handles closing the dialog */
  handleClose: () => void;
  /** A list of fields that have errors */
  erroredFields: string[];
}

/**
 * Displays a dialog when the user attempts to submit but some fields have
 * errors. The parent component handles the open/close state
 */
const ErrorDialog: React.FunctionComponent<IErrorDialogProps> = ({
  open,
  handleClose,
  erroredFields,
}) => (
  <Dialog
    open={open}
    onClose={handleClose}
    TransitionComponent={Transition}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">
      There’s something wrong with your application
    </DialogTitle>

    <DialogContent>
      <DialogContentText id="alert-dialog-description" component="div">
        <ul>
          {erroredFields.map(x => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </DialogContentText>
    </DialogContent>

    <DialogActions>
      <Button onClick={handleClose} color="primary" autoFocus>
        OK
      </Button>
    </DialogActions>
  </Dialog>
);

export default ErrorDialog;
