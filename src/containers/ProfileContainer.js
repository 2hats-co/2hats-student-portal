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
import { withHandlers, lifecycle } from 'recompose'
import { connect } from 'react-redux';
import  {withFirestore} from '../utilities/withFirestore';
import { COLLECTIONS,LISTENER } from "../constants/firestore";
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
    }  
    render(){
        const {classes, profile,user} = this.props
        const submitButton = (<Button variant='flat' style={{width:200}} onClick={()=>{this.setState({submitionDialog:true})}}>Submit Resume</Button>)
        const updateButton = (<Button variant='flat' style={{width:200}}>Update Resume</Button>)
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
              interestsList={profileData.interests}
              editHandler={()=>{this.handleEdit(true)}}
              />
                <EducationContainer industry={profileData.industry} name='education' width={650}/> 
                <EducationContainer industry={profileData.industry} name='experience' width={650}/>
                {submitButton}
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
      loadData: props => listenerSettings =>
        props.firestore.setListener(listenerSettings),
  
      onNext: props => (profile) =>
          props.firestore.update({ collection: COLLECTIONS.profiles, doc: props.uid }, {
          ...profile,
          updatedAt: props.firestore.FieldValue.serverTimestamp()
        }
      ),
      onSubmit: props => () =>
          props.firestore.update({ collection: COLLECTIONS.profiles, doc: props.uid }, {
          hasSubmit:true,
          updatedAt: props.firestore.FieldValue.serverTimestamp()
        }
      ),
    }),
    // Run functionality on component lifecycle
    lifecycle({
      // Load data when component mounts
      componentWillMount() {
        const profileListenerSettings = LISTENER(COLLECTIONS.profiles,this.props.uid)
        const eduListenerSettings = LISTENER(COLLECTIONS.education,this.props.uid)
        const expListenerSettings = LISTENER(COLLECTIONS.experience,this.props.uid)
          this.props.loadData(eduListenerSettings);
          this.props.loadData(expListenerSettings);
        this.props.loadData(profileListenerSettings);
        const usersListenerSettings = LISTENER(COLLECTIONS.users,this.props.uid)        
        this.props.loadData(usersListenerSettings);
      },
      componentWillUnmount() {
        const profileListenerSettings = LISTENER(COLLECTIONS.profiles,this.props.uid)
        const eduListenerSettings = LISTENER(COLLECTIONS.education,this.props.uid)
        const expListenerSettings = LISTENER(COLLECTIONS.experience,this.props.uid)
        this.props.firestore.unsetListener(profileListenerSettings);
        this.props.firestore.unsetListener(eduListenerSettings);
        this.props.firestore.unsetListener(expListenerSettings);
        const usersListenerSettings = LISTENER(COLLECTIONS.users,this.props.uid)
        this.props.firestore.unsetListener(usersListenerSettings);
      }
    }),
    // Connect todos from redux state to props.todos
    connect(({ firestore }) => ({
        education: firestore.data.education,// document data by id
        experience: firestore.data.experience, // document data by id
       profile: firestore.data.profiles, // document data by id
       user: firestore.data.users, // document data by id
    }))
  )
  export default enhance(
      withStyles(styles)(ProfileContainer)
  )
