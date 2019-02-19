import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import green from '@material-ui/core/colors/green';

const styles = theme => ({
  root: {
    display: 'inline-flex',
    width: 'auto',
    position: 'relative',

    borderRadius: theme.shape.borderRadius / 2,
    padding: `${theme.spacing.unit / 2}px ${theme.spacing.unit * 1.5}px`,
    backgroundColor: theme.palette.divider,

    margin: theme.spacing.unit / 2,
  },

  colorPrimary: {
    backgroundColor: theme.palette.primary.light,
    '& *': { color: theme.palette.primary.main },
  },
  colorGreen: {
    backgroundColor: green[100],
    '& *': { color: green[800] },
  },

  label: {
    lineHeight: '1.25',
    fontWeight: 500,
  },
});

const SpecialLabel = props => {
  const { classes, className, label, color } = props;

  return (
    <div
      className={classNames(
        classes.root,
        color === 'primary' && classes.colorPrimary,
        color === 'green' && classes.colorGreen,
        className
      )}
    >
      <Typography variant="body1" className={classes.label}>
        {label}
      </Typography>
    </div>
  );
};

SpecialLabel.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default withRouter(withStyles(styles)(SpecialLabel));
