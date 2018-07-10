import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AutoCompleteField from './AutoCompleteField';
import Chip from '@material-ui/core/Chip'
const styles = theme => ({
    root: {
        paddingTop:25,
     width:400
    },chip: {
        marginTop: 10,
        margin: 4
      },
});
const marketingList = ['Copy Writing','Wordpress','Word','Facebook AD','Google Analytics/Adword','SEO','MailChimp','Canva']
class SkillsInput extends React.Component {  
    state = {
        selectedList: []
      };

      componentWillMount(){
 
        const {preSelectedList} = this.props
        if(preSelectedList){
            this.setState({selectedList:preSelectedList})

      //  preSelectedList.forEach(skill => {
      //    this.setState({selectedList:true})
       // });
        
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
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
         <AutoCompleteField
         
        title = 'Skills'
        hint = 'Please address your chosen skill(s) in your tertiary education and practical experience. '
        placeholder = 'Choose relevant skills and/or choose your own, e.g. Excel VBA'
        list = {marketingList.filter(x=> !this.state.selectedList.includes(x))}
        onComplete = {this.addNewSkill.bind(this)}
        />
        {this.state.selectedList.map(x => (
            <Chip
              key={x}
              label={x}
              className={classes.chip}
              onDelete={() => {
                this.handleDelete(x);
              }}
            />
          ))}
           </div>
        );
    } 
}

SkillsInput.propTypes = {
    classes: PropTypes.object.isRequired,
    changeHandler: PropTypes.func.isRequired
};
export default withStyles(styles)(SkillsInput);