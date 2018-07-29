import React, { Component } from 'react';
import {withNavigation} from '../components/withNavigation';
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
import { width } from 'window-size';

const styles = theme => ({
    root: {
     
    },
    item:{
      width:'98%',
      maxWidth:750,
  
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
        const {classes, profile,user,isLoading} = this.props
        console.log(this.props)

        return(
       <div>
               <Grid
                container
               className={classes.root}
                alignItems='center'
                direction='column'
              >
                <Grid item className={classes.item}>
              <ProfileCard 
              process = {profile.process}
              skillsList={profile.skills}
              bio={profile.bio}
              name={`${user.firstName} ${user.lastName}`}
            resumeFile={profile.process === PROCESS_TYPES.upload&& profile.resumeFile}
              interestsList={profile.interests}
              editHandler={()=>{this.handleEdit(true)}}/>
              </Grid>{profile.process === PROCESS_TYPES.build&&
              <Grid item className={classes.item}>               
                <EducationContainer 
                industry={profile.industry} 
             
                  name='education' changeHandler={this.props.onUpdate.bind(this)} 
                   data = {profile.education}
                  width={750}/>   
              
                
                <EducationContainer 
                industry={profile.industry} 
                name='experience' 
                data={profile.experience} 
                width={750} changeHandler={this.props.onUpdate.bind(this)}/>
                
                </Grid>//profileData.hasSubmit?submittedButton:submitButton
            }
                </Grid>
                <ConfirmSubmission isOpen={this.state.submitionDialog}/>
            </div>
        )
        }
        
    

}
ProfileContainer.propTypes = {
    classes: PropTypes.object
  };
  const enhance = compose(
    // add redux store (from react context) as a prop
    withNavigation,
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
  
  )
  export default enhance(
      withStyles(styles)(ProfileContainer)
  )
