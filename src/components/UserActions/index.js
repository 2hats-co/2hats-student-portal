import React from 'react'

import { Button} from '@material-ui/core';
import LogoutIcon from '@material-ui/icons/ExitToApp'
import UpdateIcon from '@material-ui/icons/Update'
import {auth} from '../../firebase';
import AccountInfoDailog from './AccountInfoDialog'

function UserActions(props){
    return(<div>
        <Button style={{width:200}}>  <UpdateIcon/>Update Account Info</Button>
        <Button style={{width:120}} onClick={
            auth.doSignOut
           }>  
           
           <LogoutIcon/> Log Out</Button>
           <AccountInfoDailog isOpen={false}/>
           </div>
    )
}
export default UserActions