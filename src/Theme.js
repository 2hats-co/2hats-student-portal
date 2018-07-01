
import { createMuiTheme } from '@material-ui/core/styles';
import { inherits } from 'util';
export const PRIMARYCOLOR = '#F15A29'
const primaryFontFamily = "Helvetica Neue"
export const WHITE = '#fff'
export const BLACK = '#2c2c2c'
export const GREY = '#EDEDED'
const primaryColor = PRIMARYCOLOR
export const Theme = createMuiTheme({
  overrides: {
    MuiStepLabel:{
    
        color:BLACK,
        fontWeight:500,
    },
    MuiStepIcon:{
      root:{
        color:GREY,
      },
    },
    
    MuiStepper:{
  
    },
    MuiInput:{
      root:{
      fontSize:'12px'
      }
    },
    MuiFormLabel:{
      root:{
        height:30
      }
    },
    MuiFormControlLabel:{
      root:{
        height:35
      }
    },
    
    MuiAppBar:{
      root:{
        borderRadius:35
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
        color: BLACK+'!important',
        backgroundColor:WHITE,
        borderRadius:'20px',
        border: `1px solid ${BLACK}`,
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
    display1: {
      fontSize: '30px',
      fontFamily: primaryFontFamily,
      color:BLACK,
      fontWeight: 'bold',
      textAlign: 'center'
    },
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
      fontWeight: 500,
      fontSize: '16px',
      letterSpacing: '0.08px'
    },
    body1: {
      fontSize: '12px',
      fontWeight: 500,
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