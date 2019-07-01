import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import BackIcon from '@material-ui/icons/ArrowBackIos';

import { HistoryContext } from 'contexts/HistoryContext';
import {
  getDisplayName,
  getBackButtonRoute,
  hideBackButton,
} from 'utilities/routing';

const useStyles = makeStyles(theme => ({
  desktop: { margin: theme.spacing(-1, 2, 2) },
  mobile: { margin: 0 },

  backIcon: { margin: '0 !important' },
}));

/**
 * Back button displayed as part of [`Navigation`](#navigation) or
 * [`MobileTopBar`](#mobiletopbar).
 *
 * Uses `getBackButtonRoute` to get proper back button route.
 *
 * ### Back vs. up
 *
 * Because of the [caveat in `HistoryProvider`](#caveat), this button can act
 * like an “up” button. If the current path is a detailed view, it will show
 * a button to go to the upper level (cards view). See `getBackButtonRoute` in
 * `utilities/routing` for details.
 */
const BackButton = ({ history, location, isMobile }) => {
  const classes = useStyles();

  const historyStack = useContext(HistoryContext);
  const backButtonRoute = getBackButtonRoute(historyStack, location);

  if (hideBackButton(historyStack, location)) return null;

  return (
    <Button
      id="back"
      onClick={() => {
        backButtonRoute === 'back'
          ? history.goBack()
          : history.replace({
              pathname: backButtonRoute,
              state: { artificialBack: true },
            });
      }}
      color="primary"
      className={isMobile ? classes.mobile : classes.desktop}
    >
      <BackIcon className={classes.backIcon} />
      {getDisplayName(
        backButtonRoute === 'back'
          ? historyStack[historyStack.length - 2].pathname
          : backButtonRoute
      )}
    </Button>
  );
};

BackButton.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

export default withRouter(BackButton);
