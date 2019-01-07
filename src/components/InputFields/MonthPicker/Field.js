import React from "react";

import Grid from "sp2-material-ui/core/Grid";
import FormControl from "sp2-material-ui/core/FormControl";
import Input from "sp2-material-ui/core/Input";
import InputLabel from "sp2-material-ui/core/InputLabel";
import InputAdornment from "sp2-material-ui/core/InputAdornment";
import IconButton from "sp2-material-ui/core/IconButton";
import DownIcon from "@material-ui/icons/KeyboardArrowDown";

import withStyles from "sp2-material-ui/core/styles/withStyles";
import FormHelperText from "sp2-material-ui/core/FormHelperText";

const styles = theme => ({
  //
});

function Field(props) {
  const {
    label,
    value,
    classes,
    name,
    focusedField,
    errorMessage,
    openCalendar
  } = props;
  const isOpen = name === focusedField;
  console.log(errorMessage);
  return (
    <Grid
      container
      onClick={() => {
        openCalendar(name, focusedField);
      }}
      direction="column"
      style={{ marginTop: 10 }}
    >
      <FormControl style={{ width: "100%" }}>
        <InputLabel htmlFor="passwordField">{label}</InputLabel>
        <Input
          type="text"
          value={value}
          fullWidth
          error={errorMessage && errorMessage !== ""}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                style={{ width: 30, height: 30 }}
                aria-label="Dropdown"
              >
                <DownIcon style={{ opacity: 0.5 }} />
              </IconButton>
            </InputAdornment>
          }
          style={{ caretColor: "transparent" }}
        />
        {errorMessage && errorMessage !== "" && (
          <FormHelperText id="name-error-text" style={{ color: "#f00" }}>
            {errorMessage}
          </FormHelperText>
        )}
      </FormControl>
    </Grid>
  );
}

export default withStyles(styles)(Field);
