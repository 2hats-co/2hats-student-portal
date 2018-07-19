import React from 'react'
import TextField from '@material-ui/core/TextField'


function Password(props){
    const {changeHandler,value} = props
    return(
        <TextField
        id="password"
        key="password"
        label="Password"
        value={value}
        onChange={changeHandler('password')}
        style={{ marginTop: 0,
            width: '100%',
            marginBottom: 5}}
        margin="normal"
        type='password'
      />
    )

}
export default Password

