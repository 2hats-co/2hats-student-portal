import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import CircularProgress from '@material-ui/core/CircularProgress';

import MoreIcon from '@material-ui/icons/ExpandMore';

import OneCard from './OneCard';
import { DRAWER_WIDTH } from '../withNavigation';
import { CARD_WIDTH, CARD_PADDING } from './OneCard';
import useMore from '../../hooks/useMore';
import * as mappings from '../../constants/oneCardMappings';

export const getNumCards = (width, isMobile) => {
  const navWidth = isMobile ? 0 : DRAWER_WIDTH;
  const cols = Math.floor(
    (width - navWidth - CARD_PADDING) / (CARD_WIDTH + CARD_PADDING)
  );
  if (cols > 3) return 3;
  if (cols < 1) return 1;
  return cols;
};
export const getCardsWidth = n => 320 * n + 16 * n;

const styles = theme => ({
  root: {
    boxSizing: 'border-box',
    // padding: theme.spacing.unit,
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '100vw',
    userSelect: 'none',
  },
  inline: {
    display: 'inline-block',
    margin: 0,
  },

  title: {
    cursor: 'default',
    padding: theme.spacing.unit,
    fontWeight: 500,
  },

  moreButton: {
    margin: theme.spacing.unit,
    '& svg': {
      marginLeft: theme.spacing.unit / 4,
    },
  },

  // loading: {
  //   position: 'absolute',
  //   '& svg': { margin: 0 },
  // },
});

function Cards(props) {
  const {
    classes,
    cols,
    title,
    useCollectionInit,
    mapping,
    inline,
    mappingOverrides,
    filterIds,
  } = props;

  const [rows, setRows] = useState(1);

  const [cards, getMore, setFilterIds] = useMore(
    useCollectionInit,
    cols,
    filterIds
  );
  useEffect(
    () => {
      setFilterIds(filterIds);
    },
    [filterIds]
  );

  if (cards.length > 0)
    return (
      <div
        className={classNames(classes.root, inline && classes.inline)}
        style={{ width: getCardsWidth(cols) }}
      >
        <Typography variant="h5" className={classes.title}>
          {title}
        </Typography>

        <Grid container>
          {cards &&
            cards.map((x, i) => (
              <OneCard
                key={i}
                {...mappings[mapping]({ ...x, ...mappingOverrides })}
              />
            ))}
        </Grid>

        <Button
          color="primary"
          variant="outlined"
          className={classes.moreButton}
          disabled={cards.length < cols * rows}
          onClick={() => {
            setRows(rows + 1);
            getMore(cols);
          }}
        >
          More
          <MoreIcon className={classes.moreIcon} />
          {/* {loading && <CircularProgress className={classes.loading} />} */}
        </Button>
      </div>
    );

  return null;
}

Cards.propTypes = {
  classes: PropTypes.object.isRequired,
  cols: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  useCollectionInit: PropTypes.object.isRequired,
  mapping: PropTypes.string.isRequired,
  inline: PropTypes.bool,
  mappingOverrides: PropTypes.object,
  filterIds: PropTypes.array,
};

export default withStyles(styles)(Cards);
