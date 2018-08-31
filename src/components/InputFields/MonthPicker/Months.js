import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
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
});

const monthLabels = [['Jan','Feb','Mar','Apr'],['May','Jun','Jul','Aug'],['Sep','Oct','Nov','Dec']];

function Months(props) {
  const {classes, label, handleSelectMonth} = props;

  return(
    <Grid container  className={classes.monthsGrid} direction='column' alignItems='center' justify='space-between'>
      {monthLabels.map((season,i) => {
            return(
            <Grid container  alignItems='center'  key={`${label}-season-${i}`} 
            //style={{width:250}}
             direction='row' alignItems='center' justify='space-around'>
                 {season.map((month,n)=> {
                     const isSelected = (props.selectedMonth===(1+n+i*4))
                     return(
                        <Grid key={`${label}-month-${1+n+i*4}`} style={{width:50, textAlign:'center'}} item> 
                        <button onClick={()=>{handleSelectMonth(1+n+i*4)}} className={isSelected? classes.selectedMonthButton:classes.monthButton}>
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

export default withStyles(styles)(Months);
