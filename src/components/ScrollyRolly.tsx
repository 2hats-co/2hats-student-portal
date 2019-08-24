import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import {
  useTheme,
  LinearProgress,
  List,
  Grid,
  Typography,
} from '@material-ui/core';

export interface IScrollyRollyProps {
  classes?: {
    listLoader: string;
    list: string;
  };
  children: (props: any) => React.ReactElement<any>;
  dataState: any;
  loadMore: () => void;
  disablePadding?: boolean;
  reverse?: boolean;
  sort?: (docs: any[]) => any[];
  NoneIcon?: React.ComponentType<any>;
  noneText?: React.ReactNode;
}

const ScrollyRolly: React.FunctionComponent<IScrollyRollyProps> = ({
  classes,
  children,
  dataState,
  loadMore,
  disablePadding,
  reverse,
  sort,
  NoneIcon,
  noneText,
}) => {
  const theme = useTheme();

  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      dataState.limit === dataState.cap ||
      (dataState.limit - dataState.documents.length > 0 &&
        dataState.limit - dataState.documents.length < 10)
    ) {
      setHasMore(false);
      setLoading(false);
    } else {
      setHasMore(dataState.documents.length === dataState.limit);
      if (dataState.documents.length === dataState.limit) setLoading(false);
    }
  }, [dataState]);

  let sortedDocs = dataState.documents;
  if (sort) sortedDocs = sort(dataState.documents);

  return (
    <>
      {reverse && loading && (
        <LinearProgress
          key="listLoader"
          className={classes && classes.listLoader}
        />
      )}
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={loadMore}
        hasMore={hasMore}
        useWindow={false}
        threshold={100}
        isReverse={reverse || false}
      >
        <List
          disablePadding={disablePadding || false}
          className={classes && classes.list}
        >
          {sortedDocs.length > 0 ? (
            sortedDocs.map(children)
          ) : (
            <Grid
              container
              justify="center"
              alignItems="center"
              style={{
                height: '100%',
                color: theme.palette.text.secondary,
                textAlign: 'center',
                cursor: 'default',
                userSelect: 'none',
                paddingTop: theme.spacing(4),
              }}
            >
              <Grid item>
                {NoneIcon && (
                  <NoneIcon
                    style={{ fontSize: 48, color: theme.palette.text.disabled }}
                  />
                )}
                <Typography variant="subtitle1" color="textSecondary">
                  {noneText || 'No items'}
                </Typography>
              </Grid>
            </Grid>
          )}
        </List>
      </InfiniteScroll>
      {!reverse && loading && (
        <LinearProgress
          key="listLoader"
          className={classes && classes.listLoader}
        />
      )}
    </>
  );
};

export default ScrollyRolly;
