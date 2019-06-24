import React from 'react';
import clsx from 'clsx';
import { withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

import Button from '@material-ui/core/Button';
import BackIcon from '@material-ui/icons/ArrowBackIos';

const styles = theme => ({
  root: {
    [theme.breakpoints.up('lg')]: { position: 'relative' },
  },
  backIcon: { margin: '0 !important' },
});

const BackButton = props => {
  return null;
  // const { classes, className, history } = props;

  // return (
  //   <Button
  //     id="back"
  //     onClick={() => {
  //       history.goBack();
  //     }}
  //     color="primary"
  //     className={clsx(classes.root, className)}
  //   >
  //     <BackIcon className={classes.backIcon} />
  //     Back
  //   </Button>
  // );
};

export default withRouter(withStyles(styles)(BackButton));
