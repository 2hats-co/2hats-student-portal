import { SIDEBAR_WIDTH, DESKTOP_WIDTH } from './layout';

// import { INDUSTRIES } from '@bit/twohats.common.constants';

import {
  Business,
  Memory,
  // Palette
} from '@material-ui/icons';
import Bullhorn from 'mdi-material-ui/Bullhorn';

export enum INDUSTRIES {
  MARKETING = 'marketing',
  SALES = 'sales',
  TECH = 'tech',
  // DESIGN = 'design',
}

export enum INDUSTRY_DISPLAY_NAMES {
  tech = 'Tech',
  marketing = 'Marketing',
  sales = 'Business',
  // design = 'design',
}

export enum GRADIENT_COLORS {
  sales = '#acfffa',
  marketing = '#ffacf4',
  tech = '#dfffac',
  BASE = '#432e73',
}

export const INDUSTRY_ICONS = {
  [INDUSTRIES.SALES]: Business,
  [INDUSTRIES.MARKETING]: Bullhorn,
  [INDUSTRIES.TECH]: Memory,
  // [INDUSTRIES.DESIGN]: Palette,
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

export const CARD_ANIMATION_DURATION = 300;
export const CARD_ANIMATION_DELAY = 0.075; // seconds
