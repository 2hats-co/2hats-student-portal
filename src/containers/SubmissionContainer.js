import React,{Component} from 'react' 
import EduExp from '../components/EduExp'
import ProfileCard from '../components/Profile/ProfileCard'
import {withRouter} from 'react-router-dom'
import {withStyles  } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';

import { LISTENER, COLLECTIONS } from '../constants/firestore';
//Redux
import {compose} from 'redux';
import { connect } from 'react-redux';
import {withHandlers} from 'recompose'
import  {withFirestore} from '../utilities/withFirestore';
import {PROCESS_TYPES} from "../constants/signUpProcess";
import LoadingMessage from '../components/LoadingMessage';


const styles = theme => ({
    grid: {
     maxWidth:900,
     overflow: 'scroll'
    },
    item:{
      width:'98%',
      maxWidth:750,
    },
    content: {
        margin:'auto',
        marginTop:0,
        marginBottom:0,
        flexGrow: 1,
        overflow:'scroll',
        width:'100%',
        backgroundColor: '#fff',
        padding: theme.spacing.unit * 3,
        paddingBottom: 160,
       
      }
});

class SubmissionContainer extends Component {
    // constructor(props){
    //     super(props)
    // }
    componentWillMount(){
       const submissionKey = this.props.history.location.search.slice(1)
       this.props.loadSubmission(submissionKey)
    }
    render(){
        const {classes,submission} = this.props
        if(submission){
            const profile = submission[0].submissionContent
        console.log(profile)
        return(
            <div className={classes.content}>
                <Grid container
                    className={classes.grid}
                    alignItems='center'
                    direction='column'
                  >
                  <Grid item className={classes.item}>
                  <ProfileCard 
                  process = {profile.process}
                  skillsList={profile.skills}
                  bio={profile.bio}
                  name={`Shams mosowi`}
                  resumeFile={profile.process === PROCESS_TYPES.upload&& profile.resumeFile}
                  interestsList={profile.careerInterests}
                  disabled/>
                    </Grid>
                  {profile.process === PROCESS_TYPES.build&&
                    <Grid item className={classes.item}>
                    <EduExp industry={profile.industry} 
                    name='education' disabled 
                    data = {profile.education}
                    width={750}/>   
                    <EduExp 
                    industry={profile.industry} 
                    name='experience' 
                    data={profile.experience} 
                    width={750} disabled/>
                    </Grid>  
                }
                </Grid>  
                </div>
            )
        }
        
        return(
       <LoadingMessage message='loading up your previous submission'/>
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
