import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import InputWrapper from "./InputWrapper";
import { Typography, Card, Grid ,IconButton} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit'

const styles = theme => ({
  root:{
    width: 400,
    paddingTop: 30,
    paddingBottom: 20,
    paddingLeft:40,
    paddingRight:40,
  }

});
function EduExpCard(props) {
  const { classes, title, label, description, startDate, endDate } = props;
  return (
    <Card className={classes.root}>
      <Grid container direction="column" alignItems="flex-start" spacing={16}>
      <Grid container direction="row" alignItems="center" justify="space-between">
      <Typography variant='subheading'>{title}</Typography>
      <IconButton className={classes.button} aria-label="Delete">
        <EditIcon />
      </IconButton>
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
  );
}

{/* <EduExpCard
       title='Bachelor of Commerce - Accounting'
       label = 'University of New South Wales'
       startDate= 'Feb 2016'
       endDate= 'Dec 2017'
        description ={`- 85+ WAM
        - Winner of FMAA Management Consulting Case Competition
        - President of AIESEC UNSW`}
       /> */}
EduExpCard.propTypes = {
  title: PropTypes.string.isRequired,
  label: PropTypes.string,
  default: PropTypes.string,
  placeholder: PropTypes.string,
  numberOfLines: PropTypes.number,
  characterLimit: PropTypes.number,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EduExpCard);
