import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { inherits } from 'util';
export const PRIMARY_COLOR = '#F15A29';
const primaryFontFamily =
  '"Helvetica Neue", Roboto, Helvetica, Arial, sans-serif';
export const WHITE = '#fff';
export const BLACK = '#2c2c2c';
export const GREY = '#EDEDED';
const primaryColor = PRIMARY_COLOR;
export const Theme = createMuiTheme({
  responsive: {
    isMobile: true,
  },
  palette: {
    primary: {
      light: primaryColor, //
      main: primaryColor, // button
      dark: primaryColor, //textfield label
      contrastText: WHITE, //button text
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
    h3: {
      fontSize: '42px',
      fontFamily: primaryFontFamily,
      color: '#000',
      fontWeight: 'bold',
      textAlign: 'left',
    },
    h4: {
      fontSize: '30px',
      fontFamily: primaryFontFamily,
      color: BLACK,
      fontWeight: 'bold',
      textAlign: 'left',
    },
    h5: {
      fontSize: '24px',
      fontFamily: primaryFontFamily,
      fontWeight: 'medium',
      textAlign: 'center',
    },
    h6: {
      fontFamily: primaryFontFamily,
      fontWeight: 500,
      fontSize: '20px',
      textAlign: 'left',
      color: inherits,
    },

    subtitle1: {
      fontFamily: primaryFontFamily,
      fontWeight: 400,
      fontSize: '16px',
      letterSpacing: '0.08px',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '13px',
      fontWeight: 400,
      fontFamily: primaryFontFamily,
      letterSpacing: '0.06px',
    },
    button: {
      fontSize: '15px',
      fontWeight: 'bold',
      textAlign: 'center',
      fontFamily: primaryFontFamily,
      textTransform: 'none',
      color: '#000',
    },
    caption: {
      fontSize: '12px',
      fontWeight: 'regular',
      fontFamily: primaryFontFamily,
      color: '#9B9B9B',
      letterSpacing: '0.05px',
      lineHeight: '13px',
    },
    Button: {
      fontFamily: primaryFontFamily,
      fontWeight: 'bold',
      fontSize: '15px',
      letterSpacing: '0.1px',
      textAlign: 'center',
    },
    fontFamily: primaryFontFamily,
  },
  overrides: {
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
      opacity: 1,
      borderBottom: '#000 !important',
    },
    MuiInputLabel: {
      root: {
        fontSize: '14px',
        fontWeight: 400,
        fontColor: 'rgba(0,0,0,1) !important',
        fontFamily: primaryFontFamily,
        letterSpacing: '0.06px',
      },
    },
    MuiFormControlLabel: {
      root: {
        fontSize: '20px',
      },
    },
    MuiInput: {
      root: {
        fontSize: '14px',
      },
    },
    MuiFormLabel: {
      root: {
        height: 30,
      },
    },
    MuiFormControlLabel: {
      root: {
        height: 35,
      },
    },
    MuiDialog: {
      root: {
        overflowY: 'visible',
      },
    },
    MuiDialogTitle: {
      root: {
        color: primaryColor + '!important',
      },
    },
    MuiButton: {
      flat: {
        // Name of the rule
        color: WHITE,
        backgroundColor: primaryColor,
        borderRadius: '20px',
        '&:hover': { backgroundColor: '#d85125' },
        '&:disabled': { opacity: 0.4, color: WHITE },
      },
      outlined: {
        // Name of the rule
        color: BLACK + '!important',
        backgroundColor: WHITE,
        borderRadius: '20px',
        border: `1px solid ${BLACK}`,
        '&:hover': { backgroundColor: '#f5f5f5' },
      },
      contained: {
        // Name of the rule
        color: BLACK,
        backgroundColor: WHITE,
        borderRadius: '2px', // should this be rounded
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
    },
  },
});
