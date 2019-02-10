import React, { Component } from 'react';
import LogoInCard from '../components/LogoInCard';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Disclaimer from '../components/Authentication/Disclaimer';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import Form from '../components/Form';
import speedySignupFields from '../constants/forms/speedySignup';

import girlWithLaptop from '../assets/images/graphics/girlWithLaptop.png';
import celebratingMan from '../assets/images/graphics/congratsMan.svg';
import { SPEEDY_SIGNUP } from '../constants/views';
import { withRouter } from 'react-router-dom';
import { CLOUD_FUNCTIONS, cloudFunction } from '../utilities/CloudFunctions';
import { warmUp } from '../utilities/Authentication/warmUp';
import { speedyAuth } from '../utilities/Authentication/speedySignup';
import { UNIVERSITIES } from '../constants/universityList';

const styles = theme => ({
  root: {
    minHeight: '100vh',
    padding: `${theme.spacing.unit}px 0`,
  },
  subhead: {
    marginTop: theme.spacing.unit,
    lineHeight: 1.25,
    fontWeight: 400,
  },
  webForm: {
    width: 350,
    minHeight: 200,
    marginLeft: 50,
    marginRight: 50,
    paddingBottom: 40,

    position: 'relative',
  },
  mobileForm: {
    width: 280,
    paddingBottom: 40,

    position: 'relative',
  },
  button: {
    width: 180,
    marginTop: 0,
    marginBottom: 0,
  },
  loading: {
    position: 'relative',
    bottom: -39,
  },
  mobileButton: {
    width: 180,
    marginTop: 20,
    marginBottom: 50,
    margin: 'auto',
  },
  img: {
    marginRight: 20,
    marginBottom: 50,
  },
  header: {
    marginBottom: 10,
  },

  loadingScreen: {
    backgroundColor: '#fff',
    minHeight: 607,

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    '& h6': { marginTop: theme.spacing.unit * 2 },
  },
});
class SpeedySignupContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: SPEEDY_SIGNUP.form,
      isPublic: false,
      isLoading: false,
      isMobile: false,
    };
    this.createUser = this.createUser.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.goHome = this.goHome.bind(this);
    this.goTo = this.goTo.bind(this);
    this.errorBar = this.errorBar.bind(this);
  }

  updateWindowDimensions = () => {
    this.setState({ isMobile: window.innerWidth < 700 });
  };
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  componentWillMount() {
    warmUp(CLOUD_FUNCTIONS.SPEEDY_SIGNUP);
  }

  goTo(route) {
    this.props.history.replace(route);
  }

  handleReset() {
    this.setState({
      view: SPEEDY_SIGNUP.form,
      isLoading: false,
      snackBar: null,
    });
  }
  handleSuccess = () => {
    this.setState({ view: SPEEDY_SIGNUP.success, isLoading: false });
  };

  createUser(userInfo) {
    this.setState({ isLoading: true });
    speedyAuth(userInfo, this.handleSuccess, this.errorBar);

    cloudFunction(
      CLOUD_FUNCTIONS.SPEEDY_SIGNUP,
      userInfo,
      result => {
        this.setState({ isLoading: false });
        this.setState({ view: SPEEDY_SIGNUP.success });
        console.log('Call speedySignup success: ', result);
      },
      error => {
        console.log('Call speedySignup error: ', error);
      }
    );
  }

  goHome() {
    window.open('https://2hats.com.au', '_self');
  }
  errorBar(e) {
    this.setState({
      snackBar: { message: e.message, variant: 'error' },
      isLoading: false,
      link: 'signin',
    });
  }
  renderForm() {
    const { classes } = this.props;
    const { isMobile, isLoading } = this.state;

    let defaultUni = null;
    switch (this.props.history.location.hash) {
      case '#USYD':
        defaultUni = {
          value: UNIVERSITIES[0].split('\u2063')[0],
          label: UNIVERSITIES[0],
        };
        break;
      case '#UNSW':
        defaultUni = {
          value: UNIVERSITIES[1].split('\u2063')[0],
          label: UNIVERSITIES[1],
        };
        break;
      case '#MQ':
        defaultUni = {
          value: UNIVERSITIES[2].split('\u2063')[0],
          label: UNIVERSITIES[2],
        };
        break;
      case '#UTS':
        defaultUni = {
          value: UNIVERSITIES[3].split('\u2063')[0],
          label: UNIVERSITIES[3],
        };
        break;
      default:
        break;
    }

    if (isLoading)
      return (
        <div
          className={classNames(
            isMobile ? classes.mobileForm : classes.webForm,
            classes.loadingScreen
          )}
        >
          <CircularProgress size={64} />
          <Typography variant="h6">
            Hold on to your hat{' '}
            <span role="img" aria-label="cowboy emoji">
              🤠
            </span>
          </Typography>
        </div>
      );

    return (
      <Grid
        className={isMobile ? classes.mobileForm : classes.webForm}
        container
        direction="column"
      >
        <Grid className={classes.header} item>
          <Typography
            variant={isMobile ? 'subtitle1' : 'h6'}
            style={isMobile ? { textAlign: 'center' } : {}}
          >
            Welcome to 2hats!
          </Typography>
          <Typography
            variant={isMobile ? 'body2' : 'subtitle1'}
            style={isMobile ? { textAlign: 'center' } : {}}
            className={classes.subhead}
          >
            Sign up to get paid placements and kickstart your professional
            career
          </Typography>
        </Grid>

        <Form
          action="Sign up!"
          actions={{
            'Sign up!': data => {
              this.createUser(data);
            },
          }}
          justForm
          data={speedySignupFields({ currentUniversity: defaultUni })}
          formFooter={<Disclaimer />}
        />
      </Grid>
    );
  }
  renderCongrats() {
    const { classes } = this.props;
    const { isPublic, isMobile } = this.state;
    return (
      <Grid
        className={isMobile ? classes.mobileForm : classes.webForm}
        container
        direction="column"
        alignItems={isMobile ? 'center' : 'flex-start'}
        justify="space-between"
      >
        <Grid item>
          <Grid container>
            <Typography
              variant="h6"
              style={isMobile ? { textAlign: 'center' } : {}}
            >
              Congratulations, you’re almost there!
            </Typography>
            <Typography
              variant="body2"
              className={classes.subhead}
              style={isMobile ? { textAlign: 'center' } : {}}
            >
              We’ve <b>sent you an email</b> to finish the sign up process.
            </Typography>
            <Typography
              variant="body2"
              style={isMobile ? { textAlign: 'center' } : {}}
            >
              When you’re ready, submit your information to access job
              opporunties.
            </Typography>
          </Grid>
        </Grid>
        {isMobile && (
          <Grid item style={{ marginTop: 20 }}>
            <img src={celebratingMan} alt="2hats" />
          </Grid>
        )}
        <Button
          color="primary"
          id="reset"
          className={isMobile ? classes.mobileButton : classes.button}
          variant="contained"
          onClick={isPublic ? this.goHome : this.handleReset}
        >
          {isPublic ? `Visit Website` : `Reset Form`}
        </Button>
      </Grid>
    );
  }
  render() {
    const { view, snackBar, isMobile } = this.state;
    const { classes } = this.props;
    return (
      <Grid
        container
        className={classes.root}
        alignItems="center"
        justify="center"
      >
        <Grid item>
          <LogoInCard
            width={isMobile ? 340 : 680}
            height="auto"
            logoClass={isMobile ? 'centeredLogo' : 'miniLogo'}
            snackBar={snackBar}
          >
            <Grid
              container
              direction={isMobile ? 'column' : 'row'}
              alignItems="center"
            >
              {view === SPEEDY_SIGNUP.form
                ? this.renderForm()
                : this.renderCongrats()}
              {!isMobile && (
                <Grid item>
                  <img
                    className={classes.img}
                    src={
                      view === SPEEDY_SIGNUP.success
                        ? celebratingMan
                        : girlWithLaptop
                    }
                    alt="2hats"
                  />
                </Grid>
              )}
            </Grid>
          </LogoInCard>
        </Grid>
      </Grid>
    );
  }
}
export default withRouter(withStyles(styles)(SpeedySignupContainer));
