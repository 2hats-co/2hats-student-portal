import React from 'react'
import TextField from '@material-ui/core/TextField'


function Email(props){
    const {changeHandler,value} = props
    return(
        <TextField
        id="email"
        key="email"
        label="Email Address"
        onChange={changeHandler('email')}
        value={value}
        style={{ marginTop: 0,
            width: '100%',
            marginBottom: 5}}
        margin="normal"
        color="primary"
      />
    )

}
export default Email
