import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
const styles = theme => ({
  root: {},
  content: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  actions: {},
  grid: {
    paddingTop: theme.spacing.unit / 2,
    // paddingLeft: theme.spacing.unit * 3,
    // paddingRight: theme.spacing.unit * 3,
  },
  loading: {
    position: 'absolute',
    top: 0,
  },
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

function WebForm(props) {
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
    width,
    unChanged,
  } = props;

  return (
    <Dialog
      className={classes.root}
      open={open}
      onClose={unChanged ? cancelHandler : () => {}}
      aria-labelledby="form-dialog-title"
      TransitionComponent={Transition}
    >
      <LinearProgress
        className={classes.loading}
        style={isLoading ? {} : { display: 'none' }}
      />
      <DialogTitle id="form-dialog-title">
        {props.hideActivityFromTitle ? null : activity} {title}
      </DialogTitle>
      <DialogContent>
        <Grid
          container
          className={classes.grid}
          style={width ? { maxWidth: width } : {}}
          direction="column"
          justify="flex-start"
        >
          {children}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button id="dialog-cancel" color="primary" onClick={cancelHandler}>
          Cancel
        </Button>
        <Button
          id="dialog-activity"
          variant="contained"
          color="primary"
          disabled={disabled}
          style={{ textTransform: 'capitalize' }}
          onClick={addHandler}
        >
          {activity === 'Edit' ? 'Save' : activity}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
WebForm.protoTypes = {
  title: PropTypes.string.isRequired,
  activity: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  open: PropTypes.boolean,
};

export default withStyles(styles)(WebForm);
