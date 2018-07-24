import React from "react";
import EduExpCard from "./DetailsCard";
import HeaderBar from "../HeaderBar";
import PropTypes from "prop-types";

import DialogForm from "./DailogForm";
import DeleteDialog from "./DeleteDialog";
import { EDU, getFormFields } from "../../constants/dialogFormFields";
import * as _ from "lodash";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";

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
    this.setState({deleteDialog:{key:key,heading:item.degree||item.title,subheading:item.university||item.organisation}})

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
    const {name,changeHandler,data}=this.props
  
      if (this.state.dialog.key) {
        const key = this.state.dialog.key
   
        let updatedItem = Object.assign({key},newItem)
        let newItems = data.filter(x=>x.key !==key).concat(updatedItem)
        changeHandler(name,newItems)
      } else {
         const key = Math.random().toString(36).substring(2)

        let pushedItem = Object.assign({key},newItem)
        let newItems = data.concat(pushedItem)
        changeHandler(name,newItems)
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
    const {name,changeHandler,data}=this.props
    this.handleCancelDelete()
    changeHandler(name,data.filter(x=>x.key !==key))
 
  }
  handleCancelDelete() {
    this.setState({deleteDialog:null})
  }
  
  render() {
    let items;
    const {dialog} = this.state
    const { name,data} = this.props;
    if(data){
     items=data.map(item=>{
      return (
                <EduExpCard
                  key={item.key}
                  title={name === EDU ? (item.major?(item.degree+' - '+item.major):item.degree) : item.title}
                  label={name === EDU ? item.university : (item.organisation+' / '+item.type) }
                  startDate={item.startDate}
                  endDate={item.endDate}
                  description={item.description}
                  editHandler={() => {
                    this.handleEditDialog(item.key,item);
                  }}
                  deleteHandler={() => {
                    this.handleDeleteDialog(item.key,item);
                  }}
                />
              )
      })
    }
    return (
      <div>
        <Grid style={{width:this.props.width}} container direction="column" alignItems="center">
          <HeaderBar
            title={name === EDU ? "Tertiary Education" : "Practical Experience"}
            handler={this.handleNewItem}
          />
          {items ? items:<Card style={{width:'98%',height:70,marginBottom:20}}/>}
        </Grid>
        <DialogForm
          activity={dialog.key?'Edit':'Add'}
          title={name === EDU ? "Tertiary Education" : "Practical Experience"}
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
  changeHandler: PropTypes.func.isRequired,
  data:PropTypes.array,
  name:PropTypes.string.isRequired
};
EducationContainer.defaultProps ={
  width:470
}

export default EducationContainer;
