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
        const {disabled, name,label, children} = this.props
       
        const {isOpen} = this.state
        return(
           <div>
        <Grid container direction='row' justify='space-between' alignItems='center' >
               <Typography variant='subheading'>
                 {label}:
               </Typography>
               <Grid item> 
               {!disabled&&
                  <IconButton onClick={()=>{this.setState({isOpen:true})}} 
                     aria-label={`edit ${label}`}>
                    <EditIcon />
                 </IconButton> 
                }
               </Grid>
           </Grid>
           {children}
            <EditDialog name={name} label={label} isOpen={isOpen} closeHandler={this.handleClose}/>
           </div>
        )
    }
}
export default Section