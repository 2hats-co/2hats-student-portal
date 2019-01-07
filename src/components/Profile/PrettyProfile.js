import React from 'react';
import withStyles from "sp2-material-ui/core/styles/withStyles";

import Grid from 'sp2-material-ui/core/Grid';
import Typography from 'sp2-material-ui/core/Typography';

import {getInterestByKey} from '../../constants/resumeBuilderPrompts';

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
        backgroundColor: '#fff',
        padding: 40,
    },
    personBar: {
        backgroundColor: theme.palette.primary.main,
        padding: 40,
        margin: -40,
        marginBottom: 0,
        '& *': {
            color: '#fff !important',
        },
    },
    headline: {
        color: theme.palette.primary.main,
        textAlign: 'left',
        marginTop: 40,
        '&:first-child': {
            marginTop: 0,
        },
    },
});

function PrettyProfile(props) {
    const {classes, profile, user} = props;

    const interests = profile.careerInterests.value.map((x, i) => (
        <Typography key={i} variant="subheading">
            {getInterestByKey(x).length > 0 ? getInterestByKey(x)[0].label : null}
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

    return(
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
            {user.avatarURL && <div style={{backgroundImage: `url(${user.avatarURL})`}} className={classes.avatar} />}
            <Typography variant="headline" className={classes.headline}>Skills</Typography>
            {profile.skills.map((x, i) =>
            <Typography key={i} variant="subheading">{x}</Typography>
            )}
            <Typography variant="headline" className={classes.headline}>Available Days</Typography>
            <Typography variant="subheading">{profile.availableDays}</Typography>
        </Grid>
    </Grid>
    );
}

export default withStyles(styles)(PrettyProfile);
