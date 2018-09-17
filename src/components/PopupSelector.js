import React from 'react'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

class PopupSelector extends React.Component{
   state ={
    popperIsOpen:false
   }
render(){
    const {popperIsOpen} = this.state
    const {items,classes} = this.props
    return(
        <div>
        <IconButton
                  color="primary"
                  style={{backgroundColor:'#FFF4ED'}}
                  buttonRef={node => {
                    this.anchorEl = node;
                  }}
                  aria-owns={popperIsOpen ? 'switch-toggle' : null}
                  aria-haspopup="true"
                  onClick={()=>{this.setState({popperIsOpen:true})}}
                  style={{color:'#000'}}
                ><MoreIcon />
                </IconButton>
        <Popper open={popperIsOpen} anchorEl={this.anchorEl} transition disablePortal placement="bottom-end">
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            id="switch-toggle"
            style={{ transformOrigin: 'right center' }}
          >
            <Paper >
              <ClickAwayListener onClickAway={()=>{this.setState({popperIsOpen:false})}}>
                <MenuList>
                  {items.map((x)=>{
                    return <MenuItem key={x.label} onClick={x.action}>
                      {x.label}
                    </MenuItem>
                  })}}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      </div>
    )
}   
}
export default PopupSelector
