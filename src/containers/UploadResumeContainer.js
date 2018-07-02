import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LogoOnCard from '../components/LogoOnCard';

import { Grid, Button,Typography } from '@material-ui/core';
import CareerInterests from '../components/CareerInterests';
import DocumentLoader from '../components/DocumentLoader';
import SectionWrapper from '../components/SectionWrapper';
const styles = theme => ({
    root: {  
        padding:40
    },
    footerButtons: {
        marginTop:30,
        width: 440,
    },
    button: {
        width: 200,
    }
});
const INITIAL_STATE = {

    fileName:'',
    view:'interests',//[upload,interests]
    interests:[]
}

class UploadResumeContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
      }

    disableHandler(){
        const {view,fileName} = this.state;
        switch (view) {
            case 'interests': return true
            case 'upload': return fileName === ''
            default:
                break;
        }
      }
      handleChange(name, value) {
        this.setState({ [name]: value });
      }
    
    render() {
        const { classes } = this.props;
        const {view} = this.state;
        let footerButtons = (nextLabel) => (
            <Grid container
                direction="row"
                className={classes.footerButtons}
                justify='space-between'
            >
                <Button variant="outlined"
                    className={classes.button}
                    color="primary"
                >
                    Back
                </Button>
                <Button
                    className={classes.button}
                    variant="flat" color="primary"
                    disabled={this.disableHandler()}
                    >
                    {nextLabel}
                </Button>
            </Grid>)
        const header = ( <Typography variant="display1">
          { view=== 'interests' ? 'You are almost there…':'Upload Resume'}
        </Typography>)
        const interestsBody = (
         <Typography style={{marginBottom:10}} variant="body1">
         In order to tailor our feedback to you, please indicate your career interestes below.
         </Typography>)
        return (
            <LogoOnCard
            width={850}
            >
                <Grid container
                className={classes.root}
                direction="column"
                justify='space-between'
                alignItems='center'
            >
            {header}
            {view==='interests'? 
            <SectionWrapper
            child={
                <div>
                {interestsBody}
              <CareerInterests preSelectedList={this.state.interests} changeHandler={this.handleChange.bind(this)} /></div>
            }
            width={750}
            height={220}
          />: <DocumentLoader/>}
             

                {footerButtons( view==='interests' ? 'Confirm interests':'Confirm Upload')}
            </Grid>
            </LogoOnCard>
        )
    }
}

UploadResumeContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(UploadResumeContainer);