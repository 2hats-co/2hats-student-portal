import React from 'react';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import BackIcon from '@material-ui/icons/ArrowBack';

function BackBar(props) {
    const { isLoading, email, backHandler } = props;

    return(
        <Grid
            key="back-bar"
            style={{ width: "100%", 
                borderStyle:'solid',
                borderRadius:30,
                height:40,
                borderWidth:0.5,
                borderColor:'#aeaeae',
                marginBottom:20,
             }}
            container
            direction="row"
            alignItems="center"
            justify="flex-start"
        >
            <IconButton
                disabled={isLoading}  
                aria-label="back"
                style={{marginLeft:4,width:32,height:32}}
                id="back-to-email"
                onClick={backHandler}
            >
                <BackIcon />
            </IconButton>
            <Typography
                variant={email.length < 30? 'body1' : 'caption'}
                style={{marginLeft:5,color:'#000',maxWidth:'75%',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}
            >
                {email}
            </Typography>
        </Grid>
    );
}

export default BackBar;
