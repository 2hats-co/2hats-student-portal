import React from 'react';
import { withRouter, Link, RouteComponentProps } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { CSSTransition } from 'react-transition-group';
import InfiniteScroll from 'react-infinite-scroller';

import { makeStyles, createStyles } from '@material-ui/core';
import { Grid, Link as MuiLink } from '@material-ui/core';

import CardGridHeader from './CardGridHeader';
import OneCardTwo, { IOneCardTwoProps } from 'components/OneCardTwo';
import LoadingCard, {
  ILoadingCardProps,
} from 'components/OneCardTwo/LoadingCard';
import EmptyState, { IEmptyStateProps } from './EmptyState';

import { useUser } from 'contexts/UserContext';
import useColsWidth from 'hooks/useColsWidth';
import {
  INDUSTRIES,
  INDUSTRY_DISPLAY_NAMES,
} from '@bit/twohats.common.constants';
import {
  CARD_SPACING,
  CARD_COLS_WIDTHS,
  CARD_COLS_MEDIA_QUERIES,
  CARD_ANIMATION_DURATION,
  CARD_ANIMATION_DELAY,
} from 'constants/cards';
import { CardDoc, getPrioritisedCards } from 'utilities/cards';
import { PROFILE, PROFILE_PREFERRED_INDUSTRIES } from 'constants/routes';
import { INITIAL_LIMIT } from 'hooks/useCollection';

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: '100%',
      transition: theme.transitions.create('max-width'),

      margin: '0 auto', // Horizontally center

      // Fix width to width of card columns
      maxWidth: 'none',
      [CARD_COLS_MEDIA_QUERIES[1]]: { maxWidth: CARD_COLS_WIDTHS[1] },
      [CARD_COLS_MEDIA_QUERIES[2]]: { maxWidth: CARD_COLS_WIDTHS[2] },
      [CARD_COLS_MEDIA_QUERIES[3]]: { maxWidth: CARD_COLS_WIDTHS[3] },
      [CARD_COLS_MEDIA_QUERIES[4]]: { maxWidth: CARD_COLS_WIDTHS[4] },
      [CARD_COLS_MEDIA_QUERIES[5]]: { maxWidth: CARD_COLS_WIDTHS[5] },

      // Add margin in between two adjacent CardGrids
      '& + &': {
        marginTop: theme.spacing(4),
      },
    },
    header: {
      minHeight: 36, // Height of Show All button

      // Align horizontally with card ends
      paddingLeft: theme.spacing(CARD_SPACING / 8 / 2),
      marginBottom: theme.spacing(0.5),

      userSelect: 'none',
    },
    headerGrid: {
      textDecoration: 'none', // Fix for Link component
      color: theme.palette.text.primary, // Allows Typography to inherit color
    },
    headerLink: {
      transition: theme.transitions.create('color', {
        duration: theme.transitions.duration.short,
      }),
      '&:hover': { color: theme.palette.primary.main },
    },
    showAllButton: {
      '& svg': { marginLeft: 0 },
    },
    hashLink: { textDecoration: 'none' },

    cardGrid: {
      listStyleType: 'none',
      margin: 0,
      padding: 0,
    },

    animatedCard: {
      '&-appear': {
        opacity: 0,
        transform: 'translateY(32px)',

        '@media (prefers-reduced-motion: reduce)': {
          transform: 'translateY(0)',
        },
      },
      '&-appear-active': {
        opacity: 1,
        transform: 'translateY(0)',
        transition: theme.transitions.create(['opacity, transform']),
        transitionDuration: `${CARD_ANIMATION_DURATION}ms`,
      },
      '&-appear-done': {
        opacity: 1,
        transform: 'translateY(0)',
      },
    },
  })
);

