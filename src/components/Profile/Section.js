import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import Grid from "sp2-material-ui/core/Grid";
import Typography from "sp2-material-ui/core/Typography";
import IconButton from "sp2-material-ui/core/IconButton";
import EditDialog from "./EditDialog";
class Section extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.handleClose = this.handleClose.bind(this);
  }
  handleClose() {
    this.setState({ isOpen: false });
  }
  render() {
    const { disabled, name, label, children } = this.props;

    const { isOpen } = this.state;
    return (
      <div>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          style={{ minHeight: 48 }}
        >
          <Typography variant="subheading">{label}:</Typography>
          <Grid item style={{ position: "relative", left: 16 }}>
            {!disabled && (
              <IconButton
                onClick={() => {
                  this.setState({ isOpen: true });
                }}
                aria-label={`edit ${label}`}
              >
                <EditIcon />
              </IconButton>
            )}
          </Grid>
        </Grid>
        {children}
        <EditDialog
          name={name}
          label={label}
          isOpen={isOpen}
          closeHandler={this.handleClose}
        />
      </div>
    );
  }
}
export default Section;
