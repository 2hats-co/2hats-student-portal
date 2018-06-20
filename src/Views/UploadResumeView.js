import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LogoOnCard from '../components/LogoOnCard';

import { Grid, Button,Typography } from '@material-ui/core';
import CareerInterests from '../components/CareerInterests';
import DocumentLoader from '../components/DocumentLoader';

const styles = theme => ({
    root: {

    },
    footerButtons: {
        width: 440,
    },
    button: {
        width: 200,
    }

});

class UploadResumeView extends React.Component {

    render() {
        const { classes } = this.props;
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
                    variant="flat" color="primary">
                    {nextLabel}
                </Button>
            </Grid>)
        const uploadResumeHeader = ( <Typography variant="headline" color="primary">
        Upload Resume
        </Typography>)
        const careerInterestsHeader = (<div><Typography variant="headline" color="primary">
        You are almost there…
        </Typography>
         <Typography variant="body1">
         In order to tailor our feedback to you, please indicate your career interestes below.
         </Typography></div>)
        return (
            <LogoOnCard>
                <Grid container
                direction="column"
                justify='space-between'
                alignItems='center'
            >
            {uploadResumeHeader}
                <DocumentLoader/>
                {footerButtons('Confirm interests')}
            </Grid>
            </LogoOnCard>
        )
    }


}

UploadResumeView.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(UploadResumeView);