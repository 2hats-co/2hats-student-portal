import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { withStyles } from '@material-ui/core/styles';

//Redux
import { compose } from 'redux';
import { withHandlers } from 'recompose'
import { connect } from 'react-redux';
import  {withFirestore} from '../../utilities/withFirestore';
import { COLLECTIONS } from "../../constants/firestore";
import WorkingRights from '../InputFields/WorkingRights';
import PhoneNumber from '../InputFields/PhoneNumber';
import Name from '../InputFields/Name';

const styles = theme => ({
    content: {
      width:270,
      height:140,
      paddingLeft:40,
      paddingRight:40
    },
    title:{
      paddingLeft:40
    },
    button:{
        width:100
    }
  });
 class AccountInfoDialog extends React.Component{
     constructor(props){
        super(props)
        this.state = {
            firstName:'',
            lastName:'',
            phoneNumber:'',
            workingRights:'',
        }
        this.handleChange = this.handleChange.bind(this)
     }
     componentWillMount(){
        this.loadData()
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps.user !== this.props.user){
            this.loadData()
        }
    }
    loadData(){
        if(this.props.user){
        const {firstName,lastName,phoneNumber,workingRights} = Object.values(this.props.user)[0]
            this.handleChange('firstName',firstName)
            this.handleChange('lastName',lastName)
           this.handleChange('phoneNumber',phoneNumber)
           this.handleChange('workingRights',workingRights)
        }
    }
    handleCancel=() =>{
          this.loadData()
        //this.props.closeHandler()
    }
    handleUpdate(){

    }
    handleChange(name,value){
        console.log(name)
        if(value){
            this.setState({[name]:value}) 
        } 
    }

  render() {
      const {classes,isOpen,user} = this.props
 
        if(this.state){
        const {firstName,lastName,phoneNumber,workingRights} = this.state

            return (
                <Dialog
                  open={isOpen}
                  //onClose={closeHandler}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle className={classes.title} id="alert-dialog-title">{'Confirm Resume Submission'}</DialogTitle>
                  <DialogContent  className={classes.content}>
                    <Name firstName={firstName} lastName={lastName} changeHandler={this.handleChange.bind(this)}/>
                   <WorkingRights value={workingRights} changeHandler={this.handleChange.bind(this)}/>
                   <PhoneNumber value={phoneNumber} changeHandler={this.handleChange.bind(this)}/>
                  </DialogContent>
                  <DialogActions>
                  <Button className={classes.button} onClick={()=>{this.handleCancel()}}>
                    Cancel
                    </Button>
                    <Button className={classes.button} onClick={()=>{this.handleUpdate()}} disabled={!firstName} autoFocus>
                    Update
                    </Button>
                  </DialogActions>
                </Dialog>
            )
        }else{
            return (<div/>)

        }
        
    
}
}
const enhance = compose(
    // add redux store (from react context) as a prop
    withFirestore,
    // Handler functions as props
    withHandlers({
      onUserUpdate: props => (data) =>
          props.firestore.update({ collection: COLLECTIONS.users, doc: props.uid }, {
          ...data,
          updatedAt: props.firestore.FieldValue.serverTimestamp()
        }
      ),
    }),
   
    // Connect todos from redux state to props.profile
    connect(({ firestore }) => ({ 
       user: firestore.data.users, // document data by id
    })
    )
)
export default enhance(
    withStyles(styles)(AccountInfoDialog)
)
