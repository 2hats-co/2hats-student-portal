import React from 'react';
//Material UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
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

import * as _ from "lodash";

const styles = theme => ({
    root: {
     padding:25,
      margin:20,
      maxWidth:810
    },
    button:{
        width:150
    },
    content:{
      maxWidth:800,
    },
  });
  const INITIAL_STATE = {
    interests: [],
    bio: "",
    skills: [],
    resumeFile:{name:'',fullPath:''},
    error: null
  };
class ProfileDialogForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.handleChange = this.handleChange.bind(this)
  }
  componentWillMount(){
    _.forEach(this.props.profile,(value,key)=>{
      this.handleChange(key,value)
     })
  }
  handleSave = () => {
    this.props.onSave({interests: this.state.interests,
      bio: this.state.bio,
      skills: this.state.skills,
      resumeFile:this.state
      })//update fire store
      this.props.closeHandler()  
  };
  handleChange(name, value) {
    this.setState({[name]:value});
  }
  render() {
      const {classes,isOpen,closeHandler} = this.props
      const {interests,bio,skills,industry,resumeFile} = this.state
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
           <CareerInterests preSelectedList={interests} changeHandler={this.handleChange}/>
          <div style={{width:400}}><PersonalBio industry={industry||'IT'} bio={bio} changeHandler={this.handleChange}/></div>
           <Skills hideSuggestions preSelectedList={skills} interestKeys={interests} changeHandler={this.handleChange}/>
           <ResumeLoader resumeFile={resumeFile} changeHandler={this.handleChange}/>
           </div>
          </DialogContent>
          <DialogActions>
          <Button className={classes.button} onClick={closeHandler}>
           Cancel
            </Button>
            <Button className={classes.button} onClick={this.handleSave}>
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


