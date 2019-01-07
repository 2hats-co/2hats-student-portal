import React from 'react';
//Material UI
import Button from 'sp2-material-ui/core/Button';
import Dialog from 'sp2-material-ui/core/Dialog';
import DialogActions from 'sp2-material-ui/core/DialogActions';
import DialogContent from 'sp2-material-ui/core/DialogContent';
import DialogTitle from 'sp2-material-ui/core/DialogTitle';
import withStyles from 'sp2-material-ui/core/styles/withStyles';
//inputs
import CareerInterests from '../InputFields/CareerInterests'
import Skills from '../InputFields/Skills';
import PersonalBio from '../InputFields/PersonalBio';
import ResumeLoader from '../InputFields/ResumeLoader';
//Redux
import { compose } from 'redux';
import { withHandlers } from 'recompose'
import  {withFirestore} from '../../utilities/withFirestore';
import { COLLECTIONS } from "../../constants/firestore";
import { PROCESS_TYPES } from "../../constants/signUpProcess";

import {forEach} from '../../utilities/ObjectsAndArrays'


const styles = theme => ({
    root: {
     padding:25,
      margin:20,
      maxWidth:810
    },
    button:{
       // width:150
    },
    content:{
      maxWidth:800,
    },
});

const INITIAL_STATE = {
    careerInterests: [],
    bio: "",
    skills: [],
    resumeFile:{name:'',fullPath:''},
    process:PROCESS_TYPES.build,
    error: null
};
class ProfileDialogForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.handleChange = this.handleChange.bind(this)
  }
  componentWillMount(){
    forEach(this.props.profile,this.handleChange)

  }
  handleCancel=() =>{
    forEach(this.props.profile,this.handleChange)
     this.props.closeHandler()
  }
  handleSave = () => {
    this.props.onSave({careerInterests: this.state.careerInterests,
      bio: this.state.bio,
      skills: this.state.skills,
      resumeFile:this.state.resumeFile
      })//update fire store
      this.props.closeHandler()  
  };
  handleChange(name, value) {
    this.setState({[name]:value});
  }
  render() {
      const {classes,isOpen} = this.props
      const {process,careerInterests,bio,skills,industry,resumeFile} = this.state
    return (
        <Dialog
          maxWidth ={'md'}
          open={isOpen}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Personal Information"}</DialogTitle>
          
          <DialogContent>
            <div className={classes.content}>
           <CareerInterests preSelectedList={careerInterests} changeHandler={this.handleChange}/>
          <div style={{width:400}}><PersonalBio industry={industry||'IT'} bio={bio} changeHandler={this.handleChange}/></div>
           <Skills hideSuggestions preSelectedList={skills} interestKeys={careerInterests} changeHandler={this.handleChange}/>
           {process ===PROCESS_TYPES.upload &&<ResumeLoader resumeFile={resumeFile} changeHandler={this.handleChange}/>}
           </div>
          </DialogContent>
          <DialogActions>

          <Button
          // className={classes.button} 
          variant='contained'
          onClick={this.handleCancel}>
           Cancel
            </Button>
            <Button 
            //className={classes.button} 
            variant='contained'
            onClick={this.handleSave}>
            Save
            </Button>
            
          </DialogActions>
        </Dialog>
   
    );
  }
}
const enhance = compose(
  // add redux store (from react context) as a prop
  withFirestore,
  // Handler functions as props
  withHandlers({
    onSave: props => (profile) =>
        props.firestore.update({ collection: COLLECTIONS.profiles, doc: props.uid }, {
        ...profile,
        updatedAt: props.firestore.FieldValue.serverTimestamp()
      }
    ),
  }),
)
export default enhance(
    withStyles(styles)(ProfileDialogForm)
  )