export interface ICardGridProps extends RouteComponentProps {
  /**
   * Header text for the card.
   *
   * Note: this is also used to get the header for the
   * Other [type] section, for deprioritised cards.
   */
  header: string;
  /** Show/hide number of cards in [`CardGridHeader`](#cardgridheader) */
  hideCount?: boolean;
  /** Used to show either just a preview or all the cards.*/
  route: string;
  /** Optionally, override the route label */
  routeLabel?: React.ReactNode;
  /** Array of card documents (direct from Firestore) used to make the cards */
  cardProps: CardDoc[];
  /** The card prop generator function used on cardProps */
  cardGenerator: (data: any) => IOneCardTwoProps;
  /**
   * Used to show [`LoadingCard`](#loadingcard)
   * if not `hideIfEmpty` and not `showPreviewOnly`
   */
  loading: boolean;
  /** Function called by `InfiniteScroll` to load more cards */
  loadMore?: (page: number) => void;
  /** Flag from useCollection call(s) passed down to `InfiniteScroll` */
  hasMore?: boolean;
  /**
   * Used to delay the enter animations for all the cards if appearing after
   * another `CardGrid`
   */
  animationOffset?: number;
  /**
   * Used to hide certain cards by their ID, e.g. if user has already started
   * an assessment, then don't show in the All Assessments section
   */
  filterIds?: string[];
  /** If `true`, puts industries the user does not want (from user doc) at the
   * end. Splits the cards into two sections if not `showPreviewOnly`
   */
  deprioritiseByIndustry?: boolean;
  /** Don't show anything if there are no cards for this section or loading */
  hideIfEmpty?: boolean;
  /** Passed down to [`LoadingCard`](#loadingcard) */
  LoadingCardProps?: Partial<ILoadingCardProps>;
  /** Passed down to [`EmptyState`](#emptystate) */
  EmptyStateProps?: Partial<IEmptyStateProps>;
  /** Number at which the count will show + at the end */
  maxCount?: number;
}

