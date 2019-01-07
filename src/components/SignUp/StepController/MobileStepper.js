import React from "react";
import withStyles from "sp2-material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import MobileStepper from "sp2-material-ui/core/MobileStepper";
import Button from "sp2-material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

const styles = theme => ({
  root: {
    width: "100%",
    padding: 0,
    overflowX: "hidden",
    maxWidth: 750,
    flexGrow: 1
  }
});

function DotMobileStepper(props) {
  const {
    activeStep,
    steps,
    classes,
    handleNext,
    handleBack,
    theme,
    nextDisabler
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
          variant="contained"
          size="small"
          onClick={handleNext}
          disabled={nextDisabler}
        >
          {activeStep === steps.length - 1 ? "Preview" : "Next"}
          {activeStep !== steps.length - 1 &&
            (theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            ))}
        </Button>
      }
      backButton={
        <Button variant="contained" size="small" onClick={handleBack}>
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
          Back
        </Button>
      }
    />
  );
}
DotMobileStepper.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(DotMobileStepper);
