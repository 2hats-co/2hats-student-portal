import React, {Component} from 'react';
import {withNavigation} from '../components/withNavigation';
import withStyles from '@material-ui/core/styles/withStyles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';

import EduExp from '../components/EduExp/';
import ProfileCard from '../components/Profile/ProfileCard';
import PropTypes from "prop-types";
//Redux
import {compose} from 'redux';
import {withHandlers} from 'recompose'
import  {withFirestore} from '../utilities/withFirestore';
import {COLLECTIONS} from "../constants/firestore";
import {PROCESS_TYPES} from "../constants/signUpProcess";
import {getInterestByKey} from '../constants/resumeBuilderPrompts';

const styles = theme => ({
  root: {
    maxWidth: 750,
    minHeight: Math.sqrt(2) * 750,
    margin: '40px auto 180px',
    padding: '0 20px',
    position: 'relative',
    '& *': {
      boxSizing: 'border-box',
    },
    '&:before': {
      content: '""',
      display: 'block',
      width: 'calc(100% - 40px)',
      height: '100%',
      position: 'absolute',
      boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)',
    }
  },
  item: {
    width: '98%',
    maxWidth: 750,
  },
  rightCol: {
    backgroundColor: '#eee',
    boxShadow: '1px 0 0 #eee',
    padding: 40,
  },
  avatar: {
    width: '100%',
    height: 0,
    paddingTop: '100%',
    borderRadius: '50%',
    backgroundSize: 'cover',
    backgroundRepeat: 'norepeat',
    marginBottom: 40,
    [theme.breakpoints.down('sm')]: {
      width: 120,
      height: 120,
      paddingTop: 0,
    },
  },
  leftCol: {
    padding: 40,
  },
  personBar: {
    backgroundColor: theme.palette.primary.main,
    padding: 40,
    margin: -40,
    marginBottom: 0,
    '& *': {
      color: '#fff !important',
    }
  },
  headline: {
    color: theme.palette.primary.main,
    textAlign: 'left',
    marginTop: 40,
  },
  editButton: {
    position: 'absolute',
    right: 16,
    top: 64 + 16,
    zIndex: 99,
  },
});
class ProfileContainer extends Component{
    constructor(props){
      super(props);
      this.state = {
        profileEditorDailog: false,
        editMode: false,
      }
    }
    render(){
        const {classes, profile, user} = this.props;
        const disabled = (user.status === 'in-review');

        const interests = profile.careerInterests.value.map((x, i) => (
          <Typography key={i} variant="subheading">
            {getInterestByKey(x)[0].label}
          </Typography>
        ));

        const education = profile.education.map((x, i) => (
          <Grid container 
          direction="column" 
          alignItems="flex-start"
          style={{marginBottom:16}}
          >
            <Typography variant='subheading' style={{fontWeight:700}}>
              {x.major ? (x.degree + ' — ' + x.major) : x.degree}
            </Typography>
            <Grid container direction="row" alignItems="center" justify="space-between">
                <Grid item xs={7} sm={8}>
                  <Typography variant="body1" style={{fontWeight:500}}>
                    {x.university}
                  </Typography>
                </Grid>
                <Grid item xs={5} sm={4}>
                  <Typography variant="body1" 
                  style={{textAlign:'right'}}>
                    {x.startDate} – {x.endDate}
                  </Typography>
                </Grid>
            </Grid>
            <Grid item xs={12} style={{paddingLeft:0,paddingRight:0}}>
              <Typography variant="body1" style={{whiteSpace:'pre-wrap'}}>{x.description}</Typography>
            </Grid>
          </Grid>
        ));

        const experience = profile.experience.map((x, i) => (
          <Grid container 
          direction="column" 
          alignItems="flex-start"
          style={{marginBottom:16}}
          >
            <Typography variant='subheading' style={{fontWeight:700}}>
              {x.title}
            </Typography>
            <Grid container direction="row" alignItems="center" justify="space-between">
                <Grid item xs={7} sm={8}>
                  <Typography variant="body1" style={{fontWeight:500}}>
                    {x.organisation}
                  </Typography>
                </Grid>
                <Grid item xs={5} sm={4}>
                  <Typography variant="body1" 
                  style={{textAlign:'right'}}>
                    {x.startDate} - {x.endDate}
                  </Typography>
                </Grid>
            </Grid>
            <Grid item xs={12} style={{paddingLeft:0,paddingRight:0}}>
              <Typography variant="body1" style={{whiteSpace:'pre-wrap'}}>{x.description}</Typography>
            </Grid>
          </Grid>
        ));

        if (profile.process === PROCESS_TYPES.build && !this.state.editMode)
        return(<React.Fragment>
          <Button variant="extendedFab" className={classes.editButton}
          onClick={() => {this.setState({ editMode: true })}}
          >
            <EditIcon style={{marginRight:8}} />Edit
          </Button>
          <Grid container className={classes.root}>
            <Grid item xs={12} sm={8} className={classes.leftCol}>
              <div className={classes.personBar}>
                <Typography variant="display1">{user.firstName} {user.lastName}</Typography>
                { interests }
              </div>
              
              <Typography variant="headline" className={classes.headline}>About</Typography>
              <Typography variant="subheading">{profile.bio}</Typography>

              <Typography variant="headline" className={classes.headline}>Education</Typography>
              { education }

              <Typography variant="headline" className={classes.headline}>Work Experience</Typography>
              { experience }
            </Grid>
            <Grid item xs={12} sm={4} className={classes.rightCol}>
              <div style={{backgroundImage: `url(${user.avatarURL})`}} className={classes.avatar} />
              <Typography variant="headline" className={classes.headline}>Skills</Typography>
              {profile.skills.map((x, i) =>
                <Typography key={i} variant="subheading">{x}</Typography>
              )}
              <Typography variant="headline" className={classes.headline}>Available Days</Typography>
              <Typography variant="subheading">{profile.availableDays}</Typography>
            </Grid>
          </Grid>
        </React.Fragment>);

        return(
       <div>
              {this.state.editMode && <Button variant="extendedFab" className={classes.editButton}
                    onClick={() => {this.setState({ editMode: false })}} color="primary"
                    >
                <DoneIcon style={{marginRight:8}} />Done
              </Button>}

              <Grid
                container
                className={classes.grid}
                alignItems='center'
                direction='column'
              >
              <Grid item className={classes.item}>
              <ProfileCard 
              disabled={disabled}
              process = {profile.process}
              skillsList={profile.skills}
              bio={profile.bio}
              name={`${user.firstName} ${user.lastName}`}
              resumeFile={profile.process === PROCESS_TYPES.upload&& profile.resumeFile}
              interestsList={profile.careerInterests}
        
              editHandler={()=>{this.handleEdit(true)}}/>
              </Grid>
              {profile.process === PROCESS_TYPES.build&&
              <Grid item className={classes.item}> 

                <EduExp industry={profile.industry} 
                disabled={disabled}
                name='education' changeHandler={this.props.onUpdate.bind(this)} 
                data = {profile.education}
                width={750}/>   
                <EduExp 
                industry={profile.industry} 
                disabled={disabled}
                name='experience' 
                data={profile.experience} 
                width={750} changeHandler={this.props.onUpdate.bind(this)}/>
                </Grid>
            }
                </Grid>
            </div>
        )
  }
}
ProfileContainer.propTypes = {
    classes: PropTypes.object
  };
  const enhance = compose(
    // add redux store (from react context) as a prop
    withNavigation,
    withFirestore,
    // Handler functions as props
    withHandlers({
     
      onUpdate: props => (name,value) =>
          props.firestore.update({ collection: COLLECTIONS.profiles, doc: props.uid }, {
          [name]:value,
          updatedAt: props.firestore.FieldValue.serverTimestamp()
        }
      )
    }),
  
  )
  export default enhance(
      withStyles(styles)(ProfileContainer)
  )
