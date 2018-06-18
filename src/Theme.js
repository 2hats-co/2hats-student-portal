
import { createMuiTheme } from '@material-ui/core/styles';
export const Theme = createMuiTheme({
    typography:{
      
      title:{
        fontSize: '20px',
      },
      headline:{
        fontSize: '40px',
        fontFamily: "Helvetica Neue",
        fontWeight:'bold',
        textAlign: 'center'
      },
      display1:{
        fontSize:'30px',
        fontWeight:'bold',
        fontFamily:'Helvetica',
        color:'#000'
      },
      body1:{
        fontSize:'18px',
        fontWeight:'Regular',
        fontFamily:'Helvetica Neue',
        color:'#000'
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