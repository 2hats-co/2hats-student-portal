import React, { useEffect, useState } from 'react';

import { makeStyles, createStyles, Snackbar } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';

import useDebounce from '@bit/twohats.common.use-debounce';

const useStyles = makeStyles(theme =>
  createStyles({
    snackbarRoot: { cursor: 'pointer' },

    message: {
      display: 'flex',
      alignItems: 'center',
    },
    icon: { marginRight: theme.spacing(0.75) },
  })
);

export type CallbackReturnType = { success: boolean; message?: string } | null;

export interface IAutosaveProps {
  valueToDebounce: any;
  delay?: number;
  callback: (debouncedValue: any) => Promise<CallbackReturnType>;
  successMessage?: React.ReactNode;
}

/**
 * Debounces a value, which is then passed to a callback.
 * The callback can then write to the database and returns if successful or not.
 * On success, displays a snackbar.
 */
const Autosave: React.FunctionComponent<IAutosaveProps> = ({
  valueToDebounce,
  delay = 1000,
  callback,
  successMessage = 'Changes saved',
}) => {
  const classes = useStyles();

  // Store a copy of values, errors that only updates every 1s (1000ms)
  const debouncedValue = useDebounce(valueToDebounce, delay);

  useEffect(() => {
    callback(debouncedValue).then(result => {
      setSnackbar(null);
      setSnackbar(result);
    });
  }, [debouncedValue]);

  // Open/close snackbar when saved successfully
  const [snackbar, setSnackbar] = useState<CallbackReturnType>(null);
  const handleClose = () => setSnackbar(null);

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={!!snackbar}
      autoHideDuration={3000}
      onClose={handleClose}
      onClick={handleClose}
      classes={{ root: classes.snackbarRoot }}
      ContentProps={{
        'aria-describedby': 'message-id',
        classes: { message: classes.message },
      }}
      message={
        <>
          {snackbar && !snackbar.success ? (
            <ErrorIcon className={classes.icon} />
          ) : (
            <CheckCircleIcon className={classes.icon} />
          )}
          <span id="message-id">
            {(snackbar && snackbar.message) || successMessage}
          </span>
        </>
      }
    />
  );
};

export default Autosave;
