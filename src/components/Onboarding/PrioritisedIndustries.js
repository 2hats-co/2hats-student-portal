import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import {
  FormControl,
  FormGroup,
  FormControlLabel,
  Switch,
  Typography,
} from '@material-ui/core';

import UserContext from 'contexts/UserContext';
import { INDUSTRIES, INDUSTRY_DISPLAY_NAMES } from 'constants/cards';

const useStyles = makeStyles(theme => ({
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
}));

const PrioritisedIndustries = ({ handleSave }) => {
  const classes = useStyles();
  const { user } = useContext(UserContext);

  const defaultPrioritised = {};
  // Set everything to prioritised, by default
  Object.values(INDUSTRIES).map(x => (defaultPrioritised[x] = true));
  // Get deprioritised industries from user doc
  if (user.deprioritisedIndustries)
    user.deprioritisedIndustries.forEach(x => (defaultPrioritised[x] = false));

  const [prioritised, setPrioritised] = useState(defaultPrioritised);
  const handleChange = name => event =>
    setPrioritised(prev => ({ ...prev, [name]: event.target.checked }));

  // Transform prioritised object to a list of deprioritisedIndustries
  useEffect(() => {
    const deprioritisedIndustries = Object.keys(prioritised).reduce(
      (acc, cur) => {
        // If false, i.e. not prioritised, add to the list
        if (!prioritised[cur]) return [...acc, cur];
        return acc;
      },
      []
    );

    handleSave(deprioritisedIndustries);
  }, [prioritised]);

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

PrioritisedIndustries.propTypes = {
  /** Handles how to save the data to the user doc. Can be used to show a
   * snackbar, for example. Receives a list of deprioritisedIndustries
   */
  handleSave: PropTypes.func.isRequired,
};

export default PrioritisedIndustries;
