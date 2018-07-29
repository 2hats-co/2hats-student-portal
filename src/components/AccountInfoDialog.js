import React from 'react';
import Dialog from './Dialog';
import { withStyles } from '@material-ui/core/styles';

//Redux
import { compose } from 'redux';
import { withHandlers } from 'recompose'
import { connect } from 'react-redux';
import  {withFirestore} from '../utilities/withFirestore';
import { COLLECTIONS } from "../constants/firestore";
import WorkingRights from './InputFields/WorkingRights';
import PhoneNumber from './InputFields/PhoneNumber';
import CurrentUniversity from './InputFields/CurrentUniversity';
import Name from './InputFields/Name';
import ChangeAdpter from './InputFields/ChangeAdapter'
import AvailableDays from './InputFields/AvailableDays';


const styles = theme => ({
    content: {
      width:270,
      height:150,
      paddingTop:2,
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
        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
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
        const {firstName,lastName,phoneNumber,workingRights,currentUniversity,availableDays} = this.props.user
            this.handleChange('firstName',firstName)
            this.handleChange('lastName',lastName)
           this.handleChange('phoneNumber',phoneNumber)
           this.handleChange('workingRights',workingRights)
           this.handleChange('currentUniversity',currentUniversity)
           this.handleChange('availableDays',availableDays)

        }
    }
    handleCancel=() =>{
          this.loadData()
        this.props.closeHandler()
    }
    handleUpdate(){
        this.props.onUserUpdate({
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            phoneNumber:this.state.phoneNumber,
            workingRights:this.state.workingRights,
            currentUniversity:this.state.currentUniversity,
            availableDays:this.state.availableDays,
        })
        this.props.closeHandler()
    }
    handleChange(name,value){
        if(value){
            this.setState({[name]:value}) 
        } 
    }

  render() {
      const {classes,isOpen} = this.props
 
        if(this.state){
        const {firstName,lastName,phoneNumber,workingRights,currentUniversity,availableDays} = this.state

            return (
                <Dialog activity='Update' 
                title='Account info' isOpen={isOpen} 
                addHandler={()=>{this.handleUpdate()}} 
                disabled={!firstName || !lastName} 
                cancelHandler={()=>{this.handleCancel()}}
               >
               <ChangeAdpter changeHandler={this.handleChange}>
                    <Name firstName={firstName} lastName={lastName}/>
                    </ChangeAdpter>
                   <WorkingRights hasLabel value={workingRights} changeHandler={this.handleChange}/>
                   <AvailableDays hasLabel value={availableDays} changeHandler={this.handleChange}/>
                   <CurrentUniversity hasLabel value={currentUniversity} changeHandler={this.handleChange}/>
                   <PhoneNumber hasLabel value={phoneNumber} changeHandler={this.handleChange}/>
                   
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
)
export default enhance(
    withStyles(styles)(AccountInfoDialog)
)
