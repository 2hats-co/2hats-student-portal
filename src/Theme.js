
import { createMuiTheme } from '@material-ui/core/styles';
export const Theme = createMuiTheme({
  typography: {
    headline: {
      fontSize: '30px',
      fontFamily: "Helvetica Neue",
      fontWeight: 'bold',
      textAlign: 'center'
    },
    title: {
      fontFamily: "Helvetica Neue",
      fontWeight: 'bold',
      fontSize: '20px',
      textAlign: 'left'
    },
    
    subheading: {
   
      fontFamily: 'Helvetica Neue',
      fontWeight: 'medium',
      fontSize: '16px',
      letterSpacing: '0.08px'
    },
    body1: {
      fontSize: '12px',
      fontWeight: 'Regular',
      fontFamily: 'Helvetica Neue',
      letterSpacing: '0.06px'

    },
    caption: {
      fontSize: '10px',
      fontWeight: 'regular',
      fontFamily: 'Helvetica Neue',
      color: '#000',
      letterSpacing: '0.05px'
    }, Button: {

      fontFamily: 'Helvetica Neue',
      fontSize: '15px',
      letterSpacing: '0.1px',
      textAlign: 'center'
    },
    fontFamily: [
      '"Helvetica Neue"',
      'Helvetica',

    ].join(','),
  },
  palette: {
    primary: {
      light: '#FF5B40',//
      main: '#FF5B40',// button
      dark: '#FF5B40',//textfield label
      contrastText: '#fff',//button text
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});