import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AutoCompleteField from '../AutoCompleteField';
import Chip from '@material-ui/core/Chip'
import SuggestedSkills from './SuggestedSkills';
import {ALL_SKILLS} from '../../../constants/resumeBuilderPrompts'
const styles = theme => ({
    root: {
     width:'100%',
     maxWidth:850
    },chip: {
        marginTop: 10,
        margin: 4
      },
});
class Skills extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            selectedList: []
          };
          this.handleDelete = this.handleDelete.bind(this)
          this.addNewSkill = this.addNewSkill.bind(this)
    }  
    
      componentWillMount(){
        const {preSelectedList} = this.props
        if(preSelectedList){
            this.setState({selectedList:preSelectedList}) 
      }
      }
      componentDidUpdate(prevProps, prevState){
        if(prevState !== this.state){
        this.props.changeHandler('skills',this.state.selectedList)
        }
    }
    handleDelete = val => {
        let newSelectedList = this.state.selectedList;
        var index = newSelectedList.indexOf(val);
        if (index > -1) {
          newSelectedList.splice(index, 1);
        }
        this.setState({ selectedList: newSelectedList });
      };
    addNewSkill(val){
      
        let newSelectedList = this.state.selectedList;
        if(newSelectedList.length < 10){
            let newItem = true
        newSelectedList.map((x) => {
            if(x.toUpperCase() === val.toUpperCase()){
                newItem = false
             }
        });
       if(!newItem)return;
        newSelectedList.push(val);
        this.setState({ selectedList:newSelectedList});
        }
        
        }
    render() {
        const {classes,interestKeys,hideSuggestions,hideTitle} = this.props;
        return (
            <div className={classes.root}>
         <AutoCompleteField
        title = {!hideTitle?'Skills':''}
        hint = 'Please address your chosen skill(s) in your tertiary education and practical experience. '
        placeholder = 'Enter your relevant practical skills (maximum 10), e.g. Adobe Photoshop'
        list = {ALL_SKILLS.filter(x=> !this.state.selectedList.includes(x))}
        onComplete = {this.addNewSkill}
        />
         {this.state.selectedList.map(x => (
            <Chip
              key={x}
              label={x}
              className={classes.chip}
              onClick={() => {this.handleDelete(x);}}
              onDelete={() => {this.handleDelete(x);}}
            />
          ))}
       {!hideSuggestions&& <SuggestedSkills preSelectedList={this.state.selectedList} onAdd={this.addNewSkill} interestKeys={interestKeys}/>}
           </div>
        );
    } 
}
Skills.propTypes = {
    classes: PropTypes.object.isRequired,
    changeHandler: PropTypes.func.isRequired,
    hideSuggestions:PropTypes.bool,
    interestKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
    preSelectedList: PropTypes.arrayOf(PropTypes.string)
};
export default withStyles(styles)(Skills);