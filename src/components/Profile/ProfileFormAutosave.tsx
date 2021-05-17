import React, { useEffect, useState, useContext } from 'react';
import reject from 'ramda/es/reject';
import isNil from 'ramda/es/isNil';
import equals from 'ramda/es/equals';
import { FormikState } from 'formik';

import { makeStyles, createStyles, Snackbar } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import useDebounce from '@bit/twohats.common.use-debounce';
import { useUser } from 'contexts/UserContext';
import { COLLECTIONS } from '@bit/twohats.common.constants';
import { updateDoc } from 'utilities/firestore';

import { SnackContext } from '../../snackContext';

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

interface IProfileFormAutosaveProps {
  values: any;
  errors: FormikState<any>['errors'];
  profileData: { [key: string]: any };
}

/**
 * Handles autosaving [`ProfileForm`](#profileform). Displays `Snackbar` on save
 *
 * Will update the user’s Profile document and if they update their first
 * or last names, will also update their User document and Firebase Auth profile
 *
 * TODO: Remove this component and use `Form/Autosave` instead
 */
const ProfileFormAutosave: React.FunctionComponent<
  IProfileFormAutosaveProps
> = ({ profileData, ...propsToDebounce }) => {
  const classes = useStyles();
  const snack = useContext(SnackContext);

  const { user, UID, authUser } = useUser();
  // Store a copy of values, errors that only updates every 1s (1000ms)
  const debouncedProps = useDebounce(JSON.stringify(propsToDebounce), 1000);

  // The main logic that updates the Profile document
  // and if the first or last name changes, both the User document and
  // their Firebase Auth profile
  useEffect(() => {
    const { values, errors } = JSON.parse(debouncedProps);

    // Make a clone of the values object, from which we will delete properties
    // But copy only fields that are not undefined
    const filteredValues: { [key: string]: any } = reject(isNil, values);
    // Delete the properties of filteredValues that have errors
    Object.keys(errors).forEach(key => delete filteredValues[key]);
    // If jobAvailabilityStartDate is present, convert it back to a date
    if ('jobAvailabilityStartDate' in filteredValues)
      try {
        filteredValues.jobAvailabilityStartDate = new Date(
          filteredValues.jobAvailabilityStartDate
        );
      } catch (e) {
        console.error('jobAvailabilityStartDate is not a date', e);
      }

    // If firstName/lastName changed, update the User document
    // and Firebase Auth profile’s displayName
    if (
      !!filteredValues.firstName &&
      !!filteredValues.lastName &&
      user &&
      authUser &&
      (user.firstName !== filteredValues.firstName ||
        user.lastName !== filteredValues.lastName ||
        authUser.displayName !==
          `${filteredValues.firstName} ${filteredValues.lastName}`)
    ) {
      updateDoc(COLLECTIONS.users, UID!, {
        firstName: filteredValues.firstName,
        lastName: filteredValues.lastName,
      }).then(() => console.log('Updated user first and last name'));

      authUser
        .updateProfile({
          displayName: `${filteredValues.firstName} ${filteredValues.lastName}`,
        })
        .then(() => console.log('Updated auth displayName'));
    }

    // Otherwise, update the user’s profile document
    // if there are changes to be made
    Object.keys(filteredValues).forEach(key => {
      if (
        key in profileData &&
        equals(
          typeof profileData[key] === 'object' && 'toDate' in profileData[key]
            ? profileData[key].toDate()
            : profileData[key],
          filteredValues[key]
        )
      )
        delete filteredValues[key];
    });

    if (Object.keys(filteredValues).length > 0) {
      // updateDoc(COLLECTIONS.profiles, UID!, filteredValues).then(() =>
      console.log('Updated user profile', filteredValues);
      // And show the snackbar
      setOpenSnackbar(true);
      snack.open({ message: 'TEST' });
    }
    // );
  }, [debouncedProps]);

  // Open/close snackbar when saved successfully
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const handleClose = () => setOpenSnackbar(false);

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={openSnackbar}
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
          <CheckCircleIcon className={classes.icon} />
          <span id="message-id">Changes saved</span>
        </>
      }
    />
  );
};

export default ProfileFormAutosave;
