import React from 'react';

import { makeStyles, createStyles, Divider } from '@material-ui/core';

const useStyles = makeStyles(theme =>
  createStyles({
    divider: { margin: theme.spacing(1.5, 1) },
  })
);

/**
 * MUI `Divider` with standard spacing to match design.
 * Chose to continue using MUI styles hook for consistency, despite all the
 * boilerplate required.
 */
const SidebarDivider: React.FunctionComponent = () => {
  const classes = useStyles();
  return <Divider className={classes.divider} />;
};

export default SidebarDivider;
