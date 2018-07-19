import React from "react";

import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton'
import BackIcon from '@material-ui/icons/ArrowBack'
import NextIcon from '@material-ui/icons/ArrowForward'
import DownIcon from '@material-ui/icons/ArrowDropDown'

import {PRIMARY_COLOR} from '../../Theme'


const monthLabels = [['Jan','Feb','Mar','Apr'],['May','Jun','Jul','Aug'],['Sep','Oct','Nov','Dec']]
const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec']
function monthName(n){return(monthNames[n-1])} 

const styles = theme => ({
    root: {
        height: 42,
        width: 250,
        border:'2px solid #9B9B9B',
        borderStyle:'none',
        borderBottomStyle: 'solid'
    },
    
    monthsGrid: {
        width:230,
        height:85
    },
    selectedDiv:{
        backgroundColor:PRIMARY_COLOR
    },
    monthButton:{
        background: '#FFFFFF',
        height: 25,
        width: 50,
        borderColor:'#FFFFFF'

    },
    selectedMonthButton:{
        background: '#F15A29',
        height: 25,
        width: 50,
        borderRadius: 12.5,
        fontColor:'#FFFFFF',
        borderColor:'#FFFFFF',
        '&:focus':{
            outline:'none',
            border: 'none'
        },'&:active':{
            outline: 'none',
            border: 'none'
        },'&:hover':{
            outline: 'none',
            border: 'none'
        },'&:change':{
            outline: 'none',
            border: 'none'
        }

    },
    calendar:{
        width:250,
        height:140,
        border:'1px solid #9B9B9B',
        backgroundColor:'#fff',
        position:'absolute',
        zIndex:100
    }
  });

  class MonthPicker extends  React.Component {
    constructor(props){
        super(props);
        this.state = {
            year:2018,
            isOpen:false,
            value:'persent',
            month:5
        }
        this.handleIncrementYear = this.handleIncrementYear.bind(this)
        this.handleDecrementYear = this.handleDecrementYear.bind(this)
        this.handleSelectMonth = this.handleSelectMonth.bind(this)
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState !== this.state) {
          this.props.changeHandler(this.props.name,this.handleValue())
        }
      }
    handleOpen(){

    }
    handleSelectMonth(n){
        this.setState({month:n,isOpen:false})
    }
    handleIncrementYear(){
        const newYear = this.state.year +1
        if(this.props.max.year > newYear){
        this.setState({year:newYear})
    }
    }
    handleDecrementYear(){
        const newYear = this.state.year -1
        if(this.props.min.year < newYear){
            this.setState({year:newYear})
        }
    }
    handleChange = name => event => {
        this.setState({ [name]: event.target.checked});
      };
    renderMonths(selected){
        const {classes} = this.props
        return(<Grid container  className={classes.monthsGrid} direction='column' alignItems='center' justify='space-between'>
        
         {monthLabels.map((season,i) => {
            return(
            <Grid item>
            <Grid container style={{width:250}} direction='row' alignItems='center' justify='space-around'>
                 {season.map((month,n)=> {
                     const isSelected = (selected===(1+n+i*4))
                     return(
                        <Grid style={{width:50, textAlign:'center'}} item> 
                        <button onClick={()=>{this.handleSelectMonth(1+n+i*4)}} className={isSelected? classes.selectedMonthButton:classes.monthButton}>
                        <Typography variant='body1' style={isSelected?{color:'#fff'}:{color:'#000'}}>
                           {month}
                         </Typography>
                        </button>
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
    renderCalender(){
        const {classes} = this.props
        return(<div className={classes.calendar}>
            <Grid container direction='row' alignItems='center' justify='space-between' >
            <IconButton className={classes.button}  onClick={this.handleDecrementYear} component="span">
          <BackIcon />
        </IconButton>
            <Typography variant='button'>
                {this.state.year}
            </Typography>
            <IconButton onClick={this.handleIncrementYear} className={classes.button} component="span">
          <NextIcon />
        </IconButton>
            </Grid>
            {this.renderMonths(this.state.month)}
            </div>
        )
    }
    handleValue(){
        return( this.state.toggled ? this.props.toggle.value:`${monthName(this.state.month)} ${this.state.year}`)
    }
    render(){
        const {classes, label,toggle} = this.props
        return(<div>
            <Grid  className={classes.root} container direction='row' style={{width:'250px'}} alignItems='center' justify='space-between'>
            {label} 
                {this.handleValue()}
                <IconButton style={{height:42,width:42,marginRight:-10}} onClick={()=>{this.setState({isOpen:!this.state.isOpen})}} className={classes.button} component="span">
                    <DownIcon/>
                </IconButton>
           
            </Grid>
            {this.state.isOpen && this.renderCalender()}
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
           
            </div>
        )
    
    }

  }
  export default withStyles(styles)(MonthPicker);
  MonthPicker.protoTypes = {
  classes: PropTypes.object.isRequired,
  toggle: PropTypes.exact({
    label: PropTypes.string,
    changeHandler: PropTypes.func.isRequired,
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
  MonthPicker.defaultProps = {
    max: {year:2030,month:12},
    min: {year:2000,month:1},
  };
  