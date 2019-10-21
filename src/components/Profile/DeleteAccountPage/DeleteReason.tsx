import React, { useState, useEffect } from 'react';

import {
  makeStyles,
  createStyles,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
  TextField,
  Grow,
} from '@material-ui/core';
import HelpIcon from '@material-ui/icons/HelpOutline';

import HeadingCaps from '@bit/twohats.common.components.heading-caps';
import Autosave from './Autosave';

import { AccountDeletedComponentProps } from 'containers/AccountDeletedContainer';
import { useUser } from 'contexts/UserContext';
import { updateDoc } from 'utilities/firestore';
import { COLLECTIONS } from '@bit/twohats.common.constants';

const useStyles = makeStyles(theme =>
  createStyles({
    root: { width: '100%' },

    privacyButton: {
      margin: theme.spacing(-1.5),
      marginLeft: theme.spacing(-0.5),
    },

    otherTextField: {
      marginLeft: theme.spacing(5),
      width: `calc(100% - ${theme.spacing(5)}px)`,
    },
  })
);

/**
 * Displays a list of radio buttons for predefined reasons why the user is
 * deleting their account. Also provides an option for an “other” reason.
 *
 * This information is saved in the user’s `userDeleteRequests` document, using
 * `Autosave`.
 */
const DeleteReason: React.FunctionComponent<AccountDeletedComponentProps> = ({
  userDeleteRequestDoc,
}) => {
  const classes = useStyles();
  const { UID } = useUser();

  const DELETE_OPTIONS = [
    {
      value: 'I have a duplicate account',
      label: 'I have a duplicate account',
    },
    {
      value: 'I was recently hired somewhere else',
      label: 'I was recently hired somewhere else',
    },
    {
      value: 'I received too many emails',
      label: 'I received too many emails',
    },
    {
      value: 'I’m worried about privacy',
      label: (
        <>
          I’m worried about privacy&nbsp;
          <IconButton
            color="primary"
            className={classes.privacyButton}
            component="a"
            href="https://www.2hats.com.au/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            <HelpIcon fontSize="small" />
          </IconButton>
        </>
      ),
    },
  ];
  const DELETE_REASONS = DELETE_OPTIONS.map(item => item.value);

  // Get the initial values for `value` and `otherReason`
  let initialValue = '';
  let initialOtherReason = '';
  if (userDeleteRequestDoc.reason && userDeleteRequestDoc.reason.length > 0) {
    if (DELETE_REASONS.includes(userDeleteRequestDoc.reason)) {
      initialValue = userDeleteRequestDoc.reason;
    } else {
      initialValue = 'other';
      initialOtherReason = userDeleteRequestDoc.reason;
    }
  }

  // The `value` passed to the radio buttons
  const [value, setValue] = useState(initialValue);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  // The value of the other reason textbox
  const [otherReason, setOtherReason] = useState(initialOtherReason);

  // Callback passed down to `Autosave`. Updates the `userDeleteRequests` doc
  // if value is not empty and if different to what we’ve already stored.
  const handleSave = async (debouncedValue: string) => {
    if (debouncedValue.length === 0) return null;
    if (debouncedValue === userDeleteRequestDoc.reason) return null;

    try {
      await updateDoc(COLLECTIONS.userDeleteRequests, UID!, {
        reason: debouncedValue,
      });
      return { success: true };
    } catch (e) {
      console.error('Failed to save reason', e);
      return { success: false, message: e.message };
    }
  };

  return (
    <FormControl component="fieldset" className={classes.root}>
      <HeadingCaps component="legend">Why Are You Leaving?</HeadingCaps>

      <RadioGroup
        aria-label="Why Are You Leaving?"
        name="deleteReason"
        value={value}
        onChange={handleChange}
      >
        {DELETE_OPTIONS.map(item => (
          <FormControlLabel key={item.value} control={<Radio />} {...item} />
        ))}

        <FormControlLabel value="other" control={<Radio />} label="Other" />
      </RadioGroup>

      {value === 'other' && (
        <Grow in>
          <TextField
            autoFocus
            variant="filled"
            hiddenLabel
            aria-label="Other Reason"
            placeholder="Please specify why you are leaving…"
            className={classes.otherTextField}
            value={otherReason}
            onChange={e => setOtherReason(e.target.value)}
          />
        </Grow>
      )}

      <Autosave
        valueToDebounce={value === 'other' ? otherReason : value}
        callback={handleSave}
      />
    </FormControl>
  );
};

export default DeleteReason;