const CardGrid: React.FunctionComponent<ICardGridProps> = ({
  header = '',
  hideCount = false,
  location,
  route,
  routeLabel,
  cardProps,
  cardGenerator,
  loading,
  loadMore,
  hasMore,
  animationOffset = 0,
  filterIds = [],
  deprioritiseByIndustry = false,
  hideIfEmpty,
  LoadingCardProps,
  EmptyStateProps,
  maxCount = INITIAL_LIMIT,
}) => {
  const classes = useStyles();
  const { user } = useUser();

  const showPreviewOnly = location.pathname !== route;

  // Filter out specific assessment IDs, if supplied and if only showing preview
  let filteredCards = cardProps;
  if (Array.isArray(filterIds) && showPreviewOnly)
    filteredCards = cardProps.filter(
      x => 'id' in x && !filterIds.includes(x.id)
    );

  // Move deprioritised cards to the end, if required
  let deprioritisedStartIndex = -1;
  if (
    deprioritiseByIndustry &&
    Array.isArray(user.deprioritisedIndustries) &&
    user.deprioritisedIndustries.length > 0
  ) {
    const prioritisedCards = getPrioritisedCards(filteredCards, user);

    filteredCards = prioritisedCards.sortedCards;
    deprioritisedStartIndex = prioritisedCards.deprioritisedStartIndex;
  }

  // Get the number of cards to display on each row
  const cols = useColsWidth();
  let numCardsToDisplay = cols;
  // Show multiple rows for smaller sizes
  if (cols === 1) numCardsToDisplay = 3;
  if (cols === 2) numCardsToDisplay = 4;
  const cardsToDisplay = showPreviewOnly
    ? filteredCards.slice(0, numCardsToDisplay)
    : filteredCards;

  // Calculate animation delay
  const getAnimationDelay = (i: number) => {
    // If we show a preview only, we must account for animationOffset
    if (showPreviewOnly) {
      const baseDelay = CARD_ANIMATION_DELAY * i;
      const extraAnimationDelay =
        animationOffset * (numCardsToDisplay * 0.75) * CARD_ANIMATION_DELAY;
      return baseDelay + extraAnimationDelay;
    } else {
      // Otherwise, don't count first 1-2 row/s because they won't be
      // re-mounted or re-animated
      return CARD_ANIMATION_DELAY * (i - numCardsToDisplay);
    }
  };

  // Generate the cards to be displayed
  let cards = [];
  // If loading, show dummy cards
  if (loading) {
    // Show LoadingCards if we don't have to hide if empty
    if (!hideIfEmpty || !showPreviewOnly)
      for (let i = 0; i < numCardsToDisplay; i++)
        cards.push(<LoadingCard key={i} {...LoadingCardProps} />);
    // Otherwise, don't show anything - cards will pop into view when loaded
    else return null;
  }
  // Otherwise, generate cards
  else {
    cards = cardsToDisplay.map((x, i) => (
      <CSSTransition
        appear
        in
        timeout={CARD_ANIMATION_DURATION}
        classNames={classes.animatedCard}
        key={`${i}-${x.id}`}
      >
        <li
          key={`${i}-${x.id}`}
          style={{
            transitionDelay: `${getAnimationDelay(i)}s`,
          }}
        >
          <OneCardTwo {...cardGenerator(x)} />
        </li>
      </CSSTransition>
    ));
  }

  // Generate the card grid(s)
  let cardGrid = null;
  let headerOverride = '';
  let headerDescription: React.ReactNode = '';
  let toAppend = null;

  // Display empty state
  if (cards.length === 0) {
    // hideIfEmpty, but only if there are going to be other things on screen
    if (hideIfEmpty && showPreviewOnly) return null;

    // Otherwise, show empty state
    cardGrid = <EmptyState {...EmptyStateProps} />;
  }
  // Otherwise, display cards:
  // Separate prioritised and deprioritised cards if necessary
  else if (deprioritisedStartIndex > -1 && !showPreviewOnly) {
    // Show For You in the header
    headerOverride = `For You: ${Object.values(INDUSTRIES)
      .filter(x => !user.deprioritisedIndustries.includes(x))
      .map(x => INDUSTRY_DISPLAY_NAMES[x])
      .join(', ')}`;
    // Explain this section
    headerDescription = (
      <>
        These are all the {header.replace('All', '').toLowerCase()} from the
        industries you told us you’re interested in. You can{' '}
        <HashLink
          to={PROFILE + '#' + PROFILE_PREFERRED_INDUSTRIES}
          className={classes.hashLink}
        >
          <MuiLink component="span">change your preferences here</MuiLink>
        </HashLink>
        .
      </>
    );
    // Display prioritised cards
    cardGrid = (
      <Grid container component="ul" className={classes.cardGrid}>
        {loading ? cards : cards.slice(0, deprioritisedStartIndex)}
      </Grid>
    );

    // Display deprioritised cards only if finished loading
    if (!loading)
      toAppend = (
        <section className={classes.root}>
          <CardGridHeader
            header={'Other ' + header.replace('All', '')}
            hideCount={hideCount}
            route={route}
            routeLabel={routeLabel}
            showPreviewOnly={showPreviewOnly}
            description={
              <>
                These are all the other{' '}
                {header.replace('All', '').toLowerCase()} from industries you
                told us you’re not interested in. You can{' '}
                <MuiLink
                  component={Link}
                  to={PROFILE + '#' + PROFILE_PREFERRED_INDUSTRIES}
                >
                  change your preferences here
                </MuiLink>
                .
              </>
            }
            length={cardProps.length}
            maxCount={maxCount}
          />

          <Grid container component="ul" className={classes.cardGrid}>
            {cards.slice(deprioritisedStartIndex)}
          </Grid>
        </section>
      );
  }
  // Otherwise, show only one list, if nothing has been deprioritised
  // Or if showPreviewOnly, then we don't need to distinguish between the two
  else {
    cardGrid = (
      <Grid container component="ul" className={classes.cardGrid}>
        {cards}
      </Grid>
    );
  }

  // Holder variable needed for conditionally rendering IniniteScroll
  const toRender = (
    <>
      <section className={classes.root}>
        <CardGridHeader
          header={headerOverride || header || ''}
          hideCount={hideCount}
          route={route}
          routeLabel={routeLabel}
          showPreviewOnly={showPreviewOnly}
          description={headerDescription}
          length={filteredCards.length}
          maxCount={maxCount}
        />
        {cardGrid}
      </section>
      {toAppend}
    </>
  );

  // Display the contents WITHOUT InfiniteScroll if showPreviewOnly
  if (showPreviewOnly || !loadMore) return toRender;

  // Display contents WITH InfiniteScroll otherwise
  return (
    <InfiniteScroll
      initialLoad={true}
      pageStart={0}
      loadMore={loadMore}
      hasMore={hasMore}
      useWindow={true}
      threshold={100}
    >
      {toRender}
    </InfiniteScroll>
  );
};

export default withRouter(CardGrid);
