import * as React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { createTheme, ThemeProvider } from '@mui/material';
import { SocketContext, socket } from './context/socket';

// import { MainPage } from './components/MainPage';
import { SharedRoom } from './components/SharedRoom';
import { Lobby } from './components/Lobby';

import './App.css';
import '@fontsource/roboto/400.css';
import { MainPage } from './components/MainPage';

const useStyles = makeStyles({
  input: {
    display: "flex",
    justifyContent: "space-around",
    marginRight: "15vw",
    marginLeft: "15vw",
    marginBottom: "5vh",
    marignTop: "5vh"
  },
  root: {
    minHeight: "100vh",
    minWidth: "100vw"
  },
  userBox: {
    borderRadius: "10px",
    borderWidth: "2px",
    borderStyle: "solid",
    padding: "4px",
    height: "fit-content",
    borderColor: "#EADEAE"
  }
});

const theme = createTheme({
  palette: {
    mode: "light",
    text: {
      primary: '#203C46',
      secondary: '#2E4D48'
    },
    primary: {
      main: "#40798C"
    },
    secondary: {
      main: "#45736B"
    },
    background:{
      default:"#fff",
      paper:  "#D5E6EC"
    }
  },
  typography: {
    allVariants: {
      color: "#203C46"
    },
  }
});


const App = () => {

  const classes = useStyles();
  console.log("App Rerendering")

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
