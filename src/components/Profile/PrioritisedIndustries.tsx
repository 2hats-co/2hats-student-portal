import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import equals from 'ramda/es/equals';

import {
  makeStyles,
  createStyles,
  FormControl,
  FormGroup,
  FormControlLabel,
  Switch,
  Typography,
} from '@material-ui/core';

import useDebounce from '@bit/twohats.common.use-debounce';
import { useUser } from 'contexts/UserContext';
import { INDUSTRIES, INDUSTRY_DISPLAY_NAMES } from 'constants/cards';
import { saveDeprioritisedIndustries } from 'utilities/profile';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 300,
      display: 'flex',
    },
    centred: { margin: 'auto' },

    label: {
      justifyContent: 'space-between',
      marginLeft: theme.spacing(-1),
    },

    switch: { left: theme.spacing(-0.25) },
  })
);

export interface PrioritisedIndustriesProps {
  /** Whether or not to horizontally centre the switches */
  centred?: boolean;
}

/**
 * Handles saving the user’s preferred/prioritised industries to their
 * profile document using MUI switches.
 */
const PrioritisedIndustries: React.FC<PrioritisedIndustriesProps> = ({
  centred = false,
}) => {
  const classes = useStyles();
  const { user } = useUser();

  const defaultPrioritised: { [industry: string]: boolean } = {};
  // Set everything to prioritised, by default
  Object.values(INDUSTRIES).map(x => (defaultPrioritised[x] = true));
  // Get deprioritised industries from user doc
  if (user.deprioritisedIndustries)
    user.deprioritisedIndustries.forEach(
      (x: string) => (defaultPrioritised[x] = false)
    );

  const [prioritised, setPrioritised] = useState(defaultPrioritised);
  // Updates the prioritised list
  const handleChange = (name: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setPrioritised(prev => ({ ...prev, [name]: event.target.checked }));

  // Debounce the prioritised list to prevent calling Firestore too many times
  const debouncedPrioritised = useDebounce(prioritised, 500);
  // Transform prioritised object to a list of deprioritisedIndustries
  useEffect(() => {
    const deprioritisedIndustries = Object.keys(debouncedPrioritised).reduce(
      (acc: string[], cur: string) => {
        // If false, i.e. not prioritised, add to the list
        if (!debouncedPrioritised[cur]) return [...acc, cur];
        return acc;
      },
      []
    );

    if (!equals(deprioritisedIndustries, user.deprioritisedIndustries))
      saveDeprioritisedIndustries(user.id, deprioritisedIndustries)
        .then(() =>
          console.log(
            'Saved user deprioritised industries',
            deprioritisedIndustries
          )
        )
        .catch((e: any) =>
          console.error('Failed to save user deprioritised industries' + e)
        );
  }, [debouncedPrioritised]);

  return (
    <FormControl
      component="fieldset"
      className={clsx(classes.root, centred && classes.centred)}
    >
      <FormGroup>
        {Object.values(INDUSTRIES).map(x => (
          <FormControlLabel
            key={x}
            value={x}
            control={
              <Switch
                color="primary"
                checked={prioritised[x]}
                onChange={handleChange(x)}
                className={classes.switch}
              />
            }
            label={
              <Typography variant="overline">
                {INDUSTRY_DISPLAY_NAMES[x]}
              </Typography>
            }
            labelPlacement="start"
            className={classes.label}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default PrioritisedIndustries;
