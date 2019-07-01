import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import { Grid, IconButton, Typography } from '@material-ui/core';
import BackIcon from '@material-ui/icons/ArrowBackOutlined';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: 40,

    borderRadius: 1000,
    border: `1px solid ${theme.palette.divider}`,

    marginBottom: theme.spacing(2.5),
  },

  backButton: {
    width: 32,
    height: 32,
    marginLeft: theme.spacing(0.5),
    padding: 0,
  },

  email: {
    marginLeft: theme.spacing(0.5),
    color: theme.palette.text.primary,
    maxWidth: '75%',

    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

const BackBar = ({ isLoading, email, backHandler }) => {
  const classes = useStyles();

  return (
    <Grid
      key="back-bar"
      className={classes.root}
      container
      direction="row"
      alignItems="center"
      justify="flex-start"
    >
      <IconButton
        disabled={isLoading}
        aria-label="back"
        className={classes.backButton}
        id="back-to-email"
        onClick={backHandler}
      >
        <BackIcon />
      </IconButton>
      <Typography
        variant={email.length < 30 ? 'body2' : 'caption'}
        className={classes.email}
      >
        {email}
      </Typography>
    </Grid>
  );
};

BackBar.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  email: PropTypes.node.isRequired,
  backHandler: PropTypes.func.isRequired,
};

export default BackBar;
