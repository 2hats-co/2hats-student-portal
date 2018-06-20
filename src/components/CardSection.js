// props : step? title! image! description! button?{label, action}

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  root: theme.mixins.gutters({
    width: 350,
    height: 550,

  }),
  button: {
    marginTop: 20,
    marginLeft: 80,
    display: 'inline-block',
    width: 200
  }
});

function CardSection(props) {
  const { classes, step, title, image, description, button } = props;
  return (
    <div>
      <Grid container
        className={classes.root}
        spacing={0}
        alignItems='center'
        direction='column'
        justify='space-between'
      >
        <Grid container

          spacing={0}
          alignItems='center'
          direction='column'
          justify='flex-start'
        >
          {step && <Typography variant="display1" color="primary">
            Step {step}
          </Typography>}
          <Typography variant="display1" >
            {title}
          </Typography>
        </Grid>
        <img src={image} alt={title} />
        <Typography variant="body1">
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
};

export default withStyles(styles)(CardSection);