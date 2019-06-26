import { Business, Memory } from '@material-ui/icons';
import Bullhorn from 'assets/icons/Bullhorn';

export const INDUSTRIES = {
  TECH: 'tech',
  MARKETING: 'marketing',
  SALES: 'sales',
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
