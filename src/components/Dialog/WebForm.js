import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
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
    paddingLeft: 40,
    paddingRight: 40,
  },
  loading: {
    position: 'absolute',
    top: 0,
  },
});

function WebForm(props) {
  const {
    isLoading,
    classes,
    activity,
    title,
    children,
    isOpen,
    addHandler,
    disabled,
    cancelHandler,
    width,
    unChanged,
  } = props;

  return (
    <Dialog
      className={classes.root}
      open={isOpen}
      onClose={unChanged && cancelHandler}
      aria-labelledby="form-dialog-title"
    >
      <LinearProgress
        className={classes.loading}
        style={isLoading ? {} : { display: 'none' }}
      />
      <DialogTitle
        style={{ paddingLeft: 40, paddingBottom: 0, paddingRight: 40 }}
        id="form-dialog-title"
      >
        {props.hideActivityFromTitle ? null : activity} {title}
      </DialogTitle>
      <DialogContent className={classes.content}>
        <Grid
          container
          className={classes.grid}
          style={{ maxWidth: width }}
          direction="column"
          justify="flex-start"
        >
          {children}
        </Grid>
      </DialogContent>
      <DialogActions style={{ padding: 10 }}>
        <Button variant="contained" onClick={cancelHandler}>
          Cancel
        </Button>
        <Button
          variant="contained"
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
  isOpen: PropTypes.boolean,
};

export default withStyles(styles)(WebForm);
