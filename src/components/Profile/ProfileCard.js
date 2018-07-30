
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';

import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';

import Grid from '@material-ui/core/Grid';
import {getInterestByKey} from '../../constants/resumeBuilderPrompts'
import {PROCESS_TYPES} from '../../constants/signUpProcess'

import Section from './Section'
const styles = {
    root:{
    width:'100%',
    marginBottom:20
    },
  card: {
    width:'88%',
   maxWidth:660,
   padding:40,
   paddingBottom:5
  },
  chip:{marginRight:10},
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  bio:{
    paddingTop:20,
    paddingBottom:20
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
};
function ProfileCard(props) {
  const {classes,name,bio,resumeFile,interestsList,skillsList,process} = props;
    let interests = (<div/>)
    if(interestsList){interests=(<div> 
   {interests}
    {interestsList.map(x=> {
      return( <Chip
        key={x}
        label={getInterestByKey(x)[0].label}
        className={classes.chip}
      />)})}</div>)}
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
          {resumeFile.name&& <Chip key={resumeFile.fullPath}
          label={resumeFile.name}/>}
          </div>
      }
    
    return (
      <div className={classes.root}>
      <div style={{marginTop:20,marginBottom:10}}>
      <div className={classes.avatarContainer}>
      <div className={classes.avatar}><PersonIcon style={{paddingTop:15,fontSize:120}}/>
      </div>
      </div>
      </div>
     <Card className={classes.card}> 
       <CardContent>  
         <Grid container direction='row' justify='center'>
         
         <Grid item><Typography variant='display1' style={{textAlign:'center'}}>
         {name}
         </Typography>
         </Grid>
         </Grid>
         {process===PROCESS_TYPES.build&& <Section name='bio' label='Personal Bio'>
         <Typography className={classes.bio} variant='body1'> {bio}</Typography>
         </Section>}
          {process===PROCESS_TYPES.upload&& <Section name='resumeFile' label='Resume'>
         {resume}
         </Section>}
         <Section name='interests' label='Career Interests'>
         {interests}
         </Section>
        <Section name='skills' label='Skills'>
         {skills}
         </Section>
       </CardContent>
     </Card>
    { 
  }
   </div>
  );
}

ProfileCard.propTypes = {
  classes: PropTypes.object.isRequired,
  bio:PropTypes.string.isRequired,
  name:PropTypes.string.isRequired,
  resumeFile:PropTypes.any,
  interestsList:PropTypes.arrayOf(PropTypes.string).isRequired,
  skillsList:PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(ProfileCard)
  


