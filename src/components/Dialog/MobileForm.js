import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

import List from '@material-ui/core/List';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/CloseRounded';
import Slide from '@material-ui/core/Slide';

import LinearProgress from '@material-ui/core/LinearProgress';

const styles = theme => ({
  toolbar: {
    padding: `0 ${theme.spacing.unit / 2}px`,
  },
  title: {
    flex: 1,
    paddingLeft: theme.spacing.unit * 1.5,
  },
  fields: {
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`,
    paddingTop: theme.spacing.unit * (3 + 7),
  },
  loading: {
    //position:'absolute',
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function MobileForm(props) {
  const {
    isLoading,
    classes,
    // activity,
    title,
    children,
    open,
    addHandler,
    disabled,
    cancelHandler,
  } = props;

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={cancelHandler}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            color="inherit"
            onClick={cancelHandler}
            aria-label="Close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.title}>
            {title}
          </Typography>
          <Button color="inherit" onClick={addHandler} disabled={disabled}>
            Save
          </Button>
        </Toolbar>
      </AppBar>
      <LinearProgress
        className={classes.loading}
        style={isLoading ? {} : { display: 'none' }}
      />
      <List className={classes.fields}>{children}</List>
    </Dialog>
  );
}
MobileForm.protoTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.boolean,
  activity: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(MobileForm);
