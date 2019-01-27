import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/CloseRounded';
import Slide from '@material-ui/core/Slide';

import LinearProgress from '@material-ui/core/LinearProgress';

const styles = theme => ({
  toolbar: {
    paddingLeft: theme.spacing.unit / 2,
    paddingRight: theme.spacing.unit * 1.5,
  },
  activity: { textTransform: 'capitalize' },
  title: {
    flex: 1,
    paddingLeft: theme.spacing.unit * 1.5,

    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  fields: {
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`,
    paddingTop: theme.spacing.unit * (3 + 7),
  },
  loading: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },

  bottomButtonWrapper: {
    padding: `0 ${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px`,
    '& button': { borderRadius: theme.spacing.unit * 4 },
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function MobileForm(props) {
  const {
    isLoading,
    classes,
    activity,
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
      <AppBar color="default">
        <Toolbar className={classes.toolbar}>
          <IconButton
            id="dialogue-close"
            onClick={cancelHandler}
            aria-label="Close"
            color="primary"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.title}>
            <span class={classes.activity}>{activity}</span> {title}
          </Typography>
          <Button
            id={`dialog-save-${disabled}`}
            onClick={addHandler}
            disabled={disabled}
            variant="contained"
            color="primary"
          >
            Done
          </Button>
          {isLoading && <LinearProgress className={classes.loading} />}
        </Toolbar>
      </AppBar>
      <div className={classes.fields}>{children}</div>

      <div className={classes.bottomButtonWrapper}>
        <Button
          id={`dialog-save-${disabled}`}
          onClick={addHandler}
          disabled={disabled}
          variant="contained"
          color="primary"
          size="large"
        >
          Done
        </Button>
      </div>
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
