import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
// import { inherits } from 'util';
export const PRIMARY_COLOR = '#F15A29';
export const PRIMARY_DARK_TEXT = 'hsl(15, 90%, 40%)';
export const PRIMARY_LIGHT = 'hsl(15, 88%, 95%)';
const primaryFontFamily =
  '"Helvetica Neue", Roboto, Helvetica, Arial, sans-serif';
export const WHITE = '#fff';
export const BLACK = '#2c2c2c';
export const GREY = '#EDEDED';

const primaryColor = PRIMARY_COLOR;
const primaryDarkText = PRIMARY_DARK_TEXT;
const primaryLight = PRIMARY_LIGHT;
const BORDER_RADIUS = 10;

export const Theme = createMuiTheme({
  responsive: {
    isMobile: true,
  },
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
    fontFamily: primaryFontFamily,
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
    MuiStepLabel: {
      label: {
        fontSize: '12px',
        fontWeight: 500,
      },
    },

    MuiInput: {
      // opacity: 1,
      // borderBottom: '#000 !important',
      root: {
        fontSize: '14px',
      },
      underline: {
        '&::after': { borderBottomColor: primaryColor },
      },
    },
    MuiFormControlLabel: {
      root: {
        fontSize: '20px',
        height: 35,
      },
      '&$focused': { color: `${primaryColor} !important` },
    },
    MuiFormLabel: {
      root: {
        height: 30,
      },
    },
    // MuiDialog: {
    //   root: {
    //     overflowY: 'auto',
    //   },
    // },
    MuiDialogTitle: {
      root: {
        color: primaryColor + '!important',
      },
    },
    MuiButton: {
      text: {
        // Name of the rule
        color: WHITE,
        backgroundColor: primaryColor,
        borderRadius: 20,
        '&:hover': { backgroundColor: '#d85125' },
        '&:disabled': { opacity: 0.4, color: WHITE },
      },
      outlined: {
        // Name of the rule
        color: BLACK + '!important',
        backgroundColor: WHITE,
        borderRadius: 20,
        border: `1px solid ${BLACK}`,
        '&:hover': { backgroundColor: '#f5f5f5' },
      },
      contained: {
        // Name of the rule
        color: BLACK,
        backgroundColor: WHITE,
        borderRadius: 20,
        //width:80,
        margin: 5,
        height: 36,
        '&:hover': {
          backgroundColor: WHITE,
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: GREY,
          },
        },
        '&:active': {
          boxShadow: GREY,
        },
        boxShadow: 'none',
      },
      label: {
        '& svg': { marginRight: 8 },
      },
      containedPrimary: { color: '#fff' },
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
        '&:not(:last-of-type)': { marginRight: 8 },
      },
      colorPrimary: {
        color: primaryDarkText,
        backgroundColor: primaryLight,
        '&:focus': {
          backgroundColor: primaryColor,
          color: '#fff',
        },
      },
      iconColorPrimary: {
        opacity: 0.87,
      },
      deleteIconColorPrimary: {
        color: `inherit !important`,
        opacity: 0.87,
      },
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
      root: { borderRadius: BORDER_RADIUS },
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
  },
});
