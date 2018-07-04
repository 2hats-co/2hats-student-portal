import Grid from '@material-ui/core/Grid';
import React from 'react';
import EduExpCard from './DetailsCard'
import HeaderBar from '../HeaderBar'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DialogForm from './DailogForm'
import { INPUTS } from "../../constants/enums";
import { getPrompts } from "../../constants/resumeBuilderPrompts";

const styles = theme => ({
    root: {
     
    },
    grid:{
    
    }
  });
const eduEmptyFields = [{type:INPUTS.textField,name:'degree',label:'Degree',placeholder:'e.g. Bachelor of Commerce',isRequired:true},
{type:INPUTS.textField,name:'major',label:'Major (optional)',placeholder:'e.g. Accounting & Finance',isRequired:false},
{type:INPUTS.dropDown,name:'university',label:'University',options:['USYD','UNSW','UTS'],isRequired:true},
{type:INPUTS.datePicker,name:'startDate',label:'Start',isRequired:true},
{type:INPUTS.datePicker,name:'endDate',label:'End/Expected End',isRequired:true},
{type:INPUTS.multiLine,name:'description',label:'Discription(Optional)',placeholder:`E.g.:
- Re-created 3hats' key product page, which resulted in 50% more page visits
- Created the wireframes and prototypes of a new feature`,hint:'This description should focus on your key achievement in this job/position.',isRequired:false}
]

class EducationContainer extends React.Component {
    state = {
        dialogOpen:false
    }
    handleOpenDialog(){
        this.setState({dialogOpen:true})
    }
    handleCloseDialog(newItem){
        this.setState({dialogOpen:false})
        if(newItem){
        const {changeHandler,items} = this.props 
        changeHandler('education',items.concat(newItem))
        }
    }
    render(){
        const {items} = this.props 
        return(
            <div>
<Grid container direction="column" alignItems="center">
      <HeaderBar title="Tertiary Education" 
                handler={this.handleOpenDialog.bind(this)}/>
      {items&& items.map((item)=>
           <EduExpCard
           key={item.degree}
           title={item.degree}
           label={item.university}
           startDate={item.startDate}
           endDate={item.endDate}
           description={item.description}
         />
      )}
     
       
    </Grid>
    <DialogForm title={'Add Education'} fields={eduEmptyFields} handler={this.handleCloseDialog.bind(this)} isOpen={this.state.dialogOpen}/>
    </div>
         )}

}

EducationContainer.protoTypes = {
    classes: PropTypes.object.isRequired,
    changeHandler: PropTypes.func.isRequired,
  }
export default withStyles(styles)(EducationContainer);
