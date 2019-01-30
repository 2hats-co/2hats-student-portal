import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
// import { inherits } from 'util';
export const PRIMARY_COLOR = '#F15A29';
export const PRIMARY_DARK_TEXT = 'hsl(15, 90%, 40%)';
export const PRIMARY_LIGHT = 'hsl(15, 88%, 90%)';
export const FONT_STACK =
  '"Helvetica Neue", Roboto, Helvetica, Arial, sans-serif';
export const WHITE = '#fff';
export const BLACK = '#2c2c2c';
export const GREY = '#EDEDED';

const primaryColor = PRIMARY_COLOR;
const primaryDarkText = PRIMARY_DARK_TEXT;
const primaryLight = PRIMARY_LIGHT;
const BORDER_RADIUS = 20;

export const Theme = createMuiTheme({
  responsive: {},
  palette: {
    primary: {
      main: primaryColor, // button
      dark: primaryColor, //textfield label
      contrastText: WHITE, //button text
      darkText: primaryDarkText,
      light: primaryLight,
    },
    secondary: {
      light: primaryColor, //
      main: primaryColor, // button
      dark: primaryColor, //textfield label
      contrastText: WHITE, //button text
    },
    action: {
      disabled: '#ABABAB',
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: FONT_STACK,
    h4: { fontWeight: 500 },
    h6: { lineHeight: 1.4 },
    subtitle1: { fontWeight: 500 },
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: BORDER_RADIUS,
  },
  overrides: {
    // LEGACY OVERRIDES
    MuiStepIcon: {
      root: {
        color: GREY,
      },
    },
    MuiButton: {
      contained: {
        boxShadow: 'none',
      },
      label: {
        '& svg': { marginLeft: 8, marginRight: -4 },
      },
    },
    // ADMIN PORTAL OVERRIDES
    MuiToggleButtonGroup: {
      root: {
        boxShadow: 'none !important',
      },
    },
    MuiToggleButton: {
      root: {
        borderRadius: `${BORDER_RADIUS}px !important`,
        flex: 1,
        transition: 'background-color .2s, color .2s',
      },
      label: {
        color: 'rgba(0,0,0,.87)',
        position: 'relative',
        zIndex: 99,
      },
      '&$selected': {
        color: primaryColor,
        '& > span': { color: primaryColor },
        '&::after': {
          backgroundColor: primaryLight,
          opacity: 0.8,
        },
      },
    },
    MuiFab: {
      primary: { color: '#fff' },
      extended: {
        '& svg': { marginRight: 8 },
      },
    },
    MuiTooltip: {
      tooltip: {
        backgroundColor: 'rgba(0,0,0,.75)',
        fontSize: 12,
      },
      popper: { opacity: 1 },
    },
    MuiTab: {
      root: {
        minWidth: '64px !important',
        fontSize: '.875rem !important',
      },
      textColorPrimary: {
        color: 'rgba(0,0,0,.87)',
        '& svg': { opacity: 0.87 },
      },
    },
    MuiChip: {
      root: {
        height: 'auto',
        minHeight: 32,
        '&:not(:last-of-type)': { marginRight: 8 },
      },
      label: { whiteSpace: 'normal' },
    },
    MuiAvatar: {
      colorDefault: {
        backgroundColor: primaryLight,
        color: primaryColor,
        fontWeight: 500,
      },
      img: {
        backgroundColor: primaryLight,
      },
    },
    MuiFilledInput: {
      root: { borderRadius: `${BORDER_RADIUS / 2}px !important` },
      underline: {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
      },
    },
    MuiBadge: {
      badge: { fontWeight: 700 },
    },
    MuiInputAdornment: {
      positionStart: { marginBottom: 2 },
    },
    // NEW OVERRIDES
    MuiLink: {
      root: { fontFamily: FONT_STACK },
      button: { fontFamily: FONT_STACK },
    },
    MuiCardActionArea: {
      focusHighlight: { opacity: '0 !important' },
    },
  },
});
