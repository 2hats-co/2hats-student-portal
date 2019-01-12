import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import AutoCompleteField from '../AutoCompleteField';
import Chip from '@material-ui/core/Chip';
import SuggestedSkills from './SuggestedSkills';
import { ALL_SKILLS } from '../../../constants/resumeBuilderPrompts';
import CancelIcon from '@material-ui/icons/Cancel';
const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 850,
    marginTop: -20,
  },
  chipWrapper: {
    marginTop: theme.spacing.unit,
  },
  chip: {
    marginTop: theme.spacing.unit,
  },
});
class Skills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedList: [],
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.addNewSkill = this.addNewSkill.bind(this);
  }
  componentWillMount() {
    const { preSelectedList } = this.props;
    if (preSelectedList) {
      this.setState({ selectedList: preSelectedList });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.props.changeHandler('skills', this.state.selectedList);
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
  addNewSkill(val) {
    let newSelectedList = this.state.selectedList;
    if (newSelectedList.length < 10) {
      let newItem = true;
      newSelectedList.forEach(x => {
        if (x.toUpperCase() === val.toUpperCase()) {
          newItem = false;
        }
      });
      if (!newItem) return;
      newSelectedList.push(val);
      this.setState({ selectedList: newSelectedList });
    }
  }
  render() {
    const { classes, interestKeys, hideSuggestions, hideTitle } = this.props;
    let list = ALL_SKILLS.filter(x => !this.state.selectedList.includes(x));
    return (
      <div className={classes.root}>
        <AutoCompleteField
          title={!hideTitle ? 'Skills' : ''}
          hint="Please address your chosen skills in your tertiary education and practical experience. "
          placeholder="Enter your relevant practical skills (10 max) e.g. Adobe Photoshop"
          list={list}
          onComplete={this.addNewSkill}
        />
        <div className={classes.chipWrapper}>
          {this.state.selectedList.map(x => (
            <Chip
              key={x}
              label={x}
              color="primary"
              onClick={() => {
                this.handleDelete(x);
              }}
              onDelete={() => {
                this.handleDelete(x);
              }}
              deleteIcon={<CancelIcon />}
              className={classes.chip}
            />
          ))}
        </div>
        {!hideSuggestions && (
          <SuggestedSkills
            preSelectedList={this.state.selectedList}
            onAdd={this.addNewSkill}
            interestKeys={interestKeys}
          />
        )}
      </div>
    );
  }
}
Skills.propTypes = {
  classes: PropTypes.object.isRequired,
  changeHandler: PropTypes.func.isRequired,
  hideSuggestions: PropTypes.bool,
  interestKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  preSelectedList: PropTypes.arrayOf(PropTypes.string),
};
export default withStyles(styles)(Skills);
