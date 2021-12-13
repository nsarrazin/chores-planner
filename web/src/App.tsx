import * as React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import {createTheme, ThemeProvider} from '@mui/material';
import { SocketContext, socket } from './context/socket';

import { MainPage } from './components/MainPage';
import './App.css';
import '@fontsource/roboto/400.css';

const useStyles = makeStyles({
  input:{
    display:"flex",
    justifyContent:"space-around",
    marginRight:"15vw",
    marginLeft:"15vw",
    marginBottom:"5vh",
    marignTop:"5vh"
  },
  root: {
    background: "#242331",
    minHeight: "100vh",
    minWidth:"100vw"
  },
  userBox:{
    borderRadius:"10px",
    borderWidth:"2px",
    borderStyle:"solid",
    padding:"4px",
    height:"fit-content",
    borderColor:"#DDCA7D"
  }
});

const theme = createTheme({
  palette: {
    mode: "dark",
    text: {
      primary: '#DDCA7D',
    },
    primary: {
      main: "#DDCA7D"
    },
    secondary: {
      main: "#9A879D"
    },
  },
  typography: {
    allVariants: {
      color: "#DDCA7D"
    },

  },
});


const App = () => {
  const classes = useStyles();

  return (
  <ThemeProvider theme={theme}>
    <SocketContext.Provider value={socket}>
      <div className={classes.root}> 
        <MainPage/>
      </div>
    </SocketContext.Provider>
  </ThemeProvider>
  );

}

export default App;
