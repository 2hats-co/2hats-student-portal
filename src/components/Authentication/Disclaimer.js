import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  root: {
    marginTop: 20,
    marginBottom: 10,
  },
  large: theme.typography.caption,
  link: {
    color: theme.palette.primary.main,
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
        {`By signing up, you agree to our `}
        <a
          href="https://www.2hats.com.au/terms"
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
        >
          Terms & Conditions
        </a>
        {` and `}
        <a
          href="https://www.2hats.com.au/privacy"
          target="_blank"
          rel="noopener noreferrer"
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
