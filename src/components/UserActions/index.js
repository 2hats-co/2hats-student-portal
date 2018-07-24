import React from 'react'

import { Button} from '@material-ui/core';
import LogoutIcon from '@material-ui/icons/ExitToApp'
import UpdateIcon from '@material-ui/icons/Update'
import {auth} from '../../firebase';
import AccountInfoDailog from './AccountInfoDialog'
class UserActions extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            infoDialog:false
        }
        this.handleInfoDialog = this.handleInfoDialog.bind(this)
    }
    handleInfoDialog(isOpen){
        this.setState({infoDialog:isOpen})
    }
    render(){
        return(<div>
            <Button style={{width:200,margin:8}} onClick={()=>{
                this.handleInfoDialog(true)}
                }>  
                <UpdateIcon/>Update Account Info
            </Button>
            <Button style={{width:120,margin:8}} onClick={
                auth.doSignOut
               }>  

               <LogoutIcon/> Log Out</Button>
               <AccountInfoDailog isOpen={this.state.infoDialog} closeHandler={this.handleInfoDialog}/>
               </div>
        )
    }

}
export default UserActions