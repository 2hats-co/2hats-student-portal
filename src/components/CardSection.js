import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'


const styles = theme => ({
  root: theme.mixins.gutters({
    width: 240,
    height: 330,
    padding: 0,
  }),
  button: {
    marginTop: 35,
    width: 200,
    marginLeft: 20
  }
});

function CardSection(props) {
  const { classes, step, title, image, description, button } = props;
  return (
    <div>
      {step && <Typography variant="display1" color="primary">
        Step {step}
      </Typography>}
      <Grid
        container
        className={classes.root}
        spacing={0}
        alignItems='center'
        direction='column'
        justify='space-between'
      >
        <Typography variant="title" >
          {title}
        </Typography>
        <img src={image} alt={title} />
        <Typography style={{ width: 240 }} variant="body1">
          {description}
        </Typography>
      </Grid>
      {button && <Button className={classes.button} variant='flat' color="primary">
        {button.label}
      </Button>}
    </div>
  );
}

CardSection.propTypes = {
  classes: PropTypes.object.isRequired,
  step: PropTypes.number,
  title: PropTypes.string.isRequired,
  image: PropTypes.any.isRequired,
  description: PropTypes.string.isRequired,
  button: PropTypes.shape({
    label: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired
  })
};
export default withStyles(styles)(CardSection);