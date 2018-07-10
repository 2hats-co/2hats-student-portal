import Grid from "@material-ui/core/Grid";
import React from "react";
import EduExpCard from "./DetailsCard";
import HeaderBar from "../HeaderBar";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import DialogForm from "./DailogForm";

import { EDU, getFormFields } from "../../constants/dialogFormFields";
import * as _ from "lodash";

//Redux
import { compose } from "redux";
import { withHandlers, lifecycle } from "recompose";
import { connect } from "react-redux";
import { withFirestore } from "../../utilities/withFirestore";

const styles = theme => ({
  root: {},
  grid: {}
});

class EducationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialog: {
        isOpen: false,
        fields: getFormFields(this.props.name, this.props.industry)
      }
    };
    this.handleNewItem = this.handleNewItem.bind(this);
    this.handleEditDialog = this.handleEditDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
  }
  componentDidMount() {
    this.setState({
      dialog: {
        isOpen: false,
        fields: getFormFields(this.props.name, this.props.industry)
      }
    });
  }
  componentWillUnmount() {}
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      this.setState({
        dialog: {
          isOpen: false,
          fields: getFormFields(this.props.name, this.props.industry)
        }
      });
    }
  }

  handleEditDialog(key, item) {
    let emptyForm = getFormFields(this.props.name, this.props.industry);
    const prefilledForm = _.map(emptyForm, field =>
      Object.assign(field, { value: item[field.name] })
    );
    this.setState({
      dialog: { isOpen: true, key: key, fields: prefilledForm }
    });
  }
  handleNewItem() {
    this.setState({
      dialog: {
        isOpen: true,
        fields: getFormFields(this.props.name, this.props.industry)
      }
    });
  }
  handleCloseDialog(newItem) {
    if (newItem) {
      if (this.state.dialog.key) {
        this.props.onUpdate(this.state.dialog.key, newItem, this.props.name);
      } else {
        this.props.onCreate(newItem, this.props.name);
      }
    }
    this.setState({
      dialog: {
        isOpen: false,
        fields: getFormFields(this.props.name, this.props.industry)
      }
    });
  }
  handleDelete(key) {
    this.props.onDelete(key, this.props.name);
  }
  header() {}
  render() {
    let items;
    const { name } = this.props;
    if (this.props.profile) {
      items = _.map(Object.values(this.props.profile)[0][name], (item, key) => {
        if (item) {
          return (
            <EduExpCard
              key={key}
              title={name === EDU ? item.degree : item.title}
              label={name === EDU ? item.university : item.company}
              startDate={item.startDate}
              endDate={item.endDate}
              description={item.description}
              editHandler={() => {
                this.handleEditDialog(key, item);
              }}
              deleteHandler={() => {
                this.handleDelete(key);
              }}
            />
          );
        }
      });
    }
    return (
      <div>
        <Grid container direction="column" alignItems="center">
          <HeaderBar
            title={name === EDU ? "Tertiary Education" : "Practical Experience"}
            handler={this.handleNewItem}
          />
          {items && items}
        </Grid>
        <DialogForm
          title={"Add Education"}
          key={this.state.dialog.key}
          fields={this.state.dialog.fields}
          handler={this.handleCloseDialog}
          isOpen={this.state.dialog.isOpen}
        />
      </div>
    );
  }
}

EducationContainer.protoTypes = {
  classes: PropTypes.object.isRequired,
  changeHandler: PropTypes.func.isRequired
  // education:PropTypes.any,
  //  experience:PropTypes.any
};

const enhance = compose(
  // add redux store (from react context) as a prop
  withFirestore,
  // Handler functions as props
  withHandlers({
    loadData: props => listenerSettings =>
      props.firestore.setListener(listenerSettings),
    onCreate: props => (item, subCollection) =>
      props.firestore.add(
        {
          collection: "profiles",
          doc: props.uid,
          subcollections: [{ collection: subCollection }]
        },
        {
          ...item,
          createdAt: props.firestore.FieldValue.serverTimestamp()
        }
      ),
    onUpdate: props => (key, item, subCollection) =>
      props.firestore.set(
        {
          collection: "profiles",
          doc: props.uid,
          subcollections: [{ collection: subCollection, doc: key }]
        },
        {
          ...item,
          createdAt: props.firestore.FieldValue.serverTimestamp()
        }
      ),
    onDelete: props => (itemKey, subCollection) =>
      props.firestore.delete({
        collection: `profiles/${props.uid}/${subCollection}`,
        doc: itemKey
      })
    // onUpdate
  }),
  // Run functionality on component lifecycle
  lifecycle({
    // Load data when component mounts
    componentWillMount() {
      const { name } = this.props;
      const listenerSettings = {
        collection: "profiles",
        doc: this.props.uid,
        subcollections: [{ collection: name }]
      };
      this.props.loadData(listenerSettings);
    },
    componentWillUnmount() {
      const { name } = this.props;
      const listenerSettings = {
        collection: "profiles",
        doc: this.props.uid,
        subcollections: [{ collection: name }]
      };
      this.props.firestore.unsetListener(listenerSettings);
    }
  }),
  // Connect todos from redux state to props.todos
  connect(({ firestore }) => ({
    // state.firestore

    profile: firestore.data.profiles // document data by id
    // document data by id
  }))
);

export default enhance(withStyles(styles)(EducationContainer));
