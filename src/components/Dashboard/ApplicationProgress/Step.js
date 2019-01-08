import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import DoneIcon from '@material-ui/icons/Done';
import { STEP_LABELS, PROCESS_TYPES } from '../../../constants/signUpProcess';
import {
  UPLOAD_RESUME,
  BUILD_RESUME,
  DASHBOARD,
} from '../../../constants/routes';
const styles = theme => ({
  root: {
    height: 30,
    width: 215,
    cursor: 'pointer',
    [theme.breakpoints.up('md')]: {
      width: 215,
    },
    [theme.breakpoints.up('xs')]: {
      width: '90%',
    },
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
  label: {
    '&hover': {},
  },
  incomplete: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#D8D8D8',
  },
  complete: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: theme.palette.primary.light,
  },
  doneIcon: {
    paddingTop: 2,
    paddingLeft: 1,
    marign: 'auto',
    fontSize: 17,
    color: '#fff',
  },
});
function Step(props) {
  const { classes, label, process, goTo, isComplete } = props;
  const completedIndicator = (
    <div className={classes.complete}>
      <DoneIcon className={classes.doneIcon} />
    </div>
  );
  const incompletedIndicator = <div className={classes.incomplete} />;
  let route = DASHBOARD + '#basic';
  if (process) {
    if (process === 'submit') {
      route = '/profile';
    } else {
      route = `${
        process === PROCESS_TYPES.build ? BUILD_RESUME : UPLOAD_RESUME
      }?step=${STEP_LABELS[props.process].indexOf(label)}`;
    }
  }
  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      className={classes.root}
      onClick={() => {
        goTo(route);
      }}
    >
      <Typography className={classes.label} variant="subheading">
        {label}
      </Typography>
      {isComplete ? completedIndicator : incompletedIndicator}
    </Grid>
  );
}

Step.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Step);
