import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  root: {
    marginTop: 30,
    marginBottom: 10,
  },
  large: theme.typography.body1,
  link: {
    color: theme.palette.primary.light,
    textDecoration: 'inherit',
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  },
  primary: {
    color: theme.palette.primary.main,
  },
});

function Disclaimer(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <div className={classes.large}>
        {`By clicking Sign Up, you agree to our `}
        <a
          href="https://www.2hats.com.au/terms.html"
          target="_blank"
          className={classes.link}
        >
          Terms and Conditions
        </a>
        {` and `}
        <a
          href="https://www.2hats.com.au/privacy.html"
          target="_blank"
          className={classes.link}
        >
          Privacy Policy
        </a>
      </div>
    </div>
  );
}

Disclaimer.propTypes = {
  //  : PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  //variant: PropTypes.oneOf(['primary']),
};

export default withStyles(styles)(Disclaimer);
