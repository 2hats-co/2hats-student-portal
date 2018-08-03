import React from 'react';
//Material UI

import Dialog from '../Dialog';
import { withStyles } from '@material-ui/core/styles';

//Redux
import { compose } from 'redux';
import { withHandlers } from 'recompose'
import  {withFirestore} from '../../utilities/withFirestore';
import { COLLECTIONS } from "../../constants/firestore";
import { PROCESS_TYPES } from "../../constants/signUpProcess";
import { connect } from 'react-redux';
import * as _ from "lodash";

//input fields
import CareerInterests from '../InputFields/CareerInterests'
import PersonalBio from '../InputFields/PersonalBio'
import Skills from '../InputFields/Skills'
import ResumeLoader from '../InputFields/ResumeLoader'


const styles = theme => ({
    root: {
     padding:25,
      margin:'auto',
      maxWidth:900,width:'100%',
    },
    button:{
        width:150
    },
    content:{
      width:'100%',
      maxWidth:900,
    },
  });
  const INITIAL_STATE = {
    careerInterests: [],
    bio: "",
    skills: [],
    industry:'IT',
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
      componentDidUpdate(prevProps, prevState){
        if(prevProps !== this.props){

          _.forEach(Object.values(this.props.profile)[0],(value,key)=>{
            this.handleChange(key,value)
           })
        }     
      }
      handleCancel=() =>{
        _.forEach(this.props.profile,(value,key)=>{
          this.handleChange(key,value)
         })
         this.props.closeHandler()
      }
      handleSave = () => {
        const {name} = this.props
        this.props.onSave({careerInterests: this.state.careerInterests,
          [name]:this.state[name]
          })//update fire store
         this.props.closeHandler()  
      };
      handleChange(name, value) {
        this.setState({[name]:value})
      }
      render() {
        const {classes,isOpen,name} = this.props
        let inputField = (<div/>)
        switch (name) {
          case 'careerInterests':
           inputField = <CareerInterests preSelectedList={this.state.careerInterests} changeHandler={this.handleChange}/> 
            break;
            case 'bio':
            inputField = <PersonalBio bio={this.state.bio} industry={this.state.industry} changeHandler={this.handleChange} />
            break;
            case 'skills':
            inputField = <Skills preSelectedList={this.state.skills} changeHandler={this.handleChange}/>
            break;
            case 'resumeFile':
            inputField = <ResumeLoader resumeFile={this.state.resumeFile} changeHandler={this.handleChange}/>
            break;
          default:
            break;
        }
        return(
          <Dialog activity={`update`} 
          title={''} isOpen={isOpen} 
          addHandler={this.handleSave} 
          disabled={false} 
          cancelHandler={this.handleCancel}
          >
              <div className={classes.content}>
                {inputField}
             </div>
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
        // Connect get data from fire stroe
        connect(({ firestore }) => ({
          profile: firestore.data.profiles, // document data by id
          user: firestore.data.users, // document data by id
       }))
  )
  export default enhance(
      withStyles(styles)(EditDialog)
    )
  