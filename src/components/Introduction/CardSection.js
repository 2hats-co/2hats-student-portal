import React from 'react';
import PropTypes from 'prop-types';

import withStyles from 'sp2-material-ui/core/styles/withStyles';
import Typography from 'sp2-material-ui/core/Typography';
import Button from 'sp2-material-ui/core/Button'
import Grid from 'sp2-material-ui/core/Grid'

const styles = theme => ({
  root: theme.mixins.gutters({
    width: 240,
    height: 355,
    padding: 0,
  }),
  button:{
    minWidth:200,
    marginTop: 5,
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
        style={{height:415}}
        alignItems='center'
        direction='column'
        justify='space-around'
      >
        {step && <Typography variant="title">Step {step}</Typography>}
        <Typography variant="title">
          {title}
        </Typography>
        <Grid container style={{height:240}} alignItems='center'>
          <img src={image} alt={title} />
        </Grid>
        <Grid item style={{flex:1}}>
          <Typography style={{ width: 245,textAlign:'center' }} variant="body1">
            {description}
          </Typography>
        </Grid>
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
