import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    color: theme.palette.primary.main,
    cursor: 'pointer',

    '&:hover': { textDecoration: 'underline' },
  },
});

function ButtonLink(props) {
  const { classes, className, children, onClick } = props;

  return (
    <Typography
      variant="body1"
      onClick={onClick ? onClick : () => {}}
      className={classNames(classes.root, className)}
    >
      {children}
    </Typography>
  );
}

ButtonLink.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

export default withStyles(styles)(ButtonLink);
