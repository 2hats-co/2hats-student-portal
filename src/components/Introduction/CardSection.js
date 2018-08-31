import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  root: theme.mixins.gutters({
    width: 240,
    height: 355,
    padding: 0,
  }),
  button:{
    minWidth:200,
    marginTop: 20,
    paddingLeft:10,
    paddingRight:10,
    height:35
  }
});
function CardSection(props) {
  const { classes, step, title, image, description, button } = props;
  return (
    <div key={title}>
      <Grid
        container
        className={classes.root}
        spacing={0}
        style={button?{height:415}:{height:355}}
        alignItems='center'
        direction='column'
        justify='flex-start'
      >
        {step && <Typography variant="title">Step {step}</Typography>}
        <Typography variant="title">
          {title}
        </Typography>
        <Grid container style={{height:220}} alignItems='center'>
          <img src={image} alt={title} />
        </Grid>
        <Typography style={{ width: 245,textAlign:'center' }} variant="body1">
          {description}
        </Typography>
        {button && <Button className={classes.button} onClick={button.onClick} variant='flat' color="primary">
        {button.label}
      </Button>}
      </Grid>
      
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
    label: PropTypes.string,
    action: PropTypes.func
  })
};
export default withStyles(styles)(CardSection);
