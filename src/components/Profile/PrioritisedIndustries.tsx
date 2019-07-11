import React, { useState, useContext, useEffect } from 'react';

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
import UserContext from 'contexts/UserContext';
import { INDUSTRIES, INDUSTRY_DISPLAY_NAMES } from 'constants/cards';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 300,
      margin: 'auto',

      display: 'flex',
    },

    label: {
      justifyContent: 'space-between',
      marginLeft: 0,
    },
  })
);

export interface PrioritisedIndustriesProps {
  handleSave: (deprioritisedIndustries: string[]) => void;
}

const PrioritisedIndustries: React.FC<PrioritisedIndustriesProps> = ({
  handleSave,
}) => {
  const classes = useStyles();
  const { user } = useContext(UserContext);

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

    handleSave(deprioritisedIndustries);
  }, [debouncedPrioritised]);

  return (
    <FormControl component="fieldset" className={classes.root}>
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
