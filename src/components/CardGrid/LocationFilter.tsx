import React from 'react';
import clsx from 'clsx';
import { Formik, Field } from 'formik';

import { makeStyles, createStyles, Grid, Typography } from '@material-ui/core';

import Autosave from 'components/Form/Autosave';
import LocationField from 'components/FormikFields/LocationField';

import { useUser } from 'contexts/UserContext';
import {
  CARD_SPACING,
  CARD_COLS_WIDTHS,
  CARD_COLS_MEDIA_QUERIES,
} from 'constants/cards';
import { IS_MOBILE_QUERY } from 'constants/layout';
import { CITIES, CITIES_ALL_AU } from '@bit/twohats.common.constants';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: '100%',

      margin: '0 auto',
      marginBottom: theme.spacing(1),
      paddingRight: theme.spacing(CARD_SPACING / 8 / 2),

      // Push up when back button is visible
      'body.back-button &': {
        marginTop: -56,
        [IS_MOBILE_QUERY]: { marginTop: 0 },
      },
    },

    label: {
      marginRight: theme.spacing(1),
      marginTop: 2, // Optical adjustment
      userSelect: 'none',
    },

    // Prevent field getting larger when "All cities in Australia" is selected
    form: { minWidth: 205 },
  })
);

/**
 * Displays a Formik form that renders LocationField.
 *
 * ### IMPORTANT: This saves to global [`UserContext`](#usercontext)
 *
 * This was done because React Router was re-rendering
 * [`JobsContainer`](#jobscontainer), so the user would have to re-select
 * their job location filter.
 *
 * ### WARNING: This is not future-proof
 *
 * Currently, this only lets the user select one city or all available cities.
 * It will not be possible to let the user select more than one city (and
 * not select all cities) using Firestore queries, since there will need
 * to be a query created for each city the user selects.
 *
 * We may consider using Algolia to do this in the future, if this functionality
 * is required.
 */
const LocationFilter: React.FunctionComponent = () => {
  const classes = useStyles();
  const {
    profile,
    jobLocation: jobLocationFromContext,
    setJobLocation,
  } = useUser();

  // TODO: Remove this workaround when bit dbTypes is fixed
  const _profile = profile as { [key: string]: any };

  // TODO: Fix the edge case where the user updates their location on the
  // profile page after they’ve gone

  // Get initial location from profile. Default to showing all
  let initialLocation: typeof CITIES[number] = JSON.parse(CITIES_ALL_AU);
  // If we already have it set from context, use that
  if (!!jobLocationFromContext) initialLocation = jobLocationFromContext;
  // Try using locationWork
  else if (
    Array.isArray(_profile.locationWork) &&
    _profile.locationWork.length > 0
  ) {
    // If only one location, use that
    if (_profile.locationWork.length === 1)
      initialLocation = _profile.locationWork[0];
    // Otherwise, show all
    else if (_profile.locationWork.length > 1)
      initialLocation = JSON.parse(CITIES_ALL_AU);
  } else if (!!_profile.locationHome) {
    // Otherwise, use locationHome
    initialLocation = _profile.locationHome;
  }

  // On change, set location to global context and don’t show a snackbar
  const handleChange = async (debouncedValue: typeof CITIES[number]) => {
    setJobLocation!(debouncedValue);
    return null;
  };

  return (
    <Grid
      container
      justify="flex-end"
      alignItems="center"
      className={clsx(classes.root, 'width-fixed-cards-cols')}
    >
      <Grid item className={classes.label}>
        <Typography color="textSecondary">See jobs in</Typography>
      </Grid>

      <Grid item>
        <Formik
          initialValues={{ location: initialLocation }}
          onSubmit={() => {}}
          render={({ values }) => (
            <div className={classes.form}>
              <Autosave
                valueToDebounce={values.location}
                callback={handleChange}
                delay={0}
              />

              <Field
                name="location"
                component={LocationField}
                margin="dense"
                showAll
                showOther={false}
              />
            </div>
          )}
        />
      </Grid>
    </Grid>
  );
};

export default LocationFilter;
