
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';
import EditIcon from '@material-ui/icons/Edit'
import Grid from '@material-ui/core/Grid';
import {getInterestByKey} from '../../constants/resumeBuilderPrompts'
const styles = {
    root:{
        marginBottom:20
    },
  card: {
   width:550,
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
  avatar:{width:150,
    height:150,
    borderRadius:75,
    backgroundColor:'#D8D8D8',
    position:'relative',
    left:250,
    bottom:-50,
    textAlign:'center',
  
    }
};
function ProfileCard(props) {
  const { classes,name,bio,resumeFile,interestsList,skillsList,editHandler} = props;
    let interests = (<div/>)
    if(interestsList){interests=(<div> <Typography variant='subheading'>
    Career Interests:
    </Typography>{interestsList.map(x=> {
      return( <Chip
        key={x}
        label={getInterestByKey(x)[0].label}
        className={classes.chip}
      />)})}</div>)}
      let skills = (<div/>)
    if(skillsList){skills=(<div> <Typography variant='subheading'>
    Skills:
    </Typography>{skillsList.map(x=> {return( <Chip
        key={x}
        label={x}
        className={classes.chip}
      />)})}</div>)}
      let resume = (<div/>)
      if(resumeFile){
        resume= <div>
          <Typography variant='subheading'>
    Resume:
    </Typography>
          <Chip key={resumeFile.fullPath}
          label={resumeFile.name} /></div>
      }
    return (
      <div className={classes.root}>
      <div className={classes.avatar}><PersonIcon style={{paddingTop:15,fontSize:120}}/></div>
     <Card className={classes.card}> 
       <CardContent>  
         <Grid container direction='row' justify='space-between'>
         <Grid item style={{width:60}}> </Grid>
         <Grid item><Typography variant='display1' style={{textAlign:'center'}}>
         {name}
         </Typography>
         </Grid>
         <Grid item> <IconButton onClick={editHandler} aria-label="Edit">
        <EditIcon />
      </IconButton> </Grid>
         </Grid>
           {bio}
           {resume}
         {interests}
         {skills}
       </CardContent>
     </Card>
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
  


