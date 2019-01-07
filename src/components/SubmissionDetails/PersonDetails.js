import React from "react";
import moment from "moment";

import { withStyles } from "sp2-material-ui/core/styles";
import Grid from "sp2-material-ui/core/Grid";
import Typography from "sp2-material-ui/core/Typography";
import Avatar from "sp2-material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";

import { getInterestByKey } from "../../constants/resumeBuilderPrompts";

const styles = theme => ({
  avatar: {
    width: 56,
    height: 56,
    marginRight: 16
  },
  name: {
    textAlign: "left"
  }
});

function PersonDetails(props) {
  const { classes, submission } = props;
  const { careerInterests } = submission.submissionContent;
  const timestamp = moment.unix(submission.createdAt.seconds).format("LLLL");

  let interests = "";
  console.log("careerInterests", careerInterests);
  if (careerInterests.type === "custom") {
    for (let i = 0; i < careerInterests.value.length; i++) {
      const interestKey = careerInterests.value[i];
      interests += interestKey;
      if (i < careerInterests.value.length - 1) interests += ", ";
    }
  } else {
    for (let i = 0; i < careerInterests.value.length; i++) {
      const interestKey = careerInterests.value[i];
      interests += getInterestByKey(interestKey)[0].label || interestKey;
      if (i < careerInterests.value.length - 1) interests += ", ";
    }
  }

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Avatar className={classes.avatar}>
          <PersonIcon />
        </Avatar>
      </Grid>
      <Grid item xs>
        <Typography variant="headline" className={classes.name}>
          {submission.displayName}
        </Typography>
        <Typography variant="body2">{interests}</Typography>
        <Typography variant="body1">Submitted on {timestamp}</Typography>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(PersonDetails);
