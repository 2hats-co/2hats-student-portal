import React from "react";
import DoneIcon from "@material-ui/icons/Done";
import Typography from "sp2-material-ui/core/Typography";

import StyledLink from "../StyledLink";

function MessageView(props) {
  const { message, destination, destinationName } = props;

  return (
    <React.Fragment>
      <DoneIcon style={{ fontSize: 120, color: "#00E676" }} />

      <Typography
        variant="title"
        style={{
          textAlign: "center",
          textTransform: "none",
          marginTop: 10,
          marginBottom: 40
        }}
      >
        {message}
      </Typography>

      <StyledLink href={destination}>Go to {destinationName}</StyledLink>
    </React.Fragment>
  );
}

export default MessageView;
