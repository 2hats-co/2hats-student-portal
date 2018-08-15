import React from "react";
import EduExpCard from "./DetailsCard";
import HeaderBar from "./HeaderBar";
import PropTypes from "prop-types";

import DialogForm from "./Form";
import DeleteDialog from "./DeleteDialog";
import { EDU, getFormFields } from "../../constants/dialogFormFields";
import * as _ from "lodash";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import moment from 'moment'
class EducationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialog: null
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
      dialog: null
    });
  }
  handleDeleteDialog(key,item){
    this.setState({deleteDialog:{key:key,heading:item.degree||item.title,subheading:item.university||item.organisation}})

  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.name !== this.props.name) {
      this.setState({
        dialog: null
      }); 
     
    }
  }

  handleEditDialog(key, item) {
    let emptyForm = getFormFields(this.props.name, this.props.industry);
    const prefilledForm = _.map(emptyForm, field =>
      Object.assign(field, { value: item[field.name] })
    );
    this.setState({
      dialog: {key: key, fields: prefilledForm }
    });
  }
  handleNewItem() {
    this.setState({
      dialog: {
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
      dialog: null
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
    const { name,data,disabled} = this.props;
    if(data){
      const datedData = data.map(x=>{
        if(x.endDate ==='Present'){
          return Object.assign({endMoment:moment('Dec 2100','MMM YYYY').valueOf()},x)
        }else{
          return Object.assign({endMoment:moment(x.endDate,'MMM YYYY').valueOf()},x)
        }
      })
      const orderedData = _.orderBy(datedData, 'endMoment','desc')
     items=orderedData.map(item=>{
      return (
                <EduExpCard
                  disabled={disabled}
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
        <Grid style={{width:'100%',maxWidth:this.props.width}} container direction="column" alignItems="center">
          <HeaderBar
            disabled={disabled}
            title={name === EDU ? "Tertiary Education" : "Practical Experience"}
            handler={this.handleNewItem}
          />
          {items.length !==0 ? items:<Card style={{width:'100%',height:80,marginBottom:20}}>
          <Typography variant='body1' style={{textAlign:'center',marginTop:40}}>
          Press ‘+’ to get started
          </Typography>
          
          </Card>}
        </Grid>
        {dialog&&<DialogForm 
          activity={dialog.key?'Edit':'Add'}
          title={name === EDU ? "Tertiary Education" : "Practical Experience"}
          key={this.state.dialog.key}
          fields={this.state.dialog.fields}
          handler={this.handleCloseDialog}
          isOpen={true}
        />}
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
