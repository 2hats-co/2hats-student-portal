import React from 'react';
//Material UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';

//Redux
import { compose } from 'redux';
import { withHandlers } from 'recompose'
import  {withFirestore} from '../../utilities/withFirestore';
import { COLLECTIONS } from "../../constants/firestore";
import { PROCESS_TYPES } from "../../constants/signUpProcess";

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
    process:PROCESS_TYPES.build,
    error: null
  };
  class EditDialog extends React.Component {
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
      handleCancel=() =>{
        _.forEach(this.props.profile,(value,key)=>{
          this.handleChange(key,value)
         })
         this.props.closeHandler()
      }
      handleSave = () => {
        this.props.onSave({interests: this.state.interests,
          bio: this.state.bio,
          skills: this.state.skills,
          resumeFile:this.state.resumeFile
          })//update fire store
          this.props.closeHandler()  
      };
      handleChange(name, value) {
        console.log(name,value)
        this.setState({[name]:value})

      }
      render() {
        const {classes,isOpen,children} = this.props
        const childrenWithProps = React.Children.map(children, child =>
          React.cloneElement(child, {changeHandler: this.handleChange}));
        return(
            <Dialog
            maxWidth ={'md'}
            open={isOpen}
            onClose={this.handleCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{"Edit something"}</DialogTitle>
            <DialogContent>
              <div className={classes.content}>
                {childrenWithProps}
             </div>
            </DialogContent>
            <DialogActions>
            <Button className={classes.button} onClick={this.handleCancel}>
             Cancel
              </Button>
              <Button className={classes.button} onClick={this.handleSave}>
              Save
              </Button>
            </DialogActions>
          </Dialog>
        )
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
      withStyles(styles)(EditDialog)
    )
  