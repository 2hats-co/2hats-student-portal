import React from 'react';

import {
  makeStyles,
  createStyles,
  useTheme,
  Grid,
  Typography,
} from '@material-ui/core';

import darkLogo from 'assets/images/curiousthing_dark.png';
import whiteLogo from 'assets/images/curiousthing_white.png';

import { externalLinkProps } from 'constants/curiousThing';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      userSelect: 'none',
      textDecoration: 'none',

      marginTop: theme.spacing(1.5),
    },

    logo: {
      userDrag: 'none',
      width: 100,
      height: 51,

      marginLeft: theme.spacing(1.5),
    },
  })
);

const CTPoweredBy: React.FunctionComponent = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.root}
      {...externalLinkProps}
      id="curious-thing-powered-by"
    >
      <Typography variant="subtitle2" color="textSecondary">
        Powered by
      </Typography>
      <img
        src={theme.palette.type === 'dark' ? whiteLogo : darkLogo}
        className={classes.logo}
      />
    </Grid>
  );
};

export default CTPoweredBy;
