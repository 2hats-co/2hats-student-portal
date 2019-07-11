import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import mergeDeepRight from 'ramda/es/mergeDeepRight';
import { getLetterSpacing } from 'utilities/styling';

import logo from 'assets/images/Logo/DarkText.svg';
import darkLogo from 'assets/images/Logo/WhiteText.svg';

export const PRIMARY_COLOR = '#F15A29';
// export const PRIMARY_DARK_TEXT = 'hsl(15, 90%, 40%)';
// export const PRIMARY_LIGHT = 'hsl(15, 88%, 90%)';

export const PRIMARY_PALETTE = {
  50: '#FAEAE8',
  100: '#FDCEBF',
  200: '#FDAE95',
  300: '#FC8F6B',
  400: '#FC774B',
  500: '#FC602D',
  600: '#F15A29',
  700: '#E35324',
  800: '#D54C21',
  900: '#BB411A',
};

const WHITE = '#fff';
export const DARK_BG = '#121212';

export const FONT_STACK =
  '"Helvetica Neue", Inter, Helvetica, Arial, sans-serif';

const primaryColor = PRIMARY_COLOR;
const primaryDarkText = PRIMARY_PALETTE[900];
// const primaryLight = PRIMARY_PALETTE[50];
const primaryLight = 'rgba(241, 90, 41, 0.12)';
const BORDER_RADIUS = 4;

const elevation = {
  0: WHITE,
  1: WHITE,
  2: WHITE,
  3: WHITE,
  4: WHITE,
  6: WHITE,
  8: WHITE,
  12: WHITE,
  16: WHITE,
  24: WHITE,
};
const darkElevation = {
  0: '#121212',
  1: '#1e1e1e',
  2: '#222222',
  3: '#242424',
  4: '#272727',
  6: '#2c2c2c',
  8: '#2d2d2d',
  12: '#323232',
  16: '#353535',
  24: '#383838',
};

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    assets?: any;
  }
}

declare module '@material-ui/core/styles/createPalette' {
  interface PaletteColor {
    50?: string;
    100?: string;
    200?: string;
    300?: string;
    400?: string;
    500?: string;
    600?: string;
    700?: string;
    800?: string;
    900?: string;
  }
}

