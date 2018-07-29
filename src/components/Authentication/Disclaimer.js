import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {PRIMARY_COLOR} from '../../Theme'
// 1. We define the styles.
const styles = theme => ({
    root:{
        fontSize:'12px',
    color: '#000',  
    textAlign:'center'  
    },
  link: {
    fontSize:'12px',
    color: PRIMARY_COLOR,
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

function Disclaimer(props) {
  const { classes} = props;

  return (
      <div className={classes.root}>
             {`By clicking Sign Up, you agree to our `}
    <a
     href="https://www.2hats.com.au/terms.html"
      className={classes.link}
    >
    Terms and Conditions
    </a>{` and `}<a
     href="https://www.2hats.com.au/privacy.html"
      className={classes.link}
    >
    Privacy Policy
    </a>
    </div>
  );
}

Disclaimer.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,

  variant: PropTypes.oneOf(['primary']),
};

export default withStyles(styles)(Disclaimer);