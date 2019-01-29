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
  activity: { textTransform: 'capitalize' },
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

  dialogContent: {
    paddingBottom: 0,
    position: 'relative',
    zIndex: 1,
    background: `${theme.palette.background.paper} no-repeat`,
    backgroundImage:
      theme.palette.type === 'dark'
        ? 'linear-gradient(to bottom, rgba(0,0,0,.5), rgba(0,0,0,0)), linear-gradient(to top, rgba(0,0,0,.5), rgba(0,0,0,0))'
        : 'linear-gradient(to bottom, rgba(0,0,0,.1), rgba(0,0,0,0)), linear-gradient(to top, rgba(0,0,0,.1), rgba(0,0,0,0))',
    backgroundPosition: `-${theme.spacing.unit * 3}px 0, -${theme.spacing.unit *
      3}px 100%`,
    backgroundSize: `calc(100% + ${theme.spacing.unit * 3}px) ${theme.spacing
      .unit * 2}px`,

    '&::before, &::after': {
      content: '""',
      position: 'relative',
      zIndex: -1,
      display: 'block',
      height: theme.spacing.unit * 4,
      margin: `0 -${theme.spacing.unit * 3}px -${theme.spacing.unit * 4}px`,
      background: `linear-gradient(to bottom, ${
        theme.palette.background.paper
      }, ${theme.palette.background.paper} 30%, rgba(255, 255, 255, 0))`,
    },

    '&::after': {
      marginTop: -theme.spacing.unit * 4,
      marginBottom: 0,
      background: `linear-gradient(to bottom, rgba(255, 255, 255, 0), ${
        theme.palette.background.paper
      } 70%, ${theme.palette.background.paper})`,
    },
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
        {props.hideActivityFromTitle ? null : (
          <span className={classes.activity}>{activity}</span>
        )}{' '}
        {title}
      </DialogTitle>
      <DialogContent classes={{ root: classes.dialogContent }}>
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
          id={`dialog-save-${disabled}`}
          variant="contained"
          color="primary"
          disabled={disabled}
          style={{ textTransform: 'capitalize' }}
          onClick={addHandler}
        >
          Done
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
