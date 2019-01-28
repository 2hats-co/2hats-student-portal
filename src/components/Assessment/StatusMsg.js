import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import grey from '@material-ui/core/colors/grey';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

const styles = theme => ({
  root: {
    backgroundColor: grey[200],
    borderRadius: theme.shape.borderRadius / 2,
    border: `1px solid ${grey[400]}`,
    marginTop: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
  },
  icon: { marginRight: theme.spacing.unit },
  title: { marginTop: theme.spacing.unit / 4 },

  passed: {
    backgroundColor: green[50],
    borderColor: green[200],
    '& *': { color: green[800] },
  },
  failed: {
    backgroundColor: red[50],
    borderColor: red[200],
    '& *': { color: red[800] },
  },
});

const StatusMsg = props => {
  const { classes, Icon, title, body } = props;

  return (
    <Grid
      container
      className={classNames(
        classes.root,
        title === 'Passed' && classes.passed,
        title === 'Failed' && classes.failed
      )}
      alignItems="flex-start"
    >
      <Grid item>
        <Icon className={classes.icon} fontSize="large" />
      </Grid>
      <Grid item xs>
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
        <Typography variant="body1">{body}</Typography>
      </Grid>
    </Grid>
  );
};

StatusMsg.propTypes = {
  classes: PropTypes.object.isRequired,
  Icon: PropTypes.func.isRequired,
  title: PropTypes.node.isRequired,
  body: PropTypes.node,
};

export default withStyles(styles)(StatusMsg);
