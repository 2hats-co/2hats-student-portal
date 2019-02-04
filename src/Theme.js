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
  shadows: [
    'none',
    '0px 1px 3px 0px rgba(0,0,0,0.1), 0px 1px 1px 0px rgba(0,0,0,0.07), 0px 2px 1px -1px rgba(0,0,0,0.06)',
    '0px 1px 5px 0px rgba(0,0,0,0.1), 0px 2px 2px 0px rgba(0,0,0,0.07), 0px 3px 1px -2px rgba(0,0,0,0.06)',
    '0px 1px 8px 0px rgba(0,0,0,0.1), 0px 3px 4px 0px rgba(0,0,0,0.07), 0px 3px 3px -2px rgba(0,0,0,0.06)',
    '0px 2px 4px -1px rgba(0,0,0,0.1), 0px 4px 5px 0px rgba(0,0,0,0.07), 0px 1px 10px 0px rgba(0,0,0,0.06)',
    '0px 3px 5px -1px rgba(0,0,0,0.1), 0px 5px 8px 0px rgba(0,0,0,0.07), 0px 1px 14px 0px rgba(0,0,0,0.06)',
    '0px 3px 5px -1px rgba(0,0,0,0.1), 0px 6px 10px 0px rgba(0,0,0,0.07), 0px 1px 18px 0px rgba(0,0,0,0.06)',
    '0px 4px 5px -2px rgba(0,0,0,0.1), 0px 7px 10px 1px rgba(0,0,0,0.07), 0px 2px 16px 1px rgba(0,0,0,0.06)',
    '0px 5px 5px -3px rgba(0,0,0,0.1), 0px 8px 10px 1px rgba(0,0,0,0.07), 0px 3px 14px 2px rgba(0,0,0,0.06)',
    '0px 5px 6px -3px rgba(0,0,0,0.1), 0px 9px 12px 1px rgba(0,0,0,0.07), 0px 3px 16px 2px rgba(0,0,0,0.06)',
    '0px 6px 6px -3px rgba(0,0,0,0.1), 0px 10px 14px 1px rgba(0,0,0,0.07), 0px 4px 18px 3px rgba(0,0,0,0.06)',
    '0px 6px 7px -4px rgba(0,0,0,0.1), 0px 11px 15px 1px rgba(0,0,0,0.07), 0px 4px 20px 3px rgba(0,0,0,0.06)',
    '0px 7px 8px -4px rgba(0,0,0,0.1), 0px 12px 17px 2px rgba(0,0,0,0.07), 0px 5px 22px 4px rgba(0,0,0,0.06)',
    '0px 7px 8px -4px rgba(0,0,0,0.1), 0px 13px 19px 2px rgba(0,0,0,0.07), 0px 5px 24px 4px rgba(0,0,0,0.06)',
    '0px 7px 9px -4px rgba(0,0,0,0.1), 0px 14px 21px 2px rgba(0,0,0,0.07), 0px 5px 26px 4px rgba(0,0,0,0.06)',
    '0px 8px 9px -5px rgba(0,0,0,0.1), 0px 15px 22px 2px rgba(0,0,0,0.07), 0px 6px 28px 5px rgba(0,0,0,0.06)',
    '0px 8px 10px -5px rgba(0,0,0,0.1), 0px 16px 24px 2px rgba(0,0,0,0.07), 0px 6px 30px 5px rgba(0,0,0,0.06)',
    '0px 8px 11px -5px rgba(0,0,0,0.1), 0px 17px 26px 2px rgba(0,0,0,0.07), 0px 6px 32px 5px rgba(0,0,0,0.06)',
    '0px 9px 11px -5px rgba(0,0,0,0.1), 0px 18px 28px 2px rgba(0,0,0,0.07), 0px 7px 34px 6px rgba(0,0,0,0.06)',
    '0px 9px 12px -6px rgba(0,0,0,0.1), 0px 19px 29px 2px rgba(0,0,0,0.07), 0px 7px 36px 6px rgba(0,0,0,0.06)',
    '0px 10px 13px -6px rgba(0,0,0,0.1), 0px 20px 31px 3px rgba(0,0,0,0.07), 0px 8px 38px 7px rgba(0,0,0,0.06)',
    '0px 10px 13px -6px rgba(0,0,0,0.1), 0px 21px 33px 3px rgba(0,0,0,0.07), 0px 8px 40px 7px rgba(0,0,0,0.06)',
    '0px 10px 14px -6px rgba(0,0,0,0.1), 0px 22px 35px 3px rgba(0,0,0,0.07), 0px 8px 42px 7px rgba(0,0,0,0.06)',
    '0px 11px 14px -7px rgba(0,0,0,0.1), 0px 23px 36px 3px rgba(0,0,0,0.07), 0px 9px 44px 8px rgba(0,0,0,0.06)',
    '0px 11px 15px -7px rgba(0,0,0,0.1), 0px 24px 38px 3px rgba(0,0,0,0.07), 0px 9px 46px 8px rgba(0,0,0,0.06)',
  ],
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
      root: { borderRadius: `${BORDER_RADIUS * 0.75}px !important` },
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
