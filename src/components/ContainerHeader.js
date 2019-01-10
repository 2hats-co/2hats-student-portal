import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    padding: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 4}px`,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing.unit * 10,
    },
  },
  title: {
    fontWeight: 500,
    display: 'block',
  },
  subtitle: {
    marginTop: theme.spacing.unit * 1.5,
    fontWeight: 400,
    display: 'block',
  },
});

function ContainerHeader(props) {
  const { classes, title, subtitle } = props;

  return (
    <header className={classes.root}>
      <Typography variant="h3" className={classes.title}>
        {title}
      </Typography>
      <Typography variant="h5" className={classes.subtitle}>
        {subtitle}
      </Typography>
    </header>
  );
}

ContainerHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.node.isRequired,
  subtitle: PropTypes.node,
};

export default withStyles(styles)(ContainerHeader);
