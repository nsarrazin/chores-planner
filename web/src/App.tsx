import * as React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import { Button, ButtonGroup, List, ListItem, TextField, Box, Typography, Divider, createTheme, ThemeProvider} from '@mui/material';
import DraggableList from './components/DraggableList';
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
    height: "100vh",
    width:"100vw"
  },
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
  const [users, setUsers] = React.useState(["user A", "user B"])
  const [elements, setElements] = React.useState(["element 1", "element 2"])
  const [order, setOrder] = React.useState<string[][]>();

  function handleIncrementUsers() {
    setUsers([...users, "user"]);
  };
  
  function handleDecrementUsers(){
    setUsers(users.slice(0, -1));
  };

  function handleIncrementElements() {
    setElements([...elements, "element"]);
  };
  
  function handleDecrementElements(){
    setElements(elements.slice(0, -1));
  };

  const userButtons = [
    <Button key="minusUsers" onClick={handleDecrementUsers}>-</Button>,
    <Button disabled key="users">{users.length}</Button>,
    <Button key="plusUsers" onClick={handleIncrementUsers}>+</Button>,
  ]

  const elementsButtons = [
    <Button key="minusUsers" color="secondary" onClick={handleDecrementElements}>-</Button>,
    <Button disabled key="users">{elements.length}</Button>,
    <Button key="plusUsers" color="secondary" onClick={handleIncrementElements}>+</Button>,
  ]

  function updateElement(idx:number, val:string){
    let arrayCopy = elements.slice();
    arrayCopy[idx] = val;
    setElements([...arrayCopy]);
  }

  function updateUser(idx:number, val:string){
    let arrayCopy = users.slice();
    arrayCopy[idx] = val;
    setUsers([...arrayCopy]);
  }

  function updateOrder(idx:number, listItems:string[]){
    if (order === undefined){
      return;
    }
    let arrayCopy = order.slice();
    arrayCopy[idx] = listItems;
    setOrder([...arrayCopy]);
  }

  function handleMatrixChange(){
    let array : Array<any> = [];

    for (let i = 0; i < users.length; i++){
      let row : Array<string> = [];

      for (let j = 0; j < elements.length; j++){
        row.push("placeholder")
      }
      array.push(row);
    }

    setOrder(array);
  }

  React.useEffect(()=>{handleMatrixChange()}, [])

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <div> 
          <Typography variant="h1" marginTop="0">
            Chores Planner
          </Typography>
          <Box className={classes.input}>
            <div>
            <Typography variant="h3">
            Users
            </Typography>
              <ButtonGroup>
                {userButtons}
              </ButtonGroup>
            </div>
            <div>
            <Typography variant="h3">
            Elements
            </Typography>
              <ButtonGroup>
                {elementsButtons}
              </ButtonGroup>
            </div>
          </Box>
        </div>
        <Divider />
        <div>
          <Box flexDirection="row" display="flex" justifyContent="space-around" margin="5vw" flexWrap="wrap">
            <List style={{"marginTop":"1.4375em", "paddingTop":"32px"}}>
              {elements.map((el, idx) => (
              <ListItem key={idx}>
                <TextField label={"Element " + String(idx)}
                value={el} variant="outlined"
                onChange={(event) => (updateElement(idx, event.target.value))}/>
              </ListItem>
              ))}
            </List>
            {users.map((user,idx) => (
              <div key={idx}>
                  <TextField variant="filled" label={"User " + String(idx)}
                  onChange={(event) => (updateUser(idx, event.target.value))}
                  value={user}/>
                  <DraggableList inputItems={elements}
                    callback={(listItems:string[]) => {updateOrder(idx, listItems)}}/>
                </div>
              ))}
          </Box>
        </div>
        <Button variant="contained">Push</Button>
      </div>
      <div>

      </div>
    </ThemeProvider>
  );
};

export default App;
