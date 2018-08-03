import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import { Typography, Card, Grid ,IconButton} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'


const styles = theme => ({
  root:{
  width:'100%'
  },
  card:{  
    width: '91%',
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft:20,
    paddingRight:40,
    marginBottom:10
  },
});
function EduExpCard(props) {
  const {disabled, classes, title, key, label, description, startDate, endDate,editHandler,deleteHandler} = props;
  return (
    <div key ={key} className={classes.root}>
 
    <Card elevation={2} className={classes.card}>
  
      <Grid container direction="column" alignItems="flex-start" spacing={16}>
      <Grid container direction="row" alignItems="center" justify="space-between">
      <Typography variant='subheading'>{title}</Typography>
      {!disabled&&<Grid item>
     <IconButton onClick={()=>{editHandler()}} aria-label="Edit">
        <EditIcon />
      </IconButton>
      <IconButton onClick={()=>{deleteHandler()}} aria-label="Delete">
        <DeleteIcon />
      </IconButton>
      </Grid>}
      </Grid>
        <Grid container direction="row" alignItems="flex-start" justify="space-between">
          <Typography variant="body1">{label}</Typography>
          <Typography variant="body1">
            {startDate} - {endDate}
          </Typography>
        </Grid>
        <Typography variant="body1">{description}</Typography>
      </Grid>
    </Card>
    </div>
  );
}

EduExpCard.propTypes = {
  editHandler: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  label: PropTypes.string,
  default: PropTypes.string,
  placeholder: PropTypes.string,
  numberOfLines: PropTypes.number,
  characterLimit: PropTypes.number,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EduExpCard);
