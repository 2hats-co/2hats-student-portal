import React, {Component} from 'react';
import {withNavigation} from '../components/withNavigation';
import {Grid} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import EduExp from '../components/EduExp/';
import ProfileCard from '../components/Profile/ProfileCard';
import PropTypes from "prop-types";
//Redux
import {compose} from 'redux';
import {withHandlers} from 'recompose'
import  {withFirestore} from '../utilities/withFirestore';
import {COLLECTIONS} from "../constants/firestore";
import {PROCESS_TYPES} from "../constants/signUpProcess";

const styles = theme => ({
  root:{},
  navIconHide:{},
  appBar:{},
  toolbar:{},
  drawerPaper:{},
  content:{},
  logo:{},
  greeting:{},
    grid: {
     overflow: 'scroll'
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
      }
    }
    render(){
        const {classes, profile,user} = this.props
        const disabled = (user.status === 'in-review')
        return(
       <div>
               <Grid
                container
                className={classes.grid}
                alignItems='center'
                direction='column'
              >
              <Grid item className={classes.item}>
              <ProfileCard 
              disabled={disabled}
              process = {profile.process}
              skillsList={profile.skills}
              bio={profile.bio}
              name={`${user.firstName} ${user.lastName}`}
              resumeFile={profile.process === PROCESS_TYPES.upload&& profile.resumeFile}
              interestsList={profile.careerInterests}
        
              editHandler={()=>{this.handleEdit(true)}}/>
              </Grid>
              {profile.process === PROCESS_TYPES.build&&
              <Grid item className={classes.item}> 

                <EduExp industry={profile.industry} 
                disabled={disabled}
                name='education' changeHandler={this.props.onUpdate.bind(this)} 
                data = {profile.education}
                width={750}/>   
                <EduExp 
                industry={profile.industry} 
                disabled={disabled}
                name='experience' 
                data={profile.experience} 
                width={750} changeHandler={this.props.onUpdate.bind(this)}/>
                </Grid>
            }
                </Grid>
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
     
      onUpdate: props => (name,value) =>
          props.firestore.update({ collection: COLLECTIONS.profiles, doc: props.uid }, {
          [name]:value,
          updatedAt: props.firestore.FieldValue.serverTimestamp()
        }
      )
    }),
  
  )
  export default enhance(
      withStyles(styles)(ProfileContainer)
  )
