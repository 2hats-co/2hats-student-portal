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
     width:'100%',

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
    handleEdit(state){
      this.setState({profileEditorDailog:state})
    }
    handleSubmition(){
      this.setState({submitionDialog:false})
      this.props.onSubmit()
    }  
    render(){
        const {classes, profile,user} = this.props
        console.log(profile)
        const submitButton = (
        <Button variant='flat' style={{paddingLeft:20,paddingRight:20}} 
        disabled={!true}
        onClick={()=>{
          this.handleSubmition()
          //this.setState({submitionDialog:true})
        }}>
        {true?'Submit Resume':'Complete Profile to submit'}
        </Button>
        )
        const loading = (<CircularProgress className={classes.progress} color="primary"  size={100} />)
        let view = loading
        
        if (profile&& user){
          const userData = Object.values(user)[0]
          const profileData = Object.values(profile)[0]
            view = (<div><Grid
                container
                spacing={16}
                className={classes.root}
                alignItems='center'
                direction='column'
              >
              <ProfileCard 
              skillsList={profileData.skills}
              bio={profileData.bio}
              name={`${userData.firstName} ${userData.lastName}`}
            resumeFile={profileData.process === PROCESS_TYPES.upload&& profileData.resumeFile}
              interestsList={profileData.interests}
              editHandler={()=>{this.handleEdit(true)}}
              />
                {profileData.process === PROCESS_TYPES.build&&<div><EducationContainer industry={profileData.industry} name='education' data={profileData.education} width={650} changeHandler={this.props.onUpdate.bind(this)}/> 
                <EducationContainer industry={profileData.industry} name='experience' data={profileData.experience} width={650} changeHandler={this.props.onUpdate.bind(this)}/>
            </div>}{submitButton}
                </Grid>
                <ConfirmSubmission isOpen={this.state.submitionDialog}/>
                <ProfileDialogForm isOpen={this.state.profileEditorDailog} closeHandler={()=>{this.handleEdit(false)}} profile={profileData}/>
                </div>)
        }
        return(
            <DashboardWrapper header='Dashboard'>
                {view}
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
