import Grid from "@material-ui/core/Grid";
import React from "react";
import EduExpCard from "./DetailsCard";
import HeaderBar from "../HeaderBar";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import DialogForm from "./DailogForm";
import DeleteDialog from "./DeleteDialog";
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
    this.handleDeleteDialog = this.handleDeleteDialog.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCancelDelete = this.handleCancelDelete.bind(this);
    
  }
  componentDidMount() {
    this.setState({
      dialog: {
        isOpen: false,
        fields: getFormFields(this.props.name, this.props.industry)
      }
    });
  }
  handleDeleteDialog(key,item){
    console.log(key,item)
    this.setState({deleteDialog:{key:key,heading:'test',subheading:'tstttset'}})
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('test11',prevProps,this.props,'state',prevState,this.state)
    
    if (prevProps.name !== this.props.name) {
      console.log('test22',getFormFields(this.props.name, this.props.industry))
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
    this.handleCancelDelete()
    this.props.onDelete(key, this.props.name);
  }
  handleCancelDelete() {
    this.setState({deleteDialog:null})
  }
  handleFormTitle(){
    if(this.state.dialog.key){
      return this.props.name === EDU ? "Edit Education" : "Edit Practical Experience"
    }else{
      return this.props.name === EDU ? "Add Education" : "Add Practical Experience"
    }
  }

  render() {
    let items;
    const { name } = this.props;
    console.log()
    if (this.props.profile) {
      items = _.map(Object.values(this.props.profile)[0][name], (item, key) => {
        if (item) {
          return (
            <EduExpCard
              key={key}
              title={name === EDU ? (item.major?(item.degree+' - '+item.major):item.degree) : item.title}
              label={name === EDU ? item.university : (item.company+' / '+item.type) }
              startDate={item.startDate}
              endDate={item.endDate}
              description={item.description}
              editHandler={() => {
                this.handleEditDialog(key,item);
              }}
              deleteHandler={() => {
                this.handleDeleteDialog(key,item);
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
          title={this.handleFormTitle()}
          key={this.state.dialog.key}
          fields={this.state.dialog.fields}
          handler={this.handleCloseDialog}
          isOpen={this.state.dialog.isOpen}
        />
        {this.state.deleteDialog &&<DeleteDialog 
        name={name} 
        heading={this.state.deleteDialog.heading} 
        subheading={this.state.deleteDialog.subheading}
        deleteHandler={() => {
          this.handleDelete(this.state.deleteDialog.key)
        }}
        cancelHandler={() => {
          this.handleCancelDelete()
        }}

        />}
      </div>
    );
  }
}

EducationContainer.protoTypes = {
  classes: PropTypes.object.isRequired,
  changeHandler: PropTypes.func.isRequired
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
  }),
  // Run functionality on component lifecycle
  lifecycle({
    // Load data when component mounts
    componentWillMount() {
      const eduListenerSettings = {
        collection: "profiles",
        doc: this.props.uid,
        subcollections: [{ collection: 'education' }]
      };
      const expListenerSettings = {
        collection: "profiles",
        doc: this.props.uid,
        subcollections: [{ collection: 'experience' }]
      };
      this.props.loadData(eduListenerSettings);
      this.props.loadData(expListenerSettings);
    },
    componentWillUnmount() {
    
      const eduListenerSettings = {
        collection: "profiles",
        doc: this.props.uid,
        subcollections: [{ collection: 'education' }]
      };
      const expListenerSettings = {
        collection: "profiles",
        doc: this.props.uid,
        subcollections: [{ collection: 'experience' }]
      };
      this.props.firestore.unsetListener(eduListenerSettings);
      this.props.firestore.unsetListener(expListenerSettings);
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
