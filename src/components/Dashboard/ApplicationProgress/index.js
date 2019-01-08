import React from 'react';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ProgressDial from './ProgressDial';
import Step from './Step';
import {
  PROCESS_TYPES,
  STEP_LABELS,
  checkComplition,
  isComplete,
  firstUnfinishedStep,
} from '../../../constants/signUpProcess';
import ArrowIcon from '@material-ui/icons/KeyboardArrowRight';
import * as routes from '../../../constants/routes';
import AnimateIcon from '../../AnimateIcon';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 600,
  },
  ProgressGrid: {
    width: '100%',
    maxWidth: 600,
  },
  button: {
    alignItems: 'top !important',
    marginTop: 10,
    marginBottom: 20,
    width: 230,
    height: 35,
  },
  stepItem: {
    width: 230,
  },
  header: {},
  mobileHeader: {
    width: '100%',
    textAlign: 'center !important',
  },
});
function orderByComplete(steps) {
  let orignalOrder = steps.slice(0);
  let inComplete = [];
  let completed = [];
  orignalOrder.forEach(x => {
    if (x.completed) {
      completed.push(x);
    } else {
      inComplete.push(x);
    }
  });
  return completed.concat(inComplete);
}
class ApplicationProgress extends React.Component {
  constructor(props) {
    super(props);
    this.goTo = this.goTo.bind(this);
    this.handleContinue = this.handleContinue.bind(this);
  }
  goTo(route) {
    this.props.history.push(route);
  }
  completitionPercentage(data) {
    const allSteps = STEP_LABELS[data.process];
    const completed = allSteps.filter(x => !checkComplition(x, data));
    const percentage = Math.round(
      ((completed.length + 1) / (allSteps.length + 1)) * 100 - 5
    );
    return percentage;
  }
  handleContinue() {
    const { process } = this.props.data;
    const returnStep = firstUnfinishedStep(this.props.data);
    if (process === PROCESS_TYPES.build) {
      this.goTo(`${routes.BUILD_RESUME}?step=${returnStep}`);
    } else {
      this.goTo(`${routes.UPLOAD_RESUME}?step=${returnStep}`);
    }
  }
  render() {
    const { classes, data, handleInfoDialog, theme } = this.props;
    const { process } = data;
    const { isMobile } = theme.responsive;
    const stepsData = STEP_LABELS[process].map(x => {
      return { label: x, completed: !checkComplition(x, data) };
    });
    // const sortedSteps = orderByComplete(stepsData)
    const sortedSteps = stepsData;

    const steps = (
      <Grid container alignItems="center" direction="column">
        <Step
          className={classes.stepItem}
          key="basic"
          goTo={handleInfoDialog}
          label="Basic Info"
          isComplete={true}
        />
        {sortedSteps.map(x => (
          <Step
            key={x.label}
            goTo={this.goTo}
            process={process}
            label={x.label}
            isComplete={x.completed}
          />
        ))}
        <Step
          key="Submit Profile"
          goTo={this.goTo}
          process="submit"
          label="Submit Profile"
          isComplete={false}
        />
      </Grid>
    );
    return (
      <div className={classes.root}>
        <Grid
          className={classes.ProgressGrid}
          container
          alignItems="center"
          direction={isMobile ? 'column' : 'row'}
          justify="space-around"
        >
          <Grid item xs={12} sm={12}>
            <Typography
              variant="h4"
              className={isMobile ? classes.mobileHeader : classes.header}
            >
              Application Progress
            </Typography>
          </Grid>
          <Grid
            style={isMobile ? {} : { maxWidth: 230 }}
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
          >
            <Grid container direction="column" alignItems="center">
              <ProgressDial percentage={this.completitionPercentage(data)} />
              {!isComplete(data) && (
                <Button
                  className={classes.button}
                  variant="flat"
                  onClick={this.handleContinue}
                >
                  <div style={{ display: 'flex', marginLeft: 12 }}>
                    <div style={{ marginTop: 0 }}>
                      {' '}
                      {`Continue Application`}
                    </div>{' '}
                    <AnimateIcon>
                      {' '}
                      <ArrowIcon style={{ marginRight: -18 }} />
                      <ArrowIcon />{' '}
                    </AnimateIcon>
                  </div>
                </Button>
              )}
            </Grid>
          </Grid>
          <Grid style={{ width: '100%' }} item xs={12} sm={12} md={6} lg={6}>
            {steps}
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default withRouter(
  withStyles(styles, { withTheme: true })(ApplicationProgress)
);
