import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeftOutlined';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRightOutlined';
import { STEP_LABELS } from '../../../constants/signUpProcess';
const styles = theme => ({
  root: {
    width: '100%',
    padding: 0,
    overflowX: 'hidden',
    // maxWidth: 750,
    flexGrow: 1,
  },
});

function DotMobileStepper(props) {
  const {
    activeStep,
    steps,
    classes,
    handleNext,
    handleBack,
    theme,
    nextDisabler,
  } = props;
  return (
    <MobileStepper
      variant="dots"
      steps={steps.length}
      position="static"
      activeStep={activeStep}
      className={classes.root}
      nextButton={
        <Button
          variant="text"
          size="small"
          onClick={handleNext}
          disabled={nextDisabler}
          color="primary"
          id={`next-${STEP_LABELS.upload[activeStep].split(' ')[0]}`}
        >
          {activeStep === steps.length - 1 ? 'Preview' : 'Next'}
          {activeStep !== steps.length - 1 &&
            (theme.direction === 'rtl' ? (
              <KeyboardArrowLeft style={{ margin: 0 }} />
            ) : (
              <KeyboardArrowRight style={{ margin: 0 }} />
            ))}
        </Button>
      }
      backButton={
        <Button variant="text" size="small" onClick={handleBack}>
          {theme.direction === 'rtl' ? (
            <KeyboardArrowRight style={{ margin: 0 }} />
          ) : (
            <KeyboardArrowLeft style={{ margin: 0 }} />
          )}
          Back
        </Button>
      }
    />
  );
}
DotMobileStepper.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(DotMobileStepper);
