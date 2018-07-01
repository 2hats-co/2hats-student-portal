import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {PRIMARYCOLOR} from '../Theme'
// 1. We define the styles.
const styles = theme => ({
  root: {
    fontSize:'12px',
    color: PRIMARYCOLOR,
    textDecoration: 'inherit',
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer'
    },
  },
  primary: {
    color: theme.palette.primary.main,
  },
});

function StyledLink(props) {
  const { children, classes, className, variant, ...other } = props;

  return (
    <a
      className={classNames(
        classes.root,
        {
          [classes.primary]: variant === 'primary',
        },
        className,
      )}
      {...other}
    >
      {children}
    </a>
  );
}

StyledLink.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['primary']),
};

// 2. We inject the styles.
export default withStyles(styles)(StyledLink);