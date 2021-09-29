import React from 'react';
import './App.css';
import { makeStyles, CssBaseline, ThemeProvider } from "@material-ui/core";
import { createTheme } from '@material-ui/core/styles';


import TodoList from '../pages/TodoList'


const theme = createTheme({
  palette: {
    primary: {
      main: "#333996",
      light: '#3c44b126'
    },
    secondary: {
      main: "#f83245",
      light: '#f8324526'
    },
    background: {
      default: "#f4f5fd"
    },
  },
  overrides:{
    MuiAppBar:{
      root:{
        transform:'translateZ(0)'
      }
    }
  },
  props:{
    MuiIconButton:{
      disableRipple:true
    }
  }
})

const styles = makeStyles({
  appMain: {
    padding: '220px',
    width: '100%',
  }
})

function App() {

  const classes = styles();

  return (
    <ThemeProvider theme={theme}>
   
         <div className={classes.appMain}>
      
        <TodoList/>
       </div>
       
        <CssBaseline/>
        </ThemeProvider>
  );
}

export default App;
