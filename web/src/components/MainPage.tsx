import * as React from 'react';
import { ButtonInput } from './widgets/ButtonInput';
import { Button, Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { socket } from '../context/socket';

import { Typography } from '@mui/material';

import { ElementsManager } from './elements/ElementsManager';
import { Element, Data, Preferences, User } from '../types';
import { PreferencesManager } from './preferences/PreferencesManager';
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

let defaultElement:Element = {name:"task", color:"#836E87", index:0}
let defaultUser:User = {name:"user", index:0}
let defaultPreferences:Preferences = {user:defaultUser, order:[defaultElement]}
    
export const MainPage = () => {
    const classes = useStyles();

    const [users, setUsers] = React.useState<User[]>([defaultUser])
    const [elements, setElements] = React.useState<Element[]>([defaultElement])
    
    const [order, setOrder] = React.useState<Preferences[]>([defaultPreferences]);
    
    const [modalOpen, setModalOpen] = React.useState(false);
    
    
    function updateOrder(){
        let newOrder = [...order];
        
        let deltaRows = users.length - newOrder.length;
        let deltaCols = 0;
        if (newOrder.length>0){
            deltaCols = elements.length - newOrder[0].order.length; 
        }
        
        if (deltaRows < 0){ // if rows need to be removed, slice them
            newOrder = newOrder.slice(0, deltaRows)
        }
        else if (deltaRows > 0) { // otherwise fill them with the default order
            for (let i = newOrder.length; i < users.length; i++) {
                let prefs:Preferences = {
                    user: users[i],
                    order: elements
                }
                newOrder.push(prefs);
            }
        }
        
        if (deltaCols < 0){ // if cols need to be removed, drop last elements
            for (let i = 0; i < newOrder.length; i++) {
                let arr = [...newOrder[i].order]

                let indexes = arr.map((el)=>(el.index)) // map index of element
                let idxToRemove = indexes.indexOf(Math.max(...indexes)) // pick the last one
                arr.splice(idxToRemove, 1) // drop it

                newOrder[i].order = arr
            }
            // }
        }
        if (deltaCols > 0){ // if cols need to be added, add elements corresponding
            for (let i = 0; i < newOrder.length; i++) {
                for (let j = newOrder[i].order.length; j < elements.length; j++) {
                    newOrder[i].order.push(elements[j])
                }                
            }
        }
        setOrder(newOrder)
    }
    
    function updateElements(){
        let newOrder = [...order];
        
        let elementsDict: {[name:number] : Element} = {};
        for (let i = 0; i < elements.length; i++) {
            elementsDict[elements[i].index] = elements[i]
        }
        // check for updated elements
        for (let i = 0; i < newOrder.length; i++) {
            for (let j = 0; j < newOrder[i].order.length; j++) {
                newOrder[i].order[j] = elementsDict[newOrder[i].order[j].index]
            }            
        }
        setOrder(newOrder)
    }
    
    function updateIndexes(){
        for (let i = 0; i < elements.length; i++) {
            elements[i].index = i        
        }
        for (let j = 0; j < users.length; j++) {
            users[j].index = j
            
        }
    }

    function handlePush(){
        let data:Data={users:users, elements:elements, preferences:order};
        socket.emit("request", data);
        setModalOpen(true);
    }
    
    React.useEffect(updateIndexes, [users, elements]);
    React.useEffect(updateOrder, [users, elements]);
    React.useEffect(updateElements, [elements]);
    
    let PreferencesManagerProps = { users:users, setUsers:setUsers, elements:elements, order:order, setOrder:setOrder}
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