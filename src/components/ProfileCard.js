
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person'
const styles = {
    root:{
       // marginTop:100,
        marginBottom:20
    },
  card: {
   width:550,
   //height:240,
   padding:40,
   paddingBottom:5
  },
  chip:{marginRight:10},
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  avatar:{width:150,
    height:150,
    borderRadius:75,
    backgroundColor:'#D8D8D8',
    position:'relative',
    left:250,
    bottom:-50,
    textAlign:'center',
  
    }
};

function SimpleCard(props) {
  const { classes } = props;
  const name = 'Perrin Anto'
    const bio = 'I am a third year design student at 2hats University. I have experience working as a graphic design intern at 2hats, where I used tools such as Photoshop, Illustrator and InDesign to develop logos, promotional materials and icons. In the future I aim to pursue a career in graphic design through impactful visuals and innovative communication.'
    const interests = ['User Interface','User Experience'].map(x=> {return( <Chip
        key={x}
        label={x}
        className={classes.chip}
      />)})
    return (
    <div className={classes.root}>
       <div className={classes.avatar}><PersonIcon style={{paddingTop:15,fontSize:120}}/></div>
      <Card className={classes.card}> 
        <CardContent>  
          <Typography variant='display1' style={{textAlign:'center'}}>
          {name}
          </Typography>
          <Typography variant='body1'>
            {bio}
          </Typography>
          <Typography variant='subheading'>
          Career Interests:
          </Typography>
          {interests}
        </CardContent>
      </Card>
     
    </div>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);