import React from "react";

import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton'
import BackIcon from '@material-ui/icons/ArrowBack'
import NextIcon from '@material-ui/icons/ArrowForward'
import DownIcon from '@material-ui/icons/KeyboardArrowDown'
import moment from 'moment'
const monthLabels = [['Jan','Feb','Mar','Apr'],['May','Jun','Jul','Aug'],['Sep','Oct','Nov','Dec']]
const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec']
function getMonthName(n){return(monthNames[n-1])} 
function getDateIndex(month,year){
    if(month<10){return(`${year-2000}0${month}`)}
    else{
        return(`${year-2000}${month}`)
    }
}
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
    monthButton:{
        background: '#FFFFFF',
        height: 25,
        width: 50,
        borderColor:'#FFFFFF',
        borderRadius: 12.5,
        outline:'none',
        border: 'none'
    },
    selectedMonthButton:{
        background: '#F15A29',
        height: 25,
        width: 50,
        borderRadius: 12.5,
        fontColor:'#FFFFFF',
        borderColor:'#FFFFFF',
        outline:'none',
        border: 'none',
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
        paddingLeft:5,
        marginRight:40,
        width:'calc(100% - 85px)',
        height:140,
        border:'1px solid #9B9B9B',
        backgroundColor:'#fff',
        position:'absolute',
        zIndex:100
    },
    errorText:{
        fontSize:'11px',
        color:'#ff0000'
    },captionLabel:{

        marginTop:10,
        marginBottom:-15
    }
  });

  class MonthPicker extends  React.Component {
    constructor(props){
        super(props);
        this.state = {
            year:2018,
            value:'',
            toggled:false
        }
        this.handleIncrementYear = this.handleIncrementYear.bind(this)
        this.handleDecrementYear = this.handleDecrementYear.bind(this)
        this.handleSelectMonth = this.handleSelectMonth.bind(this)
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
            this.openCalender()
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
    renderMonths(selected){
        const {classes,label} = this.props
        
        return(<Grid container  className={classes.monthsGrid} direction='column' alignItems='center' justify='space-between'>
         {monthLabels.map((season,i) => {
            return(
            <Grid container  alignItems='center'  key={`${label}-season-${i}`} 
            //style={{width:250}}
             direction='row' alignItems='center' justify='space-around'>
                 {season.map((month,n)=> {
                     const isSelected = (selected===(1+n+i*4))
                     return(
                        <Grid key={`${label}-month-${1+n+i*4}`} style={{width:50, textAlign:'center'}} item> 
                        <button onClick={()=>{this.handleSelectMonth(1+n+i*4)}} className={isSelected? classes.selectedMonthButton:classes.monthButton}>
                        <Typography variant='body1' style={isSelected?{color:'#fff'}:{color:'#000'}}>
                           {month}
                         </Typography>
                        </button>
                         </Grid>
                     )
                 })}
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
        {this.renderMonths(this.state.month)}
            </Grid>
            </div>
        )
    }
    openCalender(name,focusedField){
     
        if(focusedField === name){
        this.props.changeHandler('focusedField','fsfsfsf')
       
        }else{
            this.setState({errorMessage:null})
          this.props.changeHandler('focusedField',name)
        }
    }
    renderField(){
        const {label,value,classes,name,focusedField}=this.props
        const {errorMessage} = this.state
        const isOpen = (name===focusedField)
     
        return( 
            <Grid container  onClick={()=>{this.openCalender(name,focusedField)}} direction='column'>


            {(isOpen||value)&&<Typography className={classes.captionLabel} variant='caption' color={isOpen?'primary':'default'}>{label}</Typography>}
            <Grid className={classes.root} container direction='row' alignItems='center' justify='space-between'>
            {(!isOpen&&!value)&&<Typography variant='body1'>{label}</Typography>}
            {(isOpen&&!value)&&<Grid item/>}

                {value&& <Typography variant='body1' style={{marginTop:20}}>{value}</Typography>}
                <IconButton style={{height:42,width:42,marginRight:-3}}
                onClick={()=>{this.openCalender(name,focusedField)}}
                className={classes.button}>
                    <DownIcon/>
                </IconButton>
            </Grid>
           {(errorMessage&&isOpen)&& <Typography className={classes.errorText}>
            {errorMessage}
            </Typography>}
            </Grid>
        )
    }
    
    render(){
        const {toggle,name,focusedField} = this.props
        const isOpen = (name===focusedField)
        return(<div>
            {this.renderField()}
            {isOpen && this.renderCalender()}
            {toggle &&<Grid container direction='row' alignItems='center' justify='space-between'>
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
  