import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import {CAREER_INTERESTS} from '../../constants/resumeBuilderPrompts'

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
  },
  checkBox:{
    height:15,
    fontSize:'12px',
  }
});
class CareerInterests extends React.Component {
  state = {
   selectedCount : 0
  };
  componentDidUpdate(prevProps, prevState){
    if(prevState !== this.state){
    const stateCopy =Object.entries(this.state)
    const interests = stateCopy.filter(x=> x[1]===true ).map(x=> x[0])
    this.props.changeHandler('interests',interests)
    CAREER_INTERESTS.forEach((industry)=>{
      industry.items.forEach((v)=>{
        if(v.key===interests[0]){
          this.props.changeHandler('industry',industry.label)
        }
        
      })
    })
  }
}
componentWillMount(){
 
  const {preSelectedList} = this.props
  if(preSelectedList){
  preSelectedList.forEach(skill => {
    this.setState({[skill]:true})
  });
  this.setState({selectedCount:preSelectedList.length})
}
}
  handleChange = name => event => {
    if(event.target.checked){
        this.setState({ selectedCount: this.state.selectedCount +1 });
    }else{
        this.setState({ selectedCount: this.state.selectedCount -1 });
    }
    this.setState({ [name]: event.target.checked });
  };
  renderCheckBox(item){
    const { classes } = this.props;
    return(
    <FormControlLabel key={item.key}
            control={
              <Checkbox
                className={classes.checkBox}
                disabled = {this.state.selectedCount>2 && !this.state[item.key]}
                checked={this.state[item.key]}
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
  
    
    const { classes} = this.props;
   
    return (
        <div className={classes.root}>
         <Typography variant="title" color="primary">
         Career Interests - {3-this.state.selectedCount} remaining
        </Typography>  
            {CAREER_INTERESTS.map(list => this.renderCheckBoxGroup(list.label,list.items))}    
     </div>
    );
  }
}

CareerInterests.propTypes = {
  classes: PropTypes.object.isRequired,
  changeHandler: PropTypes.func.isRequired
};
export default withStyles(styles)(CareerInterests);