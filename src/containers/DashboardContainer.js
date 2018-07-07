import React, { Component } from 'react';
import DashboardWrapper from '../components/DashboardWrapper';
import { Typography } from '@material-ui/core';
import { compose } from 'recompose';
import withAuthorisation from '../utilities/Session/withAuthorisation'

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

const authCondition = (authUser) => !!authUser;

export default compose(withAuthorisation(authCondition)(DashboardContainer))
