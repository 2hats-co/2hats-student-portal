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
import { COLLECTIONS } from "../../constants/firestore";

const styles = theme => ({
  root: {
  
  },
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
    this.setState({deleteDialog:{key:key,heading:item.degree||item.title,subheading:item.university||item.company}})
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.name !== this.props.name) {
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
    const { name,classes } = this.props;
   
    if (this.props[name]) {

      items = _.map(this.props[name], (item, key) => {
     
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
        <Grid style={{width:this.props.width}} container direction="column" alignItems="center">
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
EducationContainer.defaultProps ={
  width:470
}

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

  connect(({ firestore }) => ({

    education: firestore.data.education,// document data by id
    experience: firestore.data.experience // document data by id

  }))
);


export default enhance(withStyles(styles)(EducationContainer));
