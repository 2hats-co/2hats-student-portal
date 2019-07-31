import React, { useState } from 'react';
import clsx from 'clsx';
import ReactRouterPause from '@allpro/react-router-pause';

import {
  makeStyles,
  createStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grow,
  Button,
} from '@material-ui/core';
import { fade } from '@material-ui/core/styles';
import { TransitionProps } from '@material-ui/core/transitions';
import { DialogProps } from '@material-ui/core/Dialog';

const useStyles = makeStyles(theme =>
  createStyles({
    backdrop: { backgroundColor: fade(theme.palette.background.default, 0.9) },
    scrollPaper: { alignItems: 'flex-start' },
    dialogPaper: { margin: theme.spacing(0, 1, 1) },
  })
);

const Transition = React.forwardRef<unknown, TransitionProps>(
  function Transition(props, ref) {
    return <Grow ref={ref} style={{ transformOrigin: '50% 0 0' }} {...props} />;
  }
);

export type DialogCustomProps = {
  open: boolean;
  /** Continues with the navigation */
  cancel?: () => Promise<any>;
  /** Stay on the same page */
  resume?: () => Promise<any>;
  /**  */
  redirect?: (route: string) => Promise<any>;
  onClose?: () => Promise<any>;
};

interface IDialogPromptProps {
  /** Contents to display in the dialog prompt */
  children?: (dialogCustomProps: DialogCustomProps) => React.ReactNode;
  /** Set `when` to false to temp disable RRP; alternative to conditional rendering */
  when?: boolean;
  /** Optional overrides for the Dialog component props */
  DialogProps?: Partial<DialogProps>;
  /** Optional class overrides */
  classes?: {
    scrollPaper?: string;
    dialogPaper?: string;
  };
}

const DialogPrompt: React.FunctionComponent<IDialogPromptProps> = ({
  children,
  when = true,
  DialogProps,
  classes = {},
}) => {
  const defaultClasses = useStyles();

  const [dialogCustomProps, setDialogCustomProps] = useState<DialogCustomProps>(
    { open: false }
  );

  const handleNavigationAttempt = (navigation: any, location: any) => {
    console.log('navigation attempt');

    const close = () =>
      new Promise((resolve, reject) => {
        setDialogCustomProps({ open: false });
        resolve();
      });

    // If form is not dirty, then ALLOW navigation
    // return true // allow navigation

    setDialogCustomProps({
      open: true,
      cancel: () => close().then(() => navigation.cancel()),
      resume: () => close().then(() => navigation.resume()),
      redirect: route => close().then(() => navigation.push(route)),
      onClose: () => close(),
    });
    return null; // null = PAUSE navigation
    // navigation.pause() - Can also use method to signal pause
  };

  const defaultMessage = (
    <>
      <DialogTitle id="alert-dialog-slide-title">
        Are you sure you want to leave?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          You may have unsaved changes that will be lost.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={dialogCustomProps.resume} color="primary">
          Leave
        </Button>
        <Button onClick={dialogCustomProps.cancel} color="primary">
          Stay
        </Button>
      </DialogActions>
    </>
  );

  return (
    <>
      <ReactRouterPause handler={handleNavigationAttempt} when={when} />

      <Dialog
        TransitionComponent={Transition}
        keepMounted
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        BackdropProps={{ classes: { root: defaultClasses.backdrop } }}
        classes={{
          scrollPaper: clsx(defaultClasses.scrollPaper, classes.scrollPaper),
          paper: clsx(defaultClasses.dialogPaper, classes.dialogPaper),
        }}
        open={false}
        {...dialogCustomProps}
        {...DialogProps}
      >
        {children ? children(dialogCustomProps) : defaultMessage}
      </Dialog>
    </>
  );
};

export default DialogPrompt;
