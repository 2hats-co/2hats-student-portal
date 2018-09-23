import React from 'react';
import Typography from '@material-ui/core/Typography';

function GreetingWithFirstName(props) {
    const { greeting, firstName } = props;

    return (
        <Typography
            key='welcomeGreeting'
            variant="title" color="primary"
            style={{ width:'100%', textAlign:'center', marginBottom:10 }}
        >
            {greeting}{firstName ? ',' : null} {firstName}
        </Typography>
    );
}

export default GreetingWithFirstName;
