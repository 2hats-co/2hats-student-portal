import React from "react";

import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

import IconButton from '@material-ui/core/IconButton'
import BackIcon from '@material-ui/icons/ArrowBack'
import NextIcon from '@material-ui/icons/ArrowForward'
import DownIcon from '@material-ui/icons/KeyboardArrowDown'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import moment from 'moment'

import Calendar from './Calendar';
import Field from './Field';

const monthLabels = [['Jan','Feb','Mar','Apr'],['May','Jun','Jul','Aug'],['Sep','Oct','Nov','Dec']]
const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec']
function getMonthName(n){return(monthNames[n-1])} 

function getMoment(m,y){
    let dateSting = `${m}`+`${y}`
    if(m<10){
        dateSting = `0${m}`+`${y}`
    }
    return moment(dateSting,'MMYYYY')
}
const styles = theme => ({
    root: {
        height: 42,
        //maxWidth: 500,
        width: '100%',
        border:'1px solid #9B9B9B',
        borderStyle:'none',
        borderBottomStyle: 'solid',
        '&hover':{ border:'1px solid #000',}
    },
    
    monthsGrid: {
        width:'100%',
        height:85
    },
    selectedDiv:{
        backgroundColor:theme.palette.primary.light
    },
    errorText:{
        fontSize:'11px',
        color:'#ff0000'
    },captionLabel:{
        marginTop:2,
        marginBottom:-15,
    },
  });

  class MonthPicker extends  React.Component {
    constructor(props){
        super(props);
        this.state = {
            year:2018,
            value:'',
            toggled:false
        }
        this.handleIncrementYear = this.handleIncrementYear.bind(this);
        this.handleDecrementYear = this.handleDecrementYear.bind(this);
        this.handleSelectMonth = this.handleSelectMonth.bind(this);
        this.openCalendar = this.openCalendar.bind(this);
    }
    componentDidUpdate(prevProps, prevState) {
       const {value}= this.state
        if (prevState.value !== value&& value!=='') {
          this.props.changeHandler(this.props.name,value)
        }
      }
      handleCloseSnackbar(){
        this.setState({errorBar:false})
    }
    validRange(month,year){
        const {name,maxValue,minValue,toggle} = this.props
     
        let newMoment = getMoment(month,year)
        if(name === 'startDate'){
          if(maxValue){
              if(toggle){
                  if(newMoment< moment()){
                    return true  
                  }else{
                    this.setState({errorMessage:`Please choose an earlier date`})
                    return false
                  }
              }else{
                if(newMoment < moment(maxValue,'MMM YYYY') && newMoment< moment()){
                    this.setState({errorMessage:null})
                    return true
                }else{
                    this.setState({errorMessage:`Please choose an earlier date`})
                    return false
                }
              }
           
          }else{
            this.setState({errorMessage:null})

              return true
          }
        }else if(name === 'endDate'){
            if(minValue){
                if(newMoment > moment(minValue,'MMM YYYY')){
                    this.setState({errorMessage:null})

                    return true
                }else{
                    this.setState({errorMessage:`Please choose a later date`})
                        return false
                }
              }else{
                this.setState({errorMessage:null})

                  return true
              }
        }
        return true
    }
    handleSelectMonth(n){
        if(this.validRange(n,this.state.year)){
            this.openCalendar();
            this.setState({month:n,value:`${getMonthName(n)} ${this.state.year}`,toggled:false})        
        }
    }
    handleIncrementYear(){
        const newYear = this.state.year +1
        if(!this.state.month || this.validRange(this.state.month,newYear)){
                this.setState({year:newYear})
        }
    }
    handleDecrementYear(){
        const newYear = this.state.year -1
        if(!this.state.month || this.validRange(this.state.month,newYear)){
            this.setState({year:newYear})
        }
    }
    handleChange = name => event => {
        this.setState({ [name]: event.target.checked});
    };
    openCalendar(name,focusedField){
     
        if(focusedField === name){
            this.props.changeHandler('focusedField','fsfsfsf')
        } else {
            this.setState({errorMessage:null})
            this.props.changeHandler('focusedField',name)
        }
    }
    
    render(){
        const {toggle,name,focusedField} = this.props
        const isOpen = (name===focusedField)
        return(<div>
            {<Field
                label={this.props.label}
                value={this.props.value}
                name={this.props.name}
                focusedField={this.props.focusedField}
                errorMessage={this.state}
                openCalendar={this.openCalendar}
            />}
            {isOpen && <Calendar
                handleDecrementYear={this.handleDecrementYear}
                handleIncrementYear={this.handleIncrementYear}
                renderMonths={this.renderMonths}
                year={this.state.year}
                month={this.state.month}
                label={this.props.label}
                handleSelectMonth={this.handleSelectMonth}
            />}
            {toggle &&<Grid container direction='row' alignItems='center' justify='space-between' style={{marginBottom:-8}}>
            <Typography variant='caption'>
                {toggle.label}
            </Typography>
            <Switch
                checked={this.state.toggled}
                onChange={()=>{
                        if(this.state.toggled===false){
                            this.setState({value:toggle.value,toggled:true,month:null})
                        }else{
                            if(this.state.value===toggle.value){
                                this.setState({value:'',toggled:false})
                            }
                        }
                    }
                }
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
