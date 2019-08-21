import React, { useEffect } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';

import { setBackground } from '../utilities/styling';
import LinearProgress from '@material-ui/core/LinearProgress';
import SnackBar from './SnackBar';
import Button from '@material-ui/core/Button';

import Background from '../assets/background/Colour.svg';

const styles = theme => ({
  root: {
    height: '100%',
    width: '100%',
  },
  middle: {},
  logo: {
    paddingTop: 40,
    marginBottom: 30,
    marginLeft: 75,
    width: 200,
    height: 69,
  },
  centeredLogo: {
    marginTop: 40,
    marginBottom: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
    width: 117,
    height: 42,
  },
  miniLogo: {
    marginTop: 40,
    marginBottom: 20,
    marginLeft: 45,
    width: 117,
    height: 42,
  },
  paper: {
    overflowY: 'visible',
    overflowX: 'hidden',
    position: 'relative',
  },
  loading: {
    position: 'absolute',
    top: 0,
    width: '100%',
  },

  termsButton: {
    color: 'rgba(255,255,255,.67)',
    margin: theme.spacing(1, 0),

    display: 'flex',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: 240,
  },
});

function LogoInCard(props) {
  const {
    classes,
    width,
    height,
    theme,
    isLoading,
    logoClass,
    snackBar,
  } = props;

  useEffect(() => {
    if (theme.palette.type !== 'dark')
      setBackground('#FA5E4E', Background, false);
    return () => {
      setBackground();
    };
  }, [theme.palette.type]);

  return (
    <div className={classes.root}>
      <div className={classes.middle}>
        <Paper
          className={classes.paper}
          style={{ width: width, height: height }}
          elevation={15}
        >
          <LinearProgress
            className={classes.loading}
            style={isLoading ? {} : { display: 'none' }}
          />
          <img
            className={classes[logoClass] || classes.centeredLogo}
            alt="dark2hatsLogo"
            src={theme.assets.logo}
          />

          {props.children}
        </Paper>

        <Button
          component="a"
          href="https://2hats.com.au/terms"
          target="_blank"
          className={classes.termsButton}
        >
          Terms and Conditions
        </Button>
      </div>
      <SnackBar data={snackBar} />
    </div>
  );
}

LogoInCard.defaultProps = {
  width: 320,
  height: 500,
};

export default withStyles(styles, { withTheme: true })(LogoInCard);
