import React from 'react'
import EditIcon from '@material-ui/icons/Edit'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import EditDialog from './EditDialog'
class Section extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isOpen:false
        }
        this.handleClose = this.handleClose.bind(this)
    }
   handleClose(){
    this.setState({isOpen:false})
    }
    render(){
        const {name, children,editHandler} = this.props
        const {isOpen} = this.state
        return(
           <div>
        <Grid container='row' justify='space-between' alignItems='center' >
               <Typography variant='subheading'>
                 {name}:
               </Typography>
               <Grid item> 
                  <IconButton onClick={()=>{this.setState({isOpen:true})}} 
                  aria-label="edit resume">
                    <EditIcon />
                  </IconButton> 
               </Grid>
           </Grid>
           {children}
            <EditDialog name={name} isOpen={isOpen} closeHandler={this.handleClose}/>
           </div>
        )
    }
}
export default Section