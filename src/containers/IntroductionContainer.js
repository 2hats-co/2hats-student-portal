import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import LogoOnCard from '../components/LogoOnCard';
import CardSections from '../components/CardSections';

import intro1 from '../assets/images/graphics/Intro1.png'
import intro2 from '../assets/images/graphics/Intro2.png'
import intro3 from '../assets/images/graphics/Intro3.png'

import BuildResume from '../assets/images/graphics/BuildResume.png'
import UploadResume from '../assets/images/graphics/UploadResume.png'


const styles = theme => ({
    root: {
   
    },
    sections:{
       marginTop:30,
    }
  
  });


const IntroSections = [

    {title:'Get Reviewed',
    image:intro1,
    description:'We will provide you a set of tailored and practical feedback based on your resume submission.',
    },
    {title:'Get Assessed',
    image:intro2,
    description:'We will assess your capability through a set of interviews & assessments and provide you actionable feedback for improvement. ',
     button:{label: `Let's start`}},
     {title:'Get Offer',
     image:intro3,
     description:'Once you are qualified, we will match you with a paid placement in your chosen career interest(s). '
    }]
const submission = [
        { heading: 'Resume Submission',
        sections:[{title:'Upload Resume',
        image:UploadResume,
        description:'If you have a resume already created, you can upload it directly to our platform for review.',
         button:{label: `Upload your resume`}},
         {title:'Build Resume',
         image:BuildResume,
         description: 'If you don’t have a resume created, we will help you build a professional resume through a 5-step process.',
          button:{label: `Build a resume`}
        }]
        }]


class IntroductionContainer extends React.Component {

  render(){
    const { classes } = this.props;
    return (
    <LogoOnCard 
    width={'680px'}
    >
    <div className={classes.root}> 
    <Typography variant="headline" color="primary">
        {submission[0].heading}
     </Typography>
    <div className={classes.sections} >
        <CardSections sections={submission[0].sections} hasDivider/>
     </div>
     </div>
     </LogoOnCard>
    );
  }
}

IntroductionContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IntroductionContainer);