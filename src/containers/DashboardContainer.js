import React, { Component } from 'react';
import DashboardWrapper from '../components/DashboardWrapper';
import { Typography } from '@material-ui/core';

class DashboardContainer extends Component{
    
    render(){
        return(
            <DashboardWrapper header='Dashboard'>
            <Typography variant='display1'>
            Application Timeline
            </Typography>
            </DashboardWrapper>
        )
    }

}
export default DashboardContainer