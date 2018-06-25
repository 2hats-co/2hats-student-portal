
import { createMuiTheme } from '@material-ui/core/styles';
import { inherits } from 'util';
export const PRIMARYCOLOR = '#F15A29'
const primaryFontFamily = "Helvetica Neue"
const WHITE = '#fff'
export const BLACK = '#2c2c2c'
const primaryColor = PRIMARYCOLOR
export const Theme = createMuiTheme({
  overrides: {
    MuiInput:{
      root:{
      fontSize:'12px'
      }
    },

    MuiDialogTitle:{
    
      root:{
        color:PRIMARYCOLOR+'!important',
      }

    },
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
        color: primaryColor+'!important',
        backgroundColor:WHITE,
        borderRadius:'20px',
        border: '1px solid #979797',
        textTransform: 'capitalize',
        '&:hover': {backgroundColor:WHITE}
      },
      text: { // Name of the rule
        color: BLACK,
        backgroundColor:WHITE+'!important',
        borderRadius:'2px',// should this be rounded
        width:80,
        height:36,
       // '&:hover': {backgroundColor:WHITE},
      
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
      color:inherits,
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