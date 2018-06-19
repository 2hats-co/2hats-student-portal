import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LogoOnCard from '../components/LogoOnCard';
import HappyMan from '../assets/images/graphics/Intro3.png'
import { Grid, Button, Typography } from '@material-ui/core';


const styles = theme => ({
    grid: {
        height: 590
    },
    footerButtons: {
        width: 440,

    },
    button: {
        width: 200,

    },
    image: {
        width: 200,
    }

});
const body = ['To ensure you can successfully receive our feedback, we have sent a verification email to your provided email address. ',
    'Please click on the link in the email to verify your email address. You will be directed to our dashboard once your email is verified. ',
    'If you have not received such email from 2hats, you can request another verification email or modify your email address. ',
]
class EmailVerificationView extends React.Component {

    render() {
        const { classes } = this.props;

        return (
            <LogoOnCard>
                <Grid container
                    className={classes.grid}
                    direction="column"
                    justify='space-between'
                    alignItems='center'
                >
                    <Typography variant="headline" color="primary">
                        Your submission is received!
                      </Typography>

                    <img className={classes.image} src={HappyMan} />
                    {body.map((p) => <Typography variant="body">
                        {p}
                    </Typography>)}




                    <Grid container
                        direction="row"
                        className={classes.footerButtons}
                        justify='space-between'
                    >
                        <Button variant="outlined"
                            className={classes.button}
                            color="primary"
                        >
                            Modify email
                </Button>
                        <Button
                            className={classes.button}
                            variant="contained" color="primary">
                            Resend Email
                </Button>
                    </Grid>
                </Grid>
            </LogoOnCard>
        )
    }


}

EmailVerificationView.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(EmailVerificationView);