const themeCommons = {
  palette: {
    primary: {
      main: primaryColor,
      dark: primaryColor,
      contrastText: WHITE,
      ...PRIMARY_PALETTE,
    },
    secondary: {
      main: primaryColor,
      dark: primaryColor,
      light: primaryColor,
      contrastText: WHITE,
    },
  },
  typography: {
    fontFamily: FONT_STACK,
    // h4: { fontWeight: 500 },
    h6: { lineHeight: 1.4 },
    // subtitle1: { fontWeight: 500 },
    body1: { letterSpacing: getLetterSpacing(0.5, 1) },
    body2: { letterSpacing: getLetterSpacing(0.25, 0.875) },
    button: { letterSpacing: getLetterSpacing(1.25, 0.875) },
    overline: { letterSpacing: getLetterSpacing(2, 0.875), fontWeight: 500 },
  },
  shadowsLight: [
    'none',
    '0 0 0 1px rgba(0, 0, 0, .025), 0px 1px 3px 0px rgba(0,0,0,0.1), 0px 1px 1px 0px rgba(0,0,0,0.07), 0px 2px 1px -1px rgba(0,0,0,0.06)',
    '0 0 0 1px rgba(0, 0, 0, .025), 0px 1px 5px 0px rgba(0,0,0,0.1), 0px 2px 2px 0px rgba(0,0,0,0.07), 0px 3px 1px -2px rgba(0,0,0,0.06)',
    '0 0 0 1px rgba(0, 0, 0, .025), 0px 1px 8px 0px rgba(0,0,0,0.1), 0px 3px 4px 0px rgba(0,0,0,0.07), 0px 3px 3px -2px rgba(0,0,0,0.06)',
    '0 0 0 1px rgba(0, 0, 0, .025), 0px 2px 4px -1px rgba(0,0,0,0.1), 0px 4px 5px 0px rgba(0,0,0,0.07), 0px 1px 10px 0px rgba(0,0,0,0.06)',
    '0 0 0 1px rgba(0, 0, 0, .025), 0px 3px 5px -1px rgba(0,0,0,0.1), 0px 5px 8px 0px rgba(0,0,0,0.07), 0px 1px 14px 0px rgba(0,0,0,0.06)',
    '0 0 0 1px rgba(0, 0, 0, .025), 0px 3px 5px -1px rgba(0,0,0,0.1), 0px 6px 10px 0px rgba(0,0,0,0.07), 0px 1px 18px 0px rgba(0,0,0,0.06)',
    '0 0 0 1px rgba(0, 0, 0, .025), 0px 4px 5px -2px rgba(0,0,0,0.1), 0px 7px 10px 1px rgba(0,0,0,0.07), 0px 2px 16px 1px rgba(0,0,0,0.06)',
    '0 0 0 1px rgba(0, 0, 0, .025), 0px 5px 5px -3px rgba(0,0,0,0.1), 0px 8px 10px 1px rgba(0,0,0,0.07), 0px 3px 14px 2px rgba(0,0,0,0.06)',
    '0 0 0 1px rgba(0, 0, 0, .025), 0px 5px 6px -3px rgba(0,0,0,0.1), 0px 9px 12px 1px rgba(0,0,0,0.07), 0px 3px 16px 2px rgba(0,0,0,0.06)',
    '0 0 0 1px rgba(0, 0, 0, .025), 0px 6px 6px -3px rgba(0,0,0,0.1), 0px 10px 14px 1px rgba(0,0,0,0.07), 0px 4px 18px 3px rgba(0,0,0,0.06)',
    '0 0 0 1px rgba(0, 0, 0, .025), 0px 6px 7px -4px rgba(0,0,0,0.1), 0px 11px 15px 1px rgba(0,0,0,0.07), 0px 4px 20px 3px rgba(0,0,0,0.06)',
    '0 0 0 1px rgba(0, 0, 0, .025), 0px 7px 8px -4px rgba(0,0,0,0.1), 0px 12px 17px 2px rgba(0,0,0,0.07), 0px 5px 22px 4px rgba(0,0,0,0.06)',
    '0 0 0 1px rgba(0, 0, 0, .025), 0px 7px 8px -4px rgba(0,0,0,0.1), 0px 13px 19px 2px rgba(0,0,0,0.07), 0px 5px 24px 4px rgba(0,0,0,0.06)',
    '0 0 0 1px rgba(0, 0, 0, .025), 0px 7px 9px -4px rgba(0,0,0,0.1), 0px 14px 21px 2px rgba(0,0,0,0.07), 0px 5px 26px 4px rgba(0,0,0,0.06)',
    '0 0 0 1px rgba(0, 0, 0, .025), 0px 8px 9px -5px rgba(0,0,0,0.1), 0px 15px 22px 2px rgba(0,0,0,0.07), 0px 6px 28px 5px rgba(0,0,0,0.06)',
    '0 0 0 1px rgba(0, 0, 0, .025), 0px 8px 10px -5px rgba(0,0,0,0.1), 0px 16px 24px 2px rgba(0,0,0,0.07), 0px 6px 30px 5px rgba(0,0,0,0.06)',
    '0 0 0 1px rgba(0, 0, 0, .025), 0px 8px 11px -5px rgba(0,0,0,0.1), 0px 17px 26px 2px rgba(0,0,0,0.07), 0px 6px 32px 5px rgba(0,0,0,0.06)',
    '0 0 0 1px rgba(0, 0, 0, .025), 0px 9px 11px -5px rgba(0,0,0,0.1), 0px 18px 28px 2px rgba(0,0,0,0.07), 0px 7px 34px 6px rgba(0,0,0,0.06)',
    '0 0 0 1px rgba(0, 0, 0, .025), 0px 9px 12px -6px rgba(0,0,0,0.1), 0px 19px 29px 2px rgba(0,0,0,0.07), 0px 7px 36px 6px rgba(0,0,0,0.06)',
    '0 0 0 1px rgba(0, 0, 0, .025), 0px 10px 13px -6px rgba(0,0,0,0.1), 0px 20px 31px 3px rgba(0,0,0,0.07), 0px 8px 38px 7px rgba(0,0,0,0.06)',
    '0 0 0 1px rgba(0, 0, 0, .025), 0px 10px 13px -6px rgba(0,0,0,0.1), 0px 21px 33px 3px rgba(0,0,0,0.07), 0px 8px 40px 7px rgba(0,0,0,0.06)',
    '0 0 0 1px rgba(0, 0, 0, .025), 0px 10px 14px -6px rgba(0,0,0,0.1), 0px 22px 35px 3px rgba(0,0,0,0.07), 0px 8px 42px 7px rgba(0,0,0,0.06)',
    '0 0 0 1px rgba(0, 0, 0, .025), 0px 11px 14px -7px rgba(0,0,0,0.1), 0px 23px 36px 3px rgba(0,0,0,0.07), 0px 9px 44px 8px rgba(0,0,0,0.06)',
    '0 0 0 1px rgba(0, 0, 0, .025), 0px 11px 15px -7px rgba(0,0,0,0.1), 0px 24px 38px 3px rgba(0,0,0,0.07), 0px 9px 46px 8px rgba(0,0,0,0.06)',
  ],
  props: {
    MuiFilledInput: {
      disableUnderline: true,
    },
    MuiTypography: {
      color: 'textPrimary',
    },
  },
  overrides: {
    // LEGACY OVERRIDES
    MuiButton: {
      root: {
        borderRadius: '1000px',
      },
      contained: {
        boxShadow: 'none',
      },
      label: {
        // Icons in buttons go on the right
        '& svg': { marginLeft: 8, marginRight: -4 },
      },
    },
    // ADMIN PORTAL OVERRIDES
    // MuiFab: {
    //   primary: { color: '#fff' },
    //   extended: {
    //     '& svg': { marginRight: 8 },
    //   },
    // },
    MuiTooltip: {
      tooltip: {
        backgroundColor: 'rgba(0,0,0,.75)',
        fontSize: 12,
      },
      popper: { opacity: 1 },
    },
    // MuiTab: {
    //   root: {
    //     minWidth: '64px !important',
    //     fontSize: '.875rem !important',
    //   },
    //   textColorPrimary: {
    //     color: 'rgba(0,0,0,.87)',
    //     '& svg': { opacity: 0.87 },
    //   },
    // },
    // MuiChip: {
    //   root: {
    //     height: 'auto',
    //     minHeight: 32,
    //     '&:not(:last-of-type)': { marginRight: 8 },
    //   },
    //   label: { whiteSpace: 'normal' },
    // },

    // Neutral avatar colour
    MuiAvatar: {
      colorDefault: {
        backgroundColor: 'rgba(0, 0, 0, 0.12)',
        color: 'rgba(0, 0, 0, 0.54)',
        fontWeight: 500,
      },
    },

    // Make all corners rounded
    MuiFilledInput: {
      root: { borderRadius: `${BORDER_RADIUS}px !important` },
    },
    // MuiBadge: {
    //   badge: { fontWeight: 700 },
    // },
    // MuiInputAdornment: {
    //   positionStart: { marginBottom: 2 },
    // },

    // Temporary - to be removed
    MuiLink: {
      root: { fontFamily: FONT_STACK },
      button: { fontFamily: FONT_STACK },
    },

    // Disable grey highlight on card hover
    MuiCardActionArea: {
      focusHighlight: { opacity: '0 !important' },
    },

    // iOS 13-style dialogs
    MuiDialog: {
      paperFullScreen: {
        marginTop: 16,
        borderRadius: `${BORDER_RADIUS}px ${BORDER_RADIUS}px 0 0`,
        height: 'calc(100% - 16px)',
      },
    },

    // Less padding for ListItemIcon
    MuiListItemIcon: {
      root: {
        minWidth: 44,
      },
    },

    // App bar with correct elevation colour
    MuiAppBar: {
      colorDefault: {
        backgroundColor: elevation[4],
      },
    },
    MuiBottomNavigation: {
      root: {
        backgroundColor: elevation[4],
      },
    },

    // Larger gutterBottom for Typography
    MuiTypography: {
      gutterBottom: { marginBottom: '1em' },
    },
  },
};

