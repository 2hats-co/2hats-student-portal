import React from "react";
import Typography from "sp2-material-ui/core/Typography";
import withStyles from "sp2-material-ui/core/styles/withStyles";
import ListItem from "./ListItem";
import LinkIcon from "@material-ui/icons/KeyboardArrowRight";
import Divider from "sp2-material-ui/core/Divider";
import forEach from "lodash.foreach";
import sortBy from "lodash.sortby";

const styles = theme => ({
  root: {
    marginTop: 20,
    width: "100%",
    maxWidth: 500
  },
  title: {
    marginBottom: 15
  }
});

function UpcomingEvents(props) {
  let items = [];
  const { classes, data } = props;
  const orderedData = sortBy(data, ["startDate"]);
  forEach(orderedData, (event, key) => {
    const timestamp = event.startDate;
    const title = event.name;
    const body = event.location;
    const link = event.url;
    items.push({ key, timestamp, title, body, link });
  });

  if (items.length == 0)
    return (
      <div className={classes.root}>
        <Typography className={classes.title} variant="display1">
          Upcoming Events
        </Typography>
        <Typography variant="subheading">
          There are not upcoming events at the moment — check again later!
        </Typography>
      </div>
    );

  return (
    <div className={classes.root}>
      <Typography className={classes.title} variant="display1">
        Upcoming Events
      </Typography>
      <Divider />
      {items.map(x => (
        <div key={x.key}>
          <ListItem
            title={x.title}
            timestamp={x.timestamp}
            body={x.body}
            link={x.link}
            actionIcon={<LinkIcon style={{ fontSize: 38 }} />}
          />
          <Divider />
        </div>
      ))}

      <Divider />
    </div>
  );
}

export default withStyles(styles)(UpcomingEvents);
