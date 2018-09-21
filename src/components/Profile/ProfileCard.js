
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';

import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';
import {getInterestByKey} from '../../constants/resumeBuilderPrompts'
import {PROCESS_TYPES} from '../../constants/signUpProcess'

import DownloadIcon from '@material-ui/icons/ArrowDownward'
import Section from './Section'
const styles = theme => ({
    root:{
    width:'100%',

    },
  card: {
    padding:10,
    [theme.breakpoints.up('md')]: {
      paddingLeft:18,
      paddingRight:18,
      },
      marginBottom:10
  }
  ,
  chip:{mariginTop:10,marginRight:10, marginBottom:5},
  chiplabel: {
    display: 'block',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    padding:'0 20px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 20,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  avatarCenteringContainer:{
    width:'100%',
    marginTop:10,
    marginBottom:100,
    position:'absolute',
  },
  avatar:{width:150,
    height:150,
    borderRadius:75,
    backgroundColor:'#D8D8D8',
    margin:'auto',
    }
})

function getInterests(interestsList){
  const chipStyle = {mariginTop:20,marginRight:10, marginBottom:5}
  if(interestsList.type === "default"){
    return interestsList.value.map(x=> {
      return( <Chip
        key={x}
        label={getInterestByKey(x)[0].label}
       style={{mariginTop:20,marginRight:10, marginBottom:5}}
      />)})
  }else{
    return interestsList.value.map(x=> {
      return( <Chip
        key={x}
        label={x}
        style={{mariginTop:20,marginRight:10, marginBottom:5}}
      />)})
  }
 
  
}
function ProfileCard(props) {
  const {disabled,classes,name,bio,resumeFile,interestsList,skillsList,process} = props;
    let careerInterests = (<div/>)
    if(interestsList){careerInterests=(<div> 
   {careerInterests}
    {getInterests(interestsList)}</div>)}
      let skills = (<div/>)
    if(skillsList){skills=(<div>
    {skillsList.map(x=> {return( <Chip
        key={x}
        label={x}
        className={classes.chip}
      />)})}</div>)}
      let resume = (<div/>)
      if(resumeFile){
        resume= <div>
          {resumeFile.name&& 
          <Chip
          key={resumeFile.fullPath}
          //label={resumeFile.name.length > 30 ? resumeFile.name.substr(0,29) + "…" : resumeFile.name}
          label={resumeFile.name}
          onClick={()=>{ window.open(resumeFile.downloadURL, '_blank');}}
          className={classes.chip}
          avatar={<DownloadIcon style={{transform:'scale(0.8)',marginRight:-12}} />}
          style={{maxWidth:'100%'}}
          classes={{label:classes.chiplabel}}
        />}
          </div>
      }
    
    return (
      <div className={classes.root}>
      <div style={{marginTop:20,marginBottom:10}}>
      </div>
     <Card className={classes.card}> 
       <CardContent> 

         <Grid container direction='row' justify='center'>
         <Grid item><Typography variant='display1' style={{textAlign:'center'}}>
         {name}
         </Typography>
         </Grid>
         </Grid>
        <Section disabled={disabled} name='bio' label='Personal Bio'>
         <Typography variant='body1' style={{whiteSpace:'pre-wrap',opacity: bio ? 1 : 0.8}}>{bio ? bio : 'Write your personal bio by clicking the edit button on the right.'}</Typography>
         </Section> </CardContent>
     </Card>
          {process===PROCESS_TYPES.upload&& <Card className={classes.card}> 
       <CardContent> <Section disabled={disabled} name='resumeFile' label='Resume'>
         {resume}
         </Section></CardContent>
     </Card>
     }<Card className={classes.card}> 
       <CardContent> 
         <Section disabled={disabled} name='careerInterests' label='Career Interests'>
         {careerInterests}
         </Section>
         </CardContent>
     </Card>
     <Card className={classes.card}> 
       <CardContent>  
        <Section disabled={disabled} name='skills' label='Skills'>
         {skills}
         </Section>
       </CardContent>
     </Card>

     {// single card layout
       /* <Card className={classes.card}> 
       <CardContent>  
         <Grid container direction='row' justify='center'>
         
         <Grid item><Typography variant='display1' style={{textAlign:'center'}}>
         {name}
         </Typography>
         </Grid>
         </Grid>
         {process===PROCESS_TYPES.build&& <Section disabled={disabled} name='bio' label='Personal Bio'>
         <Typography className={classes.bio} variant='body1'> {bio}</Typography>
         </Section>}
          {process===PROCESS_TYPES.upload&& <Section disabled={disabled} name='resumeFile' label='Resume'>
         {resume}
         </Section>}
         <Section disabled={disabled} name='careerInterests' label='Career Interests'>
         {careerInterests}
         </Section>
        <Section disabled={disabled} name='skills' label='Skills'>
         {skills}
         </Section>
       </CardContent>
     </Card> */}
   </div>
  );
}

ProfileCard.propTypes = {
  classes: PropTypes.object.isRequired,
  bio:PropTypes.string.isRequired,
  name:PropTypes.string.isRequired,
  resumeFile:PropTypes.any,
  interestsList:PropTypes.exact({type:PropTypes.string,value:PropTypes.arrayOf(PropTypes.string)}),
  skillsList:PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(ProfileCard)
