import {
  createMuiTheme,
  responsiveFontSizes,
  makeStyles,
  createStyles,
} from '@material-ui/core/styles';
import mergeDeepRight from 'ramda/es/mergeDeepRight';

import { getLetterSpacing } from 'utilities/styling';
import { CARD_COLS_WIDTHS, CARD_COLS_MEDIA_QUERIES } from 'constants/cards';

import logo from 'assets/images/Logo/DarkText.svg';
import darkLogo from 'assets/images/Logo/WhiteText.svg';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

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
    assets: any;
    shadowsLight: string[];
  }
}

declare module '@material-ui/core/styles/createPalette' {
  interface PaletteColor {
    [shade: number]: string;
  }

  interface TypeBackground {
    elevation: { [level: number]: string };
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
    overline: {
      letterSpacing: getLetterSpacing(2, 0.875),
      fontWeight: 500,
      lineHeight: 1.5,
    },
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
    MuiSelect: {
      IconComponent: KeyboardArrowDownIcon,
    },
  },
  overrides: {
    // LEGACY OVERRIDES
    MuiButton: {
      root: {
        borderRadius: '1000px', // Pill-shaped buttons
      },
      contained: {
        boxShadow: 'none', // Flat buttons

        // Grey default button
        backgroundColor: '#808080',
        color: '#fff',
        '&:hover': { backgroundColor: '#808080' },
      },
      sizeLarge: {
        padding: '12px 48px', // Make large button larger
        fontSize: 'inherit', // Don't make font size larger
      },

      // Larger icons
      iconSizeSmall: {
        '& > *:first-child': { fontSize: 24 },
      },
      iconSizeMedium: {
        '& > *:first-child': { fontSize: 24 },
      },
      iconSizeLarge: {
        '& > *:first-child': { fontSize: 24 },
      },
    },

    // Neutral avatar colour
    MuiAvatar: {
      colorDefault: {
        backgroundColor: 'rgba(0, 0, 0, 0.46)',
        color: WHITE,
        fontWeight: 500,
      },
    },

    MuiFilledInput: {
      // Make all corners rounded
      root: { borderRadius: `${BORDER_RADIUS}px !important` },
      // Fix hiddenLabel for multiline input
      inputMultiline: { '&$inputHiddenLabel': { marginTop: -10 } },

      inputSelect: { paddingRight: 40 },
    },

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

    // Spacing for multiline FormControlLabel
    MuiFormControlLabel: {
      label: { padding: '8px 0 8px 8px' },
    },

    // Neutral slider background ??? same as FilledInput
    MuiSlider: {
      rail: {
        opacity: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.09)',
      },
    },

    // More spacing for alt Slider dropdown icon
    MuiSelect: {
      icon: { right: 12 },
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
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            color: DARK_BG,
          },
        },
        // Neutral slider background ??? slightly brighter than FilledInput
        MuiSlider: {
          rail: { backgroundColor: 'rgba(255, 255, 255, 0.12)' },
        },
      },
    })
  )
);

export const useGlobalStyles = makeStyles(
  createStyles({
    '@global': {
      // Overrides <CSSBaseline />
      html: {
        // Use subpixel antialiasing
        WebkitFontSmoothing: 'subpixel-antialiased',
        MozOsxFontSmoothing: 'auto',
      },

      // Fix width to width of card columns
      '.width-fixed-cards-cols': {
        maxWidth: 'none',
        [CARD_COLS_MEDIA_QUERIES[1]]: { maxWidth: CARD_COLS_WIDTHS[1] },
        [CARD_COLS_MEDIA_QUERIES[2]]: { maxWidth: CARD_COLS_WIDTHS[2] },
        [CARD_COLS_MEDIA_QUERIES[3]]: { maxWidth: CARD_COLS_WIDTHS[3] },
        [CARD_COLS_MEDIA_QUERIES[4]]: { maxWidth: CARD_COLS_WIDTHS[4] },
        [CARD_COLS_MEDIA_QUERIES[5]]: { maxWidth: CARD_COLS_WIDTHS[5] },
      },
    },
  })
);
