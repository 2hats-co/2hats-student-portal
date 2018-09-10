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
        overflow: 'scroll'
       },
       item:{
         width:'98%',
         maxWidth:750,
       },

});

class SubmissionContainer extends Component {
  
    componentWillMount(){
       const submissionKey = this.props.history.location.search.slice(1)
       this.props.loadSubmission(submissionKey)
    }
    render(){
        const {classes,submission} = this.props
        if(submission){
            const profile = submission[0].submissionContent
        return(
    
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
                  name={submission[0].displayName}
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
                
            )
        }
        
        return(
       <LoadingMessage message='Loading up your previous submission'/>
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
