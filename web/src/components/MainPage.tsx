import * as React from 'react';
import { ButtonInput } from './widgets/ButtonInput';
import { Button, Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { socket } from '../context/socket';

import { Typography } from '@mui/material';

import { ElementsManager } from './elements/ElementsManager';
import { Element, Data } from '../types';
import { PreferencesManager } from './PreferencesManager';
import { ModalResult } from './Modal';

const useStyles = makeStyles({
    input:{
      display:"flex",
      justifyContent:"space-around",
      marginRight:"15vw",
      marginLeft:"15vw",
      marginBottom:"5vh",
      marignTop:"5vh"
    },
    title:{
        textAlign: "center",
        marignTop:"0",
        paddingTop:"3vh",
        paddingBottom:"3vh"
    }
})

let defaultElement:Element = {name:"task", color:"#bbb", index:0}
let defaultUser:string = "user"
    
export const MainPage = () => {
    const classes = useStyles();

    const [users, setUsers] = React.useState<string[]>([defaultUser])
    const [elements, setElements] = React.useState<Element[]>([defaultElement])
    let elementsDict: {[name:number] : Element} = {};

    const [order, setOrder] = React.useState<Element[][]>([[defaultElement]]);

    const [modalOpen, setModalOpen] = React.useState(false);
    
    let PreferencesManagerProps = { users:users, setUsers:setUsers, elements:elements, order:order, setOrder:setOrder}
    

    for (let i = 0; i < elements.length; i++) {
        elementsDict[elements[i].index] = elements[i]
    }
    function updateOrder(){
        let newOrder = [...order];

        let deltaRows = users.length - newOrder.length;
        let deltaCols = elements.length - newOrder[0].length; 

        if (deltaRows < 0){ // if rows need to be removed, slice them
            newOrder = newOrder.slice(0, deltaRows)
        }
        else if (deltaRows > 0) { // otherwise fill them with the default order
            for (let i = 0; i < deltaRows; i++) {
                newOrder.push(elements);
            }
        }

        if (deltaCols < 0){ // if cols need to be removed, drop last elements  
            for (let i = 0; i < newOrder.length; i++) {
                newOrder[i] = newOrder[i].slice(0, deltaCols)
            }
        }
        if (deltaCols > 0){ // if cols need to be added, add elements corresponding
            for (let i = 0; i < newOrder.length; i++) {
                for (let j = newOrder[i].length; j < elements.length; j++) {
                    newOrder[i].push(elements[j])
                }                
            }
        }

        // check for updated elements
        for (let i = 0; i < users.length; i++) {
            for (let j = 0; j < elements.length; j++) {
                newOrder[i][j] = elementsDict[newOrder[i][j].index]
            }            
        }
        setOrder(newOrder)
    }

    function handlePush(){
        let data:Data={users:users, elements:elements, order:order};
        socket.emit("request", data);
        setModalOpen(true);
    }

    React.useEffect(updateOrder, [users, elements]);

    return (
        <div>
            <Typography variant="h2" className={classes.title}>
                Chores Planner
            </Typography>
            <Box className={classes.input}>
                <ButtonInput name="Users" state={users} setState={setUsers} defaultItem={defaultUser}/>
                <ButtonInput name="Elements" state={elements} setState={setElements} defaultItem={defaultElement}/>
            </Box>
            <Box display="flex" justifyContent="space-around">
                <ElementsManager elements={elements} setElements={setElements}/>
                <PreferencesManager {...PreferencesManagerProps} />
            </Box>
            <Box display="flex" justifyContent="center">
            <Button variant="contained" onClick={handlePush}>Push</Button>
            </Box>
            <ModalResult open={modalOpen} callbackClose={()=>setModalOpen(false)}/>

        </div>
    )
}