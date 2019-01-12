import React from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import buggyBoy from '../../assets/images/buggyBoy.png';

const styles = theme => ({
  root: {
    transition: theme.transitions.create(['box-shadow', 'transform']),
    margin: theme.spacing.unit * 2,

    '&:hover': {
      boxShadow: theme.shadows[24],
      transform: 'translateY(-4px)',
    },
  },
  media: {
    height: 140,
  },
});

function OneCard(props) {
  const { classes } = props;
  return (
    <Card classes={{ root: classes.root }}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={buggyBoy}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Lizard
          </Typography>
          <Typography component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}

OneCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OneCard);
