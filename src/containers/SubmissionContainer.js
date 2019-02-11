import React, { Component } from 'react';
// import EduExp from '../components/EduExp';
// import ProfileCard from '../components/Profile/ProfileCard';
import { withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';

// import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import { setBackground } from '../utilities/styling';
import Background from '../assets/background/BW.svg';

import PersonDetails from '../components/DEPRECATED/SubmissionDetails/PersonDetails';
import SubmissionDetails from '../components/DEPRECATED/SubmissionDetails';
import PrettyProfile from '../components/DEPRECATED/Profile/PrettyProfile';

import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';
import { LISTENER } from '../constants/firestore';
//Redux
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withHandlers } from 'recompose';
import { withFirestore } from '../utilities/withFirestore';
// import { PROCESS_TYPES } from '../constants/signUpProcess';
import LoadingScreen from '../components/LoadingScreen';
import { feedbackSections } from '../constants/feedbackSections';

const styles = theme => ({
  paper: {
    width: 'calc(100vw - 20px)',
    boxSizing: 'border-box',
    maxWidth: 710,
    margin: '20px auto',
    padding: '24px 28px',
  },
  headline: {
    textAlign: 'left',
  },
  subheading: {
    marginTop: 20,
    '&:first-of-type': {
      marginTop: 8,
    },
  },
  ul: {
    margin: 0,
    padding: 0,
    paddingLeft: 16,
  },
});

class SubmissionContainer extends Component {
  componentWillMount() {
    const submissionKey = this.props.history.location.search.slice(1);
    this.props.loadSubmission(submissionKey);
  }
  render() {
    const { classes, submission } = this.props;
    setBackground('#E1E1E1', Background, false);

    if (submission) {
      const profile = submission[0];

      const feedback = submission[0].feedbackContent;

      let feedbackContent;
      if (feedback) {
        feedbackContent = feedback.map((x, i) => (
          <React.Fragment key={i}>
            <Typography className={classes.subheading} variant="body1">
              {feedbackSections[x.id]}
            </Typography>
            <ul className={classes.ul}>
              <li>
                <Typography variant="body2">{x.content}</Typography>
              </li>
            </ul>
          </React.Fragment>
        ));
      }

      return (
        <React.Fragment>
          <Paper className={classes.paper} elevation={2}>
            <PersonDetails submission={profile} />
          </Paper>

          {feedback && feedback.length > 0 && (
            <Paper className={classes.paper} elevation={2}>
              <Typography variant="h5" className={classes.headline}>
                Career Readiness Feedback
              </Typography>
              {feedbackContent}
            </Paper>
          )}

          {profile.submissionContent.process === 'build' && (
            <PrettyProfile
              profile={profile.submissionContent}
              user={{ firstName: profile.displayName }}
            />
          )}
          {profile.submissionContent.process === 'upload' && (
            <Paper className={classes.paper} elevation={2}>
              <SubmissionDetails submission={profile} />
            </Paper>
          )}
        </React.Fragment>
      );
    }

    return <LoadingScreen />;
  }
}

const enhance = compose(
  // add redux store (from react context) as a prop
  withFirestore,
  // Handler functions as props
  withHandlers({
    loadSubmission: props => submissionKey =>
      props.firestore.setListener(
        LISTENER(COLLECTIONS.submissions, submissionKey)
      ),
  }),
  // Connect todos from redux state to props.profile
  connect(({ firestore }) => ({
    submission: firestore.ordered.submissions, // document data by id
  }))
);

export default enhance(
  withRouter(withStyles(styles, { withTheme: true })(SubmissionContainer))
);
