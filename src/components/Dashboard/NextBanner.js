import React from 'react'
import { Grid, Typography,Button } from '@material-ui/core';
import AnimateIcon from '../AnimateIcon'
import { withStyles } from "@material-ui/core/styles";
import ArrowIcon from '@material-ui/icons/KeyboardArrowRight'
import {withRouter} from 'react-router-dom'

import * as routes from '../../constants/routes'
const leftShift = 100
const styles = theme =>({
    root:{
        marginLeft:-leftShift,
        paddingLeft:leftShift,
        paddingRight:leftShift/4,
        width:'100%',
        height:200,
        backgroundColor:'rgba(255,147,71,0.1)',
        marginBottom:40,
        
    },

    grid:{
        paddingTop:25,
        height:190,
        maxWidth:550
    },
    button:{
        alignItems:'top !important',
        marginTop:10,
        marginBottom:20,
        width:230,
        height:35
        
      }
})
function Next(props){
    const {classes} = props
    return(
        <div  className={classes.root}><Grid className={classes.grid} container direction='column' justify='space-around'>
                <Grid item>
                    <Typography variant='display1'>
                        What's Next
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant='body1'>
                    We would like to review your profile and provide you a set of tailored feedback. Simply preview your profile and submit it to us when you are ready.
                    </Typography>
                </Grid>
                <Grid item>
                    <Button className={classes.button} variant='flat' onClick={()=>{props.history.push(routes.PROFILE)}}>
                        <div style={{display:'flex',marginLeft:12}}>
                            <div style={{marginTop:0}}> {`Preview Submission`}</div> <AnimateIcon> <ArrowIcon style={{marginRight:-18}}/><ArrowIcon /> </AnimateIcon> 
                        </div>
                    </Button>   
                </Grid>
            </Grid></div>
        )
}
export default withRouter(withStyles(styles)(Next))