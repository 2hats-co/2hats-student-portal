import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import DarkLogo from '../assets/images/Logo/DarkText.svg';
import { setBackground } from '../utilities/styling';
import LinearProgress from '@material-ui/core/LinearProgress';
import SnackBar from './SnackBar';

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
    marginTop: 50,
    marginBottom: 30,
    marginLeft: 55,
    width: 117,
    height: 42,
  },
  paper: {
    borderRadius: 3,
    overflowY: 'visible',
    overflowX: 'hidden',
    position: 'relative',
  },
  loading: {
    position: 'absolute',
    top: 0,
    width: '100%',
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
  const { isMobile } = theme.responsive;
  // setBackground('#FA5E4E','https://firebasestorage.googleapis.com/v0/b/hatstest-860eb.appspot.com/o/public%2FColour.svg?alt=media&token=8b190721-9a9f-4b51-9285-9b26ea825c94',isMobile)
  setBackground('#FA5E4E', Background, isMobile);
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
            src={DarkLogo}
          />

          {props.children}
        </Paper>
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
