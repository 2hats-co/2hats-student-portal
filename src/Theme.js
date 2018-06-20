
import { createMuiTheme } from '@material-ui/core/styles';
export const PRIMARYCOLOR = '#F15A29'
const primaryFontFamily = "Helvetica Neue"
const WHITE = '#fff'
const BLACK = '#000'
const primaryColor = PRIMARYCOLOR
export const Theme = createMuiTheme({
  overrides: {
    MuiButton: { // Name of the component ⚛️ / style sheet
      flat: { // Name of the rule
        color: WHITE,
        backgroundColor:primaryColor,
        borderRadius:'20px',
        textTransform: 'capitalize',
        '&:hover': {backgroundColor:primaryColor},
        '&:disabled': {opacity: 0.4,color:WHITE},
      },
      outlined: { // Name of the rule
        color: primaryColor,
        backgroundColor:WHITE,
        borderRadius:'20px',
        border: '1px solid #979797',
        textTransform: 'capitalize',
        '&:hover': {backgroundColor:WHITE}
      },  
    },
  },
  typography: {
    headline: {
      fontSize: '30px',
      fontFamily: primaryFontFamily,
      fontWeight: 'bold',
      textAlign: 'center'
    },
    title: {
      fontFamily:primaryFontFamily,
      fontWeight: 'bold',
      fontSize: '20px',
      textAlign: 'left',
      textTransform: 'capitalize',
    },
    
    subheading: {
   
      fontFamily:primaryFontFamily,
      fontWeight: 'medium',
      fontSize: '16px',
      letterSpacing: '0.08px'
    },
    body1: {
      fontSize: '12px',
      fontWeight: 'Regular',
      fontFamily:primaryFontFamily,
      letterSpacing: '0.06px'

    },
    caption: {
      fontSize: '10px',
      fontWeight: 'regular',
      fontFamily:primaryFontFamily,
      color: '#9B9B9B',
      letterSpacing: '0.05px',
      lineHeight: '12px',
    }, Button: {
      fontFamily:primaryFontFamily,
      fontWeight: 'bold',
      fontSize: '15px',
      letterSpacing: '0.1px',
      textAlign: 'center'
    },
    fontFamily: [
      primaryFontFamily,
    ].join(','),
  },
  palette: {
    primary: {
      light: primaryColor,//
      main: primaryColor,// button
      dark: primaryColor,//textfield label
      contrastText: WHITE,//button text
    },
    secondary: {
      //TODO , purple?
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: BLACK,
    },
  },
});