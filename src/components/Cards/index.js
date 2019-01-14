import React, { useState } from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import MoreIcon from '@material-ui/icons/ExpandMore';

import StarIcon from '@material-ui/icons/StarRounded';
import CancelIcon from '@material-ui/icons/CancelRounded';
import WarningIcon from '@material-ui/icons/WarningRounded';
import MusicIcon from '@material-ui/icons/MusicNoteRounded';
import InfoIcon from '@material-ui/icons/InfoRounded';
import CourseIcon from '@material-ui/icons/SchoolRounded';

import OneCard from './OneCard';
import { DRAWER_WIDTH } from '../withNavigation';
import { CARD_WIDTH, CARD_PADDING } from './OneCard';
// import useCollection from '../../hooks/useCollection';

export const getNumCards = (width, isMobile) => {
  const navWidth = isMobile ? 0 : DRAWER_WIDTH;
  return Math.floor(
    (width - navWidth - CARD_PADDING) / (CARD_WIDTH + CARD_PADDING)
  );
};
export const getCardsWidth = n => 320 * n + 16 * (n + 1);

const styles = theme => ({
  root: {
    boxSizing: 'border-box',
    padding: theme.spacing.unit,
    marginLeft: 'auto',
    marginRight: 'auto',

    textAlign: 'right',
  },

  title: {
    cursor: 'default',
    padding: theme.spacing.unit,
    textAlign: 'left',
  },

  moreButton: {
    margin: theme.spacing.unit,
  },
  moreIcon: { marginRight: `-${theme.spacing.unit * 0.75}px !important` },
});

const DUMMY_CARDS = [
  {
    title: 'Bony-eared assfish',
    secondaryText:
      "The bony-eared assfish is a bathypelagic species of cusk-eel found in tropical and sub-tropical oceans at depths of from 1,171 to 4,415 metres. It has been found as far north as Queen Charlotte Sound off British Columbia's coast. This species grows to a length of 37.5 centimetres SL.",
    primaryAction: 'Learn more',
    route: 'https://en.wikipedia.org/wiki/Bony-eared_assfish',
    image:
      'http://www.digitaljournal.com/img/8/4/3/0/8/3/i/2/8/7/o/assfish-4.JPG',
    tertiaryText: ['bony', 'eared', 'assfish'],
    indicator: <StarIcon />,
    banner: 'Really elusive',
    tertiaryIndicator: (
      <>
        Failed
        <CancelIcon />
      </>
    ),
  },
  {
    title: 'Finland',
    secondaryText:
      'Finland is not a real country. Not only is it not a real country but there is actually no landmass there at all, and the space between Sweden and Russia is actually empty ocean.',
    primaryAction: 'Get #woke',
    route: 'https://www.reddit.com/r/finlandConspiracy/',
    indicator: <WarningIcon />,

    gradient:
      'linear-gradient(-140deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)',
  },
  {
    title: 'Toxic by Britney Spears',
    secondaryText: `Baby, can't you see 
      I'm calling
      A guy like you should wear a warning
      It's dangerous
      I'm falling
      There's no escape
      I can't wait
      I need a hit
      Baby, give me it
      You're dangerous
      I'm loving it`,
    primaryAction: 'Get lit',
    route: 'https://www.youtube.com/watch?v:LOZuxwVk7TU',
    video: 'https://www.youtube.com/embed/LOZuxwVk7TU',
    indicator: <MusicIcon />,
    banner: 'Truly iconic',
  },
  {
    title: 'Generic course card',
    secondaryText: 'Let’s learn some stuff',
    primaryAction: 'Open course',
    route: '/courseRedirect?id=lksdlk',
    newTab: true,
    indicator: <CourseIcon />,
  },
  {
    title: 'Default card',
    secondaryText:
      'There is nothing special about this card. This is the minimum number of required props.',
    primaryAction: 'Action',
    route: '#',
  },
  {
    title: 'Clocks',
    secondaryText:
      'The modern wall clock was designed to closely match the shape of the Earth—a flat disc.',
    primaryAction: 'Do nothing',
    route: '#',
    indicator: <InfoIcon />,
    image:
      'https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA5OS81OTgvb3JpZ2luYWwvZmxhdC1lYXJ0aC1OTy1SRVVTRS5qcGc=',
  },
  {
    title: 'Electricity',
    secondaryText:
      'Electricity is a conspiracy by Big Physics to confuse students.',
    primaryAction: 'Do nothing',
    route: '#',
    indicator: <InfoIcon />,
    image: 'https://l7.alamy.com/comp/X5EKHA/shocked-electrician-X5EKHA.jpg',
  },
  {
    title: 'Eggs',
    secondaryText:
      'Buying pre-cracked eggs is much more efficient than cracking your own eggs—plus, it makes the egg vegan.',
    primaryAction: 'Do nothing',
    route: '#',
    indicator: <InfoIcon />,
    image:
      'https://previews.123rf.com/images/dmitrimaruta/dmitrimaruta1302/dmitrimaruta130200175/18063059-male-hand-holding-egg-with-human-face.jpg',
  },
  {
    title: 'Weight',
    secondaryText:
      'A kilogram of feathers is heavier than a kilogram of steel—because of the weight of all the birds to killed to get those feathers.',
    primaryAction: 'Do nothing',
    route: '#',
    indicator: <InfoIcon />,
    image:
      'https://i.kym-cdn.com/entries/icons/original/000/026/136/big_1496148706_image.jpg',
  },
  {
    title: 'Trust',
    secondaryText:
      'One should never trust anyone who claims to be the best singer and dancer on Earth when their name is not Beyoncé Giselle Knowles-Carter.',
    primaryAction: 'Do nothing',
    route: '#',
    indicator: <InfoIcon />,
    image: 'https://i.ytimg.com/vi/en7JeZhL1Nw/hqdefault.jpg',
  },
  {
    title: 'Illusions',
    secondaryText:
      'One can never truly know if they are talking to a real person or Meryl Streep playing the role of that person. (She’s just that good.)',
    primaryAction: 'Do nothing',
    route: '#',
    indicator: <InfoIcon />,
    image:
      'https://www.goldderby.com/wp-content/uploads/2017/01/meryl-streep-oscars-.jpg?w=620&h=360&crop=1',
  },
];

function Cards(props) {
  const { classes, cols, title } = props;

  const [moreNum, setMoreNum] = useState(1);

  // const [dataState, dataDispatch] = useCollection({
  //   path: `submissions`,
  //   limit: 3,
  // });

  // const getMore = () => {
  //   dataDispatch({ type: 'more' });
  // };

  // console.log(dataState);

  return (
    <div className={classes.root} style={{ width: getCardsWidth(cols) }}>
      <Typography variant="h5" className={classes.title}>
        {title}
      </Typography>

      <Grid container>
        {DUMMY_CARDS.slice(0, cols * moreNum).map((x, i) => (
          <OneCard key={i} {...x} />
        ))}
      </Grid>

      <Button
        color="primary"
        variant="contained"
        className={classes.moreButton}
        disabled={cols * moreNum >= DUMMY_CARDS.length}
        onClick={() => {
          setMoreNum(moreNum + 1);
        }}
      >
        More {title}
        <MoreIcon className={classes.moreIcon} />
      </Button>
    </div>
  );
}

Cards.propTypes = {
  classes: PropTypes.object.isRequired,
  cols: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(Cards);
