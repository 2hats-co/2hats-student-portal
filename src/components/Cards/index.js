import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import MoreIcon from '@material-ui/icons/ExpandMore';

import CardsHeader from './CardsHeader';
import OneCard from './OneCard';
import { SIDEBAR_WIDTH } from '../Navigation';
import { CARD_WIDTH, CARD_PADDING } from './OneCard';
import useMore from '../../hooks/useMore';
import { COLLECTIONS } from '@bit/sidney2hats.2hats.global.common-constants';
import * as mappings from '../../constants/oneCardMappings';

export const getNumCards = (width, isMobile) => {
  const navWidth = isMobile ? 0 : SIDEBAR_WIDTH;
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
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: theme.spacing(5),
    maxWidth: '100vw',
    userSelect: 'none',
  },
  inline: {
    display: 'inline-block',
  },

  moreButton: {
    margin: theme.spacing(1),
    '& svg': {
      marginLeft: theme.spacing(0.25),
    },
  },

  noneLeftWrapper: {
    marginBottom: theme.spacing(2),
  },
  noneLeftIcon: {
    fontSize: 35,
    color: theme.palette.text.disabled,
    marginLeft: theme.spacing(1),
  },
  noneLeftMsg: {
    color: theme.palette.text.disabled,
    marginLeft: theme.spacing(2),
    fontWeight: 700,
    lineHeight: 1.4,
    maxWidth: 260,
  },
});

function Cards(props) {
  const {
    classes,

    cols,
    title,
    Icon,
    route,

    NoneLeftIcon,
    noneLeftMsg,

    useCollectionInit,
    mapping,
    mappingOverrides,
    filterIds,
    yourBackup,

    inline,
    hideMore,
    extra,
  } = props;

  const [rows, setRows] = useState(1);
  const [usedYourBackup, setUsedYourBackup] = useState(false);

  let extraCols = cols;
  if (extra) {
    if (cols === 2) extraCols = 4;
    if (cols <= 1) extraCols = 3;
  }

  const [cards, getMore, setFilterIds, cardsState, cardsDispatch] = useMore(
    useCollectionInit,
    extraCols,
    filterIds
  );
  useEffect(() => {
    setFilterIds(filterIds);
  }, [filterIds]);

  if (
    !cardsState.loading &&
    cards.length === 0 &&
    yourBackup &&
    !usedYourBackup
  ) {
    cardsDispatch({
      path: `${COLLECTIONS.users}/${yourBackup}/${useCollectionInit.path}`,
    });
    setFilterIds([]);
    setUsedYourBackup(true);
  }

  if (!cardsState.loading && cards.length === 0 && noneLeftMsg)
    return (
      <div
        className={classNames(classes.root, inline && classes.inline)}
        style={{
          width: Math.min(
            getCardsWidth(cols),
            getCardsWidth(getNumCards(window.innerWidth))
          ),
        }}
      >
        <CardsHeader {...{ title, route, Icon, usedYourBackup }} />

        <Grid container alignItems="center" className={classes.noneLeftWrapper}>
          {NoneLeftIcon && <NoneLeftIcon className={classes.noneLeftIcon} />}
          <Typography variant="subtitle1" className={classes.noneLeftMsg}>
            {noneLeftMsg}
          </Typography>
        </Grid>
      </div>
    );

  if (cards.length > 0)
    return (
      <div
        className={classNames(classes.root, inline && classes.inline)}
        style={{
          width: Math.min(
            getCardsWidth(cols),
            getCardsWidth(getNumCards(window.innerWidth))
          ),
        }}
      >
        <CardsHeader {...{ title, route, Icon, usedYourBackup }} />

        <Grid container>
          {cards &&
            cards.map((x, i) => (
              <OneCard
                key={i}
                {...mappings[mapping]({ ...x, ...mappingOverrides })}
              />
            ))}
        </Grid>

        {!hideMore && cards.length >= extraCols * rows && (
          <Button
            color="primary"
            variant="outlined"
            className={classes.moreButton}
            disabled={cards.length < extraCols * rows}
            onClick={() => {
              setRows(rows + 1);
              getMore(extraCols);
            }}
          >
            More
            <MoreIcon className={classes.moreIcon} />
          </Button>
        )}
      </div>
    );

  return null;
}

Cards.propTypes = {
  classes: PropTypes.object.isRequired,
  cols: PropTypes.number.isRequired,
  title: PropTypes.node.isRequired,
  Icon: PropTypes.func,
  route: PropTypes.string,
  NoneLeftIcon: PropTypes.func,
  noneLeftMsg: PropTypes.node,

  useCollectionInit: PropTypes.object.isRequired,
  mapping: PropTypes.string.isRequired,
  mappingOverrides: PropTypes.object,
  filterIds: PropTypes.array,
  yourBackup: PropTypes.string,

  inline: PropTypes.bool,
  hideMore: PropTypes.bool,
  extra: PropTypes.bool,
};

export default withStyles(styles)(Cards);
