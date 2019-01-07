import React from "react";

import withStyles from "sp2-material-ui/core/styles/withStyles";
import Grid from "sp2-material-ui/core/Grid";
import Typography from "sp2-material-ui/core/Typography";

import IconButton from "sp2-material-ui/core/IconButton";
import BackIcon from "@material-ui/icons/ArrowBack";
import NextIcon from "@material-ui/icons/ArrowForward";

import Months from "./Months";

const styles = theme => ({
  calendar: {
    paddingLeft: 5,
    marginRight: 40,
    width: "calc(100% - 85px)",
    height: 140,
    border: "1px solid #9B9B9B",
    backgroundColor: "#fff",
    position: "absolute",
    zIndex: 100
  }
});

function Calendar(props) {
  const { classes } = props;

  return (
    <div className={classes.calendar}>
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="space-between"
      >
        <IconButton
          className={classes.button}
          onClick={props.handleDecrementYear}
          component="span"
        >
          <BackIcon />
        </IconButton>
        <Typography variant="button">{props.year}</Typography>
        <IconButton
          onClick={props.handleIncrementYear}
          className={classes.button}
          component="span"
        >
          <NextIcon />
        </IconButton>
        <Months
          selectedMonth={props.month}
          label={props.label}
          handleSelectMonth={props.handleSelectMonth}
        />
      </Grid>
    </div>
  );
}

export default withStyles(styles)(Calendar);
