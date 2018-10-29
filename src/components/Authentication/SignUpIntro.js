import React from 'react';

import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';

import womanGraphic from '../../assets/images/graphics/SignUpWoman.svg';
import Tick from '../../assets/images/graphics/Tick.svg';

const styles = theme => ({
    copy: {
        maxWidth: 400,
        marginRight: 60,
        '& *': {
          color: '#fff',
          textAlign: 'left',
        },
      },
      subtitle: {
        marginTop: 10,
        lineHeight: 1.3,
        fontStyle: 'italic',
      },
      womanGraphic: {
        width: 148,
        height: 148,
        marginRight: 20,
      },
      tickGrid: {
        height: 148,
      },
      tick: {
        height: 32,
        verticalAlign: 'bottom',
        marginRight: 5,
      },
      tickText: {
        display: 'inline',
        position: 'relative',
        top: -4,
      },
})

function SignUpIntro(props) {
    const { classes } = props;

    return(
    <Grid item className={classes.copy}>
        <Typography variant="display1">We bridge the gap between startups and students</Typography>
        <Typography className={classes.subtitle} variant="title">The simplest way to get access to meaningful work experience!</Typography>
        
        <Grid container style={{marginTop:40}}>
        <Grid item><img src={womanGraphic} className={classes.womanGraphic} /></Grid>
        <Grid item xs>
            <Grid container justify="space-between" className={classes.tickGrid}>
            <Grid item>
                <img src={Tick} className={classes.tick} />
                <Typography className={classes.tickText} variant="title">One-time signup</Typography>
            </Grid>
            <Grid item>
                <img src={Tick} className={classes.tick} />
                <Typography className={classes.tickText} variant="title">Resume review</Typography>
            </Grid>
            <Grid item>
                <img src={Tick} className={classes.tick} />
                <Typography className={classes.tickText} variant="title">Career guidance</Typography>
            </Grid>
            <Grid item>
                <img src={Tick} className={classes.tick} />
                <Typography className={classes.tickText} variant="title">Free for Uni students</Typography>
            </Grid>
            </Grid>
        </Grid>
        </Grid>

    </Grid>
    );
}

export default withStyles(styles)(SignUpIntro);
