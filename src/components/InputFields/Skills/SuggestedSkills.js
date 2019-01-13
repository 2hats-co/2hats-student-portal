import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import { getSkills } from '../../../constants/resumeBuilderPrompts';
import AddIcon from '@material-ui/icons/AddCircleRounded';

const styles = theme => ({
  title: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit,
  },
  chip: {
    marginTop: theme.spacing.unit / 2,
    backgroundColor: theme.palette.primary.light,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.light,
    },
  },
  addIcon: {
    color: theme.palette.primary.main,
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
});
class SuggestedSkills extends React.Component {
  constructor(props) {
    super(props);
    this.state = { suggestedSkills: [] };
    this.loadSuggestions = this.loadSuggestions.bind(this);
  }

  componentWillMount() {
    this.loadSuggestions();
  }
  loadSuggestions() {
    const { interestKeys, preSelectedList } = this.props;
    const skills = getSkills(interestKeys).filter(
      x => !preSelectedList.includes(x)
    );
    this.setState({ suggestedSkills: skills });
  }
  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.loadSuggestions();
    }
  }
  handleAdd(skill) {
    this.setState({
      suggestedSkills: this.state.suggestedSkills.filter(x => x !== skill),
    });
    this.props.onAdd(skill);
  }
  render() {
    const { classes } = this.props;
    const { suggestedSkills } = this.state;

    const chips = suggestedSkills.map(skill => {
      return (
        <Chip
          key={skill}
          label={skill}
          className={classes.chip}
          onClick={() => {
            this.handleAdd(skill);
          }}
          onDelete={() => {
            this.handleAdd(skill);
          }}
          deleteIcon={<AddIcon className={classes.addIcon} />}
        />
      );
    });
    return (
      <div className={classes.root}>
        {suggestedSkills.length > 0 && (
          <Typography variant="body2" className={classes.title}>
            Suggested skills based on your interests:
          </Typography>
        )}
        {chips}
      </div>
    );
  }
}

SuggestedSkills.propTypes = {
  classes: PropTypes.object.isRequired,
  interestKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAdd: PropTypes.func.isRequired,
  preSelectedList: PropTypes.arrayOf(PropTypes.string),
};

export default withStyles(styles)(SuggestedSkills);
