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
        dialog:{isOpen:false, fields:getFormFields(this.props.name,this.props.industry)}
    }
    // This binding is necessary to make `this` work in the callback
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog=this.handleCloseDialog.bind(this);
  }

  
    handleOpenDialog(previousEntry){
        if(previousEntry){
            this.setState({dialog:{isOpen:true,fields:_.map(getFormFields(this.props.name,this.props.industry),(v,k)=>{
                //previous value to fields
                return Object.assign(v,{value:previousEntry[v.name]})
            })}})

        }else{
            this.setState({dialog:{isOpen:true,fields:getFormFields(this.props.name,this.props.industry)}})
           // this.setState({dialogOpen:true})
        }
       
    }
    handleCloseDialog(newItem){
        this.setState({dialog:{isOpen:false,fields:getFormFields(this.props.name,this.props.industry)}})
        if(newItem){
        const {changeHandler,items,name} = this.props 
        changeHandler(name,items.concat(newItem))
        }
    }
    handleDelete(item){
        const {changeHandler,items,name} = this.props 
        const index = items.indexOf(item)
        console.log(index+1)
        if(items.length === 1){
            console.log('just one')
          //  changeHandler(name,[])
        }
        if (index > -1) {
            const newItems =items.splice(index, 1)
            console.log(newItems)
           // changeHandler(name,items.splice(index, 1))
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
           deleteHandler={()=>{this.handleDelete(item)}}
         />
      )}

    </Grid>
    <DialogForm title={'Add Education'} 
    fields={this.state.dialog.fields}
    handler={this.handleCloseDialog} 
    isOpen={this.state.dialog.isOpen}/>
    </div>
         )}

}

EducationContainer.protoTypes = {
    classes: PropTypes.object.isRequired,
    changeHandler: PropTypes.func.isRequired,
  }
export default withStyles(styles)(EducationContainer);
