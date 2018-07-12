import React from "react";

import moment from 'moment'
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton'
import BackIcon from '@material-ui/icons/ArrowBack'
import NextIcon from '@material-ui/icons/ArrowForward'

import {PRIMARY_COLOR} from '../Theme'

const monthLabels = [['Jan','Feb','Mar','Apr'],['May','Jun','Jul','Aug'],['Sep','Oct','Nov','Dec']]

const styles = theme => ({
    root: {
        height: 130,
        width: 250,
        borderWidth:1
    },
    
    monthsGrid: {
        width:230,
        height:85
    },
    selectedDiv:{
        backgroundColor:PRIMARY_COLOR
    }
  });

  class MonthPicker extends  React.Component {
    constructor(props){
        super(props);
        this.state = {
            year:2018,
            isOpen:true,
            value:'persent'
        }

    }
    handleIncrementYear(){
        const newYear = this.state.year +1
        this.setState({year:newYear})
    }
    handleDecrementYear(){
        const newYear = this.state.year -1
        this.setState({year:newYear})
    }
    handleChange = name => event => {
        console.log(name)
        this.setState({ [name]: event.target.checked });
      };
    renderMonths(selected){
        const {classes} = this.props
        return(<Grid container className={classes.monthsGrid} direction='column' alignItems='center' justify='space-between'>
        
         {monthLabels.map((season,i) => {
            return(
            <Grid item>
            <Grid container style={{width:230}} direction='row' alignItems='center' justify='space-between'>
                 {season.map((month,n)=> {
                     console.log(`${i}-${n} ${1+n+i*4}`)
                     return(
                        <Grid style={{width:50, textAlign:'center'}} item> 
                        <Typography variant='body1' color={(selected===(1+n+i*4))? 'primary':'default'}>
                            {month}
                         </Typography>
                         </Grid>
                     )
                 })}
            </Grid>  
            </Grid>  
            )
        })}
    </Grid>
    )
        
        
    }
    render(){
 
        const {classes, label, name, min, max,selected,toggle} = this.props
        return(<div className={classes.root}>

            {label}
            {this.state.toggled && toggle.value}
            {toggle &&<Grid container direction='row' alignItems='center' justify='space-between'>
            <Typography variant='caption'>
                {toggle.label}
            </Typography>
            <Switch
          checked={this.state.toggled}
          onChange={this.handleChange('toggled')}
          value="toggled"
          color="primary"
         
        />
            </Grid>}
            <Grid container direction='row' alignItems='center' justify='space-between' >
            <IconButton className={classes.button} component="span">
          <BackIcon />
        </IconButton>
            <Typography variant='button'>
                {this.state.year}
            </Typography>
            <IconButton className={classes.button} component="span">
          <NextIcon />
        </IconButton>
            </Grid>
            {this.renderMonths()}
            </div>
        )
    
    }

  }
  export default withStyles(styles)(MonthPicker);
  MonthPicker.protoTypes = {
  classes: PropTypes.object.isRequired,
  toggle: PropTypes.exact({
    label: PropTypes.string,
    value: PropTypes.string,
    isSelected:PropTypes.bool
  }),
  label:PropTypes.string,
  min: PropTypes.exact({
    year: PropTypes.integer,
    month: PropTypes.integer
  }),
  max: PropTypes.exact({
    year: PropTypes.integer,
    month: PropTypes.integer
  }),
  selected: PropTypes.integer
  }