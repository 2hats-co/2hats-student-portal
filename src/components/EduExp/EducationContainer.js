import Grid from '@material-ui/core/Grid';
import React from 'react';
import EduExpCard from './DetailsCard'
import HeaderBar from '../HeaderBar'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DialogForm from './DailogForm'

import { EDU,getFormFields } from "../../constants/dialogFormFields";
import * as _ from 'lodash'


const styles = theme => ({
    root: {
     
    },
    grid:{
    
    }
  });


class EducationContainer extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
        dialog:{isOpen:false, fields:getFormFields(this.props.name)}
    }
    // This binding is necessary to make `this` work in the callback
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog=this.handleCloseDialog.bind(this);
  }

  
    handleOpenDialog(previousEntry){
        if(previousEntry){
            this.setState({dialog:{isOpen:true,fields:_.map(getFormFields(this.props.type),(v,k)=>{
                //previous value to fields
                return Object.assign(v,{value:previousEntry[v.name]})
            })}})

        }else{
            this.setState({dialog:{isOpen:true,fields:getFormFields(this.props.name)}})
           // this.setState({dialogOpen:true})
        }
       
    }
    handleCloseDialog(newItem){
        this.setState({dialog:{isOpen:false,fields:getFormFields(this.props.name)}})
        if(newItem){
        const {changeHandler,items} = this.props 
        changeHandler(this.props.name,items.concat(newItem))
        }
    }
    header(){

    }
    render(){
        const {items,name} = this.props 
        return(
            <div>
<Grid container direction="column" alignItems="center">
      <HeaderBar title={name===EDU? "Tertiary Education":"Practical Experience"} 
                handler={this.handleOpenDialog}/>
      {items&& items.map((item)=>
           <EduExpCard
           key={name===EDU?item.degree:item.title}
           title={name===EDU?item.degree:item.title}
           label={name===EDU?item.university:item.company}
           startDate={item.startDate}
           endDate={item.endDate}
           description={item.description}
           editHandler={()=>{this.handleOpenDialog(item)}}
         />
      )}

    </Grid>
    <DialogForm title={'Add Education'} fields={this.state.dialog.fields} handler={this.handleCloseDialog} isOpen={this.state.dialog.isOpen}/>
    </div>
         )}

}

EducationContainer.protoTypes = {
    classes: PropTypes.object.isRequired,
    changeHandler: PropTypes.func.isRequired,
  }
export default withStyles(styles)(EducationContainer);