export const Theme = responsiveFontSizes(
  createMuiTheme(
    mergeDeepRight(themeCommons, {
      palette: {
        primary: {
          darkText: primaryDarkText,
          light: primaryLight,
          ...PRIMARY_PALETTE,
        },
        background: {
          default: WHITE,
          elevation,
        },
      },
      assets: { logo },
    })
  )
);

export const DarkTheme = responsiveFontSizes(
  createMuiTheme(
    mergeDeepRight(themeCommons, {
      palette: {
        type: 'dark',
        primary: {
          darkText: PRIMARY_PALETTE[50],
          light: primaryLight,
        },
        background: {
          default: DARK_BG,
          paper: darkElevation[2],
          elevation: darkElevation,
        },
      },
      assets: { logo: darkLogo },
      overrides: {
        // App bar with correct elevation colour
        MuiAppBar: {
          colorDefault: {
            backgroundColor: darkElevation[4],
          },
        },
        MuiBottomNavigation: {
          root: {
            backgroundColor: darkElevation[4],
          },
        },
        // Fix text box label becoming unreadable
        MuiFormLabel: {
          root: {
            '&$focused': { color: primaryColor },
          },
          focused: {},
        },
        // Neutral avatar colour
        MuiAvatar: {
          colorDefault: {
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            color: 'rgba(255, 255, 255, 0.7)',
          },
        },
      },
    })
  )
);

console.log(Theme, DarkTheme);
