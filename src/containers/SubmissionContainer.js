import React,{Component} from 'react' 
import EduExp from '../components/EduExp'
import ProfileCard from '../components/Profile/ProfileCard'
import {withRouter} from 'react-router-dom'
import withStyles from "@material-ui/core/styles/withStyles";

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import {setBackground} from '../utilities/styling';
import Background from '../assets/background/BW.svg';

import PersonDetails from '../components/SubmissionDetails/PersonDetails';
import SubmissionDetails from '../components/SubmissionDetails';

import { LISTENER, COLLECTIONS } from '../constants/firestore';
//Redux
import {compose} from 'redux';
import { connect } from 'react-redux';
import {withHandlers} from 'recompose'
import  {withFirestore} from '../utilities/withFirestore';
import {PROCESS_TYPES} from "../constants/signUpProcess";
import LoadingMessage from '../components/LoadingMessage';


const styles = theme => ({
    paper: {
        width: 'calc(100vw - 20px)',
        boxSizing: 'border-box',
        maxWidth: 900,
        margin: '20px auto',
        padding: '24px 28px',
    },
    headline: {
        textAlign: 'left',
    },
    subheading: {
        marginTop: 20,
        fontWeight: 700,
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
const sampleFeedback = undefined;
// const sampleFeedback = [
//     {
//         title: 'Profesionally focussed',
//         body: ['Your resume shows a clear link...']
//     },
//     {
//         title: 'Written communication',
//         body: ['Your have used bullet points...', 'Your rseume is conscise', 'Your resume is in English']
//     },
// ];

class SubmissionContainer extends Component {
  
    componentWillMount(){
       const submissionKey = this.props.history.location.search.slice(1)
       this.props.loadSubmission(submissionKey)
    }
    render(){
        const {classes,submission} = this.props;
        const feedback = sampleFeedback;

        setBackground("#E1E1E1",Background,false);

        let feedbackContent;
        if (feedback) {
            feedbackContent = feedback.map(x =>
                <React.Fragment>
                    <Typography className={classes.subheading} variant="subheading">{x.title}</Typography>
                    <Typography variant="body1"><ul className={classes.ul}>
                        { x.body.map(y => <li>{y}</li>) }
                    </ul></Typography>
                </React.Fragment>
            );
        }

        if(submission){
            const profile = submission[0];
            console.log(profile);
            return(<React.Fragment>
                <Paper className={classes.paper} elevation={2}>
                    <PersonDetails submission={profile} />
                </Paper>

                {feedback && feedback.length > 0 && <Paper className={classes.paper} elevation={2}>
                    <Typography variant="headline" className={classes.headline}>Resume Feedback</Typography>
                    { feedbackContent }
                </Paper>}

                <Paper className={classes.paper} elevation={2}>
                    <SubmissionDetails submission={profile} />
                </Paper>
            </React.Fragment>);
        }
        
        return(
       <LoadingMessage message='Loading your previous submission…'/>
        )
    }
} 

const enhance = compose(
    // add redux store (from react context) as a prop
    withFirestore,
    // Handler functions as props
    withHandlers({
        loadSubmission: props => submissionKey =>
        props.firestore.setListener(LISTENER(COLLECTIONS.submissions,submissionKey))
    }),
    // Connect todos from redux state to props.profile
    connect(({ firestore }) => ({ 
       submission: firestore.ordered.submissions, // document data by id
    }))
  )
  
export default enhance(
      withRouter(withStyles(styles,{withTheme: true })(SubmissionContainer))
  )
