import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import LogoOnCard from "../components/LogoOnCard";
import { Grid, Button, Typography } from "@material-ui/core";
import CareerInterests from "../components/CareerInterests";
import DocumentLoader from "../components/DocumentLoader";
import SectionWrapper from "../components/SectionWrapper";
//redux
import { compose } from "redux";
import { withHandlers, lifecycle } from "recompose";
import { connect } from "react-redux";
import { withFirestore } from "../utilities/withFirestore";
//routing
import { INTRODUCTION, EMAIL_VERIFICATION } from "../constants/routes";
import { withRouter } from "react-router-dom";
const styles = theme => ({
  root: {
    padding: 40
  },
  footerButtons: {
    marginTop: 30,
    width: 440
  },
  button: {
    width: 200
  }
});
const INITIAL_STATE = {
  fileName: "",
  view: "upload", //[upload,interests]
  interests: [],
  url:''
};
class UploadResumeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.goToIntroduction = this.goToIntroduction.bind(this);

    this.goToEmailVerification = this.goToEmailVerification.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.handleBack = this.handleBack.bind(this);
  }
  goToIntroduction() {
    this.props.history.push(INTRODUCTION);
  }
  goToEmailVerification() {
    this.props.history.push(EMAIL_VERIFICATION);
  }
  disableHandler() {
    const { view, fileName, interests,url } = this.state;
    switch (view) {
      case "interests":
        return interests.length === 0;
      case "upload":
      return url===''
        //fileName === "";
      default:
        break;
    }
  }
  handleChange(name, value) {
    console.log(name,value)
    this.setState({ [name]: value });
  }

  handleBack() {
    const { view} = this.state;
    switch (view) {
      case "interests":
      
        this.setState({ view: "upload" });
        break;
      case "upload":
        this.goToIntroduction();
        break;
      default:
        break;
    }
  }
  handleNext() {
    const { view,url} = this.state;
    switch (view) {
        case "interests":
        this.props.onSubmit(url)
        this.goToEmailVerification()
          break;
        case "upload":
        this.setState({ view: "interests" });
          break;
        default:
          break;
      }
  }
  render() {
    const { classes } = this.props;
    const { view } = this.state;
    let footerButtons = nextLabel => (
      <Grid
        container
        direction="row"
        className={classes.footerButtons}
        justify="space-between"
      >
        <Button
          variant="outlined"
          className={classes.button}
          color="primary"
          onClick={this.handleBack}
        >
          Back
        </Button>
        <Button
          className={classes.button}
          variant="flat"
          color="primary"
          disabled={this.disableHandler()}
          onClick={this.handleNext}
        >
          {nextLabel}
        </Button>
      </Grid>
    );
    const header = (
      <Typography variant="display1">
        {view === "interests" ? "You are almost there…" : "Upload Resume"}
      </Typography>
    );
    const interestsBody = (
      <Typography style={{ marginBottom: 10 }} variant="body1">
        In order to tailor our feedback to you, please indicate your career
        interestes below.
      </Typography>
    );
    return (
      <LogoOnCard width={850}>
        <Grid
          container
          className={classes.root}
          direction="column"
          justify="space-between"
          alignItems="center"
        >
          {header}
          {view === "interests" ? (
            <SectionWrapper
              child={
                <div>
                  {interestsBody}
                  <CareerInterests
                    preSelectedList={this.state.interests}
                    changeHandler={this.handleChange.bind(this)}
                  />
                </div>
              }
              width={750}
              height={220}
            />
          ) : (
            <DocumentLoader changeHandler={this.handleChange.bind(this)}/>
          )}
          {footerButtons(
            view === "interests" ? "Confirm interests" : "Confirm Upload"
          )}
        </Grid>
      </LogoOnCard>
    );
  }
}

UploadResumeContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  store: PropTypes.shape({
    firestore: PropTypes.object
  })
};

const enhance = compose(
  // add redux store (from react context) as a prop
  withFirestore,
  // Handler functions as props
  withHandlers({
    onSubmit: props => (url) =>
      props.firestore.add(
        { collection: "submitions"},
        {
          UID:props.uid,
          url: url,
          type: "pdf",
          updatedAt: props.firestore.FieldValue.serverTimestamp()
        }
      )

    // console.log(props)
  }),
  // Run functionality on component lifecycle
  lifecycle({
    // Load data when component mounts
  }),
  // Connect todos from redux state to props.todos
  connect(({ firestore }) => ({
    // state.firestore
    //  profiles: firestore.ordered.profiles, // document data in array
    // profiles: firestore.data.profiles, // document data by id
  }))
);

export default enhance(withRouter(withStyles(styles)(UploadResumeContainer)));
