import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import {CAREER_INTERESTS,getIndustryFromInterests} from '../../constants/resumeBuilderPrompts'

const styles = theme => ({
  root: {
  },  
  group: {
    marginTop:20,
  },
  groupHeader:{
    fontSize:'16px',
    color:'#000',
  //  marginBottom:5
  },label:{
    fontSize:'15px',
  },
  checkBox:{
    height:15,
    fontSize:'15px',
  },
});
class CareerInterests extends React.Component {
 
  handleChange = name => event => {
    if(event.target.checked){
      const newInterests = this.props.preSelectedList.concat(name)
      this.props.changeHandler('interests',newInterests)
      this.props.changeHandler('industry',getIndustryFromInterests(newInterests))
    }else{
      const newInterests = this.props.preSelectedList.filter(x=> x!==name)
    this.props.changeHandler('interests',newInterests)
    this.props.changeHandler('industry',getIndustryFromInterests(newInterests))
    }
  };
  renderCheckBox(item){
    const { classes,preSelectedList } = this.props;
    return(
    <FormControlLabel className={classes.label} style={{fontSize:'30px'}} key={item.key}
            control={
              <Checkbox
                className={classes.checkBox}
                disabled = {this.props.preSelectedList.length >2 && !this.props.preSelectedList.includes(item.key)}
                checked={preSelectedList.includes(item.key)}
                onChange={this.handleChange(item.key)}
                value={item.label}
              />
            }
            label={item.label}
          />
    )
  }
  renderCheckBoxGroup(label,options){
    const { classes } = this.props;
      return(  
    <FormControl className={classes.group} key={label} component="fieldset">
    <FormLabel className={classes.groupHeader} component="legend">{label}</FormLabel>
    <FormGroup>
    {options.map(option => this.renderCheckBox(option))}
    </FormGroup>
  </FormControl>)
  }
  render() {
    const { classes,preSelectedList} = this.props;
    return (
        <div className={classes.root}>
         <Typography variant="title" color="primary">
         Career Interests - {3-preSelectedList.length} remaining
        </Typography>  
            {CAREER_INTERESTS.map(list => this.renderCheckBoxGroup(list.label,list.items))}    
     </div>
    );
  }
}

CareerInterests.propTypes = {
  classes: PropTypes.object.isRequired,
  changeHandler: PropTypes.func.isRequired,
  preSelectedList: PropTypes.arrayOf(PropTypes.string)
};
export default withStyles(styles)(CareerInterests);