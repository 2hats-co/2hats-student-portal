import React from 'react';

import { makeStyles } from '@material-ui/styles';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  divider: { margin: theme.spacing(1.5, 1) },
}));

const SidebarDivider = props => {
  const classes = useStyles();

  return <Divider className={classes.divider} />;
};

export default SidebarDivider;
