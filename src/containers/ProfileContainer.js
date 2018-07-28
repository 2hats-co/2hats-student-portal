import React, { Component } from 'react';
import DashboardWrapper from '../components/DashboardWrapper';
import {Grid, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import EducationContainer from '../components/EduExp/EducationContainer';
import ProfileCard from '../components/Profile/ProfileCard';
import PropTypes from "prop-types";
import CircularProgress from '@material-ui/core/CircularProgress'
//Redux
import { compose } from 'redux';
import { withHandlers } from 'recompose'
import { connect } from 'react-redux';
import  {withFirestore} from '../utilities/withFirestore';
import { COLLECTIONS } from "../constants/firestore";

import { PROCESS_TYPES, isComplete} from "../constants/signUpProcess";
import ProfileDialogForm from '../components/Profile/ProfileDialogForm';
import ConfirmSubmission from '../components/Profile/ConfirmSubmission';

const styles = theme => ({
    root: {

    }
});
class ProfileContainer extends Component{
    constructor(props){
      super(props);
      this.state = {
        profileEditorDailog:false,
        submitionDialog:false 
      }
      this.handleEdit = this.handleEdit.bind(this)
      this.handleSubmition = this.handleSubmition.bind(this)
    }
    componentDidMount(){
     // window.Intercom('update')
  }
    handleEdit(state){
      this.setState({profileEditorDailog:state})
    }
    handleSubmition(){
      this.setState({submitionDialog:false})
      this.props.onSubmit()
    }  
    render(){
        const {classes, profile,user} = this.props
      
     

        const loading = (<CircularProgress className={classes.progress} color="primary"  size={100} />)
        let view = loading
        
        if (profile&& user){
        

          const userData = Object.values(user)[0]
          const profileData = Object.values(profile)[0]
          const submitButton = (
            <Button variant='flat' style={{paddingLeft:20,paddingRight:20}} 
            disabled={!profileData.isComplete}
            onClick={()=>{
              this.handleSubmition()
              //this.setState({submitionDialog:true})
            }}>
            {profileData.isComplete ?'Submit Resume':'Complete Profile to submit'}
            </Button>
            )
            const submittedButton = (<Button disabled={true} variant='flat'>
              Submission Unavailable - Pending Feedback
            </Button>)

            view = (<Grid
                container
              //  className={classes.root}
                alignItems='center'
                direction='column'
              >
                
              <ProfileCard 
              process = {profileData.process}
              skillsList={profileData.skills}
              bio={profileData.bio}
              name={`${userData.firstName} ${userData.lastName}`}
            resumeFile={profileData.process === PROCESS_TYPES.upload&& profileData.resumeFile}
              interestsList={profileData.interests}
              editHandler={()=>{this.handleEdit(true)}}/>

                {profileData.process === PROCESS_TYPES.build&&
              <div 
              style= {{marginTop:10 ,width:'100%'}}
              >
                <EducationContainer 
                industry={profileData.industry} 
                  isMobile={true}
                  name='education' changeHandler={this.props.onUpdate.bind(this)} 
                   data = {profileData.education}
                  width={750}/>     
                <EducationContainer 
                industry={profileData.industry} 
                name='experience' isMobile={true}
                data={profileData.experience} 
                width={750} changeHandler={this.props.onUpdate.bind(this)}/>

            </div>//profileData.hasSubmit?submittedButton:submitButton
            }
                </Grid>)


           
        }
        return(
            <DashboardWrapper header='Dashboard'>
                {view}
                <ConfirmSubmission isOpen={this.state.submitionDialog}/>
            </DashboardWrapper>
        )
    }

}
ProfileContainer.propTypes = {
    classes: PropTypes.object
  };
  const enhance = compose(
    // add redux store (from react context) as a prop
    withFirestore,
    // Handler functions as props
    withHandlers({
      onNext: props => (profile) =>
          props.firestore.update({ collection: COLLECTIONS.profiles, doc: props.uid }, {
          ...profile,
          updatedAt: props.firestore.FieldValue.serverTimestamp()
        }
      ),
      onUpdate: props => (name,value) =>
          props.firestore.update({ collection: COLLECTIONS.profiles, doc: props.uid }, {
          [name]:value,
          updatedAt: props.firestore.FieldValue.serverTimestamp()
        }
      ),onSubmit: props => () =>
      props.firestore.update({ collection: COLLECTIONS.profiles, doc: props.uid }, {
      hasSubmit:true,
      submittedAt: props.firestore.FieldValue.serverTimestamp()
    }
  ),
    }),
    // Connect get data from fire stroe
    connect(({ firestore }) => ({
       profile: firestore.data.profiles, // document data by id
       user: firestore.data.users, // document data by id
    }))
  )
  export default enhance(
      withStyles(styles)(ProfileContainer)
  )
