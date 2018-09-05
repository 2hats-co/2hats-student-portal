import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip'
import Typography from '@material-ui/core/Typography'
import {getSkills} from '../../../constants/resumeBuilderPrompts'
import AddIcon from '@material-ui/icons/AddCircle';

const styles = theme => ({
    root: {
       
    },chip: {
        margin: theme.spacing.unit / 2,
        backgroundColor:'#FAEDE4',
        '&:hover':{
            backgroundColor:'#FAEDE4'
        }
        
      },
      addIcon:{
        color:theme.palette.primary.light,       
        '&:hover':{
            color:theme.palette.primary.light
        }
      }

});
class SuggestedSkills extends React.Component {
    constructor(props){
        super(props)
        this.state = {suggestedSkills:[]}
        this.loadSuggestions = this.loadSuggestions.bind(this)
    }
    
    componentWillMount(){
        this.loadSuggestions()
    }
    loadSuggestions(){
        const {interestKeys,preSelectedList} = this.props
        const skills = getSkills(interestKeys).filter(x=>!preSelectedList.includes(x))
        this.setState({suggestedSkills:skills})
    }
    componentDidUpdate(prevProps){
        if(prevProps !== this.props){
           this.loadSuggestions()
        }  
    }
    handleAdd(skill){
        this.setState({suggestedSkills:this.state.suggestedSkills.filter(x=> x !== skill)})
        this.props.onAdd(skill)
      }
    render(){
        const {classes} = this.props
        const {suggestedSkills} = this.state
        
        const chips = suggestedSkills.map(skill=>{
           return( <Chip
            key={skill}
            label={skill}
            className={classes.chip}
            onClick = {()=>{this.handleAdd(skill)}}
            onDelete={()=>{this.handleAdd(skill)}}
            deleteIcon={<AddIcon className={classes.addIcon}/>}
          />)
       })
        return(
            <div>
                {(suggestedSkills.length > 0)&& <Typography variant='subheading'>
                Suggested skills based on your interests:
                </Typography>}
                {chips}
            </div>
        )

    }

}

SuggestedSkills.propTypes = {
    classes: PropTypes.object.isRequired,
    interestKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
    onAdd: PropTypes.func.isRequired,
    preSelectedList: PropTypes.arrayOf(PropTypes.string)
};

export default withStyles(styles)(SuggestedSkills);