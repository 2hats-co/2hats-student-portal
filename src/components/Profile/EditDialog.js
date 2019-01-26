import React from 'react';
//Material UI
import Dialog from '../Dialog';
import withStyles from '@material-ui/core/styles/withStyles';
//Redux
import { compose } from 'redux';
import { withHandlers } from 'recompose';
import { withFirestore } from '../../utilities/withFirestore';
import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';
import { PROCESS_TYPES } from '../../constants/signUpProcess';
import { connect } from 'react-redux';

//input fields
import CareerInterests from '../InputFields/CareerInterests';
import PersonalBio from '../InputFields/PersonalBio';
import Skills from '../InputFields/Skills';
import ResumeLoader from '../InputFields/ResumeLoader';

import { forEach } from '../../utilities/ObjectsAndArrays';

const styles = theme => ({
  root: {
    padding: 25,
    margin: 'auto',
    maxWidth: 900,
    width: '100%',
  },
  button: {
    width: 150,
  },
  content: {
    width: '100%',
    maxWidth: 900,
  },
});
const INITIAL_STATE = {
  careerInterests: [],
  bio: '',
  skills: [],
  industry: 'IT',
  resumeFile: { name: '', fullPath: '', downloadURL: '' },
  process: PROCESS_TYPES.build,
  error: null,
};
class EditDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.handleChange = this.handleChange.bind(this);
  }
  componentWillMount() {
    if (this.props.profile) {
      forEach(Object.values(this.props.profile)[0], this.handleChange);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      forEach(Object.values(this.props.profile)[0], this.handleChange);
    }
  }
  handleCancel = () => {
    console.log('cancelling');
    console.log();
    forEach(Object.values(this.props.profile)[0], this.handleChange);
    this.props.closeHandler();
  };
  handleSave = () => {
    const { name } = this.props;
    this.props.onSave({
      careerInterests: this.state.careerInterests,
      [name]: this.state[name],
    }); //update fire store
    this.props.closeHandler();
  };
  handleChange(name, value) {
    this.setState({ [name]: value });
  }
  disabledUpadate(name) {
    switch (name) {
      case 'resumeFile':
        return this.state.resumeFile.downloadURL === '';
      default:
        return this.state[name].length === 0;
    }
  }
  render() {
    const { classes, isOpen, name, label } = this.props;
    let inputField = <div />;
    switch (name) {
      case 'careerInterests':
        inputField = (
          <CareerInterests
            hideTitle
            preSelectedList={this.state.careerInterests}
            changeHandler={this.handleChange}
          />
        );
        break;
      case 'bio':
        inputField = (
          <PersonalBio
            hideTitle
            bio={this.state.bio}
            industry={this.state.industry}
            changeHandler={this.handleChange}
          />
        );
        break;
      case 'skills':
        inputField = (
          <Skills
            hideTitle
            preSelectedList={this.state.skills}
            interestKeys={this.state.careerInterests}
            changeHandler={this.handleChange}
          />
        );
        break;
      case 'resumeFile':
        inputField = (
          <ResumeLoader
            hideTitle
            resumeFile={this.state.resumeFile}
            changeHandler={this.handleChange}
          />
        );
        break;
      default:
        break;
    }
    return (
      <Dialog
        activity={`Update`}
        title={` ${label}`}
        isOpen={isOpen}
        addHandler={this.handleSave}
        disabled={this.disabledUpadate(name)}
        cancelHandler={this.handleCancel}
        width={500}
      >
        <div className={classes.content}>{inputField}</div>
      </Dialog>
    );
  }
}
const enhance = compose(
  // add redux store (from react context) as a prop
  withFirestore,
  // Handler functions as props
  withHandlers({
    onSave: props => profile =>
      props.firestore.update(
        { collection: COLLECTIONS.profiles, doc: props.uid },
        {
          ...profile,
          updatedAt: props.firestore.FieldValue.serverTimestamp(),
        }
      ),
  }),
  // Connect get data from fire stroe
  connect(({ firestore }) => ({
    profile: firestore.data.profiles, // document data by id
    user: firestore.data.users, // document data by id
  }))
);
export default enhance(withStyles(styles)(EditDialog));
