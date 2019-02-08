import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import PaddedIcon from '../PaddedIcon';

const styles = theme => ({
  root: {
    boxSizing: 'border-box',
    padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit}px`,
    margin: '0 auto',
    userSelect: 'none',

    [theme.breakpoints.down('xs')]: {
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2,
    },
  },
  title: {
    fontWeight: 400,
    display: 'block',
  },
  subtitle: {
    marginTop: theme.spacing.unit * 1.5,
    fontWeight: 400,
    display: 'block',
  },

  paddedIcon: {
    marginTop: -theme.spacing.unit / 2,
    marginLeft: -theme.spacing.unit / 2,
    marginRight: theme.spacing.unit * 2,
  },
});

function ContainerHeader(props) {
  const { classes, title, subtitle, maxWidth, icon } = props;

  return (
    <header className={classes.root} style={{ maxWidth }}>
      <Grid container wrap="nowrap" alignItems="flex-start">
        {icon && (
          <Grid item>
            <PaddedIcon className={classes.paddedIcon}>{icon}</PaddedIcon>
          </Grid>
        )}
        <Grid item xs>
          <Typography variant="h4" className={classes.title}>
            {title}
          </Typography>
          <Typography variant="h6" className={classes.subtitle}>
            {subtitle}
          </Typography>
        </Grid>
      </Grid>
    </header>
  );
}

ContainerHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.node.isRequired,
  subtitle: PropTypes.node,
  maxWidth: PropTypes.number,
  icon: PropTypes.node,
};

export default withStyles(styles)(ContainerHeader);
