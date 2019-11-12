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
import {
  getDeprioritisedIndustries,
  saveDeprioritisedIndustries,
} from 'utilities/profile';

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

    onlyOneIndustryPrioritised: { marginTop: theme.spacing(2) },
  })
);

export interface PrioritisedIndustriesProps {
  /** Whether or not to horizontally centre the switches */
  centred?: boolean;
}

/**
 * Handles saving the user’s preferred/prioritised industries to their
 * profile document using MUI switches.
 *
 * TODO: Convert this to a Formik field component
 */
const PrioritisedIndustries: React.FC<PrioritisedIndustriesProps> = ({
  centred = false,
}) => {
  const classes = useStyles();
  const { user, UID } = useUser();

  const defaultPrioritised: { [industry: string]: boolean } = {};
  // Set everything to prioritised, by default
  Object.values(INDUSTRIES).map(x => (defaultPrioritised[x] = true));
  // Get deprioritised industries from user doc
  if (user!.deprioritisedIndustries)
    user!.deprioritisedIndustries.forEach(
      (x: string) => (defaultPrioritised[x] = false)
    );

  const [prioritised, setPrioritised] = useState(defaultPrioritised);
  // Updates the prioritised list
  const handleChange = (name: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setPrioritised(prev => ({ ...prev, [name]: event.target.checked }));

  // Debounce the prioritised list to prevent calling Firestore too many times
  const debouncedPrioritised = useDebounce(prioritised, 500);

  // After the debounce has completed, save it to the user document if there are any changes
  useEffect(() => {
    // Transform prioritised object to a list of deprioritisedIndustries
    const deprioritisedIndustries = getDeprioritisedIndustries(
      debouncedPrioritised
    );

    if (!equals(deprioritisedIndustries, user!.deprioritisedIndustries))
      saveDeprioritisedIndustries(UID!, deprioritisedIndustries)
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

  // Store whether only one industry is prioritised at the moment
  const isOneIndustryPrioritised =
    getDeprioritisedIndustries(prioritised).length ===
    Object.keys(INDUSTRIES).length - 1;

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
                disabled={prioritised[x] && isOneIndustryPrioritised}
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

      {isOneIndustryPrioritised && (
        <Typography
          variant="overline"
          color="textSecondary"
          className={classes.onlyOneIndustryPrioritised}
        >
          You must pick at least one field of interest
        </Typography>
      )}
    </FormControl>
  );
};

export default PrioritisedIndustries;
