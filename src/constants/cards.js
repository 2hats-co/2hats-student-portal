import { SIDEBAR_WIDTH, DESKTOP_WIDTH } from './layout';
import { Theme } from 'Theme';

import { Business, Memory } from '@material-ui/icons';
import Bullhorn from 'mdi-material-ui/Bullhorn';

export const INDUSTRIES = {
  MARKETING: 'marketing',
  SALES: 'sales',
  TECH: 'tech',
};

export const INDUSTRY_DISPLAY_NAMES = {
  [INDUSTRIES.TECH]: 'Tech',
  [INDUSTRIES.MARKETING]: 'Marketing',
  [INDUSTRIES.SALES]: 'Business',
};

export const GRADIENT_COLORS = {
  [INDUSTRIES.SALES]: '#acfffa',
  [INDUSTRIES.MARKETING]: '#ffacf4',
  [INDUSTRIES.TECH]: '#dfffac',
  BASE: '#432e73',
};

export const INDUSTRY_ICONS = {
  [INDUSTRIES.SALES]: Business,
  [INDUSTRIES.MARKETING]: Bullhorn,
  [INDUSTRIES.TECH]: Memory,
};

export const CARD_TYPES = {
  JOB: 'job',
  ASSESSMENT: 'assessment',
  COURSE: 'course',
};

export const CARD_WIDTH = 320;
export const CARD_SPACING = 16;
export const MEDIA_HEIGHT = CARD_WIDTH * 0.5625;

export const CARD_COLS_WIDTHS = [0, 1, 2, 3, 4, 5].map(
  x => CARD_WIDTH * x + CARD_SPACING * x
);
export const CARD_COLS_MEDIA_QUERIES = CARD_COLS_WIDTHS.map(x =>
  x >= DESKTOP_WIDTH
    ? `@media (min-width: ${x + SIDEBAR_WIDTH}px)`
    : `@media (min-width: ${x}px)`
);

export const CARD_ANIMATION_DURATION = Theme.transitions.duration.standard;
export const CARD_ANIMATION_DELAY = 0.075; // seconds
