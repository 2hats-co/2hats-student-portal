import { useMediaQuery } from '@material-ui/core';

import { CARD_COLS_MEDIA_QUERIES } from 'constants/cards';

const useColsWidth = () => {
  // Can't call loops in hooks, so we have to hard-code
  const col2 = useMediaQuery(CARD_COLS_MEDIA_QUERIES[2]);
  const col3 = useMediaQuery(CARD_COLS_MEDIA_QUERIES[3]);
  const col4 = useMediaQuery(CARD_COLS_MEDIA_QUERIES[4]);
  const col5 = useMediaQuery(CARD_COLS_MEDIA_QUERIES[5]);

  if (col5) return 5;
  if (col4) return 4;
  if (col3) return 3;
  if (col2) return 2;
  return 1;
};

export default useColsWidth;
