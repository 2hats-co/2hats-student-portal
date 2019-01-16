import React, { useState } from 'react';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import MoreIcon from '@material-ui/icons/ExpandMore';

import OneCard from './OneCard';
import { DRAWER_WIDTH } from '../withNavigation';
import { CARD_WIDTH, CARD_PADDING } from './OneCard';
import useCollection from '../../hooks/useCollection';
import * as mappings from '../../constants/oneCardMappings';

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

function Cards(props) {
  const { classes, cols, title, useCollectionInit, mapping } = props;

  const [moreNum, setMoreNum] = useState(1);

  const [dataState, dataDispatch] = useCollection(useCollectionInit);
  const cards = dataState.documents;

  const getMore = () => {
    dataDispatch({ type: 'more' });
  };

  return (
    <div className={classes.root} style={{ width: getCardsWidth(cols) }}>
      <Typography variant="h5" className={classes.title}>
        {title}
      </Typography>

      <Grid container>
        {cards &&
          cards
            .slice(0, cols * moreNum)
            .map((x, i) => <OneCard key={i} {...mappings[mapping](x)} />)}
      </Grid>

      <Button
        color="primary"
        variant="outlined"
        className={classes.moreButton}
        disabled={cards ? cols * moreNum >= cards.length : true}
        onClick={() => {
          setMoreNum(moreNum + 2);
          getMore();
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
  useCollectionInit: PropTypes.object.isRequired,
  mapping: PropTypes.string.isRequired,
};

export default withStyles(styles)(Cards);
